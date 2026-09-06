import {
    renderResumenCliente,
} from "./render/resumen.js";


import {
    renderDatosCliente,
} from "./render/datosCliente.js";


import {
    renderHistorialClinico,
} from "./render/historialClinico.js";


/* ==========================================================
   SELECCIONAR CLIENTE
========================================================== */

export function seleccionarCliente(
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
       GUARDAR CLIENTE SELECCIONADO
    ====================================================== */

    inputBusqueda.value =
        cliente.nombre;


    inputBusqueda.dataset.clientId =
        cliente.id;


    /* ======================================================
       CERRAR RESULTADOS
    ====================================================== */

    ocultarResultados();


    /* ======================================================
       ACTUALIZAR SECCIONES
    ====================================================== */

    renderResumenCliente(
        cliente,
    );


    renderDatosCliente(
        cliente,
    );


    renderHistorialClinico(
        cliente,
    );


    /* ======================================================
       COMPROBACIÓN TEMPORAL
    ====================================================== */

    console.log(
        "Cliente seleccionado:",
        cliente,
    );

}