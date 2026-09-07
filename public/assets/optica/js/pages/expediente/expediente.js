import {
    inicializarBuscadorExpediente,
} from "./buscador.js";


import {
    inicializarEdicionExpediente,
} from "./edicion.js";


import {
    inicializarModalConsulta,
} from "./modal/modal.js";


import {
    inicializarDetalleConsultas,
} from "./modal/consulta.js";


/* ==========================================================
   EXPEDIENTE CLÍNICO
   Coordinador principal
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBuscadorExpediente();

        inicializarEdicionExpediente();

        inicializarModalConsulta();

        inicializarDetalleConsultas();

    },
);