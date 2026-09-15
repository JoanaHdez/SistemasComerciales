import {
    obtenerClienteActual,
} from "./clienteActual.js";


import {
    normalizarTexto,
} from "./utilidades.js";


import {
    renderTimeline,
} from "./render/timeline.js";


/* ==========================================================
   ESTADO DE LOS FILTROS
========================================================== */

const filtros = {

    busqueda:
        "",

    anio:
        "all",

    tipo:
        "all",

};


/* ==========================================================
   INICIALIZAR FILTROS
========================================================== */

export function inicializarFiltrosHistorial() {

    const buscador =
        document.getElementById(
            "history-search",
        );


    const filtroAnio =
        document.getElementById(
            "history-filter-year",
        );


    const filtroTipo =
        document.getElementById(
            "history-filter-type",
        );


    if (
        !buscador ||
        !filtroAnio ||
        !filtroTipo
    ) {

        return;

    }


    /* ======================================================
       BÚSQUEDA
    ====================================================== */

    buscador.addEventListener(
        "input",
        () => {

            filtros.busqueda =
                buscador.value;


            aplicarFiltrosHistorial();

        },
    );


    /* ======================================================
       AÑO
    ====================================================== */

    filtroAnio.addEventListener(
        "change",
        () => {

            filtros.anio =
                filtroAnio.value;


            aplicarFiltrosHistorial();

        },
    );


    /* ======================================================
       TIPO
    ====================================================== */

    filtroTipo.addEventListener(
        "change",
        () => {

            filtros.tipo =
                filtroTipo.value;


            aplicarFiltrosHistorial();

        },
    );

}


/* ==========================================================
   APLICAR FILTROS
========================================================== */

export function aplicarFiltrosHistorial() {

    const cliente =
        obtenerClienteActual();


    if (!cliente) {
        return;
    }


    const consultas =
        Array.isArray(
            cliente.consultas,
        )
            ? cliente.consultas
            : [];


    const busqueda =
        normalizarTexto(
            filtros.busqueda,
        );


    const consultasFiltradas =
        consultas.filter(
            (consulta) => {

                /* ==========================================
                   FILTRO POR AÑO
                ========================================== */

                const coincideAnio =

                    filtros.anio ===
                    "all"

                    ||

                    String(
                        consulta.anio,
                    ) ===
                    String(
                        filtros.anio,
                    );


                /* ==========================================
                   FILTRO POR TIPO
                ========================================== */

                const coincideTipo =

                    filtros.tipo ===
                    "all"

                    ||

                    consulta.tipo ===
                    filtros.tipo;


                /* ==========================================
                   BÚSQUEDA DE TEXTO
                ========================================== */

                const valoresBusqueda = [

                    consulta.fecha,

                    consulta.fechaBusqueda,

                    consulta.diagnostico,

                    consulta.observaciones,

                ];


                const coincideBusqueda =

                    !busqueda

                    ||

                    valoresBusqueda.some(
                        (valor) => {

                            return normalizarTexto(
                                valor,
                            ).includes(
                                busqueda,
                            );

                        },
                    );


                /* ==========================================
                   RESULTADO
                ========================================== */

                return (
                    coincideAnio &&
                    coincideTipo &&
                    coincideBusqueda
                );

            },
        );


    /* ======================================================
       RENDERIZAR RESULTADO
    ====================================================== */

    renderTimeline(
        {
            ...cliente,

            consultas:
                consultasFiltradas,
        },
    );

}


/* ==========================================================
   REINICIAR FILTROS
========================================================== */

export function reiniciarFiltrosHistorial() {

    filtros.busqueda =
        "";

    filtros.anio =
        "all";

    filtros.tipo =
        "all";


    const buscador =
        document.getElementById(
            "history-search",
        );


    const filtroAnio =
        document.getElementById(
            "history-filter-year",
        );


    const filtroTipo =
        document.getElementById(
            "history-filter-type",
        );


    if (buscador) {

        buscador.value =
            "";

    }


    if (filtroAnio) {

        filtroAnio.value =
            "all";

    }


    if (filtroTipo) {

        filtroTipo.value =
            "all";

    }

}