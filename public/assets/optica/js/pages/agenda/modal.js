import {
    guardarCambiosAgenda
} from "./almacenamiento.js";

import {
    validarCitaOriginal,
    validarCitaRegistrada,
    validarProfesionalCitaOriginal
} from "./validaciones.js";


export function crearModalCitas(contexto) {

    function prepararModalCita(cita, modo) {
        if (
            !contexto.appointmentModalTitle ||
            !contexto.appointmentId ||
            !contexto.appointmentMode ||
            !contexto.appointmentClient ||
            !contexto.appointmentProfessional ||
            !contexto.appointmentDate ||
            !contexto.appointmentTime ||
            !contexto.appointmentStatus ||
            !contexto.appointmentReason ||
            !contexto.appointmentSave
        ) {
            console.error(
                "No se encontraron los campos del modal de cita."
            );

            return;
        }

        contexto.appointmentId.value = cita.id;

        contexto.appointmentMode.value = modo;

        contexto.appointmentClient.value = cita.cliente;

        contexto.appointmentTime.value = cita.hora;

        contexto.appointmentStatus.value = cita.estado;

        contexto.appointmentReason.value = cita.motivo;

        const diaSeleccionado = contexto.grid.querySelector(
            ".agenda-day--selected"
        );

        contexto.appointmentDate.value =
            cita.fecha ||
            diaSeleccionado?.dataset.date ||
            "";

        const citaRegistrada = contexto.obtenerCitasGuardadas().find(
            registro =>
                String(registro.id) === String(cita.id)
        );

        const cambiosOriginales = contexto.cambiosCitas.get(cita.id);

        const responsableId =
            citaRegistrada?.responsableId ??
            cambiosOriginales?.responsableId ??
            cita.responsableId ??
            null;

        contexto.appointmentProfessional.value =
            responsableId === null ||
                responsableId === undefined
                ? ""
                : String(responsableId);

        contexto.appointmentClient.disabled = false;

        contexto.appointmentProfessional.disabled = false;

        contexto.appointmentDate.disabled = false;

        contexto.appointmentTime.disabled = false;

        contexto.appointmentStatus.disabled = false;

        contexto.appointmentReason.disabled = false;

        contexto.appointmentSave.hidden = false;

        if (modo === "view") {
            contexto.appointmentModalTitle.textContent =
                "Detalles de la cita";

            contexto.appointmentClient.disabled = true;

            contexto.appointmentProfessional.disabled = true;

            contexto.appointmentDate.disabled = true;

            contexto.appointmentTime.disabled = true;

            contexto.appointmentStatus.disabled = true;

            contexto.appointmentReason.disabled = true;

            contexto.appointmentSave.hidden = true;
        }

        if (modo === "edit") {
            contexto.appointmentModalTitle.textContent =
                "Editar cita";

            contexto.appointmentSave.textContent =
                "Guardar cambios";

            if (citaRegistrada) {
                contexto.appointmentProfessional.disabled = true;
            }
        }

        if (modo === "reschedule") {
            contexto.appointmentModalTitle.textContent =
                "Reagendar cita";

            contexto.appointmentClient.disabled = true;

            contexto.appointmentStatus.disabled = true;

            contexto.appointmentReason.disabled = true;

            contexto.appointmentSave.textContent =
                "Reagendar cita";

            if (citaRegistrada) {
                contexto.appointmentProfessional.disabled = true;
            }
        }

        contexto.appointmentProfessional.dispatchEvent(
            new Event("custom-select:sync")
        );

        contexto.appointmentModal.open();
    }


    function cancelarCita(cita) {

        if (cita.estado === "Cancelada") {
            window.alert("Esta cita ya se encuentra cancelada.");
            return;
        }

        const confirmar = window.confirm(
            `¿Deseas cancelar la cita de ${cita.cliente}?`
        );

        if (!confirmar) {
            return;
        }

        const diaSeleccionado = contexto.grid.querySelector(
            ".agenda-day--selected"
        );

        if (!diaSeleccionado) {
            return;
        }

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        const citaGuardada = contexto.obtenerCitasGuardadas().find(
            (registro) => String(registro.id) === String(cita.id)
        );

        if (citaGuardada) {
            const resultado = contexto.actualizarCitaSimulada(
                cita.id,
                {
                    estado: "Cancelada"
                }
            );

            if (!resultado.exito) {
                window.alert(
                    "No fue posible cancelar la cita. Inténtalo nuevamente."
                );

                return;
            }

        } else {
            const cambiosAnteriores =
                contexto.cambiosCitas.get(cita.id) ?? {};

            contexto.cambiosCitas.set(cita.id, {
                ...cambiosAnteriores,

                cliente:
                    cambiosAnteriores.cliente ?? cita.cliente,

                hora:
                    cambiosAnteriores.hora ?? cita.hora,

                motivo:
                    cambiosAnteriores.motivo ?? cita.motivo,

                estado: "Cancelada",

                fechaOriginal:
                    cambiosAnteriores.fechaOriginal ??
                    fechaSeleccionada,

                fecha:
                    cambiosAnteriores.fecha ??
                    fechaSeleccionada
            });

            guardarCambiosAgenda(contexto.cambiosCitas);
        }

        contexto.calendario.renderizarCalendario();

        const diaActual = contexto.grid.querySelector(
            `[data-date="${fechaSeleccionada}"]`
        );

        if (diaActual) {
            contexto.calendario.seleccionarDia(diaActual);
        }
    }


    function ejecutarAccionCita(accion, cita) {
        switch (accion) {
            case "view":
                prepararModalCita(cita, "view");
                break;

            case "edit":
                prepararModalCita(cita, "edit");
                break;

            case "reschedule":
                prepararModalCita(cita, "reschedule");
                break;

            case "cancel":
                cancelarCita(cita);
                break;

            default:
                console.warn("La acción seleccionada no existe.");
        }
    }


    function guardarCita(event) {
        event.preventDefault();

        const idCita = contexto.appointmentId.value;

        const modo = contexto.appointmentMode.value;

        if (!idCita) {
            console.error("No se encontró el ID de la cita.");

            return;
        }

        const diaSeleccionado = contexto.grid.querySelector(
            ".agenda-day--selected"
        );

        if (!diaSeleccionado) {
            return;
        }

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        const citaRegistradaAnterior = contexto.obtenerCitasGuardadas().find(
            (cita) => String(cita.id) === String(idCita)
        );

        const cambiosAnteriores = contexto.cambiosCitas.get(idCita);

        const fechaOriginal = citaRegistradaAnterior
            ? fechaSeleccionada
            : (
                cambiosAnteriores?.fechaOriginal ||
                fechaSeleccionada
            );

        const nuevaFecha =
            contexto.appointmentDate.value || fechaSeleccionada;

        const cambios = {
            cliente: contexto.appointmentClient.value.trim(),
            hora: contexto.appointmentTime.value,
            estado: contexto.appointmentStatus.value,
            motivo: contexto.appointmentReason.value.trim(),
            fechaOriginal,
            fecha: nuevaFecha,

            responsableId: contexto.appointmentProfessional.value
                ? Number(contexto.appointmentProfessional.value)
                : null
        };

        if (modo === "reschedule") {
            cambios.estado = "Reagendada";
        }

        const citaRegistrada = contexto.obtenerCitasGuardadas().find(
            (cita) => String(cita.id) === String(idCita)
        );

        console.log(
            "Opticool - Origen de la cita:",
            citaRegistrada
                ? "Nueva cita (sessionStorage)"
                : "Agenda (datos simulados)"
        );

        if (!validarProfesionalCitaOriginal(
            citaRegistrada,
            cambios,
            contexto.appointmentProfessional
        )) {
            return;
        }

        if (citaRegistrada) {
            const codigoServicio = validarCitaRegistrada(
                citaRegistrada,
                idCita,
                cambios,
                contexto.obtenerCitasGuardadas,
                contexto.obtenerDisponibilidadSimulada
            );

            if (!codigoServicio) {
                return;
            }

            const cambiosRegistro = {
                pacienteNombre: cambios.cliente,
                fecha: cambios.fecha,
                hora: cambios.hora,
                estado: cambios.estado,
                tipoCita: codigoServicio
            };

            const resultado = contexto.actualizarCitaSimulada(
                idCita,
                cambiosRegistro
            );

            if (!resultado.exito) {
                window.alert(
                    "No fue posible actualizar la cita registrada."
                );

                return;
            }

        } else {
            const citaValida = validarCitaOriginal(
                idCita,
                cambios,
                contexto.cambiosCitas,
                contexto.obtenerCitasGuardadas,
                contexto.citas.obtenerCitasSimuladas,
                contexto.obtenerDisponibilidadSimulada
            );

            if (!citaValida) {
                return;
            }

            contexto.cambiosCitas.set(idCita, cambios);

            const guardado = guardarCambiosAgenda(
                contexto.cambiosCitas
            );

            if (!guardado) {
                window.alert(
                    "No fue posible conservar los cambios de la cita."
                );

                return;
            }
        }

        contexto.appointmentModal.close();

        contexto.calendario.irAFecha(nuevaFecha);
    }


    function inicializarModalCitas() {
        contexto.appointmentForm?.addEventListener(
            "submit",
            guardarCita
        );
    }


    return {
        ejecutarAccionCita,
        inicializarModalCitas
    };
}
