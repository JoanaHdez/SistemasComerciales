
/* ==========================================================
   OPTICOOL
   Página: Nueva cita
   Coordinador principal
========================================================== */

import {
    inicializarPacientesNuevaCita
} from "./pacientes.js";

import {
    inicializarHorariosNuevaCita
} from "./horarios.js";

import {
    inicializarResumenNuevaCita
} from "./resumen.js";

import {
    inicializarFormularioNuevaCita
} from "./formulario.js";

import {
    inicializarProgresoNuevaCita
} from "./progreso.js";


function inicializarNuevaCita() {

    const pagina = document.querySelector(
        ".new-appointment-page"
    );

    if (!pagina) {
        return;
    }

    inicializarPacientesNuevaCita();

    inicializarHorariosNuevaCita();

    inicializarResumenNuevaCita();

    inicializarFormularioNuevaCita();

    inicializarProgresoNuevaCita();

    console.log(
        "Opticool: módulo Nueva cita inicializado correctamente."
    );

}


/* ==========================================================
   INICIALIZACIÓN
========================================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarNuevaCita
    );

} else {

    inicializarNuevaCita();

}
