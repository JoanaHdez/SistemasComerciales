function crearCita(
    fecha,
    numero,
    hora,
    cliente,
    motivo,
    estado,
    responsableId = null
) {
    return {
        id: `${fecha}-${numero}`,
        hora,
        cliente,
        motivo,
        estado,
        responsableId,
    };
}


export function obtenerCitasBase(fecha) {
    const numeroDia = Number(fecha.split("-")[2]);

    if (numeroDia % 5 === 0) {
        return [
            crearCita(
                fecha,
                1,
                "09:00",
                "María Hernández",
                "Examen visual",
                "Confirmada",
            ),

            crearCita(
                fecha,
                2,
                "10:30",
                "Daniel Ortega",
                "Consulta inicial",
                "En espera",
            ),

            crearCita(
                fecha,
                3,
                "12:00",
                "José Ramírez",
                "Ajuste de graduación",
                "Pendiente",
            ),

            crearCita(
                fecha,
                4,
                "14:30",
                "Fernanda Cruz",
                "Revisión de armazón",
                "Confirmada",
            ),

            crearCita(
                fecha,
                5,
                "16:00",
                "Ana López",
                "Entrega de lentes",
                "Confirmada",
            ),
        ];
    }

    if (numeroDia % 3 === 0) {
        return [
            crearCita(
                fecha,
                1,
                "09:00",
                "María Hernández",
                "Examen visual",
                "Confirmada",
            ),

            crearCita(
                fecha,
                2,
                "11:30",
                "José Ramírez",
                "Ajuste de graduación",
                "Pendiente",
            ),

            crearCita(
                fecha,
                3,
                "16:00",
                "Ana López",
                "Entrega de lentes",
                "Confirmada",
            ),
        ];
    }

    if (numeroDia % 2 === 0) {
        return [
            crearCita(
                fecha,
                1,
                "10:00",
                "Carlos Martínez",
                "Consulta de seguimiento",
                "Confirmada",
            ),

            crearCita(
                fecha,
                2,
                "13:30",
                "Fernanda Cruz",
                "Revisión de armazón",
                "Pendiente",
            ),
        ];
    }

    return [];
}
