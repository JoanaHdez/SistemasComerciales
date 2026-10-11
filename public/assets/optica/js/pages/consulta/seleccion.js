
import { renderResumenCliente } from "./render/resumen.js";

import { renderDatosCliente } from "./render/datosCliente.js";

import { renderHistorialClinico } from "./render/historialClinico.js";

import { renderGraduacion } from "./render/graduacion.js";

import { renderConsultas } from "./render/consultas.js";


/* ==========================================================
   SELECCIONAR CLIENTE
========================================================== */

export function seleccionarCliente(
    cliente,
    inputBusqueda,
    ocultarResultados
) {

    if (!cliente || !inputBusqueda) {
        return;
    }


    inputBusqueda.value = cliente.nombre;

    inputBusqueda.dataset.clientId = cliente.id;

    ocultarResultados();


    /* ======================================================
       ACTUALIZAR FICHA
    ====================================================== */

    renderResumenCliente(cliente);

    renderDatosCliente(cliente);

    renderHistorialClinico(cliente);

    renderGraduacion(cliente);

    renderConsultas(cliente);


    /* ======================================================
       ACTUALIZAR ENLACE A EXPEDIENTE
    ====================================================== */

    const enlaceExpediente =
        document.getElementById(
            "consulta-editar-historial"
        );


    if (enlaceExpediente) {

        const url = new URL(
            enlaceExpediente.href
        );


        if (cliente.id != null) {

            url.searchParams.set(
                "paciente",
                String(cliente.id)
            );

        } else {

            url.searchParams.delete(
                "paciente"
            );

        }


        enlaceExpediente.href =
            url.toString();

    }


    /* ======================================================
       ACTUALIZAR ENLACE A HISTORIAL COMPLETO
    ====================================================== */

    const enlaceHistorial =
        document.getElementById(
            "consulta-ver-historial"
        );


    if (enlaceHistorial) {

        const url = new URL(
            enlaceHistorial.href
        );


        if (cliente.id != null) {

            url.searchParams.set(
                "paciente",
                String(cliente.id)
            );

        } else {

            url.searchParams.delete(
                "paciente"
            );

        }


        enlaceHistorial.href =
            url.toString();

    }


    console.log(
        "Cliente seleccionado:",
        cliente
    );

}
