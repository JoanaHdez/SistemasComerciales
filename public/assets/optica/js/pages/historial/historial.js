import {
    inicializarBuscadorPaciente,
} from "./buscador.js";


/* ==========================================================
   HISTORIAL CLÍNICO
   Coordinador principal
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBuscadorPaciente();

    },
);