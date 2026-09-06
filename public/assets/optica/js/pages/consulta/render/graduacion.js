/* ==========================================================
   RENDERIZAR GRADUACIÓN ACTUAL
========================================================== */

export function renderGraduacion(
    cliente,
) {

    if (!cliente) {
        return;
    }


    const graduacion =
        cliente.graduacionActual || {};


    const ojoDerecho =
        graduacion.ojoDerecho || {};


    const ojoIzquierdo =
        graduacion.ojoIzquierdo || {};


    /* ======================================================
       ELEMENTOS GENERALES
    ====================================================== */

    const estado =
        document.getElementById(
            "consulta-graduacion-estado",
        );


    const fecha =
        document.getElementById(
            "consulta-graduacion-fecha",
        );


    const observaciones =
        document.getElementById(
            "consulta-graduacion-observaciones",
        );


    /* ======================================================
       OJO DERECHO
    ====================================================== */

    const odEsfera =
        document.getElementById(
            "consulta-graduacion-od-esfera",
        );


    const odCilindro =
        document.getElementById(
            "consulta-graduacion-od-cilindro",
        );


    const odEje =
        document.getElementById(
            "consulta-graduacion-od-eje",
        );


    const odAdicion =
        document.getElementById(
            "consulta-graduacion-od-adicion",
        );


    const odDp =
        document.getElementById(
            "consulta-graduacion-od-dp",
        );


    /* ======================================================
       OJO IZQUIERDO
    ====================================================== */

    const oiEsfera =
        document.getElementById(
            "consulta-graduacion-oi-esfera",
        );


    const oiCilindro =
        document.getElementById(
            "consulta-graduacion-oi-cilindro",
        );


    const oiEje =
        document.getElementById(
            "consulta-graduacion-oi-eje",
        );


    const oiAdicion =
        document.getElementById(
            "consulta-graduacion-oi-adicion",
        );


    const oiDp =
        document.getElementById(
            "consulta-graduacion-oi-dp",
        );


    /* ======================================================
       VALIDAR ELEMENTOS
    ====================================================== */

    const elementos = [
        estado,
        fecha,
        observaciones,

        odEsfera,
        odCilindro,
        odEje,
        odAdicion,
        odDp,

        oiEsfera,
        oiCilindro,
        oiEje,
        oiAdicion,
        oiDp,
    ];


    if (
        elementos.some(
            (elemento) => !elemento,
        )
    ) {

        console.error(
            "No se encontraron todos los elementos de Graduación actual.",
        );

        return;

    }


    /* ======================================================
       ACTUALIZAR DATOS GENERALES
    ====================================================== */

    estado.textContent =
        graduacion.estado ||
        "Sin graduación";


    fecha.textContent =
        graduacion.fecha ||
        "Sin información";


    observaciones.textContent =
        graduacion.observaciones ||
        "Sin observaciones registradas.";


    /* ======================================================
       ACTUALIZAR OJO DERECHO
    ====================================================== */

    odEsfera.textContent =
        ojoDerecho.esfera ??
        "—";


    odCilindro.textContent =
        ojoDerecho.cilindro ??
        "—";


    odEje.textContent =
        ojoDerecho.eje ??
        "—";


    odAdicion.textContent =
        ojoDerecho.adicion ??
        "—";


    odDp.textContent =
        ojoDerecho.distanciaPupilar ??
        "—";


    /* ======================================================
       ACTUALIZAR OJO IZQUIERDO
    ====================================================== */

    oiEsfera.textContent =
        ojoIzquierdo.esfera ??
        "—";


    oiCilindro.textContent =
        ojoIzquierdo.cilindro ??
        "—";


    oiEje.textContent =
        ojoIzquierdo.eje ??
        "—";


    oiAdicion.textContent =
        ojoIzquierdo.adicion ??
        "—";


    oiDp.textContent =
        ojoIzquierdo.distanciaPupilar ??
        "—";

}