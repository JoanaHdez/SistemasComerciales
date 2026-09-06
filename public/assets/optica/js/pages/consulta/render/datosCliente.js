/* ==========================================================
   RENDERIZAR DATOS DEL CLIENTE
========================================================== */

export function renderDatosCliente(
    cliente,
) {

    if (!cliente) {
        return;
    }


    /* ======================================================
       DATOS
    ====================================================== */

    const datos =
        cliente.datosPersonales || {};


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const nombre =
        document.getElementById(
            "consulta-datos-nombre",
        );


    const fechaNacimiento =
        document.getElementById(
            "consulta-datos-fecha-nacimiento",
        );


    const edad =
        document.getElementById(
            "consulta-datos-edad",
        );


    const telefono =
        document.getElementById(
            "consulta-datos-telefono",
        );


    const ocupacion =
        document.getElementById(
            "consulta-datos-ocupacion",
        );


    const fechaRegistro =
        document.getElementById(
            "consulta-datos-fecha-registro",
        );


    const direccion =
        document.getElementById(
            "consulta-datos-direccion",
        );


    /* ======================================================
       VALIDAR ELEMENTOS
    ====================================================== */

    if (
        !nombre ||
        !fechaNacimiento ||
        !edad ||
        !telefono ||
        !ocupacion ||
        !fechaRegistro ||
        !direccion
    ) {

        console.error(
            "No se encontraron los elementos de Datos del cliente.",
        );

        return;

    }


    /* ======================================================
       ACTUALIZAR DATOS
    ====================================================== */

    nombre.textContent =
        cliente.nombre ||
        "Sin información";


    fechaNacimiento.textContent =
        datos.fechaNacimiento ||
        "Sin información";


    edad.textContent =
        datos.edad ||
        "Sin información";


    telefono.textContent =
        cliente.telefono ||
        "Sin información";


    ocupacion.textContent =
        datos.ocupacion ||
        "Sin información";


    fechaRegistro.textContent =
        datos.fechaRegistro ||
        "Sin información";


    direccion.textContent =
        datos.direccion ||
        "Sin información";

}