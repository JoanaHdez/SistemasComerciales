import {
    agregarPago,
    cancelarVenta,
    cambiarEntrega,
    guardarRol,
    inicializarVentasDemo,
    obtenerRol,
    obtenerVenta,
    obtenerVentas,
    registrarDevolucion,
    registrarReembolso,
} from "./almacenamiento.js";
import {
    formatearDinero,
    obtenerEstadoFinanciero,
    totalPagadoCentavos,
    totalReembolsadoCentavos,
} from "./dinero.js";
import { normalizarTexto } from "./datos.js";
import { imprimirRecibo, imprimirVenta } from "./impresion.js";
import { ModalAbonoVenta } from "./modal_abono.js";
import { ModalCancelacionVenta } from "./modal_cancelacion.js";
import { ModalDevolucionVenta } from "./modal_devolucion.js";
import { ModalFormatoImpresion } from "./modal_impresion.js";
import { ModalReembolsoVenta } from "./modal_reembolso.js";

function escapar(valor) {
    const nodo = document.createElement("div");
    nodo.textContent = String(valor ?? "");
    return nodo.innerHTML;
}

function fechaLegible(valor) {
    if (!valor) return "—";
    return new Date(valor.length === 10 ? `${valor}T12:00:00` : valor).toLocaleString("es-MX", {
        dateStyle: "medium",
        ...(valor.length === 10 ? {} : { timeStyle: "short" }),
    });
}

