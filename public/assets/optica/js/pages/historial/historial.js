import {
    inicializarBuscadorPaciente,
} from "./buscador.js";


import {
    obtenerClienteActual,
} from "./clienteActual.js";


import {
    renderPaciente,
} from "./render/paciente.js";


import {
    renderTimeline,
} from "./render/timeline.js";


import {
    inicializarFiltrosHistorial,
} from "./filtros.js";


/* ==========================================================
   HISTORIAL CLÍNICO
   Coordinador principal
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ==================================================
           BUSCADOR DE PACIENTE
        ================================================== */

        inicializarBuscadorPaciente();


        /* ==================================================
           FILTROS DEL HISTORIAL
        ================================================== */

        inicializarFiltrosHistorial();


        /* ==================================================
           CLIENTE INICIAL
        ================================================== */

        const cliente =
            obtenerClienteActual();


        if (!cliente) {
            return;
        }


        renderPaciente(
            cliente,
        );


        renderTimeline(
            cliente,
        );

    },
);