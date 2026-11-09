import {
    obtenerEstadoFinanciero,
    totalMetodosCentavos,
    totalPagadoCentavos,
    totalReembolsadoCentavos,
} from "./dinero.js";
import {
    aplicarSalidaVenta,
    reintegrarDevolucion,
    sincronizarSalidaVenta,
} from "../inventario/almacenamiento.js";

const CLAVE_VENTAS = "opticool_ventas_simuladas";
const CLAVE_ROL = "opticool_ventas_rol";

function uuid() {
    return globalThis.crypto?.randomUUID?.() ?? `sim-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escribirVentas(ventas) {
    localStorage.setItem(CLAVE_VENTAS, JSON.stringify(ventas));
}

function leerVentasDesde(almacenamiento) {
    try {
        const contenido = almacenamiento.getItem(CLAVE_VENTAS);
        if (contenido === null) return { presente: false, valido: false, ventas: [] };
        const ventas = JSON.parse(contenido);
        return Array.isArray(ventas)
            ? { presente: true, valido: true, ventas }
            : { presente: true, valido: false, ventas: [] };
    } catch (error) {
        console.error("No fue posible leer las ventas simuladas:", error);
        return { presente: true, valido: false, ventas: [] };
    }
}

function obtenerVentasPersistidas() {
    const locales = leerVentasDesde(localStorage);
    if (locales.valido) return { ...locales, hayDatosPrevios: true };

    const sesion = leerVentasDesde(sessionStorage);
    if (sesion.valido) {
        try {
            escribirVentas(sesion.ventas);
            return { presente: true, valido: true, ventas: sesion.ventas, hayDatosPrevios: true };
        } catch (error) {
            console.error("No fue posible migrar las ventas simuladas a localStorage:", error);
            return { ...sesion, hayDatosPrevios: true };
        }
    }

    return {
        presente: locales.presente,
        valido: false,
        ventas: [],
        hayDatosPrevios: locales.presente || sesion.presente,
    };
}

export function obtenerVentas() {
    return obtenerVentasPersistidas().ventas;
}

export function obtenerVenta(id) {
    return obtenerVentas().find((venta) => String(venta.id) === String(id)) ?? null;
}

function siguienteFolio(ventas, fecha) {
    const anio = Number(String(fecha).slice(0, 4)) || new Date().getFullYear();
    const prefijo = `V-${anio}-`;
    const consecutivo = ventas
        .filter((venta) => venta.folio?.startsWith(prefijo))
        .reduce((maximo, venta) => Math.max(maximo, Number(venta.folio.slice(prefijo.length)) || 0), 0) + 1;
    return `${prefijo}${String(consecutivo).padStart(4, "0")}`;
}

export function guardarVenta(datos, token) {
    try {
        const ventas = obtenerVentas();
        const duplicada = ventas.find((venta) => venta.tokenGuardado === token);
        if (duplicada) return { exito: true, venta: duplicada, duplicada: true };
        const ahora = new Date().toISOString();
        const venta = {
            ...datos,
            id: uuid(),
            folio: siguienteFolio(ventas, datos.fecha),
            tokenGuardado: token,
            fechaRegistro: ahora,
            fechaActualizacion: ahora,
            cancelacion: null,
            reembolsos: [],
            devoluciones: [],
        };
        venta.pagos = (datos.pagos ?? []).map((pago) => ({ ...pago, id: uuid(), fecha: ahora }));
        const inventario = aplicarSalidaVenta(venta);
        if (!inventario.exito) return { exito: false, venta: null, mensaje: inventario.mensaje };
        venta.inventarioAplicado = true;
        ventas.push(venta);
        escribirVentas(ventas);
        return { exito: true, venta, duplicada: false };
    } catch (error) {
        console.error("No fue posible guardar la venta simulada:", error);
        return { exito: false, venta: null };
    }
}

export function actualizarVenta(id, cambios, validar = () => true) {
    const ventas = obtenerVentas();
    const indice = ventas.findIndex((venta) => String(venta.id) === String(id));
    if (indice < 0 || !validar(ventas[indice])) return { exito: false, venta: null };
    const resultado = typeof cambios === "function" ? cambios(ventas[indice]) : cambios;
    if (!resultado) return { exito: false, venta: null };
    const actualizada = { ...ventas[indice], ...resultado, id: ventas[indice].id, folio: ventas[indice].folio, fechaActualizacion: new Date().toISOString() };
    if (ventas[indice].inventarioAplicado && JSON.stringify(ventas[indice].partidas) !== JSON.stringify(actualizada.partidas)) {
        const inventario = sincronizarSalidaVenta(ventas[indice], actualizada);
        if (!inventario.exito) return { exito: false, venta: null, mensaje: inventario.mensaje };
    }
    ventas[indice] = actualizada;
    escribirVentas(ventas);
    return { exito: true, venta: ventas[indice] };
}

export function agregarPago(id, metodos, referencia = "") {
    const resultado = actualizarVenta(id, (venta) => {
        const importeCentavos = totalMetodosCentavos(metodos);
        const saldo = obtenerEstadoFinanciero(venta).saldoCentavos;
        if (venta.cancelacion || importeCentavos <= 0 || importeCentavos > saldo) return null;
        return {
            ...venta,
            pagos: [...(venta.pagos ?? []), {
                id: uuid(),
                fecha: new Date().toISOString(),
                importeCentavos,
                metodos,
                referencia,
                saldoResultanteCentavos: saldo - importeCentavos,
            }],
        };
    }, (venta) => !venta.cancelacion);
    return resultado.venta;
}

export function cambiarEntrega(id, estado) {
    const permitidos = ["Pendiente", "En preparación", "Lista para entregar", "Entregada"];
    if (!permitidos.includes(estado)) return null;
    const resultado = actualizarVenta(id, { estadoEntrega: estado });
    return resultado.venta;
}

export function cancelarVenta(id, motivo) {
    if (!motivo.trim()) return null;
    return actualizarVenta(id, {
        cancelacion: { motivo: motivo.trim(), fecha: new Date().toISOString() },
    }, (venta) => !venta.cancelacion).venta;
}

export function registrarReembolso(id, datos) {
    const venta = obtenerVenta(id);
    if (!venta || !venta.cancelacion && datos.requiereCancelacion) return null;
    const disponible = totalPagadoCentavos(venta) - totalReembolsadoCentavos(venta)
        - (venta.reembolsos ?? []).filter((r) => r.estado === "pendiente").reduce((t, r) => t + r.importeCentavos, 0);
    if (datos.importeCentavos <= 0 || datos.importeCentavos > disponible) return null;
    return actualizarVenta(id, {
        reembolsos: [...(venta.reembolsos ?? []), { ...datos, id: uuid(), fecha: new Date().toISOString() }],
    }).venta;
}

export function registrarDevolucion(id, datos) {
    const venta = obtenerVenta(id);
    if (!venta || venta.cancelacion || datos.cantidad <= 0 || datos.importeCentavos < 0) return null;
    const devuelta = (venta.devoluciones ?? [])
        .filter((d) => d.partidaId === datos.partidaId)
        .reduce((total, d) => total + d.cantidad, 0);
    const partida = venta.partidas.find((item) => item.id === datos.partidaId);
    if (!partida || devuelta + datos.cantidad > partida.cantidad) return null;
    const devolucion = { ...datos, id: uuid(), fecha: new Date().toISOString() };
    const actualizada = actualizarVenta(id, {
        devoluciones: [...(venta.devoluciones ?? []), devolucion],
    }).venta;
    if (actualizada) reintegrarDevolucion(actualizada, devolucion);
    return actualizada;
}

export function obtenerRol() {
    return sessionStorage.getItem(CLAVE_ROL) === "administrador" ? "administrador" : "ventas";
}

export function guardarRol(rol) {
    sessionStorage.setItem(CLAVE_ROL, rol === "administrador" ? "administrador" : "ventas");
}

export function inicializarVentasDemo() {
    const persistidas = obtenerVentasPersistidas();
    if (persistidas.valido || persistidas.hayDatosPrevios) return;
    const anio = new Date().getFullYear();
    const ahora = new Date().toISOString();
    const base = {
        fecha: ahora.slice(0, 10), responsable: "Laura Gómez", consultaId: null,
        descuentoGeneralTipo: "importe", descuentoGeneralValor: 0,
        cancelacion: null, reembolsos: [], devoluciones: [], fechaRegistro: ahora, fechaActualizacion: ahora,
    };
    const demo = [
        {
            ...base, id: uuid(), folio: `V-${anio}-0001`, tokenGuardado: "demo-1",
            cliente: { tipo: "registrado", id: 24, nombre: "María López Hernández", folio: "CLI-0001", telefono: "55 1234 5678" },
            partidas: [{ id: uuid(), tipo: "catalogo", productoId: "ARM-RB-2140", codigo: "RB-2140", descripcion: "Armazón Ray-Ban clásico", cantidad: 1, precioCentavos: 285000, descuentoTipo: "importe", descuentoValor: 0, brutoCentavos: 285000, descuentoCentavos: 0, importeCentavos: 285000 }],
            subtotalCentavos: 285000, descuentoGeneralCentavos: 0, totalCentavos: 285000,
            pagos: [{ id: uuid(), fecha: ahora, importeCentavos: 160000, metodos: { efectivo: 160000, tarjeta: 0, transferencia: 0 }, referencia: "Anticipo", saldoResultanteCentavos: 125000 }],
            estadoEntrega: "En preparación",
        },
        {
            ...base, id: uuid(), folio: `V-${anio}-0002`, tokenGuardado: "demo-2", responsable: "Carlos Mendoza",
            cliente: { tipo: "registrado", id: 25, nombre: "Carlos Martínez Ruiz", folio: "CLI-0002", telefono: "55 8765 4321" },
            partidas: [{ id: uuid(), tipo: "catalogo", productoId: "MIC-PRO-220", codigo: "PRO-220", descripcion: "Micas progresivas", cantidad: 1, precioCentavos: 320000, descuentoTipo: "importe", descuentoValor: 0, brutoCentavos: 320000, descuentoCentavos: 0, importeCentavos: 320000 }],
            subtotalCentavos: 320000, descuentoGeneralCentavos: 0, totalCentavos: 320000,
            pagos: [{ id: uuid(), fecha: ahora, importeCentavos: 320000, metodos: { efectivo: 0, tarjeta: 320000, transferencia: 0 }, referencia: "Pago completo", saldoResultanteCentavos: 0 }],
            estadoEntrega: "Entregada",
        },
    ];
    escribirVentas(demo);
}