export function inicializarHistorialVentas() {
    const pagina = document.querySelector('[data-sales-page="history"]');
    if (!pagina) return;
    inicializarVentasDemo();

    const $ = (selector) => pagina.querySelector(selector);
    const lista = $("#sales-list");
    const busqueda = $("#sales-search");
    const filtroPago = $("#sales-payment-filter");
    const filtroEntrega = $("#sales-delivery-filter");
    const limpiarFiltros = $("#sales-clear-filters");
    const detalle = $("#sales-detail");
    const detalleContenido = $("#sales-detail-content");
    const rol = $("#sales-history-role");
    const modalAbono = new ModalAbonoVenta();
    const modalCancelacion = new ModalCancelacionVenta();
    const modalDevolucion = new ModalDevolucionVenta();
    const modalImpresion = new ModalFormatoImpresion();
    const modalReembolso = new ModalReembolsoVenta();
    let ventaDetalleId = null;

    function ventasFiltradas() {
        const termino = normalizarTexto(busqueda.value);
        return obtenerVentas().filter((venta) => {
            const financiero = obtenerEstadoFinanciero(venta);
            const estado = financiero.estadoPago;
            const coincideTexto = !termino || [venta.folio, venta.cliente.nombre, venta.cliente.telefono]
                .some((valor) => normalizarTexto(valor).includes(termino));
            return coincideTexto
                && (!filtroPago.value || estado === filtroPago.value)
                && (!filtroEntrega.value || venta.estadoEntrega === filtroEntrega.value);
        }).sort((a, b) => String(b.fechaRegistro).localeCompare(String(a.fechaRegistro)));
    }

    function actualizarIndicadores() {
        const ventas = obtenerVentas();
        const hoy = new Date().toISOString().slice(0, 10);
        const mes = hoy.slice(0, 7);
        $("#sales-today").textContent = ventas.filter((venta) => venta.fecha === hoy).length;
        $("#sales-pending").textContent = ventas.filter((venta) => !venta.cancelacion && venta.estadoEntrega !== "Entregada").length;
        $("#sales-delivered").textContent = ventas.filter((venta) => !venta.cancelacion && venta.estadoEntrega === "Entregada" && venta.fecha.slice(0, 7) === mes).length;
        const ingreso = ventas.reduce((total, venta) => total + totalPagadoCentavos(venta) - totalReembolsadoCentavos(venta), 0);
        $("#sales-income").textContent = formatearDinero(ingreso);
    }

    function renderizar() {
        actualizarIndicadores();
        const ventas = ventasFiltradas();
        lista.replaceChildren();
        if (!ventas.length) {
            lista.innerHTML = '<div class="sales-empty"><strong>No hay ventas para estos filtros.</strong><span>Registra una nueva venta o cambia los criterios.</span></div>';
            return;
        }
        ventas.forEach((venta) => {
            const financiero = obtenerEstadoFinanciero(venta);
            const estadoPago = financiero.estadoPago;
            const tarjeta = document.createElement("article");
            tarjeta.className = `sale-card ${venta.cancelacion ? "sale-card--cancelled" : financiero.saldoCentavos > 0 ? "sale-card--warning" : "sale-card--success"}`;
            tarjeta.innerHTML = `
                <div class="sale-card__header"><div><span class="sale-card__folio">${escapar(venta.folio)}</span><h2 class="sale-card__client">${escapar(venta.cliente.nombre)}</h2></div><span class="sale-card__status">${escapar(estadoPago)}</span></div>
                <div class="sale-card__body">
                    <div><strong>Total ajustado</strong><p>${formatearDinero(financiero.totalAjustadoCentavos)}</p></div>
                    <div><strong>Saldo</strong><p>${formatearDinero(financiero.saldoCentavos)}</p></div>
                    <div><strong>Entrega</strong><p>${escapar(venta.estadoEntrega)}</p></div>
                    <div><strong>Responsable</strong><p>${escapar(venta.responsable)}</p></div>
                </div>
                <div class="sale-card__footer"><div class="sale-card__links"><span>${venta.partidas.length} concepto(s)</span><span>${(venta.pagos ?? []).length} pago(s)</span></div><button type="button" class="sale-card__button">Ver detalle</button></div>`;
            tarjeta.querySelector("button").addEventListener("click", () => abrirDetalle(venta.id));
            lista.append(tarjeta);
        });
    }

    function productosDevolvibles(venta) {
        return venta.partidas.map((partida) => {
            const cantidadDevuelta = (venta.devoluciones ?? [])
                .filter((devolucion) => String(devolucion.partidaId) === String(partida.id))
                .reduce((total, devolucion) => total + devolucion.cantidad, 0);
            return {
                id: partida.id,
                descripcion: partida.descripcion,
                cantidadDisponible: Math.max(0, partida.cantidad - cantidadDevuelta),
            };
        }).filter((partida) => partida.cantidadDisponible > 0);
    }

    function importeDisponibleReembolso(venta) {
        const pendientes = (venta.reembolsos ?? [])
            .filter((reembolso) => reembolso.estado === "pendiente")
            .reduce((total, reembolso) => total + reembolso.importeCentavos, 0);
        return Math.max(0, totalPagadoCentavos(venta) - totalReembolsadoCentavos(venta) - pendientes);
    }

    function accionesDetalle(venta, financiero) {
        const administrador = obtenerRol() === "administrador";
        const editable = !venta.cancelacion && !(venta.pagos ?? []).length;
        return `
            <div class="sales-detail__actions">
                ${!venta.cancelacion && financiero.saldoCentavos > 0 ? '<button type="button" data-action="payment">Registrar abono</button>' : ""}
                ${editable ? '<button type="button" data-action="edit">Editar venta</button>' : ""}
                <button type="button" data-action="print">Imprimir comprobante</button>
                ${administrador && !venta.cancelacion && productosDevolvibles(venta).length ? '<button type="button" data-action="return">Devolución</button>' : ""}
                ${administrador && !venta.cancelacion ? '<button type="button" data-action="cancel" class="danger">Cancelar venta</button>' : ""}
                ${administrador && importeDisponibleReembolso(venta) > 0 ? '<button type="button" data-action="refund">Reembolso</button>' : ""}
            </div>`;
    }

    function abrirDetalle(id) {
        const venta = obtenerVenta(id);
        if (!venta) return;
        ventaDetalleId = id;
        const financiero = obtenerEstadoFinanciero(venta);
        $("#sales-detail-title").textContent = `${venta.folio} · ${venta.cliente.nombre}`;
        const productos = venta.partidas.map((p) => `<tr><td>${escapar(p.descripcion)}</td><td>${p.cantidad}</td><td>${formatearDinero(p.precioCentavos)}</td><td>${formatearDinero(p.descuentoCentavos)}</td><td>${formatearDinero(p.importeCentavos)}</td></tr>`).join("");
        const pagos = (venta.pagos ?? []).map((pago, indice) => `<li><div><strong>Pago ${indice + 1}</strong><span>${fechaLegible(pago.fecha)} · ${formatearDinero(pago.importeCentavos)} · Saldo ${formatearDinero(pago.saldoResultanteCentavos)}</span></div><button type="button" data-receipt="${pago.id}">Recibo</button></li>`).join("") || "<li>Sin pagos registrados.</li>";
        const devoluciones = (venta.devoluciones ?? []).map((d) => `<li>${fechaLegible(d.fecha)} · ${escapar(d.descripcion)} · ${d.cantidad} · ${formatearDinero(d.importeCentavos)} · ${escapar(d.condicion)}</li>`).join("") || "<li>Sin devoluciones.</li>";
        const reembolsos = (venta.reembolsos ?? []).map((r) => `<li>${fechaLegible(r.fecha)} · ${formatearDinero(r.importeCentavos)} · ${escapar(r.metodo)} · ${escapar(r.estado)}</li>`).join("") || "<li>Sin reembolsos.</li>";
        detalleContenido.innerHTML = `
            ${venta.cancelacion ? `<div class="sales-warning"><strong>Venta cancelada</strong><span>${escapar(venta.cancelacion.motivo)} · ${fechaLegible(venta.cancelacion.fecha)}</span></div>` : ""}
            <div class="sales-detail__summary"><div><span>Pago</span><strong>${escapar(financiero.estadoPago)}</strong></div><div><span>Total</span><strong>${formatearDinero(financiero.totalAjustadoCentavos)}</strong></div><div><span>Recibido neto</span><strong>${formatearDinero(financiero.recibidoNetoCentavos)}</strong></div><div><span>Saldo</span><strong>${formatearDinero(financiero.saldoCentavos)}</strong></div></div>
            <div class="sales-delivery-control">
                <label for="sales-delivery-state">Estado de entrega</label>
                <select id="sales-delivery-state" ${venta.cancelacion ? "disabled" : ""}>${["Pendiente", "En preparación", "Lista para entregar", "Entregada"].map((estado) => `<option ${estado === venta.estadoEntrega ? "selected" : ""}>${estado}</option>`).join("")}</select>
                ${venta.cancelacion ? "" : '<button type="button" class="sale-card__button" id="sales-delivery-save" hidden disabled>Guardar estado</button>'}
            </div>
            <h3>Productos y descuentos</h3><div class="sales-detail__table"><table><thead><tr><th>Concepto</th><th>Cant.</th><th>Precio</th><th>Descuento</th><th>Importe</th></tr></thead><tbody>${productos}</tbody></table></div>
            <h3>Pagos y recibos</h3><ul class="sales-movements">${pagos}</ul>
            <h3>Devoluciones</h3><ul class="sales-movements">${devoluciones}</ul>
            <h3>Reembolsos</h3><ul class="sales-movements">${reembolsos}</ul>
            ${accionesDetalle(venta, financiero)}`;
        enlazarDetalle(venta);
        if (!detalle.open) detalle.showModal();
    }

    function registrarPago(venta) {
        const saldo = obtenerEstadoFinanciero(venta).saldoCentavos;

        if (detalle.open) {
            detalle.close();
        }

        modalAbono.abrir({
            folio: venta.folio,
            saldoCentavos: saldo,
            registrar: ({ metodos, referencia }) => {
                const actualizada = agregarPago(
                    venta.id,
                    metodos,
                    referencia || "Abono",
                );

                return actualizada
                    ? { exito: true, venta: actualizada }
                    : {
                        exito: false,
                        mensaje: "El abono ya no es válido. Revisa el saldo actualizado.",
                    };
            },
            alCancelar: () => abrirDetalle(venta.id),
            alCompletar: () => {
                renderizar();
                abrirDetalle(venta.id);
            },
        });
    }

    function seleccionarFormatoImpresion(venta, generar) {
        if (detalle.open) detalle.close();

        modalImpresion.abrir({
            folio: venta.folio,
            cliente: venta.cliente.nombre,
            generar: (formato) => generar(formato)
                ? { exito: true }
                : {
                    exito: false,
                    mensaje: "El navegador bloqueó la ventana de impresión. Permite las ventanas emergentes e inténtalo nuevamente.",
                },
            alCancelar: () => abrirDetalle(venta.id),
            alCompletar: () => abrirDetalle(venta.id),
        });
    }

    function registrarCancelacion(venta) {
        if (obtenerRol() !== "administrador" || venta.cancelacion) return;

        if (detalle.open) detalle.close();

        modalCancelacion.abrir({
            folio: venta.folio,
            cliente: venta.cliente.nombre,
            cancelar: (motivo) => {
                if (obtenerRol() !== "administrador") {
                    return { exito: false, mensaje: "Solo un Administrador puede cancelar ventas." };
                }
                const actualizada = cancelarVenta(venta.id, motivo);
                return actualizada
                    ? { exito: true, venta: actualizada }
                    : { exito: false, mensaje: "La venta ya fue cancelada o no está disponible." };
            },
            alCancelar: () => abrirDetalle(venta.id),
            alCompletar: () => {
                renderizar();
                abrirDetalle(venta.id);
            },
        });
    }

    function registrarReembolsoDesdeDetalle(venta) {
        if (obtenerRol() !== "administrador") return;

        const disponible = importeDisponibleReembolso(venta);
        if (disponible <= 0) return;
        if (detalle.open) detalle.close();

        modalReembolso.abrir({
            folio: venta.folio,
            cliente: venta.cliente.nombre,
            disponibleCentavos: disponible,
            registrar: ({ importeCentavos, metodo, motivo }) => {
                if (obtenerRol() !== "administrador") {
                    return { exito: false, mensaje: "Solo un Administrador puede registrar reembolsos." };
                }

                const ventaActual = obtenerVenta(venta.id);
                const disponibleActual = ventaActual ? importeDisponibleReembolso(ventaActual) : 0;
                if (!ventaActual || importeCentavos > disponibleActual) {
                    return { exito: false, mensaje: "El importe disponible cambió. Vuelve a abrir el reembolso." };
                }

                const actualizada = registrarReembolso(ventaActual.id, {
                    importeCentavos,
                    metodo,
                    estado: "procesado",
                    motivo,
                    tipo: importeCentavos === disponibleActual ? "total" : "parcial",
                });

                return actualizada
                    ? { exito: true, venta: actualizada }
                    : { exito: false, mensaje: "El reembolso supera el importe disponible o contiene datos inválidos." };
            },
            alCancelar: () => abrirDetalle(venta.id),
            alCompletar: () => {
                renderizar();
                abrirDetalle(venta.id);
            },
        });
    }

    function registrarDevolucionDesdeDetalle(venta) {
        if (obtenerRol() !== "administrador" || venta.cancelacion) return;

        if (detalle.open) detalle.close();

        modalDevolucion.abrir({
            folio: venta.folio,
            cliente: venta.cliente.nombre,
            productos: productosDevolvibles(venta),
            registrar: ({ partidaId, cantidad, motivo, condicion }) => {
                if (obtenerRol() !== "administrador") {
                    return { exito: false, mensaje: "Solo un Administrador puede registrar devoluciones." };
                }

                const ventaActual = obtenerVenta(venta.id);
                const partida = ventaActual?.partidas.find((item) => String(item.id) === String(partidaId));
                const disponible = ventaActual
                    ? productosDevolvibles(ventaActual).find((item) => String(item.id) === String(partidaId))
                    : null;

                if (!ventaActual || ventaActual.cancelacion || !partida || cantidad > (disponible?.cantidadDisponible ?? 0)) {
                    return { exito: false, mensaje: "La cantidad disponible cambió. Vuelve a abrir la devolución." };
                }

                const factorDescuentoGeneral = ventaActual.subtotalCentavos > 0
                    ? (ventaActual.subtotalCentavos - ventaActual.descuentoGeneralCentavos) / ventaActual.subtotalCentavos
                    : 1;
                const importeAjustadoPartida = Math.round(partida.importeCentavos * factorDescuentoGeneral);
                const importeUnitario = partida.cantidad > 0
                    ? Math.round(importeAjustadoPartida / partida.cantidad)
                    : 0;
                const actualizada = registrarDevolucion(ventaActual.id, {
                    partidaId: partida.id,
                    descripcion: partida.descripcion,
                    cantidad,
                    motivo,
                    condicion,
                    importeCentavos: importeUnitario * cantidad,
                });

                return actualizada
                    ? { exito: true, venta: actualizada }
                    : { exito: false, mensaje: "La devolución es inválida o supera la cantidad disponible." };
            },
            alCancelar: () => abrirDetalle(venta.id),
            alCompletar: () => {
                renderizar();
                abrirDetalle(venta.id);
            },
        });
    }

    function enlazarDetalle(venta) {
        const selectorEntrega = detalleContenido.querySelector("#sales-delivery-state");
        const botonGuardarEntrega = detalleContenido.querySelector("#sales-delivery-save");

        if (selectorEntrega && botonGuardarEntrega) {
            selectorEntrega.addEventListener("change", () => {
                const hayCambios = selectorEntrega.value !== venta.estadoEntrega;
                botonGuardarEntrega.hidden = !hayCambios;
                botonGuardarEntrega.disabled = !hayCambios;
            });
        }
        botonGuardarEntrega?.addEventListener("click", () => {
            const nuevoEstado = selectorEntrega.value;
            if (nuevoEstado === venta.estadoEntrega) return;
            const saldo = obtenerEstadoFinanciero(venta).saldoCentavos;
            if (nuevoEstado === "Entregada" && saldo > 0 && !confirm(`La venta mantiene un saldo de ${formatearDinero(saldo)}. ¿Confirmas la entrega?`)) {
                return;
            }
            const actualizada = cambiarEntrega(venta.id, nuevoEstado);
            if (!actualizada) return;
            renderizar();
            abrirDetalle(venta.id);
        });
        detalleContenido.querySelectorAll("[data-receipt]").forEach((boton) => boton.addEventListener("click", () => {
            const pago = venta.pagos.find((item) => item.id === boton.dataset.receipt);
            if (pago) seleccionarFormatoImpresion(
                venta,
                (formato) => imprimirRecibo(venta, pago, formato),
            );
        }));
        detalleContenido.querySelector('[data-action="payment"]')?.addEventListener("click", () => registrarPago(venta));
        detalleContenido.querySelector('[data-action="edit"]')?.addEventListener("click", () => {
            const url = new URL(pagina.querySelector(".sales-history-page__button").href);
            url.searchParams.set("editar", venta.id); location.href = url;
        });
        detalleContenido.querySelector('[data-action="print"]')?.addEventListener("click", () => {
            seleccionarFormatoImpresion(venta, (formato) => imprimirVenta(venta, formato));
        });
        detalleContenido.querySelector('[data-action="cancel"]')?.addEventListener("click", () => registrarCancelacion(venta));
        detalleContenido.querySelector('[data-action="refund"]')?.addEventListener("click", () => registrarReembolsoDesdeDetalle(venta));
        detalleContenido.querySelector('[data-action="return"]')?.addEventListener("click", () => registrarDevolucionDesdeDetalle(venta));
    }

    $("#sales-detail-close").addEventListener("click", () => detalle.close());
    detalle.addEventListener("click", (evento) => { if (evento.target === detalle) detalle.close(); });
    [busqueda, filtroPago, filtroEntrega].forEach((control) => control.addEventListener("input", renderizar));
    limpiarFiltros.addEventListener("click", () => {
        busqueda.value = "";
        filtroPago.value = "";
        filtroEntrega.value = "";
        renderizar();
        busqueda.focus();
    });
    rol.value = obtenerRol();
    rol.addEventListener("change", () => { guardarRol(rol.value); renderizar(); if (ventaDetalleId && detalle.open) abrirDetalle(ventaDetalleId); });
    renderizar();
}

