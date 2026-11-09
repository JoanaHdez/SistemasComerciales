const CLAVE_PEDIDOS = "opticool_pedidos";
const CLAVE_LABORATORIOS = "opticool_pedidos_laboratorios";

const LABORATORIOS_INICIALES = [
    { id: "lab-luxottica", nombre: "Luxottica", activo: true },
    { id: "lab-essilor", nombre: "Essilor", activo: true },
];

function uuid(prefijo = "pedido") {
    return globalThis.crypto?.randomUUID?.()
        ?? `${prefijo}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function leerLista(clave, valorInicial = []) {
    try {
        const contenido = localStorage.getItem(clave);
        if (contenido === null) return structuredClone(valorInicial);
        const lista = JSON.parse(contenido);
        return Array.isArray(lista) ? lista : structuredClone(valorInicial);
    } catch (error) {
        console.error(`No fue posible leer ${clave}:`, error);
        return structuredClone(valorInicial);
    }
}

function guardarLista(clave, lista) {
    try {
        localStorage.setItem(clave, JSON.stringify(lista));
        return true;
    } catch (error) {
        console.error(`No fue posible guardar ${clave}:`, error);
        return false;
    }
}

function normalizar(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function siguienteFolio(pedidos, fechaCreacion) {
    const anio = new Date(fechaCreacion).getFullYear();
    const prefijo = `P-${anio}-`;
    let consecutivo = pedidos
        .filter((pedido) => pedido.folio?.startsWith(prefijo))
        .reduce(
            (maximo, pedido) => Math.max(
                maximo,
                Number(pedido.folio.slice(prefijo.length)) || 0,
            ),
            0,
        ) + 1;

    let folio = `${prefijo}${String(consecutivo).padStart(4, "0")}`;
    while (pedidos.some((pedido) => pedido.folio === folio)) {
        consecutivo += 1;
        folio = `${prefijo}${String(consecutivo).padStart(4, "0")}`;
    }
    return folio;
}

function movimiento(tipo, descripcion, datos = {}) {
    return {
        id: uuid("movimiento"),
        fecha: new Date().toISOString(),
        tipo,
        descripcion,
        ...datos,
    };
}

export function obtenerPedidos() {
    return leerLista(CLAVE_PEDIDOS);
}

export function obtenerPedido(id) {
    return obtenerPedidos().find(
        (pedido) => String(pedido.id) === String(id),
    ) ?? null;
}

function guardarNuevoPedido(datos, token) {
    try {
        const pedidos = obtenerPedidos();
        const duplicadoToken = pedidos.find(
            (pedido) => token && pedido.tokenRegistro === token,
        );
        if (duplicadoToken) {
            return { exito: true, pedido: duplicadoToken, duplicado: true };
        }

        if (datos.claveOrigen) {
            const duplicadoOrigen = pedidos.find(
                (pedido) => pedido.claveOrigen === datos.claveOrigen
                    && pedido.estado !== "Entregado",
            );
            if (duplicadoOrigen) {
                return {
                    exito: false,
                    pedido: duplicadoOrigen,
                    duplicado: true,
                    mensaje: `Ya existe el pedido activo ${duplicadoOrigen.folio} para estos productos.`,
                };
            }
        }

        const fechaCreacion = new Date().toISOString();
        const pedido = {
            ...datos,
            id: uuid(),
            folio: siguienteFolio(pedidos, fechaCreacion),
            fechaCreacion,
            fechaActualizacion: fechaCreacion,
            estado: "Pendiente",
            tokenRegistro: token,
            historial: [
                movimiento(
                    "creacion",
                    datos.origen === "venta"
                        ? `Pedido generado desde la venta ${datos.venta?.folio ?? ""}.`
                        : "Pedido registrado manualmente.",
                    { estadoNuevo: "Pendiente" },
                ),
            ],
        };

        pedidos.push(pedido);
        if (!guardarLista(CLAVE_PEDIDOS, pedidos)) {
            return { exito: false, pedido: null, duplicado: false };
        }
        return { exito: true, pedido, duplicado: false };
    } catch (error) {
        console.error("No fue posible registrar el pedido:", error);
        return { exito: false, pedido: null, duplicado: false };
    }
}

export function registrarPedidoManual(datos, token) {
    return guardarNuevoPedido({
        origen: "manual",
        venta: null,
        claveOrigen: null,
        ...datos,
    }, token);
}

export function registrarPedidoDesdeVenta(venta, partidas, datos, token) {
    const identificadores = partidas
        .map((partida) => String(partida.partidaId))
        .sort();

    return guardarNuevoPedido({
        origen: "venta",
        venta: {
            id: venta.id,
            folio: venta.folio,
        },
        cliente: {
            tipo: venta.cliente?.tipo ?? "publico",
            id: venta.cliente?.id ?? null,
            folio: venta.cliente?.folio ?? null,
            nombre: venta.cliente?.nombre ?? "Público general",
            telefono: venta.cliente?.telefono ?? null,
        },
        items: partidas.map((partida) => ({
            partidaId: partida.partidaId,
            productoId: partida.productoId ?? null,
            codigo: partida.codigo ?? null,
            descripcion: partida.descripcion,
            cantidad: partida.cantidad,
        })),
        claveOrigen: `venta:${venta.id}:${identificadores.join(",")}`,
        ...datos,
    }, token);
}

export function actualizarDatosPedido(id, cambios, descripcion) {
    const pedidos = obtenerPedidos();
    const indice = pedidos.findIndex(
        (pedido) => String(pedido.id) === String(id),
    );
    if (indice < 0 || pedidos[indice].estado === "Entregado") return null;

    const actual = pedidos[indice];
    const actualizado = {
        ...actual,
        ...cambios,
        id: actual.id,
        folio: actual.folio,
        origen: actual.origen,
        venta: actual.venta,
        cliente: actual.cliente,
        claveOrigen: actual.claveOrigen,
        fechaCreacion: actual.fechaCreacion,
        fechaActualizacion: new Date().toISOString(),
        historial: [
            ...(actual.historial ?? []),
            movimiento("edicion", descripcion || "Se actualizaron los datos operativos del pedido."),
        ],
    };
    pedidos[indice] = actualizado;
    return guardarLista(CLAVE_PEDIDOS, pedidos) ? actualizado : null;
}

export function cambiarEstadoPedido(id, estadoNuevo, observacion = "", permitirReapertura = false) {
    const pedidos = obtenerPedidos();
    const indice = pedidos.findIndex(
        (pedido) => String(pedido.id) === String(id),
    );
    if (indice < 0) return null;

    const actual = pedidos[indice];
    const transiciones = {
        "Pendiente": "En laboratorio",
        "En laboratorio": "Listo",
        "Listo": "Entregado",
    };
    const transicionRegular = transiciones[actual.estado] === estadoNuevo;
    const reapertura = actual.estado === "Entregado"
        && estadoNuevo === "Listo"
        && permitirReapertura;
    if (!transicionRegular && !reapertura) return null;

    const ahora = new Date().toISOString();
    const actualizado = {
        ...actual,
        estado: estadoNuevo,
        fechaActualizacion: ahora,
        historial: [
            ...(actual.historial ?? []),
            movimiento(
                reapertura ? "reapertura" : "estado",
                reapertura
                    ? "El pedido entregado fue reabierto como Listo."
                    : `Estado cambiado de ${actual.estado} a ${estadoNuevo}.`,
                {
                    estadoAnterior: actual.estado,
                    estadoNuevo,
                    observacion: observacion.trim(),
                },
            ),
        ],
    };
    pedidos[indice] = actualizado;
    return guardarLista(CLAVE_PEDIDOS, pedidos) ? actualizado : null;
}

export function obtenerLaboratorios() {
    return leerLista(CLAVE_LABORATORIOS, LABORATORIOS_INICIALES);
}

export function registrarLaboratorio(nombre) {
    const laboratorios = obtenerLaboratorios();
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio || laboratorios.some(
        (laboratorio) => normalizar(laboratorio.nombre) === normalizar(nombreLimpio),
    )) return null;

    const laboratorio = {
        id: uuid("laboratorio"),
        nombre: nombreLimpio,
        activo: true,
    };
    laboratorios.push(laboratorio);
    return guardarLista(CLAVE_LABORATORIOS, laboratorios)
        ? laboratorio
        : null;
}

export function cambiarEstadoLaboratorio(id, activo) {
    const laboratorios = obtenerLaboratorios();
    const indice = laboratorios.findIndex(
        (laboratorio) => String(laboratorio.id) === String(id),
    );
    if (indice < 0) return null;
    laboratorios[indice] = { ...laboratorios[indice], activo: Boolean(activo) };
    return guardarLista(CLAVE_LABORATORIOS, laboratorios)
        ? laboratorios[indice]
        : null;
}
