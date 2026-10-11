import {
    inicializarBuscadorPaciente
} from "./buscador.js";

import {
    obtenerClienteActual
} from "./clienteActual.js";

import {
    renderPaciente
} from "./render/paciente.js";

import {
    renderTimeline
} from "./render/timeline.js";

import {
    inicializarFiltrosHistorial
} from "./filtros.js";

import {
    inicializarModalConsulta
} from "./modal/modal.js";

import {
    inicializarDetalleConsultas
} from "./modal/consulta.js";

import {
    inicializarImpresionHistorial
} from "./impresion.js";


document.addEventListener("DOMContentLoaded", () => {

    inicializarBuscadorPaciente();

    inicializarFiltrosHistorial();

    inicializarModalConsulta();

    inicializarDetalleConsultas();

    inicializarImpresionHistorial();

    const cliente = obtenerClienteActual();

    if (!cliente) return;

    renderPaciente(cliente);

    renderTimeline(cliente);

});