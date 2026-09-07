import {
    establecerClienteActual,
} from "./clienteActual.js";


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

    ocultarResultados();


    /* ======================================================
       COMPROBACIÓN TEMPORAL

       Todavía NO actualizamos:
       - resumen del paciente
       - timeline
       - filtros
    ====================================================== */

    console.log(
        "Paciente seleccionado en Historial:",
        cliente,
    );

}