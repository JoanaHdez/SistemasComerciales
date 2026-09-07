import {
    abrirModalConsulta,
} from "./modal.js";


import {
    obtenerClienteActual,
} from "../clienteActual.js";


/* ==========================================================
   OBTENER CONSULTA DEL CLIENTE ACTUAL
========================================================== */

function obtenerConsultaPorId(
    idConsulta,
) {

    const cliente =
        obtenerClienteActual();


    if (
        !cliente ||
        !Array.isArray(
            cliente.consultas,
        )
    ) {

        return null;

    }


    return cliente.consultas.find(
        (consulta) => {

            return (
                consulta.id ===
                Number(idConsulta)
            );

        },
    );

}


/* ==========================================================
   RENDERIZAR CONSULTA
========================================================== */

function renderizarConsulta(
    consulta,
) {

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


    /* ======================================================
       ACTUALIZAR MODAL
    ====================================================== */

    tipo.textContent =
        consulta.tipo ??
        "CONSULTA";


    titulo.textContent =
        consulta.titulo ??
        "Detalle de consulta";


    fecha.textContent =
        consulta.fecha ??
        "";


    diagnostico.textContent =
        consulta.diagnostico ??
        "Sin diagnóstico registrado.";


    evolucion.textContent =
        consulta.evolucion ??
        "Sin evolución registrada.";


    od.textContent =
        consulta.graduacion?.od ??
        "—";


    oi.textContent =
        consulta.graduacion?.oi ??
        "—";


    observaciones.textContent =
        consulta.observaciones ??
        "Sin observaciones registradas.";


    estado.textContent =
        consulta.estado ??
        "—";


    return true;

}


/* ==========================================================
   MOSTRAR CONSULTA
========================================================== */

function mostrarConsulta(
    idConsulta,
) {

    const consulta =
        obtenerConsultaPorId(
            idConsulta,
        );


    if (!consulta) {

        console.error(
            `No se encontró la consulta ${idConsulta} del paciente seleccionado.`,
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