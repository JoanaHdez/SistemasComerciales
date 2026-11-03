import { catalogoVenta } from "./datos.js";

export function obtenerProductoCatalogo(productoId, catalogo = catalogoVenta) {
    return catalogo.find((producto) => String(producto.id) === String(productoId)) ?? null;
}

export function validarInventarioPartidas(partidas, catalogo = catalogoVenta) {
    const totales = new Map();

    for (const partida of partidas) {
        const cantidad = Number(partida.cantidad);

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return {
                valido: false,
                mensaje: `La cantidad de ${partida.descripcion} debe ser un número entero mayor a cero.`,
            };
        }

        if (partida.tipo !== "catalogo") {
            continue;
        }

        const producto = obtenerProductoCatalogo(partida.productoId, catalogo);

        if (!producto) {
            return {
                valido: false,
                mensaje: `${partida.descripcion} ya no está disponible en el catálogo simulado.`,
            };
        }

        totales.set(producto.id, (totales.get(producto.id) ?? 0) + cantidad);
    }

    for (const [productoId, cantidad] of totales) {
        const producto = obtenerProductoCatalogo(productoId, catalogo);
        const existencia = Math.max(0, Number(producto.existencia) || 0);

        if (cantidad > existencia) {
            return {
                valido: false,
                mensaje: `Solo hay ${existencia} unidad${existencia === 1 ? "" : "es"} disponible${existencia === 1 ? "" : "s"} de ${producto.nombre}. Cantidad total solicitada: ${cantidad}.`,
                producto,
                existencia,
                cantidad,
            };
        }
    }

    return { valido: true, mensaje: "" };
}

