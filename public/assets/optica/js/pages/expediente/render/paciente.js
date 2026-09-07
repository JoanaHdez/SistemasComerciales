import {
    obtenerIniciales,
} from "../utilidades.js";


/* ==========================================================
   RENDER - RESUMEN DEL PACIENTE
========================================================== */

export function renderizarPaciente(cliente) {

    if (!cliente) {
        return;
    }


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const avatar =
        document.getElementById(
            "expediente-paciente-avatar",
        );


    const nombre =
        document.getElementById(
            "expediente-paciente-nombre",
        );


    const folio =
        document.getElementById(
            "expediente-paciente-folio",
        );


    const edad =
        document.getElementById(
            "expediente-paciente-edad",
        );


    const registro =
        document.getElementById(
            "expediente-paciente-registro",
        );


    const estado =
        document.getElementById(
            "expediente-paciente-estado",
        );


    const ultimaConsulta =
        document.getElementById(
            "expediente-paciente-ultima-consulta",
        );


    /* ======================================================
       VALIDACIÓN
    ====================================================== */

    if (
        !avatar ||
        !nombre ||
        !folio ||
        !edad ||
        !registro ||
        !estado ||
        !ultimaConsulta
    ) {

        console.error(
            "No se encontraron todos los elementos del resumen del paciente.",
        );

        return;

    }


    /* ======================================================
       RENDER
    ====================================================== */

    avatar.textContent =
        obtenerIniciales(
            cliente.nombre,
        );


    nombre.textContent =
        cliente.nombre;


    folio.textContent =
        cliente.folio;


    edad.textContent =
        `${cliente.resumen.edad} años`;


    registro.textContent =
        cliente.resumen.fechaRegistro;


    estado.textContent =
        cliente.resumen.estado;


    ultimaConsulta.textContent =
        `Última consulta: ${cliente.resumen.ultimaConsulta}`;

}