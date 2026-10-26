export const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];


export function crearIndicadoresCitas(cantidad) {
    const cantidadVisible = Math.min(cantidad, 3);

    const puntos = Array.from(
        {
            length: cantidadVisible,
        },
        () => {
            return `
                <span class="agenda-day__dot"></span>
            `;
        },
    ).join("");

    const adicionales =
        cantidad > 3
            ? `
                <span class="agenda-day__more">
                    +${cantidad - 3}
                </span>
            `
            : "";

    return `
        <span class="agenda-day__indicators">
            ${puntos}
            ${adicionales}
        </span>
    `;
}


export function obtenerCodigoServicio(nombreServicio) {

    const servicios = {
        "consulta general": "consulta-general",
        "seguimiento": "seguimiento",
        "entrega de lentes": "entrega",
        "ajuste de armazón": "ajuste",
        "garantía": "garantia"
    };

    const nombreNormalizado = String(nombreServicio || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const servicioEncontrado = Object.entries(servicios).find(
        ([nombre]) => {

            const nombreCatalogo = nombre
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            return nombreCatalogo === nombreNormalizado;

        }
    );

    return servicioEncontrado
        ? servicioEncontrado[1]
        : null;

}


export function obtenerClaseEstado(estado) {
    const estadoNormalizado = estado
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const clases = {
        confirmada: "agenda-appointment__status--confirmed",
        pendiente: "agenda-appointment__status--pending",
        "en espera": "agenda-appointment__status--waiting",
        cancelada: "agenda-appointment__status--cancelled",
        atendida: "agenda-appointment__status--completed",
        reagendada: "agenda-appointment__status--rescheduled",
    };

    return clases[estadoNormalizado] ?? "agenda-appointment__status--default";
}


export function capitalizarTexto(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}


export function crearFechaLocal(anio, mes, dia) {
    const mesFormateado = String(mes + 1).padStart(2, "0");

    const diaFormateado = String(dia).padStart(2, "0");

    return `${anio}-${mesFormateado}-${diaFormateado}`;
}
