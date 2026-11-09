import {
    buscarCatalogoVenta,
    buscarClientesVenta,
    clientesVenta,
    consultasVenta,
} from "./datos.js";
import {
    aCentavos,
    calcularPartida,
    calcularTotales,
    desdeCentavos,
    formatearDinero,
    totalMetodosCentavos,
} from "./dinero.js";
import {
    actualizarVenta,
    guardarRol,
    guardarVenta,
    inicializarVentasDemo,
    obtenerRol,
    obtenerVenta,
} from "./almacenamiento.js";
import {
    obtenerProductoCatalogo,
    validarInventarioPartidas,
} from "./inventario.js";

function uuid() {
    return globalThis.crypto?.randomUUID?.() ?? `line-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function numeroEntrada(elemento) {
    const valor = Number(elemento?.value ?? 0);
    return Number.isFinite(valor) ? valor : 0;
}

export function inicializarNuevaVenta() {
    const pagina = document.querySelector('[data-sales-page="new"]');
    if (!pagina) return;
    inicializarVentasDemo();

    const $ = (selector) => pagina.querySelector(selector);
    const formulario = $("#sale-form");
    const cuerpo = $("#sale-products-body");
    const mensaje = $("#sale-message");
    const inputCliente = $("#cliente_busqueda");
    const nombreCliente = $(".sale-client-name");
    const resultadosCliente = $("#sale-client-results");
    const consultaGrupo = $("#sale-consultation-group");
    const consultaSelect = $("#sale-consultation");
    const inputProducto = $("#sale-product-search");
    const resultadosProducto = $("#sale-product-results");
    const descuentoTipo = $("#sale-discount-type");
    const descuentoValor = $("#descuento_venta");
    const recibido = $("#sale-received");
    const efectivo = $("#sale-cash");
    const tarjeta = $("#sale-card-payment");
    const transferencia = $("#sale-transfer");
    const botonGuardar = $("#sale-save");
    const rol = $("#sales-role");

    let cliente = null;
    let partidas = [];
    let guardando = false;
    let tokenGuardado = uuid();
    let ventaEditada = null;

    function mostrarMensaje(texto, tipo = "error") {
        mensaje.textContent = texto;
        mensaje.dataset.tipo = tipo;
        mensaje.hidden = false;
        mensaje.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function ocultarMensaje() {
        mensaje.hidden = true;
        mensaje.textContent = "";
    }

    function seleccionarCliente(seleccionado) {
        cliente = seleccionado;
        inputCliente.value = seleccionado.tipo === "publico" ? "Público general" : seleccionado.nombre;
        nombreCliente.textContent = seleccionado.tipo === "publico"
            ? "Venta a público general"
            : `${seleccionado.nombre} · ${seleccionado.folio}`;
        resultadosCliente.hidden = true;
        cargarConsultas();
    }

    function cargarConsultas(valor = "") {
        consultaSelect.replaceChildren(new Option("Sin consulta asociada", ""));
        const disponibles = cliente?.id == null
            ? []
            : consultasVenta.filter((consulta) => String(consulta.pacienteId) === String(cliente.id));
        disponibles.forEach((consulta) => {
            consultaSelect.add(new Option(`${consulta.fecha} · ${consulta.descripcion}`, consulta.id));
        });
        consultaGrupo.hidden = disponibles.length === 0;
        consultaSelect.value = valor;
    }

    function mostrarClientes() {
        const encontrados = buscarClientesVenta(inputCliente.value);
        resultadosCliente.replaceChildren();
        if (!encontrados.length) {
            resultadosCliente.innerHTML = '<p class="sale-search-empty">No se encontraron clientes.</p>';
        } else {
            encontrados.forEach((item) => {
                const boton = document.createElement("button");
                boton.type = "button";
                boton.className = "sale-search-option";
                boton.textContent = `${item.nombre} · ${item.folio} · ${item.telefono}`;
                boton.addEventListener("click", () => seleccionarCliente({ tipo: "registrado", ...item }));
                resultadosCliente.append(boton);
            });
        }
        resultadosCliente.hidden = false;
    }

    function agregarCatalogo(producto) {
        const existente = partidas.find((partida) => partida.productoId === producto.id);
        const propuestas = partidas.map((partida) => ({ ...partida }));
        const existentePropuesto = propuestas.find((partida) => partida.productoId === producto.id);

        if (existentePropuesto) {
            existentePropuesto.cantidad += 1;
        } else {
            propuestas.push({
                id: uuid(), tipo: "catalogo", productoId: producto.id, codigo: producto.codigo,
                descripcion: producto.nombre, cantidad: 1, precioCentavos: producto.precioCentavos,
                existencia: producto.existencia, descuentoTipo: "importe", descuentoValor: 0,
            });
        }

        const inventario = validarInventarioPartidas(propuestas);

        if (!inventario.valido) {
            mostrarMensaje(inventario.mensaje);
            return;
        }

        if (existente) {
            existente.cantidad += 1;
        } else {
            partidas = propuestas;
        }

        ocultarMensaje();
        resultadosProducto.hidden = true;
        inputProducto.value = "";
        renderizarPartidas();
    }

    function mostrarCatalogo() {
        const encontrados = buscarCatalogoVenta(inputProducto.value);
        resultadosProducto.replaceChildren();
        encontrados.forEach((producto) => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "sale-search-option";
            boton.innerHTML = `<strong>${producto.codigo} · ${producto.nombre}</strong><span>${producto.categoria} · ${formatearDinero(producto.precioCentavos)} · Existencia ${producto.existencia}</span>`;
            boton.addEventListener("click", () => agregarCatalogo(producto));
            resultadosProducto.append(boton);
        });
        resultadosProducto.hidden = false;
    }

    function totalesActuales() {
        return calcularTotales(partidas, descuentoTipo.value, numeroEntrada(descuentoValor));
    }

    function actualizarResumen() {
        const totales = totalesActuales();
        $("#sale-subtotal").textContent = formatearDinero(totales.subtotalCentavos);
        $("#sale-total").textContent = formatearDinero(totales.totalCentavos);
        const pago = totalMetodosCentavos({
            efectivo: aCentavos(numeroEntrada(efectivo)),
            tarjeta: aCentavos(numeroEntrada(tarjeta)),
            transferencia: aCentavos(numeroEntrada(transferencia)),
        });
        $("#sale-balance").textContent = formatearDinero(Math.max(0, totales.totalCentavos - pago));
        $("#estado_pago").value = pago <= 0 ? "pendiente" : pago < totales.totalCentavos ? "parcial" : "pagado";
    }

    function renderizarPartidas() {
        cuerpo.replaceChildren();
        if (!partidas.length) {
            cuerpo.innerHTML = '<tr class="sale-table__empty"><td colspan="6">No hay productos agregados.</td></tr>';
            actualizarResumen();
            return;
        }
        partidas.forEach((partida) => {
            const productoCatalogo = partida.tipo === "catalogo"
                ? obtenerProductoCatalogo(partida.productoId)
                : null;
            const existencia = productoCatalogo?.existencia ?? null;
            const calculada = calcularPartida(partida);
            const fila = document.createElement("tr");
            fila.dataset.lineId = partida.id;
            fila.innerHTML = `
                <td><strong>${partida.descripcion}</strong><small>${partida.codigo || "Concepto manual"}${existencia != null ? ` · Existencia ${existencia}` : ""}</small></td>
                <td><input class="sale-line-input" data-field="cantidad" type="number" min="1" ${existencia != null ? `max="${existencia}"` : ""} step="1" value="${partida.cantidad}"></td>
                <td><input class="sale-line-input" data-field="precio" type="number" min="0" step="0.01" value="${desdeCentavos(partida.precioCentavos).toFixed(2)}"></td>
                <td><div class="sale-line-discount"><select data-field="descuentoTipo"><option value="importe" ${partida.descuentoTipo === "importe" ? "selected" : ""}>$</option><option value="porcentaje" ${partida.descuentoTipo === "porcentaje" ? "selected" : ""}>%</option></select><input data-field="descuentoValor" type="number" min="0" step="0.01" value="${partida.descuentoValor}"></div></td>
                <td><strong>${formatearDinero(calculada.importeCentavos)}</strong></td>
                <td><button type="button" class="sale-remove-line" aria-label="Eliminar ${partida.descripcion}">Eliminar</button></td>`;
            fila.addEventListener("input", (evento) => {
                const campo = evento.target.dataset.field;
                if (!campo) return;
                if (campo === "precio") partida.precioCentavos = aCentavos(evento.target.value);
                else if (campo === "cantidad") return;
                else if (campo === "descuentoValor") partida.descuentoValor = Math.max(0, Number(evento.target.value) || 0);
                actualizarResumen();
            });
            fila.addEventListener("change", (evento) => {
                const campo = evento.target.dataset.field;

                if (campo === "cantidad") {
                    const cantidad = Number(evento.target.value);
                    const propuestas = partidas.map((item) => item.id === partida.id
                        ? { ...item, cantidad }
                        : item);
                    const inventario = validarInventarioPartidas(propuestas);

                    if (!inventario.valido) {
                        mostrarMensaje(inventario.mensaje);
                        renderizarPartidas();
                        return;
                    }

                    partida.cantidad = cantidad;
                    ocultarMensaje();
                } else if (campo === "descuentoTipo") {
                    partida.descuentoTipo = evento.target.value;
                }

                renderizarPartidas();
            });
            fila.querySelector(".sale-remove-line").addEventListener("click", () => {
                partidas = partidas.filter((item) => item.id !== partida.id);
                renderizarPartidas();
            });
            cuerpo.append(fila);
        });
        actualizarResumen();
    }

    function validar(totales, metodos, importeRecibido) {
        if (!cliente) return "Selecciona un cliente o Público general.";
        if (!partidas.length) return "Agrega al menos un producto o concepto manual.";
        const inventario = validarInventarioPartidas(partidas);
        if (!inventario.valido) return inventario.mensaje;
        for (const partida of partidas) {
            if (!Number.isInteger(Number(partida.cantidad)) || partida.cantidad <= 0 || partida.precioCentavos < 0) return "Revisa cantidades y precios.";
            const bruto = partida.cantidad * partida.precioCentavos;
            if (partida.descuentoTipo === "porcentaje" && partida.descuentoValor > 100) return "Un descuento porcentual individual no puede superar 100%.";
            if (partida.descuentoTipo === "importe" && aCentavos(partida.descuentoValor) > bruto) return "Un descuento individual no puede superar el importe del producto.";
        }
        if (descuentoTipo.value === "porcentaje" && numeroEntrada(descuentoValor) > 100) return "El descuento general no puede superar 100%.";
        if (descuentoTipo.value === "importe" && aCentavos(numeroEntrada(descuentoValor)) > totales.subtotalCentavos) return "El descuento general no puede superar el subtotal.";
        if (importeRecibido < 0) return "El importe recibido no puede ser negativo.";
        if (totalMetodosCentavos(metodos) !== importeRecibido) return "El desglose de métodos no coincide con el importe recibido.";
        if (importeRecibido > totales.totalCentavos) return "El pago no puede superar el total de la venta.";
        if (!$("#fecha_venta").value) return "Selecciona la fecha de venta.";
        return "";
    }

    function cargarEdicion() {
        const id = new URLSearchParams(location.search).get("editar");
        if (!id) return;
        const venta = obtenerVenta(id);
        if (!venta || venta.cancelacion || (venta.pagos ?? []).length) {
            mostrarMensaje("La venta no existe o ya no permite modificaciones financieras.");
            return;
        }
        ventaEditada = venta;
        cliente = venta.cliente;
        seleccionarCliente(cliente);
        cargarConsultas(venta.consultaId ?? "");
        partidas = structuredClone(venta.partidas).map((partida) => {
            const producto = partida.tipo === "catalogo"
                ? obtenerProductoCatalogo(partida.productoId)
                : null;

            return producto
                ? { ...partida, existencia: producto.existencia }
                : partida;
        });
        $("#fecha_venta").value = venta.fecha;
        $("#sale-responsible").value = venta.responsable;
        descuentoTipo.value = venta.descuentoGeneralTipo;
        descuentoValor.value = venta.descuentoGeneralValor;
        botonGuardar.textContent = `Actualizar ${venta.folio}`;
        renderizarPartidas();
    }

    $("#sale-client-search-button").addEventListener("click", mostrarClientes);
    inputCliente.addEventListener("input", mostrarClientes);
    $("#sale-general-public").addEventListener("click", () => seleccionarCliente({ tipo: "publico", id: null, nombre: "Público general", folio: "", telefono: "" }));
    inputProducto.addEventListener("input", mostrarCatalogo);
    inputProducto.addEventListener("focus", mostrarCatalogo);
    $(".sale-add-product").addEventListener("click", () => { inputProducto.focus(); mostrarCatalogo(); });
    $("#sale-add-manual").addEventListener("click", () => {
        const descripcion = $("#sale-manual-description").value.trim();
        const cantidad = Number($("#sale-manual-quantity").value);
        const precio = aCentavos($("#sale-manual-price").value);
        if (!descripcion || !Number.isInteger(cantidad) || cantidad <= 0 || precio < 0) {
            mostrarMensaje("Completa una descripción, cantidad y precio válidos para el concepto manual.");
            return;
        }
        partidas.push({ id: uuid(), tipo: "manual", productoId: null, codigo: "", descripcion, cantidad, precioCentavos: precio, descuentoTipo: "importe", descuentoValor: 0 });
        $("#sale-manual-description").value = "";
        $("#sale-manual-price").value = "";
        renderizarPartidas();
    });

    [descuentoTipo, descuentoValor, recibido, efectivo, tarjeta, transferencia].forEach((control) => control.addEventListener("input", actualizarResumen));
    rol.value = obtenerRol();
    rol.addEventListener("change", () => guardarRol(rol.value));
    $("#sale-cancel").addEventListener("click", () => { location.href = pagina.querySelector(".sale-page__back").href; });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (guardando) return;
        ocultarMensaje();
        const totales = totalesActuales();
        const metodos = {
            efectivo: aCentavos(numeroEntrada(efectivo)),
            tarjeta: aCentavos(numeroEntrada(tarjeta)),
            transferencia: aCentavos(numeroEntrada(transferencia)),
        };
        const importeRecibido = aCentavos(numeroEntrada(recibido));
        const error = validar(totales, metodos, importeRecibido);
        if (error) { mostrarMensaje(error); return; }
        const datos = {
            cliente, consultaId: consultaSelect.value || null, fecha: $("#fecha_venta").value,
            responsable: $("#sale-responsible").value, partidas: totales.partidas,
            descuentoGeneralTipo: descuentoTipo.value, descuentoGeneralValor: numeroEntrada(descuentoValor),
            subtotalCentavos: totales.subtotalCentavos, descuentoGeneralCentavos: totales.descuentoGeneralCentavos,
            totalCentavos: totales.totalCentavos, estadoEntrega: ventaEditada?.estadoEntrega ?? "Pendiente",
            pagos: importeRecibido > 0 ? [{ importeCentavos: importeRecibido, metodos, referencia: "Pago inicial", saldoResultanteCentavos: totales.totalCentavos - importeRecibido }] : [],
        };
        guardando = true;
        botonGuardar.disabled = true;
        const resultado = ventaEditada
            ? actualizarVenta(ventaEditada.id, datos, (venta) => !venta.cancelacion && !(venta.pagos ?? []).length)
            : guardarVenta(datos, tokenGuardado);
        if (!resultado.exito) {
            guardando = false; botonGuardar.disabled = false;
            mostrarMensaje(resultado.mensaje ?? "No fue posible guardar la venta simulada.");
            return;
        }
        mostrarMensaje(`${ventaEditada ? "Venta actualizada" : "Venta guardada"}: ${resultado.venta.folio}.`, "exito");
        tokenGuardado = resultado.venta.tokenGuardado;
        setTimeout(() => { location.href = pagina.querySelector(".sale-page__back").href; }, 500);
    });

    const pacienteId = new URLSearchParams(location.search).get("paciente");
    const paciente = clientesVenta.find((item) => String(item.id) === String(pacienteId));
    if (paciente) seleccionarCliente({ tipo: "registrado", ...paciente });
    cargarEdicion();
    renderizarPartidas();
}

