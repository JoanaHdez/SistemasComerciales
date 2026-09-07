import {
    abrirModalConsulta,
} from "./modal.js";


/* ==========================================================
   CONSULTAS SIMULADAS

   Más adelante estos datos vendrán del backend.
========================================================== */

const consultas = [

    {
        id: 1,

        tipo:
            "ACTUALIZACIÓN DE GRADUACIÓN",

        titulo:
            "Consulta general",

        fecha:
            "22 julio 2026",

        diagnostico:
            "Miopía y astigmatismo bilateral.",

        evolucion:
            "Se detectó aumento de graduación en ambos ojos.",

        graduacion: {

            od:
                "-1.75",

            oi:
                "-2.00",

        },

        observaciones:
            "Se recomienda cambio de lentes y revisión en seis meses.",

        estado:
            "Finalizada",
    },


    {
        id: 2,

        tipo:
            "SEGUIMIENTO",

        titulo:
            "Consulta de seguimiento",

        fecha:
            "14 febrero 2025",

        diagnostico:
            "Fatiga visual por exposición prolongada.",

        evolucion:
            "La graduación se mantiene estable respecto a la consulta anterior.",

        graduacion: {

            od:
                "-1.50",

            oi:
                "-1.75",

        },

        observaciones:
            "Se recomienda realizar pausas visuales durante jornadas prolongadas.",

        estado:
            "Finalizada",
    },


    {
        id: 3,

        tipo:
            "VALORACIÓN INICIAL",

        titulo:
            "Consulta general",

        fecha:
            "08 agosto 2024",

        diagnostico:
            "Revisión general.",

        evolucion:
            "Se realizó valoración visual inicial y registro de graduación.",

        graduacion: {

            od:
                "-1.50",

            oi:
                "-1.75",

        },

        observaciones:
            "Se recomienda seguimiento periódico para evaluar cambios visuales.",

        estado:
            "Finalizada",
    },

];


/* ==========================================================
   OBTENER CONSULTA
========================================================== */

function obtenerConsultaPorId(idConsulta) {

    return consultas.find(
        (consulta) =>
            consulta.id ===
            Number(idConsulta),
    );

}


/* ==========================================================
   RENDERIZAR CONSULTA
========================================================== */

function renderizarConsulta(consulta) {

    const tipo =
        document.getElementById(
            "modal-consulta-tipo",
        );

    const titulo =
        document.getElementById(
            "modal-consulta-titulo",
        );

    const fecha =
        document.getElementById(
            "modal-consulta-fecha",
        );

    const diagnostico =
        document.getElementById(
            "modal-consulta-diagnostico",
        );

    const evolucion =
        document.getElementById(
            "modal-consulta-evolucion",
        );

    const od =
        document.getElementById(
            "modal-consulta-od",
        );

    const oi =
        document.getElementById(
            "modal-consulta-oi",
        );

    const observaciones =
        document.getElementById(
            "modal-consulta-observaciones",
        );

    const estado =
        document.getElementById(
            "modal-consulta-estado",
        );


    if (
        !tipo ||
        !titulo ||
        !fecha ||
        !diagnostico ||
        !evolucion ||
        !od ||
        !oi ||
        !observaciones ||
        !estado
    ) {

        console.error(
            "No se encontraron todos los elementos del detalle de consulta.",
        );

        return false;

    }


    tipo.textContent =
        consulta.tipo;


    titulo.textContent =
        consulta.titulo;


    fecha.textContent =
        consulta.fecha;


    diagnostico.textContent =
        consulta.diagnostico;


    evolucion.textContent =
        consulta.evolucion;


    od.textContent =
        consulta.graduacion.od;


    oi.textContent =
        consulta.graduacion.oi;


    observaciones.textContent =
        consulta.observaciones;


    estado.textContent =
        consulta.estado;


    return true;

}


/* ==========================================================
   ABRIR DETALLE
========================================================== */

function mostrarConsulta(idConsulta) {

    const consulta =
        obtenerConsultaPorId(
            idConsulta,
        );


    if (!consulta) {

        console.error(
            `No se encontró la consulta ${idConsulta}.`,
        );

        return;

    }


    const renderizada =
        renderizarConsulta(
            consulta,
        );


    if (!renderizada) {
        return;
    }


    abrirModalConsulta();

}


/* ==========================================================
   INICIALIZAR BOTONES "VER"
========================================================== */

export function inicializarDetalleConsultas() {

    document.addEventListener(
        "click",
        (evento) => {

            const boton =
                evento.target.closest(
                    ".js-ver-consulta",
                );


            if (!boton) {
                return;
            }


            const idConsulta =
                boton.dataset.consultaId;


            if (!idConsulta) {

                console.error(
                    "El botón Ver no contiene data-consulta-id.",
                );

                return;

            }


            mostrarConsulta(
                idConsulta,
            );

        },
    );

}