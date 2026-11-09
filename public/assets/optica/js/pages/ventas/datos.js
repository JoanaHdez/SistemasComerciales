import { pacientes } from "../nueva_cita/datos.js";
import { obtenerProductosActivos } from "../inventario/almacenamiento.js";

export const clientesVenta = pacientes;

export const consultasVenta = [
    { id: "CONS-24-2026-07-22", pacienteId: 24, fecha: "2026-07-22", descripcion: "Actualización de graduación" },
    { id: "CONS-25-2026-08-18", pacienteId: 25, fecha: "2026-08-18", descripcion: "Actualización de graduación" },
    { id: "CONS-26-2026-08-05", pacienteId: 26, fecha: "2026-08-05", descripcion: "Seguimiento" },
];

export const catalogoVenta = obtenerProductosActivos();

export const responsablesVenta = ["Laura Gómez", "Carlos Mendoza"];

export function normalizarTexto(valor) {
    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

export function buscarClientesVenta(termino) {
    const consulta = normalizarTexto(termino);
    if (!consulta) return [];
    return clientesVenta.filter((cliente) =>
        [cliente.nombre, cliente.telefono, cliente.correo, cliente.folio]
            .some((valor) => normalizarTexto(valor).includes(consulta)),
    );
}

export function buscarCatalogoVenta(termino) {
    const consulta = normalizarTexto(termino);
    if (!consulta) return catalogoVenta;
    return catalogoVenta.filter((producto) =>
        [producto.nombre, producto.codigo, producto.categoria]
            .some((valor) => normalizarTexto(valor).includes(consulta)),
    );
}

