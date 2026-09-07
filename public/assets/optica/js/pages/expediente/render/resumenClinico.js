/* ==========================================================
   RENDER - RESUMEN CLÍNICO
========================================================== */

export function renderizarResumenClinico(cliente) {

    if (
        !cliente ||
        !cliente.estadoVisual
    ) {
        return;
    }


    const datos =
        cliente.estadoVisual;


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const usaLentes =
        document.getElementById(
            "expediente-usa-lentes",
        );


    const tipoLente =
        document.getElementById(
            "expediente-tipo-lente",
        );


    const tiempoUso =
        document.getElementById(
            "expediente-tiempo-uso",
        );


    const exposicionLaboral =
        document.getElementById(
            "expediente-exposicion-laboral",
        );


    const diagnosticoActual =
        document.getElementById(
            "expediente-diagnostico-actual",
        );


    /* ======================================================
       VALIDACIÓN
    ====================================================== */

    if (
        !usaLentes ||
        !tipoLente ||
        !tiempoUso ||
        !exposicionLaboral ||
        !diagnosticoActual
    ) {

        console.error(
            "No se encontraron todos los campos del Resumen clínico.",
        );

        return;

    }


    /* ======================================================
       USA LENTES
    ====================================================== */

    const usaLentesNormalizado =
        String(
            datos.usaLentes ?? "",
        )
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                "",
            );


    usaLentes.value =
        usaLentesNormalizado === "si"
            ? "si"
            : "no";


    /* ======================================================
       TIPO DE LENTE
    ====================================================== */

    const tiposLente = {

        monofocal:
            "monofocal",

        bifocal:
            "bifocal",

        progresivo:
            "progresivo",

        "lente de contacto":
            "contacto",

        contacto:
            "contacto",

        otro:
            "otro",

    };


    const tipoNormalizado =
        String(
            datos.tipoLente ?? "",
        )
            .toLowerCase()
            .trim();


    tipoLente.value =
        tiposLente[tipoNormalizado] ??
        "otro";


    /* ======================================================
       DEMÁS CAMPOS
    ====================================================== */

    tiempoUso.value =
        datos.tiempoUso ?? "";


    exposicionLaboral.value =
        datos.exposicionLaboral ?? "";


    diagnosticoActual.value =
        datos.diagnosticoActual ?? "";

}