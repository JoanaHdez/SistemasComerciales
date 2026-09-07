/* ==========================================================
   RENDER - DATOS DEL PACIENTE
========================================================== */

export function renderizarDatosPaciente(cliente) {

    if (
        !cliente ||
        !cliente.datosPersonales
    ) {
        return;
    }


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const fechaNacimiento =
        document.getElementById(
            "expediente-fecha-nacimiento",
        );


    const telefono =
        document.getElementById(
            "expediente-telefono",
        );


    const ocupacion =
        document.getElementById(
            "expediente-ocupacion",
        );


    const direccion =
        document.getElementById(
            "expediente-direccion",
        );


    /* ======================================================
       VALIDACIÓN
    ====================================================== */

    if (
        !fechaNacimiento ||
        !telefono ||
        !ocupacion ||
        !direccion
    ) {

        console.error(
            "No se encontraron todos los campos de Datos del paciente.",
        );

        return;

    }


    /* ======================================================
       RENDER
    ====================================================== */

    fechaNacimiento.value =
        cliente.datosPersonales.fechaNacimiento ?? "";


    telefono.value =
        cliente.telefono ?? "";


    ocupacion.value =
        cliente.datosPersonales.ocupacion ?? "";


    direccion.value =
        cliente.datosPersonales.direccion ?? "";

}