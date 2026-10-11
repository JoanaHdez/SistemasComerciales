import { obtenerClienteActual } from "./clienteActual.js";

/* ==========================================================
   ESTADO
========================================================== */

let elementoAnterior = null;
let overflowAnterior = "";

/* ==========================================================
   UTILIDADES
========================================================== */

function escaparHTML(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function obtenerValor(valor) {
  if (valor === null || valor === undefined || String(valor).trim() === "") {
    return "Sin información registrada";
  }

  return String(valor);
}

function crearCampo(etiqueta, valor, clase = "") {
  return `
        <div class="history-print-document__field ${clase}">

            <span class="history-print-document__label">
                ${escaparHTML(etiqueta)}
            </span>

            <p class="history-print-document__value">
                ${escaparHTML(obtenerValor(valor))}
            </p>

        </div>
    `;
}

/* ==========================================================
   INTERPRETAR GRADUACIÓN
========================================================== */

function obtenerGraduacion(consulta) {
  const texto = obtenerValor(consulta.graduacion);

  const patron =
    /OD\s*([+-]?\d+(?:[.,]\d+)?)\s*\/\s*OI\s*([+-]?\d+(?:[.,]\d+)?)/i;

  const coincidencia = texto.match(patron);

  if (!coincidencia) {
    return {
      separada: false,
      texto,
    };
  }

  return {
    separada: true,
    od: coincidencia[1],
    oi: coincidencia[2],
  };
}

/* ==========================================================
   CONSTRUIR DOCUMENTO CLÍNICO
========================================================== */

function construirDocumento(cliente, consulta) {
  const graduacion = obtenerGraduacion(consulta);

  const edad =
    cliente.resumen?.edad != null
      ? `${cliente.resumen.edad} años`
      : "Sin información registrada";

  return `

        <!-- ================================================
             ENCABEZADO INSTITUCIONAL
        ================================================= -->

        <header class="history-print-document__heading">

            <div class="history-print-document__identity">

                <strong class="history-print-document__brand">
                    OPTICOOL
                </strong>

                <span class="history-print-document__subtitle">
                    SISTEMA DE GESTIÓN ÓPTICA
                </span>

            </div>

            <div class="history-print-document__document-type">

                <strong>
                    REPORTE CLÍNICO
                </strong>

                <span>
                    Consulta individual
                </span>

            </div>

        </header>


        <!-- ================================================
             01 - DATOS DEL PACIENTE
        ================================================= -->

        <section class="
            history-print-document__section
            history-print-document__section--patient
        ">

            <div class="history-print-document__section-heading">

                <h2>
                    01 / DATOS DEL PACIENTE
                </h2>

                <span class="history-print-document__section-icon">
                    &#9675;
                </span>

            </div>


            <div class="history-print-document__patient-name">

                <span class="history-print-document__label">
                    Nombre completo
                </span>

                <strong>
                    ${escaparHTML(obtenerValor(cliente.nombre))}
                </strong>

            </div>


            <div class="history-print-document__patient-details">

                ${crearCampo("Folio", cliente.folio)}

                ${crearCampo("Edad", edad)}

                ${crearCampo("Teléfono", cliente.telefono)}

            </div>

        </section>


        <!-- ================================================
             02 - DATOS DE LA CONSULTA
        ================================================= -->

        <section class="history-print-document__section">

            <div class="history-print-document__section-heading">

                <h2>
                    02 / DATOS DE LA CONSULTA
                </h2>

            </div>


            <div class="history-print-document__consultation-grid">

                <div class="history-print-document__consultation-card">

                    ${crearCampo("Fecha de consulta", consulta.fecha)}

                </div>


                <div class="history-print-document__consultation-card">

                    ${crearCampo("Estado", consulta.estado)}

                </div>

            </div>


            <div class="history-print-document__consultation-type">

                ${crearCampo("Tipo de consulta", consulta.tipoTexto)}

            </div>

        </section>


        <!-- ================================================
             03 - EVALUACIÓN CLÍNICA
        ================================================= -->

        <section class="history-print-document__section">

            <div class="history-print-document__section-heading">

                <h2>
                    03 / EVALUACIÓN CLÍNICA
                </h2>

            </div>


            <div class="history-print-document__clinical">

                ${crearCampo("Diagnóstico", consulta.diagnostico)}

                ${crearCampo("Evolución", consulta.evolucion)}

            </div>


            <!-- GRADUACIÓN -->

            <div class="history-print-document__graduation">

                <div class="history-print-document__graduation-heading">

                    <span class="history-print-document__graduation-icon">
                        &#9678;
                    </span>

                    <strong>
                        GRADUACIÓN REGISTRADA
                    </strong>

                </div>


                ${
                  graduacion.separada
                    ? `

                            <div class="history-print-document__graduation-grid">

                                <div>

                                    <span>
                                        Ojo derecho (OD)
                                    </span>

                                    <strong>
                                        ${escaparHTML(graduacion.od)}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Ojo izquierdo (OI)
                                    </span>

                                    <strong>
                                        ${escaparHTML(graduacion.oi)}
                                    </strong>

                                </div>

                            </div>

                        `
                    : `

                            <p class="history-print-document__graduation-text">
                                ${escaparHTML(graduacion.texto)}
                            </p>

                        `
                }

            </div>


            <div class="history-print-document__observations">

                ${crearCampo(
                  "Observaciones y recomendaciones",
                  consulta.observaciones,
                )}

            </div>

        </section>


        <!-- ================================================
             PIE DEL DOCUMENTO
        ================================================= -->

        <footer class="history-print-document__footnote">

            <span>
                Documento generado desde Opticool
            </span>

            <span>
                Registro clínico
            </span>

        </footer>

    `;
}

/* ==========================================================
   ABRIR VISTA PREVIA
========================================================== */

function abrirVistaPrevia(idConsulta) {
  const cliente = obtenerClienteActual();

  if (!cliente) return;

  const consulta = cliente.consultas?.find(
    (item) => String(item.id) === String(idConsulta),
  );

  if (!consulta) return;

  const modal = document.getElementById("history-print-modal");

  const documento = document.getElementById("history-print-document");

  if (!modal || !documento) return;

  documento.innerHTML = construirDocumento(cliente, consulta);

  elementoAnterior = document.activeElement;
  overflowAnterior = document.body.style.overflow;

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  modal.querySelector(".history-print-modal__body")?.scrollTo(0, 0);

  modal.querySelector(".history-print-modal__dialog")?.focus();
}

/* ==========================================================
   CERRAR VISTA PREVIA
========================================================== */

function cerrarVistaPrevia() {
  const modal = document.getElementById("history-print-modal");

  if (!modal || modal.hidden) return;

  modal.hidden = true;

  document.body.style.overflow = overflowAnterior;

  elementoAnterior?.focus();
  elementoAnterior = null;
}

/* ==========================================================
   IMPRIMIR DOCUMENTO INDEPENDIENTE
========================================================== */

function imprimirDocumentoClinico() {
  const documento = document.getElementById("history-print-document");

  if (!documento) return;

  const iframe = document.createElement("iframe");

  iframe.style.cssText = `
        position: fixed;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border: 0;
    `;

  iframe.setAttribute("aria-hidden", "true");

  document.body.appendChild(iframe);

  const ventana = iframe.contentWindow;
  const documentoImpresion = iframe.contentDocument;

  if (!ventana || !documentoImpresion) {
    iframe.remove();
    return;
  }

  /*
   * Reutilizar la hoja de estilos del documento.
   * La URL se obtiene de la hoja ya cargada.
   */

  const hojaEstilos = Array.from(document.styleSheets).find((hoja) =>
    hoja.href?.includes("/historial.css"),
  );

  const urlEstilos = hojaEstilos?.href ?? "";

  documentoImpresion.open();

  documentoImpresion.write(`
        <!DOCTYPE html>
        <html lang="es">

        <head>

            <meta charset="UTF-8">

            <title>
                Registro clínico - Opticool
            </title>

            ${
              urlEstilos
                ? `<link rel="stylesheet" href="${escaparHTML(urlEstilos)}">`
                : ""
            }

            <style>

    @page {
        size: letter portrait;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

    html,
    body {
        width: 216mm !important;
        height: 279mm !important;

        margin: 0 !important;
        padding: 0 !important;

        overflow: hidden !important;

        background: #ffffff !important;
    }

    body {
        position: relative;
        font-family: Arial, sans-serif;
    }

    .history-print-document {
        width: 216mm !important;
        max-width: none !important;

        min-height: 279mm !important;

        margin: 0 !important;
        padding: 15mm !important;

        background: #ffffff !important;

        box-shadow: none !important;
    }

    .history-print-document__section {
        break-inside: avoid;
    }

</style>

        </head>

        <body>

            <div class="history-print-document">
                ${documento.innerHTML}
            </div>

        </body>

        </html>
    `);

  documentoImpresion.close();

  let impresionIniciada = false;

  const iniciarImpresion = () => {
    if (impresionIniciada) return;

    impresionIniciada = true;

    ventana.focus();
    ventana.print();
  };

  ventana.addEventListener("afterprint", () => iframe.remove(), { once: true });

  /*
   * Esperar a que la hoja de estilos cargue
   * antes de abrir el diálogo de impresión.
   */

  const estilo = documentoImpresion.querySelector('link[rel="stylesheet"]');

  if (estilo) {
    if (estilo.sheet) {
      iniciarImpresion();
    } else {
      estilo.addEventListener("load", iniciarImpresion, { once: true });

      estilo.addEventListener("error", iniciarImpresion, { once: true });
    }
  } else {
    iniciarImpresion();
  }
}

/* ==========================================================
   INICIALIZAR IMPRESIÓN
========================================================== */

export function inicializarImpresionHistorial() {
  const timeline = document.getElementById("history-timeline");

  const modal = document.getElementById("history-print-modal");

  const botonImprimir = document.getElementById("history-print-confirm");

  if (!timeline || !modal || !botonImprimir) {
    return;
  }

  timeline.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".js-history-print-consultation");

    if (!boton) return;

    abrirVistaPrevia(boton.dataset.consultaId);
  });

  modal.addEventListener("click", (evento) => {
    if (evento.target.closest("[data-history-print-close]")) {
      cerrarVistaPrevia();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !modal.hidden) {
      cerrarVistaPrevia();
    }
  });

  botonImprimir.addEventListener("click", () => {
    if (modal.hidden) return;

    imprimirDocumentoClinico();
  });
}
