import {
    obtenerClienteActual
} from "../clienteActual.js";

import {
    abrirModalConsulta
} from "./modal.js";


/* ==========================================================
   UTILIDAD - ESCAPAR TEXTO HTML
========================================================== */

function escaparHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

}


/* ==========================================================
   CAMPO DE INFORMACIÓN
========================================================== */

function crearCampo(etiqueta, valor) {

    return `
        <div class="history-modal__field">

            <span class="history-modal__label">
                ${escaparHTML(etiqueta)}
            </span>

            <p class="history-modal__value">
                ${escaparHTML(valor || "Sin información")}
            </p>

        </div>
    `;

}


/* ==========================================================
   MOSTRAR CONSULTA
========================================================== */

function mostrarDetalleConsulta(idConsulta) {

    const cliente = obtenerClienteActual();

    if (!cliente) return;

    const consulta = cliente.consultas?.find(
        (item) =>
            String(item.id) === String(idConsulta)
    );

    if (!consulta) return;

    const contenedor = document.getElementById(
        "history-modal-body"
    );

    if (!contenedor) return;

    contenedor.innerHTML = `

        <div class="history-modal__patient">

            <strong>
                ${escaparHTML(cliente.nombre)}
            </strong>

            <span>
                ${escaparHTML(cliente.folio)}
            </span>

        </div>

        <div class="history-modal__grid">

            ${crearCampo(
                "Fecha de consulta",
                consulta.fecha
            )}

            ${crearCampo(
                "Tipo de consulta",
                consulta.tipoTexto
            )}

            ${crearCampo(
                "Estado",
                consulta.estado
            )}

            ${crearCampo(
                "Diagnóstico",
                consulta.diagnostico
            )}

            ${crearCampo(
                "Evolución",
                consulta.evolucion
            )}

            ${crearCampo(
                "Graduación",
                consulta.graduacion
            )}

            ${crearCampo(
                "Observaciones",
                consulta.observaciones
            )}

        </div>
    `;

    abrirModalConsulta();

}


/* ==========================================================
   INICIALIZAR BOTONES
========================================================== */

export function inicializarDetalleConsultas() {

    const timeline = document.getElementById(
        "history-timeline"
    );

    if (!timeline) return;

    timeline.addEventListener("click", (evento) => {

        const boton = evento.target.closest(
            ".js-history-view-consultation"
        );

        if (!boton) return;

        mostrarDetalleConsulta(
            boton.dataset.consultaId
        );

    });

}