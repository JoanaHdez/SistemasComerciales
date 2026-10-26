
import {
    obtenerPacienteSeleccionadoNuevaCita
} from "./pacientes.js";

import {
    obtenerDisponibilidadSimulada
} from "./datos.js";

import {
    obtenerCitasGuardadas,
    guardarCitaSimulada
} from "./almacenamiento.js";


/* ==========================================================
   OPTICOOL
   Nueva cita - Validación y confirmación simulada
========================================================== */

export function inicializarFormularioNuevaCita() {

    const pagina = document.querySelector(
        ".new-appointment-page"
    );

    if (!pagina) {
        return;
    }

    const formulario = pagina.querySelector(
        ".new-appointment-form"
    );

    const inputFecha = pagina.querySelector(
        "#appointment-date"
    );

    const selectResponsable = pagina.querySelector(
        "#appointment-professional"
    );

    if (
        !formulario ||
        !inputFecha ||
        !selectResponsable
    ) {
        return;
    }


    /* ======================================================
       MENSAJES
    ====================================================== */

    const mensaje = document.createElement("div");

    mensaje.className = "new-appointment-form__message";
    mensaje.hidden = true;
    mensaje.setAttribute("role", "status");
    mensaje.setAttribute("aria-live", "polite");

    formulario.prepend(mensaje);


    function mostrarMensaje(texto, tipo = "error") {

        mensaje.textContent = texto;

        mensaje.dataset.tipo = tipo;

        mensaje.hidden = false;

        mensaje.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    function ocultarMensaje() {

        mensaje.hidden = true;
        mensaje.textContent = "";

    }


    /* ======================================================
       VALIDAR FECHA
    ====================================================== */

    function fechaValida(fecha) {

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return false;
        }

        const [anio, mes, dia] = fecha
            .split("-")
            .map(Number);

        const fechaLocal = new Date(
            anio,
            mes - 1,
            dia
        );

        if (
            fechaLocal.getFullYear() !== anio ||
            fechaLocal.getMonth() !== mes - 1 ||
            fechaLocal.getDate() !== dia
        ) {
            return false;
        }

        const hoy = new Date();

        const fechaActual = [
            hoy.getFullYear(),
            String(hoy.getMonth() + 1).padStart(2, "0"),
            String(hoy.getDate()).padStart(2, "0")
        ].join("-");

        return fecha >= fechaActual;

    }


    /* ======================================================
       VALIDAR FORMULARIO
    ====================================================== */

    function validarFormulario() {

        const paciente =
            obtenerPacienteSeleccionadoNuevaCita();

        if (!paciente) {

            return {
                valido: false,
                mensaje: "Selecciona un paciente para agendar la cita."
            };

        }

        const servicio = pagina.querySelector(
            'input[name="tipo_cita"]:checked'
        );

        if (!servicio) {

            return {
                valido: false,
                mensaje: "Selecciona el tipo de servicio."
            };

        }

        if (!fechaValida(inputFecha.value)) {

            return {
                valido: false,
                mensaje: "Selecciona una fecha válida que no sea anterior a hoy."
            };

        }

        if (!selectResponsable.value) {

            return {
                valido: false,
                mensaje: "Selecciona un responsable para la cita."
            };

        }

        const hora = pagina.querySelector(
            'input[name="hora"]:checked:not(:disabled)'
        );

        if (!hora) {

            return {
                valido: false,
                mensaje: "Selecciona un horario disponible."
            };

        }

        /* ======================================================
   VERIFICAR DISPONIBILIDAD ANTES DE CONFIRMAR
====================================================== */

        const disponibilidad = obtenerDisponibilidadSimulada(
            inputFecha.value,
            selectResponsable.value
        );

        const horarioDisponible = disponibilidad.some(
            (horario) => {

                return (
                    horario.hora === hora.value &&
                    horario.disponible === true
                );

            }
        );

        if (!horarioDisponible) {

            return {
                valido: false,
                mensaje:
                    "El horario seleccionado ya no está disponible. " +
                    "Selecciona otro horario para continuar."
            };

        }

        /* ======================================================
           VERIFICAR CITAS GUARDADAS EN LA SESIÓN
        ====================================================== */

        const citasGuardadas = obtenerCitasGuardadas();

        const horarioOcupado = citasGuardadas.some((cita) => {

            return (
                cita.fecha === inputFecha.value &&
                String(cita.responsableId) ===
                String(selectResponsable.value) &&
                cita.hora === hora.value &&
                cita.estado !== "Cancelada"
            );

        });

        if (horarioOcupado) {

            return {
                valido: false,
                mensaje:
                    "Este horario ya tiene una cita registrada. " +
                    "Selecciona otro horario para continuar."
            };

        }

        /* ======================================================
        VERIFICAR CITAS ORIGINALES DE AGENDA
        ====================================================== */

        let citasOriginalesAgenda = [];

        try {

            const datosAgenda = sessionStorage.getItem(
                "opticool_agenda_cambios_simulados"
            );

            if (datosAgenda) {

                const registros = JSON.parse(datosAgenda);

                if (Array.isArray(registros)) {

                    citasOriginalesAgenda = registros
                        .filter((registro) => {

                            return (
                                Array.isArray(registro) &&
                                registro.length === 2 &&
                                registro[1] &&
                                typeof registro[1] === "object"
                            );

                        })
                        .map(([id, cambios]) => {

                            return {
                                id,
                                ...cambios
                            };

                        });

                }

            }

        } catch (error) {

            console.error(
                "Error al recuperar las citas originales de Agenda:",
                error
            );

            return {
                valido: false,
                mensaje:
                    "No fue posible verificar la disponibilidad de Agenda. " +
                    "Inténtalo nuevamente."
            };

        }


        /* ======================================================
           VALIDAR CONFLICTOS CON AGENDA
        ====================================================== */

        const horarioOcupadoAgenda = citasOriginalesAgenda.some(
            (cita) => {

                return (
                    cita.fecha === inputFecha.value &&
                    cita.hora === hora.value &&
                    String(cita.responsableId) ===
                    String(selectResponsable.value) &&
                    cita.estado !== "Cancelada"
                );

            }
        );

        if (horarioOcupadoAgenda) {

            return {
                valido: false,
                mensaje:
                    "Este horario ya está ocupado por una cita de Agenda. " +
                    "Selecciona otro horario para continuar."
            };

        }

        return {
            valido: true,
            datos: {
                pacienteId: paciente.id,
                pacienteNombre: paciente.nombre,
                pacienteFolio: paciente.folio,
                tipoCita: servicio.value,
                fecha: inputFecha.value,
                responsableId: Number(
                    selectResponsable.value
                ),
                hora: hora.value,
                observaciones: pagina.querySelector(
                    "#appointment-notes"
                )?.value.trim() || ""
            }
        };

    }


    /* ======================================================
       CONFIRMAR CITA SIMULADA
    ====================================================== */

    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        ocultarMensaje();

        const resultado = validarFormulario();

        if (!resultado.valido) {

            mostrarMensaje(
                resultado.mensaje,
                "error"
            );

            return;

        }

        /* ======================================================
        GUARDAR CITA SIMULADA
        ====================================================== */

        const guardado = guardarCitaSimulada(
            resultado.datos
        );

        if (!guardado.exito) {

            mostrarMensaje(
                "No fue posible guardar la cita simulada. Inténtalo nuevamente.",
                "error"
            );

            return;

        }

        console.log(
            "Opticool - Cita guardada temporalmente:",
            guardado.cita
        );

        mostrarMensaje(
            "¡Cita registrada correctamente! Se guardó temporalmente para las pruebas del frontend.",
            "exito"
        );

    });


    /* ======================================================
   OCULTAR MENSAJES AL MODIFICAR EL FORMULARIO
====================================================== */

    // Cambios en fechas, responsables, servicios y horarios.
    pagina.addEventListener(
        "change",
        ocultarMensaje
    );

    // Cambios mientras se escribe en los campos.
    pagina.addEventListener(
        "input",
        ocultarMensaje
    );

    // Selección o cambio de paciente.
    pagina.addEventListener("click", (evento) => {

        if (
            evento.target.closest(
                ".new-appointment-search__result"
            ) ||
            evento.target.closest(
                ".new-appointment-patient__change"
            )
        ) {
            ocultarMensaje();
        }

    });

}
