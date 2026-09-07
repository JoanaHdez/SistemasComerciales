/* ==========================================================
   RENDER - GRADUACIÓN ACTUAL
========================================================== */

export function renderizarGraduacion(cliente) {

    if (
        !cliente ||
        !cliente.graduacionActual
    ) {
        return;
    }


    const datos =
        cliente.graduacionActual;


    /* ======================================================
       ELEMENTOS - OJO DERECHO
    ====================================================== */

    const esferaOD =
        document.getElementById(
            "expediente-esfera-od",
        );

    const cilindroOD =
        document.getElementById(
            "expediente-cilindro-od",
        );

    const ejeOD =
        document.getElementById(
            "expediente-eje-od",
        );


    /* ======================================================
       ELEMENTOS - OJO IZQUIERDO
    ====================================================== */

    const esferaOI =
        document.getElementById(
            "expediente-esfera-oi",
        );

    const cilindroOI =
        document.getElementById(
            "expediente-cilindro-oi",
        );

    const ejeOI =
        document.getElementById(
            "expediente-eje-oi",
        );


    /* ======================================================
       ELEMENTOS - DATOS COMPLEMENTARIOS
    ====================================================== */

    const adicion =
        document.getElementById(
            "expediente-adicion",
        );

    const distanciaPupilar =
        document.getElementById(
            "expediente-distancia-pupilar",
        );

    const fecha =
        document.getElementById(
            "expediente-graduacion-fecha",
        );


    /* ======================================================
       VALIDACIÓN
    ====================================================== */

    if (
        !esferaOD ||
        !cilindroOD ||
        !ejeOD ||
        !esferaOI ||
        !cilindroOI ||
        !ejeOI ||
        !adicion ||
        !distanciaPupilar ||
        !fecha
    ) {

        console.error(
            "No se encontraron todos los campos de Graduación actual.",
        );

        return;
    }


    /* ======================================================
       OJO DERECHO
    ====================================================== */

    esferaOD.value =
        datos.ojoDerecho?.esfera ?? "";

    cilindroOD.value =
        datos.ojoDerecho?.cilindro ?? "";

    ejeOD.value =
        datos.ojoDerecho?.eje ?? "";


    /* ======================================================
       OJO IZQUIERDO
    ====================================================== */

    esferaOI.value =
        datos.ojoIzquierdo?.esfera ?? "";

    cilindroOI.value =
        datos.ojoIzquierdo?.cilindro ?? "";

    ejeOI.value =
        datos.ojoIzquierdo?.eje ?? "";


    /* ======================================================
       DATOS COMPLEMENTARIOS
    ====================================================== */

    adicion.value =
        datos.adicion ?? "";

    distanciaPupilar.value =
        datos.distanciaPupilar ?? "";

    fecha.textContent =
        datos.fecha ?? "—";

}