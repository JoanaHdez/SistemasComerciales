import {
    inicializarBuscadorConsulta,
} from "./buscador.js";


/* ==========================================================
   CONSULTA
   Coordinador principal del módulo
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBuscadorConsulta();

    },
);