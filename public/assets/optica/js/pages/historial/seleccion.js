import {
    establecerClienteActual,
} from "./clienteActual.js";


import {
    renderPaciente,
} from "./render/paciente.js";


import {
    renderTimeline,
} from "./render/timeline.js";


import {
    reiniciarFiltrosHistorial,
} from "./filtros.js";


/* ==========================================================
   SELECCIONAR PACIENTE
========================================================== */

export function seleccionarPaciente(
    cliente,
    inputBusqueda,
    ocultarResultados,
) {

    if (
        !cliente ||
        !inputBusqueda
    ) {

        return;

    }


    /* ======================================================
       ESTABLECER PACIENTE ACTUAL
    ====================================================== */

    establecerClienteActual(
        cliente,
    );


    /* ======================================================
       ACTUALIZAR BUSCADOR
    ====================================================== */

    inputBusqueda.value =
        cliente.nombre;


    inputBusqueda.dataset.clientId =
        cliente.id;


    inputBusqueda.setAttribute(
        "aria-expanded",
        "false",
    );


    /* ======================================================
       CERRAR RESULTADOS
    ====================================================== */

    if (
        typeof ocultarResultados ===
        "function"
    ) {

        ocultarResultados();

    }


    /* ======================================================
       REINICIAR FILTROS
    ====================================================== */

    reiniciarFiltrosHistorial();


    /* ======================================================
       ACTUALIZAR PACIENTE
    ====================================================== */

    renderPaciente(
        cliente,
    );


    /* ======================================================
       ACTUALIZAR TIMELINE
    ====================================================== */

    renderTimeline(
        cliente,
    );

}