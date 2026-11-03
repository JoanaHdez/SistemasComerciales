import { pacientes } from "../nueva_cita/datos.js";

export const clientesVenta = pacientes;

export const consultasVenta = [
    { id: "CONS-24-2026-07-22", pacienteId: 24, fecha: "2026-07-22", descripcion: "Actualización de graduación" },
    { id: "CONS-25-2026-08-18", pacienteId: 25, fecha: "2026-08-18", descripcion: "Actualización de graduación" },
    { id: "CONS-26-2026-08-05", pacienteId: 26, fecha: "2026-08-05", descripcion: "Seguimiento" },
];

export const catalogoVenta = [
    { id: "ARM-RB-2140", codigo: "RB-2140", nombre: "Armazón Ray-Ban clásico", categoria: "Armazones", precioCentavos: 285000, existencia: 4 },
    { id: "ARM-OPT-101", codigo: "OPT-101", nombre: "Armazón Opticool ligero", categoria: "Armazones", precioCentavos: 145000, existencia: 8 },
    { id: "MIC-AR-150", codigo: "AR-150", nombre: "Micas monofocales antirreflejantes", categoria: "Micas", precioCentavos: 180000, existencia: 12 },
    { id: "MIC-PRO-220", codigo: "PRO-220", nombre: "Micas progresivas", categoria: "Micas", precioCentavos: 320000, existencia: 6 },
    { id: "ACC-EST-01", codigo: "EST-01", nombre: "Estuche rígido", categoria: "Accesorios", precioCentavos: 25000, existencia: 20 },
    { id: "ACC-LIM-01", codigo: "LIM-01", nombre: "Kit de limpieza", categoria: "Accesorios", precioCentavos: 18000, existencia: 15 },
];

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

