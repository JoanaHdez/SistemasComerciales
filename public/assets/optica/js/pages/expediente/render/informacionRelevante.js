/* ==========================================================
   RENDER - INFORMACIÓN RELEVANTE
========================================================== */

export function renderizarInformacionRelevante(cliente) {

    if (
        !cliente ||
        !cliente.informacionRelevante
    ) {
        return;
    }


    const datos =
        cliente.informacionRelevante;


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const usoActual =
        document.getElementById(
            "expediente-relevante-uso-actual",
        );

    const usoActualDetalle =
        document.getElementById(
            "expediente-relevante-uso-actual-detalle",
        );


    const usoAnterior =
        document.getElementById(
            "expediente-relevante-uso-anterior",
        );

    const usoAnteriorDetalle =
        document.getElementById(
            "expediente-relevante-uso-anterior-detalle",
        );


    const exposicion =
        document.getElementById(
            "expediente-relevante-exposicion",
        );

    const exposicionDetalle =
        document.getElementById(
            "expediente-relevante-exposicion-detalle",
        );


    const antecedentesPatologicos =
        document.getElementById(
            "expediente-antecedentes-patologicos",
        );

    const antecedentesPatologicosDetalle =
        document.getElementById(
            "expediente-antecedentes-patologicos-detalle",
        );


    const antecedentesVisuales =
        document.getElementById(
            "expediente-antecedentes-visuales",
        );

    const antecedentesVisualesDetalle =
        document.getElementById(
            "expediente-antecedentes-visuales-detalle",
        );


    const diagnostico =
        document.getElementById(
            "expediente-relevante-diagnostico",
        );

    const diagnosticoDetalle =
        document.getElementById(
            "expediente-relevante-diagnostico-detalle",
        );


    /* ======================================================
       VALIDACIÓN
    ====================================================== */

    if (
        !usoActual ||
        !usoActualDetalle ||
        !usoAnterior ||
        !usoAnteriorDetalle ||
        !exposicion ||
        !exposicionDetalle ||
        !antecedentesPatologicos ||
        !antecedentesPatologicosDetalle ||
        !antecedentesVisuales ||
        !antecedentesVisualesDetalle ||
        !diagnostico ||
        !diagnosticoDetalle
    ) {

        console.error(
            "No se encontraron todos los campos de Información relevante.",
        );

        return;
    }


    /* ======================================================
       USO ACTUAL DE LENTES
    ====================================================== */

    usoActual.value =
        datos.usoActual?.valor ?? "";

    usoActualDetalle.value =
        datos.usoActual?.detalle ?? "";


    /* ======================================================
       USO ANTERIOR DE LENTES
    ====================================================== */

    usoAnterior.value =
        datos.usoAnterior?.valor ?? "";

    usoAnteriorDetalle.value =
        datos.usoAnterior?.detalle ?? "";


    /* ======================================================
       EXPOSICIÓN LABORAL
    ====================================================== */

    exposicion.value =
        datos.exposicionLaboral?.valor ?? "";

    exposicionDetalle.value =
        datos.exposicionLaboral?.detalle ?? "";


    /* ======================================================
       ANTECEDENTES PATOLÓGICOS
    ====================================================== */

    antecedentesPatologicos.value =
        datos.antecedentesPatologicos?.valor ?? "";

    antecedentesPatologicosDetalle.value =
        datos.antecedentesPatologicos?.detalle ?? "";


    /* ======================================================
       ANTECEDENTES VISUALES
    ====================================================== */

    antecedentesVisuales.value =
        datos.antecedentesVisuales?.valor ?? "";

    antecedentesVisualesDetalle.value =
        datos.antecedentesVisuales?.detalle ?? "";


    /* ======================================================
       DIAGNÓSTICO ACTUAL
    ====================================================== */

    diagnostico.value =
        datos.diagnosticoActual?.valor ?? "";

    diagnosticoDetalle.value =
        datos.diagnosticoActual?.detalle ?? "";

}