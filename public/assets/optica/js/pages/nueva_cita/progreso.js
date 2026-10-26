
/* ==========================================================
   OPTICOOL
   Nueva cita - Indicador dinámico de progreso
========================================================== */

import {
    obtenerPacienteSeleccionadoNuevaCita
} from "./pacientes.js";


/* ==========================================================
   INICIALIZAR PROGRESO
========================================================== */

export function inicializarProgresoNuevaCita() {

    const pagina = document.querySelector(
        ".new-appointment-page"
    );

    if (!pagina) {
        return;
    }

    const pasos = pagina.querySelectorAll(
        ".new-appointment-progress__step"
    );

    const inputFecha = pagina.querySelector(
        "#appointment-date"
    );

    const selectResponsable = pagina.querySelector(
        "#appointment-professional"
    );

    if (
        pasos.length !== 3 ||
        !inputFecha ||
        !selectResponsable
    ) {
        return;
    }


    /* ======================================================
       OBTENER PASO ACTUAL
    ====================================================== */

    function obtenerPasoActual() {

        const paciente =
            obtenerPacienteSeleccionadoNuevaCita();

        // PASO 1: PACIENTE

        if (!paciente) {
            return 1;
        }

        // PASO 2: HORARIO

        const servicio = pagina.querySelector(
            'input[name="tipo_cita"]:checked'
        );

        const horario = pagina.querySelector(
            'input[name="hora"]:checked:not(:disabled)'
        );

        if (
            !servicio ||
            !inputFecha.value ||
            !selectResponsable.value ||
            !horario
        ) {
            return 2;
        }

        // PASO 3: CONFIRMACIÓN

        return 3;

    }


    /* ======================================================
       ACTUALIZAR INDICADOR
    ====================================================== */

    function actualizarProgreso() {

        const pasoActual = obtenerPasoActual();

        pasos.forEach((paso, indice) => {

            const numeroPaso = indice + 1;

            const estaActivo =
                numeroPaso === pasoActual;

            paso.classList.toggle(
                "new-appointment-progress__step--active",
                estaActivo
            );

            if (estaActivo) {

                paso.setAttribute(
                    "aria-current",
                    "step"
                );

            } else {

                paso.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    /* ======================================================
       EVENTOS DEL FORMULARIO
    ====================================================== */

    pagina.addEventListener(
        "change",
        actualizarProgreso
    );


    /* ======================================================
       EVENTOS DE PACIENTES
    ====================================================== */

    pagina.addEventListener("click", (evento) => {

        const seleccionPaciente = evento.target.closest(
            ".new-appointment-search__result"
        );

        const cambiarPaciente = evento.target.closest(
            ".new-appointment-patient__change"
        );

        if (
            seleccionPaciente ||
            cambiarPaciente
        ) {

            // Esperar a que pacientes.js actualice
            // el paciente seleccionado.

            queueMicrotask(
                actualizarProgreso
            );

        }

    });


    /* ======================================================
       INICIALIZACIÓN
    ====================================================== */

    actualizarProgreso();

}
