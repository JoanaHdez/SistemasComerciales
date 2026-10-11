
import {
    inicializarBuscadorNuevaConsulta
} from "./buscador.js";

import {
    inicializarDatosNuevaConsulta
} from "./datos_consulta.js";

import {
    inicializarGraduacionNuevaConsulta
} from "./graduacion.js";

import {
    inicializarAccionesNuevaConsulta
} from "./acciones.js";


/* ==========================================================
   INICIALIZACIÓN - NUEVA CONSULTA
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBuscadorNuevaConsulta();

        inicializarDatosNuevaConsulta();

        inicializarGraduacionNuevaConsulta();

        inicializarAccionesNuevaConsulta();

    }
);
