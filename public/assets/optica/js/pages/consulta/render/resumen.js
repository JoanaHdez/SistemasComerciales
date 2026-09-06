import {
    obtenerIniciales,
} from "../utilidades.js";


/* ==========================================================
   RENDERIZAR RESUMEN DEL CLIENTE
========================================================== */

export function renderResumenCliente(
    cliente,
) {

    if (!cliente) {
        return;
    }


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const avatar =
        document.getElementById(
            "consulta-resumen-avatar",
        );


    const nombre =
        document.getElementById(
            "consulta-resumen-nombre",
        );


    const folio =
        document.getElementById(
            "consulta-resumen-folio",
        );


    const ultimaConsulta =
        document.getElementById(
            "consulta-resumen-ultima-consulta",
        );


    if (
        !avatar ||
        !nombre ||
        !folio ||
        !ultimaConsulta
    ) {

        console.error(
            "No se encontraron los elementos del resumen del cliente.",
        );

        return;

    }


    /* ======================================================
       ACTUALIZAR RESUMEN
    ====================================================== */

    avatar.textContent =
        obtenerIniciales(
            cliente.nombre,
        );


    nombre.textContent =
        cliente.nombre;


    folio.textContent =
        `Cliente #${cliente.folio}`;


    ultimaConsulta.textContent =
        `Última consulta: ${
            cliente.resumen?.ultimaConsulta ||
            "Sin consultas"
        }`;

}