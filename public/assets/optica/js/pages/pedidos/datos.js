import { clientesVenta } from "../ventas/datos.js";

export const clientesPedido = clientesVenta;

export const estadosPedido = [
    "Pendiente",
    "En laboratorio",
    "Listo",
    "Entregado",
];

export function normalizarTexto(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function escaparHtml(valor) {
    const nodo = document.createElement("div");
    nodo.textContent = String(valor ?? "");
    return nodo.innerHTML
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function fechaLocal(fecha = new Date()) {
    return [
        fecha.getFullYear(),
        String(fecha.getMonth() + 1).padStart(2, "0"),
        String(fecha.getDate()).padStart(2, "0"),
    ].join("-");
}

export function fechaLegible(valor, incluirHora = false) {
    if (!valor) return "—";
    const fecha = new Date(
        valor.length === 10 ? `${valor}T12:00:00` : valor,
    );
    if (Number.isNaN(fecha.getTime())) return "—";
    return new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        ...(incluirHora && valor.length !== 10 ? { timeStyle: "short" } : {}),
    }).format(fecha);
}

export function validarFecha(valor) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
    const fecha = new Date(`${valor}T00:00:00`);
    return !Number.isNaN(fecha.getTime()) && [
        fecha.getFullYear(),
        String(fecha.getMonth() + 1).padStart(2, "0"),
        String(fecha.getDate()).padStart(2, "0"),
    ].join("-") === valor;
}

export function validarItems(items) {
    if (!items.length) return "Agrega al menos un producto o trabajo.";
    for (const item of items) {
        if (!item.descripcion.trim()) {
            return "Escribe la descripción de todos los productos o trabajos.";
        }
        if (!Number.isInteger(Number(item.cantidad)) || Number(item.cantidad) <= 0) {
            return "Las cantidades deben ser números enteros mayores que cero.";
        }
    }
    return "";
}
