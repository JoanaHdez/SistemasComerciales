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


document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBuscadorExpediente();

        inicializarEdicionExpediente();

        inicializarModalConsulta();

        inicializarDetalleConsultas();

    },
);