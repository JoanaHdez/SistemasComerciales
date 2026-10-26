import {
    obtenerCodigoServicio
} from "./utilidades.js";


export function validarProfesionalCitaOriginal(
    citaRegistrada,
    cambios,
    appointmentProfessional
) {
    if (!citaRegistrada && !cambios.responsableId) {
        window.alert(
            "Selecciona un profesional responsable para continuar."
        );

        appointmentProfessional.focus();

        return false;
    }

    return true;
}


export function validarCitaRegistrada(
    citaRegistrada,
    idCita,
    cambios,
    obtenerCitasGuardadas,
    obtenerDisponibilidadSimulada
) {
    const codigoServicio = obtenerCodigoServicio(
        cambios.motivo
    );

    if (!codigoServicio) {
        window.alert(
            "El servicio indicado no es válido. " +
            "Selecciona uno de los servicios disponibles."
        );

        return null;
    }

    const fechaCita = cambios.fecha;
    const horaCita = cambios.hora;

    const fechaValida =
        /^\d{4}-\d{2}-\d{2}$/.test(fechaCita) &&
        !Number.isNaN(
            new Date(`${fechaCita}T00:00:00`).getTime()
        ) &&
        new Date(`${fechaCita}T00:00:00`)
            .toLocaleDateString("en-CA") === fechaCita;

    if (!fechaValida) {
        window.alert("Selecciona una fecha válida.");
        return null;
    }

    const ahora = new Date();

    const fechaHoy = [
        ahora.getFullYear(),
        String(ahora.getMonth() + 1).padStart(2, "0"),
        String(ahora.getDate()).padStart(2, "0")
    ].join("-");

    if (fechaCita < fechaHoy) {
        window.alert(
            "No puedes reagendar una cita a una fecha anterior a hoy."
        );
        return null;
    }

    const horaValida = /^\d{2}:\d{2}$/.test(horaCita);

    if (!horaValida) {
        window.alert("Selecciona un horario válido.");
        return null;
    }

    const fechaHoraSeleccionada = new Date(
        `${fechaCita}T${horaCita}:00`
    );

    if (
        Number.isNaN(fechaHoraSeleccionada.getTime()) ||
        fechaHoraSeleccionada < ahora
    ) {
        window.alert(
            "No puedes reagendar una cita a un horario que ya pasó."
        );
        return null;
    }

    const horarioOcupado = obtenerCitasGuardadas().some(
        (otraCita) => {

            if (String(otraCita.id) === String(idCita)) {
                return false;
            }

            if (otraCita.estado === "Cancelada") {
                return false;
            }

            return (
                otraCita.fecha === fechaCita &&
                otraCita.hora === horaCita &&
                String(otraCita.responsableId) ===
                String(citaRegistrada.responsableId)
            );
        }
    );

    if (horarioOcupado) {
        window.alert(
            "Este horario ya está ocupado para el profesional seleccionado."
        );
        return null;
    }

    const disponibilidadSimulada = obtenerDisponibilidadSimulada(
        fechaCita,
        citaRegistrada.responsableId
    );

    const horarioSimulado = disponibilidadSimulada.find(
        (horario) => horario.hora === horaCita
    );

    if (!horarioSimulado) {
        window.alert(
            "El horario seleccionado no pertenece a los horarios disponibles."
        );

        return null;
    }

    if (!horarioSimulado.disponible) {
        window.alert(
            "Este horario no está disponible para el profesional seleccionado."
        );

        return null;
    }

    return codigoServicio;
}


export function validarCitaOriginal(
    idCita,
    cambios,
    cambiosCitas,
    obtenerCitasGuardadas,
    obtenerCitasSimuladas,
    obtenerDisponibilidadSimulada
) {
    const conflictoConCitaRegistrada = obtenerCitasGuardadas().some(
        (otraCita) => {

            if (otraCita.estado === "Cancelada") {
                return false;
            }

            return (
                otraCita.fecha === cambios.fecha &&
                otraCita.hora === cambios.hora &&
                String(otraCita.responsableId) ===
                String(cambios.responsableId)
            );
        }
    );

    if (conflictoConCitaRegistrada) {
        window.alert(
            "Este horario ya está ocupado para el profesional seleccionado."
        );

        return false;
    }

    const conflictoConCitaOriginal = obtenerCitasSimuladas(
        cambios.fecha
    ).some((otraCita) => {

        if (String(otraCita.id) === String(idCita)) {
            return false;
        }

        if (otraCita.estado === "Cancelada") {
            return false;
        }

        const esCitaRegistrada = obtenerCitasGuardadas().some(
            (registro) =>
                String(registro.id) === String(otraCita.id)
        );

        if (esCitaRegistrada) {
            return false;
        }

        const cambiosOtraCita = cambiosCitas.get(otraCita.id);

        const responsableOtraCita =
            cambiosOtraCita?.responsableId ??
            otraCita.responsableId ??
            null;

        return (
            otraCita.hora === cambios.hora &&
            responsableOtraCita !== null &&
            String(responsableOtraCita) ===
            String(cambios.responsableId)
        );
    });

    if (conflictoConCitaOriginal) {
        window.alert(
            "Ya existe otra cita de Agenda en este horario " +
            "para el profesional seleccionado."
        );

        return false;
    }

    const fechaCitaOriginal = cambios.fecha;
    const horaCitaOriginal = cambios.hora;

    const fechaConstruida = new Date(
        `${fechaCitaOriginal}T00:00:00`
    );

    const fechaValida =
        /^\d{4}-\d{2}-\d{2}$/.test(fechaCitaOriginal) &&
        !Number.isNaN(fechaConstruida.getTime()) &&
        [
            fechaConstruida.getFullYear(),
            String(fechaConstruida.getMonth() + 1).padStart(2, "0"),
            String(fechaConstruida.getDate()).padStart(2, "0")
        ].join("-") === fechaCitaOriginal;

    if (!fechaValida) {
        window.alert("Selecciona una fecha válida.");
        return false;
    }

    const horaValida = /^\d{2}:\d{2}$/.test(horaCitaOriginal);

    if (!horaValida) {
        window.alert("Selecciona un horario válido.");
        return false;
    }

    const fechaHoraCita = new Date(
        `${fechaCitaOriginal}T${horaCitaOriginal}:00`
    );

    if (
        Number.isNaN(fechaHoraCita.getTime()) ||
        fechaHoraCita < new Date()
    ) {
        window.alert(
            "No puedes guardar una cita en una fecha u horario que ya pasó."
        );

        return false;
    }

    const disponibilidadOriginal = obtenerDisponibilidadSimulada(
        cambios.fecha,
        cambios.responsableId
    );

    const horarioDisponibleOriginal = disponibilidadOriginal.find(
        (horario) => horario.hora === cambios.hora
    );

    if (!horarioDisponibleOriginal) {
        window.alert(
            "El horario seleccionado no pertenece a los horarios disponibles."
        );

        return false;
    }

    if (!horarioDisponibleOriginal.disponible) {
        window.alert(
            "Este horario no está disponible para el profesional seleccionado."
        );

        return false;
    }

    return true;
}
