import { Modal } from "../../components/modal.js";
import { guardarRol, obtenerRol } from "../ventas/almacenamiento.js";
import {
    actualizarDatosPedido,
    cambiarEstadoLaboratorio,
    cambiarEstadoPedido,
    obtenerLaboratorios,
    obtenerPedido,
    obtenerPedidos,
    registrarLaboratorio,
    registrarPedidoManual,
} from "./almacenamiento.js";
import {
    clientesPedido,
    escaparHtml,
    fechaLegible,
    fechaLocal,
    normalizarTexto,
    validarFecha,
    validarItems,
} from "./datos.js";

function uuid() {
    return globalThis.crypto?.randomUUID?.()
        ?? `pedido-ui-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function crearItem(datos = {}) {
    return {
        id: datos.id ?? uuid(),
        partidaId: datos.partidaId ?? null,
        productoId: datos.productoId ?? null,
        codigo: datos.codigo ?? null,
        descripcion: datos.descripcion ?? "",
        cantidad: Number(datos.cantidad) || 1,
    };
}

export function inicializarPedidos() {
    const pagina = document.querySelector("[data-orders-page]");
    if (!pagina) return;

    const $ = (selector) => pagina.querySelector(selector);
    const modalNuevo = new Modal("orders-new-modal");
    const modalDetalle = new Modal("orders-detail-modal");
    const modalLaboratorios = new Modal("orders-labs-modal");
    const modalConfirmacion = new Modal("orders-confirm-modal");

    const formularioNuevo = $("#orders-new-form");
    const formularioDetalle = $("#orders-detail-form");
    const formularioLaboratorios = $("#orders-labs-form");
    const mensajeGeneral = $("#orders-message");
    const busqueda = $("#orders-search");
    const filtroEstado = $("#orders-state-filter");
    const filtroLaboratorio = $("#orders-lab-filter");
    const filtroOrigen = $("#orders-origin-filter");
    const filtroDesde = $("#orders-date-from");
    const filtroHasta = $("#orders-date-to");
    const rol = $("#orders-role");

    const columnas = {
        "Pendiente": $("#orders-column-pending"),
        "En laboratorio": $("#orders-column-progress"),
        "Listo": $("#orders-column-ready"),
        "Entregado": $("#orders-column-done"),
    };
    const contadores = {
        "Pendiente": $("#orders-count-pending"),
        "En laboratorio": $("#orders-count-progress"),
        "Listo": $("#orders-count-ready"),
        "Entregado": $("#orders-count-done"),
    };

    let itemsNuevos = [];
    let itemsDetalle = [];
    let pedidoDetalleId = null;
    let tokenRegistro = uuid();
    let resolverConfirmacion = null;

    function mostrarMensaje(elemento, texto, tipo = "error") {
        elemento.textContent = texto;
        elemento.dataset.tipo = tipo;
        elemento.hidden = false;
    }

    function ocultarMensaje(elemento) {
        elemento.textContent = "";
        elemento.hidden = true;
        delete elemento.dataset.tipo;
    }

    function mostrarMensajeGeneral(texto, tipo = "exito") {
        mostrarMensaje(mensajeGeneral, texto, tipo);
        mensajeGeneral.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function llenarClientes() {
        const selector = $("#orders-new-client");
        selector.replaceChildren(new Option("Público general", "publico"));
        clientesPedido.forEach((cliente) => {
            selector.add(new Option(
                `${cliente.nombre} · ${cliente.folio}`,
                String(cliente.id),
            ));
        });
    }

    function opcionesLaboratorios(selector, valor = "", soloActivos = false) {
        const laboratorios = obtenerLaboratorios();
        selector.replaceChildren(new Option("Sin laboratorio", ""));
        laboratorios
            .filter((laboratorio) => !soloActivos
                || laboratorio.activo
                || String(laboratorio.id) === String(valor))
            .forEach((laboratorio) => {
                selector.add(new Option(
                    `${laboratorio.nombre}${laboratorio.activo ? "" : " (inactivo)"}`,
                    laboratorio.id,
                ));
            });
        selector.value = valor || "";
    }

    function actualizarOpcionesLaboratorios() {
        const valorFiltro = filtroLaboratorio.value;
        filtroLaboratorio.replaceChildren(
            new Option("Todos los laboratorios", ""),
            new Option("Sin laboratorio", "sin-laboratorio"),
        );
        obtenerLaboratorios().forEach((laboratorio) => {
            filtroLaboratorio.add(new Option(
                `${laboratorio.nombre}${laboratorio.activo ? "" : " (inactivo)"}`,
                laboratorio.id,
            ));
        });
        filtroLaboratorio.value = [...filtroLaboratorio.options]
            .some((opcion) => opcion.value === valorFiltro)
            ? valorFiltro
            : "";
        opcionesLaboratorios($("#orders-new-lab"), "", true);
    }

    function renderizarItems(contenedor, items, editable = true) {
        contenedor.replaceChildren();
        items.forEach((item) => {
            const fila = document.createElement("div");
            fila.className = "orders-item";
            fila.dataset.itemId = item.id;
            fila.innerHTML = `
                <input type="text" data-field="descripcion" maxlength="240"
                    value="${escaparHtml(item.descripcion)}" placeholder="Descripción del producto o trabajo"
                    aria-label="Descripción" ${editable ? "" : "disabled"}>
                <input type="number" data-field="cantidad" min="1" step="1"
                    value="${item.cantidad}" aria-label="Cantidad" ${editable ? "" : "disabled"}>
                ${editable ? '<button type="button" data-remove aria-label="Eliminar concepto">×</button>' : ""}
            `;
            fila.addEventListener("input", (evento) => {
                const campo = evento.target.dataset.field;
                if (!campo) return;
                const encontrado = items.find((elemento) => elemento.id === item.id);
                if (!encontrado) return;
                encontrado[campo] = campo === "cantidad"
                    ? Number(evento.target.value)
                    : evento.target.value;
            });
            fila.querySelector("[data-remove]")?.addEventListener("click", () => {
                const indice = items.findIndex((elemento) => elemento.id === item.id);
                if (indice >= 0) items.splice(indice, 1);
                renderizarItems(contenedor, items, editable);
            });
            contenedor.append(fila);
        });
        if (!items.length) {
            contenedor.innerHTML = '<p class="orders-items__empty">No hay conceptos agregados.</p>';
        }
    }

    function pedidoCoincide(pedido) {
        const termino = normalizarTexto(busqueda.value);
        const textoItems = (pedido.items ?? [])
            .map((item) => `${item.codigo ?? ""} ${item.descripcion}`)
            .join(" ");
        const coincideTexto = !termino || [
            pedido.folio,
            pedido.venta?.folio,
            pedido.cliente?.nombre,
            pedido.cliente?.folio,
            textoItems,
            pedido.observaciones,
        ].some((valor) => normalizarTexto(valor).includes(termino));
        const fecha = String(pedido.fechaCreacion ?? "").slice(0, 10);
        const coincideLaboratorio = !filtroLaboratorio.value
            || (filtroLaboratorio.value === "sin-laboratorio"
                ? !pedido.laboratorio
                : String(pedido.laboratorio?.id) === filtroLaboratorio.value);
        return coincideTexto
            && (!filtroEstado.value || pedido.estado === filtroEstado.value)
            && coincideLaboratorio
            && (!filtroOrigen.value || pedido.origen === filtroOrigen.value)
            && (!filtroDesde.value || fecha >= filtroDesde.value)
            && (!filtroHasta.value || fecha <= filtroHasta.value);
    }

    function actualizarIndicadores() {
        const pedidos = obtenerPedidos();
        const hoy = fechaLocal();
        const mes = hoy.slice(0, 7);
        const pedidosHoy = pedidos.filter(
            (pedido) => String(pedido.fechaCreacion).slice(0, 10) === hoy,
        ).length;
        $("#orders-summary-today").textContent = pedidosHoy;
        $("#orders-summary-new").textContent = pedidosHoy
            ? `${pedidosHoy} ${pedidosHoy === 1 ? "nuevo" : "nuevos"}`
            : "Sin pedidos nuevos";
        $("#orders-summary-progress").textContent = pedidos.filter(
            (pedido) => pedido.estado === "En laboratorio",
        ).length;
        $("#orders-summary-ready").textContent = pedidos.filter(
            (pedido) => pedido.estado === "Listo",
        ).length;
        $("#orders-summary-delivered").textContent = pedidos.filter(
            (pedido) => pedido.estado === "Entregado"
                && (pedido.historial ?? []).some(
                    (movimiento) => movimiento.estadoNuevo === "Entregado"
                        && String(movimiento.fecha).slice(0, 7) === mes,
                ),
        ).length;
    }

    function tarjetaPedido(pedido) {
        const tarjeta = document.createElement("button");
        tarjeta.type = "button";
        tarjeta.className = `order-card order-card--${{
            "Pendiente": "pending",
            "En laboratorio": "progress",
            "Listo": "ready",
            "Entregado": "done",
        }[pedido.estado]}`;
        const conceptos = (pedido.items ?? [])
            .map((item) => `${item.cantidad} × ${item.descripcion}`)
            .join(" · ");
        const asignacion = pedido.laboratorio?.nombre
            || pedido.responsable
            || "Sin asignar";
        tarjeta.innerHTML = `
            <span class="order-card__number">${escaparHtml(pedido.folio)}</span>
            <span class="order-card__origin">${pedido.origen === "venta" ? escaparHtml(pedido.venta?.folio ?? "Venta") : "Manual"}</span>
            <h3>${escaparHtml(pedido.cliente?.nombre ?? "Público general")}</h3>
            <p>${escaparHtml(conceptos)}</p>
            <span class="order-card__assignment">${escaparHtml(asignacion)}</span>
            <span class="order-card__footer">
                <small>Entrega estimada</small>
                <strong>${escaparHtml(fechaLegible(pedido.fechaEstimada))}</strong>
            </span>
        `;
        tarjeta.addEventListener("click", () => abrirDetalle(pedido.id));
        return tarjeta;
    }

    function renderizar() {
        actualizarIndicadores();
        Object.values(columnas).forEach((columna) => columna.replaceChildren());
        const pedidos = obtenerPedidos()
            .filter(pedidoCoincide)
            .sort((a, b) => String(b.fechaActualizacion).localeCompare(String(a.fechaActualizacion)));
        Object.keys(columnas).forEach((estado) => {
            const estadoPedidos = pedidos.filter((pedido) => pedido.estado === estado);
            contadores[estado].textContent = estadoPedidos.length;
            estadoPedidos.forEach((pedido) => columnas[estado].append(tarjetaPedido(pedido)));
            if (!estadoPedidos.length) {
                columnas[estado].innerHTML = '<div class="orders-empty">No hay pedidos para mostrar.</div>';
            }
        });
    }

    function abrirNuevo() {
        formularioNuevo.reset();
        ocultarMensaje($("#orders-new-message"));
        llenarClientes();
        opcionesLaboratorios($("#orders-new-lab"), "", true);
        $("#orders-new-date").min = fechaLocal();
        itemsNuevos = [crearItem()];
        renderizarItems($("#orders-new-items"), itemsNuevos);
        tokenRegistro = uuid();
        modalNuevo.open();
    }

    function datosAsignacion(selector, responsable) {
        const laboratorio = obtenerLaboratorios().find(
            (item) => String(item.id) === String(selector.value),
        );
        return {
            laboratorio: laboratorio
                ? { id: laboratorio.id, nombre: laboratorio.nombre }
                : null,
            responsable: responsable.value.trim(),
        };
    }

    function clienteSeleccionado() {
        const valor = $("#orders-new-client").value;
        if (valor === "publico") {
            return { tipo: "publico", id: null, folio: null, nombre: "Público general", telefono: null };
        }
        const cliente = clientesPedido.find((item) => String(item.id) === valor);
        return cliente ? {
            tipo: "registrado",
            id: cliente.id,
            folio: cliente.folio,
            nombre: cliente.nombre,
            telefono: cliente.telefono,
        } : null;
    }

    function validarFormulario(items, fechaEstimada, laboratorio, responsable, exigirFechaFutura = false) {
        const errorItems = validarItems(items);
        if (errorItems) return errorItems;
        if (!validarFecha(fechaEstimada)) return "Selecciona una fecha estimada válida.";
        if (exigirFechaFutura && fechaEstimada < fechaLocal()) {
            return "La fecha estimada no puede ser anterior a hoy.";
        }
        if (!laboratorio && !responsable.trim()) {
            return "Selecciona un laboratorio o indica un responsable.";
        }
        return "";
    }

    function historialHtml(pedido) {
        return [...(pedido.historial ?? [])].reverse().map((movimiento) => `
            <li>
                <strong>${escaparHtml(movimiento.descripcion)}</strong>
                ${movimiento.observacion ? `<p>${escaparHtml(movimiento.observacion)}</p>` : ""}
                <time>${escaparHtml(fechaLegible(movimiento.fecha, true))}</time>
            </li>
        `).join("") || "<li>Sin movimientos registrados.</li>";
    }

    function abrirDetalle(id) {
        const pedido = obtenerPedido(id);
        if (!pedido) return;
        pedidoDetalleId = pedido.id;
        const bloqueado = pedido.estado === "Entregado";
        $("#orders-detail-title").textContent = pedido.folio;
        $("#orders-detail-origin").textContent = pedido.origen === "venta"
            ? `VENTA ${pedido.venta?.folio ?? ""}`
            : "PEDIDO MANUAL";
        $("#orders-detail-client").textContent = pedido.cliente?.nombre ?? "Público general";
        $("#orders-detail-status").textContent = pedido.estado;
        $("#orders-detail-status").dataset.estado = pedido.estado;
        $("#orders-detail-meta").innerHTML = `
            <span><strong>Creado:</strong> ${escaparHtml(fechaLegible(pedido.fechaCreacion, true))}</span>
            <span><strong>Venta:</strong> ${escaparHtml(pedido.venta?.folio ?? "Sin venta asociada")}</span>
        `;
        $("#orders-detail-date").value = pedido.fechaEstimada ?? "";
        opcionesLaboratorios($("#orders-detail-lab"), pedido.laboratorio?.id ?? "");
        $("#orders-detail-responsible").value = pedido.responsable ?? "";
        $("#orders-detail-notes").value = pedido.observaciones ?? "";
        $("#orders-detail-movement-note").value = "";
        itemsDetalle = (pedido.items ?? []).map(crearItem);
        renderizarItems($("#orders-detail-items"), itemsDetalle, !bloqueado);
        $("#orders-detail-history").innerHTML = historialHtml(pedido);
        [
            $("#orders-detail-date"),
            $("#orders-detail-lab"),
            $("#orders-detail-responsible"),
            $("#orders-detail-notes"),
            $("#orders-detail-item-add"),
        ].forEach((control) => { control.disabled = bloqueado; });
        $("#orders-detail-save").hidden = bloqueado;

        const siguiente = {
            "Pendiente": "En laboratorio",
            "En laboratorio": "Listo",
            "Listo": "Entregado",
        }[pedido.estado];
        const botonEstado = $("#orders-detail-state");
        if (siguiente) {
            botonEstado.hidden = false;
            botonEstado.textContent = `Cambiar a ${siguiente}`;
            botonEstado.dataset.nextState = siguiente;
        } else if (obtenerRol() === "administrador") {
            botonEstado.hidden = false;
            botonEstado.textContent = "Reabrir como Listo";
            botonEstado.dataset.nextState = "Listo";
        } else {
            botonEstado.hidden = true;
            delete botonEstado.dataset.nextState;
        }
        ocultarMensaje($("#orders-detail-message"));
        modalDetalle.open();
    }

    function cerrarConfirmacion(resultado) {
        if (!resolverConfirmacion) return;
        const resolver = resolverConfirmacion;
        resolverConfirmacion = null;
        modalConfirmacion.close();
        resolver(resultado);
    }

    function confirmar(titulo, texto) {
        if (resolverConfirmacion) cerrarConfirmacion(false);
        $("#orders-confirm-title").textContent = titulo;
        $("#orders-confirm-text").textContent = texto;
        modalConfirmacion.open();
        return new Promise((resolve) => { resolverConfirmacion = resolve; });
    }

    async function cambiarEstadoDetalle() {
        const pedido = obtenerPedido(pedidoDetalleId);
        const estadoNuevo = $("#orders-detail-state").dataset.nextState;
        if (!pedido || !estadoNuevo) return;
        const reapertura = pedido.estado === "Entregado";
        const aceptado = await confirmar(
            reapertura ? "Reabrir pedido" : "Cambiar estado",
            reapertura
                ? `¿Deseas reabrir ${pedido.folio} como Listo? Esta acción quedará en el historial.`
                : `¿Deseas cambiar ${pedido.folio} de ${pedido.estado} a ${estadoNuevo}?`,
        );
        if (!aceptado) return;
        const actualizado = cambiarEstadoPedido(
            pedido.id,
            estadoNuevo,
            $("#orders-detail-movement-note").value,
            reapertura && obtenerRol() === "administrador",
        );
        if (!actualizado) {
            mostrarMensaje($("#orders-detail-message"), "El cambio de estado ya no es válido.");
            return;
        }
        renderizar();
        abrirDetalle(actualizado.id);
        mostrarMensajeGeneral(`El pedido ${actualizado.folio} cambió a ${actualizado.estado}.`);
    }

    function renderizarLaboratorios() {
        const administrador = obtenerRol() === "administrador";
        $("#orders-labs-name").disabled = !administrador;
        formularioLaboratorios.querySelector("button").disabled = !administrador;
        const lista = $("#orders-labs-list");
        lista.replaceChildren();
        obtenerLaboratorios().forEach((laboratorio) => {
            const fila = document.createElement("div");
            fila.className = "orders-lab";
            fila.innerHTML = `
                <div><strong>${escaparHtml(laboratorio.nombre)}</strong><span>${laboratorio.activo ? "Activo" : "Inactivo"}</span></div>
                <button type="button" class="orders-inline-button" ${administrador ? "" : "disabled"}>
                    ${laboratorio.activo ? "Desactivar" : "Activar"}
                </button>
            `;
            fila.querySelector("button").addEventListener("click", async () => {
                if (obtenerRol() !== "administrador") return;
                if (laboratorio.activo) {
                    const aceptado = await confirmar(
                        "Desactivar laboratorio",
                        `¿Deseas desactivar ${laboratorio.nombre}? Los pedidos anteriores conservarán esta referencia.`,
                    );
                    if (!aceptado) return;
                }
                const actualizado = cambiarEstadoLaboratorio(laboratorio.id, !laboratorio.activo);
                if (!actualizado) return;
                actualizarOpcionesLaboratorios();
                renderizarLaboratorios();
                renderizar();
            });
            lista.append(fila);
        });
        if (!administrador) {
            mostrarMensaje(
                $("#orders-labs-message"),
                "Cambia al rol Administrador para modificar el catálogo.",
                "advertencia",
            );
        } else {
            ocultarMensaje($("#orders-labs-message"));
        }
    }

    formularioNuevo.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const cliente = clienteSeleccionado();
        const asignacion = datosAsignacion(
            $("#orders-new-lab"),
            $("#orders-new-responsible"),
        );
        const error = !cliente
            ? "Selecciona un cliente válido."
            : validarFormulario(
                itemsNuevos,
                $("#orders-new-date").value,
                asignacion.laboratorio,
                asignacion.responsable,
                true,
            );
        if (error) {
            mostrarMensaje($("#orders-new-message"), error);
            return;
        }
        const resultado = registrarPedidoManual({
            cliente,
            items: itemsNuevos.map((item) => ({
                descripcion: item.descripcion.trim(),
                cantidad: Number(item.cantidad),
                partidaId: null,
                productoId: null,
                codigo: null,
            })),
            fechaEstimada: $("#orders-new-date").value,
            observaciones: $("#orders-new-notes").value.trim(),
            ...asignacion,
        }, tokenRegistro);
        if (!resultado.exito) {
            mostrarMensaje(
                $("#orders-new-message"),
                resultado.mensaje ?? "No fue posible registrar el pedido.",
            );
            return;
        }
        modalNuevo.close();
        renderizar();
        mostrarMensajeGeneral(`Pedido ${resultado.pedido.folio} registrado correctamente.`);
    });

    formularioDetalle.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const pedido = obtenerPedido(pedidoDetalleId);
        if (!pedido || pedido.estado === "Entregado") return;
        const asignacion = datosAsignacion(
            $("#orders-detail-lab"),
            $("#orders-detail-responsible"),
        );
        const error = validarFormulario(
            itemsDetalle,
            $("#orders-detail-date").value,
            asignacion.laboratorio,
            asignacion.responsable,
        );
        if (error) {
            mostrarMensaje($("#orders-detail-message"), error);
            return;
        }
        const items = itemsDetalle.map((item) => ({
            partidaId: item.partidaId,
            productoId: item.productoId,
            codigo: item.codigo,
            descripcion: item.descripcion.trim(),
            cantidad: Number(item.cantidad),
        }));
        const cambios = {
            items,
            fechaEstimada: $("#orders-detail-date").value,
            observaciones: $("#orders-detail-notes").value.trim(),
            ...asignacion,
        };
        const cambiosRelevantes = [];
        if (JSON.stringify(items) !== JSON.stringify(pedido.items)) {
            cambiosRelevantes.push("productos o cantidades");
        }
        if (cambios.fechaEstimada !== pedido.fechaEstimada) {
            cambiosRelevantes.push(
                `fecha estimada de ${pedido.fechaEstimada || "sin fecha"} a ${cambios.fechaEstimada}`,
            );
        }
        if ((cambios.laboratorio?.id ?? "") !== (pedido.laboratorio?.id ?? "")) {
            cambiosRelevantes.push(
                `laboratorio de ${pedido.laboratorio?.nombre ?? "sin laboratorio"} a ${cambios.laboratorio?.nombre ?? "sin laboratorio"}`,
            );
        }
        if (cambios.responsable !== (pedido.responsable ?? "")) {
            cambiosRelevantes.push(
                `responsable de ${pedido.responsable || "sin responsable"} a ${cambios.responsable || "sin responsable"}`,
            );
        }
        if (cambios.observaciones !== (pedido.observaciones ?? "")) {
            cambiosRelevantes.push("observaciones");
        }
        if (!cambiosRelevantes.length) {
            mostrarMensaje($("#orders-detail-message"), "No hay cambios por guardar.", "advertencia");
            return;
        }
        const actualizado = actualizarDatosPedido(
            pedido.id,
            cambios,
            `Se actualizaron: ${cambiosRelevantes.join(", ")}.`,
        );
        if (!actualizado) {
            mostrarMensaje($("#orders-detail-message"), "No fue posible actualizar el pedido.");
            return;
        }
        renderizar();
        abrirDetalle(actualizado.id);
        mostrarMensajeGeneral(`Pedido ${actualizado.folio} actualizado.`);
    });

    formularioLaboratorios.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (obtenerRol() !== "administrador") return;
        const nombre = $("#orders-labs-name").value;
        const laboratorio = registrarLaboratorio(nombre);
        if (!laboratorio) {
            mostrarMensaje($("#orders-labs-message"), "Escribe un nombre único para el laboratorio.");
            return;
        }
        formularioLaboratorios.reset();
        actualizarOpcionesLaboratorios();
        renderizarLaboratorios();
    });

    $("#orders-new-open").addEventListener("click", abrirNuevo);
    $("#orders-labs-open").addEventListener("click", () => {
        renderizarLaboratorios();
        modalLaboratorios.open();
    });
    $("#orders-new-item-add").addEventListener("click", () => {
        itemsNuevos.push(crearItem());
        renderizarItems($("#orders-new-items"), itemsNuevos);
    });
    $("#orders-detail-item-add").addEventListener("click", () => {
        itemsDetalle.push(crearItem());
        renderizarItems($("#orders-detail-items"), itemsDetalle);
    });
    $("#orders-detail-state").addEventListener("click", cambiarEstadoDetalle);
    $("#orders-confirm-accept").addEventListener("click", () => cerrarConfirmacion(true));
    $("#orders-confirm-cancel").addEventListener("click", () => cerrarConfirmacion(false));
    $("#orders-confirm-modal .modal__close").addEventListener("click", () => cerrarConfirmacion(false));
    $("#orders-confirm-modal .modal__overlay").addEventListener("click", () => cerrarConfirmacion(false));
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && resolverConfirmacion) cerrarConfirmacion(false);
    });

    [busqueda, filtroEstado, filtroLaboratorio, filtroOrigen, filtroDesde, filtroHasta]
        .forEach((control) => control.addEventListener("input", renderizar));
    $("#orders-clear-filters").addEventListener("click", () => {
        [busqueda, filtroEstado, filtroLaboratorio, filtroOrigen, filtroDesde, filtroHasta]
            .forEach((control) => { control.value = ""; });
        renderizar();
        busqueda.focus();
    });
    rol.value = obtenerRol();
    rol.addEventListener("change", () => {
        guardarRol(rol.value);
        if ($("#orders-labs-modal").classList.contains("is-active")) renderizarLaboratorios();
        if (pedidoDetalleId && $("#orders-detail-modal").classList.contains("is-active")) abrirDetalle(pedidoDetalleId);
    });

    llenarClientes();
    actualizarOpcionesLaboratorios();
    renderizar();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarPedidos);
} else {
    inicializarPedidos();
}
