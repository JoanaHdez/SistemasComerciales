/* ==========================================================
   RENDER - TIMELINE DEL HISTORIAL
========================================================== */

export function renderTimeline(
    cliente,
) {

    if (!cliente) {
        return;
    }


    const contenedor =
        document.getElementById(
            "history-timeline",
        );


    if (!contenedor) {

        console.error(
            "No se encontró el contenedor del timeline del Historial.",
        );

        return;

    }


    const consultas =
        Array.isArray(
            cliente.consultas,
        )
            ? cliente.consultas
            : [];


    /* ======================================================
       LIMPIAR TIMELINE
    ====================================================== */

    contenedor.innerHTML =
        "";


    /* ======================================================
       SIN CONSULTAS
    ====================================================== */

    if (
        consultas.length === 0
    ) {

        contenedor.innerHTML = `
            <div class="history-timeline__empty">

                <strong>
                    No existen consultas registradas
                </strong>

                <span>
                    Este paciente aún no cuenta con
                    consultas en su historial clínico.
                </span>

            </div>
        `;


        return;

    }


    /* ======================================================
       AGRUPAR CONSULTAS POR AÑO
    ====================================================== */

    const consultasPorAnio =
        consultas.reduce(
            (
                grupos,
                consulta,
            ) => {

                const anio =
                    consulta.anio ??
                    "Sin año";


                if (
                    !grupos[anio]
                ) {

                    grupos[anio] =
                        [];

                }


                grupos[anio].push(
                    consulta,
                );


                return grupos;

            },
            {},
        );


    /* ======================================================
       ORDENAR AÑOS DESCENDENTE
    ====================================================== */

    const anios =
        Object.keys(
            consultasPorAnio,
        )
            .sort(
                (
                    anioA,
                    anioB,
                ) => {

                    return (
                        Number(anioB) -
                        Number(anioA)
                    );

                },
            );


    /* ======================================================
       RENDERIZAR AÑOS
    ====================================================== */

    anios.forEach(
        (anio) => {

            const consultasAnio =
                consultasPorAnio[
                    anio
                ];


            const bloqueAnio =
                crearBloqueAnio(
                    anio,
                    consultasAnio,
                );


            contenedor.appendChild(
                bloqueAnio,
            );

        },
    );

}


/* ==========================================================
   CREAR BLOQUE DEL AÑO
========================================================== */

function crearBloqueAnio(
    anio,
    consultas,
) {

    const bloque =
        document.createElement(
            "div",
        );


    bloque.className =
        "history-year";


    const total =
        consultas.length;


    const textoConsultas =
        total === 1
            ? "1 consulta"
            : `${total} consultas`;


    bloque.innerHTML = `
        <div class="history-year__header">

            <span class="history-year__label">
                ${anio}
            </span>

            <span class="history-year__count">
                ${textoConsultas}
            </span>

        </div>


        <div class="history-year__entries"></div>
    `;


    const entradas =
        bloque.querySelector(
            ".history-year__entries",
        );


    consultas.forEach(
        (consulta) => {

            entradas.appendChild(
                crearConsulta(
                    consulta,
                ),
            );

        },
    );


    return bloque;

}


/* ==========================================================
   CREAR CONSULTA
========================================================== */

function crearConsulta(
    consulta,
) {

    const articulo =
        document.createElement(
            "article",
        );


    articulo.className =
        obtenerClaseConsulta(
            consulta,
        );


    articulo.dataset.consultaId =
        consulta.id;


    articulo.dataset.anio =
        consulta.anio;


    articulo.dataset.tipo =
        consulta.tipo;


    articulo.innerHTML = `
        <div class="history-entry__marker"></div>


        <div class="history-entry__card">


            <!-- =============================================
                 HEADER
            ============================================== -->

            <div class="history-entry__header">

                <div>

                    <span class="history-entry__type">
                        ${
                            consulta.tipoTexto ??
                            "CONSULTA"
                        }
                    </span>

                    <h3 class="history-entry__title">
                        ${
                            consulta.titulo ??
                            "Consulta"
                        }
                    </h3>

                </div>


                <time class="history-entry__date">
                    ${
                        consulta.fecha ??
                        "—"
                    }
                </time>

            </div>


            <!-- =============================================
                 CONTENIDO
            ============================================== -->

            <div class="history-entry__content">


                <div class="history-entry__detail">

                    <span class="history-entry__detail-label">
                        Diagnóstico
                    </span>

                    <p>
                        ${
                            consulta.diagnostico ??
                            "Sin diagnóstico registrado."
                        }
                    </p>

                </div>


                <div class="history-entry__detail">

                    <span class="history-entry__detail-label">
                        Evolución
                    </span>

                    <p>
                        ${
                            consulta.evolucion ??
                            "Sin evolución registrada."
                        }
                    </p>

                </div>


                <div class="history-entry__detail">

                    <span class="history-entry__detail-label">
                        Graduación
                    </span>

                    <p>
                        ${
                            consulta.graduacion ??
                            "Sin graduación registrada."
                        }
                    </p>

                </div>


                <div
                    class="
                        history-entry__detail
                        history-entry__detail--full
                    "
                >

                    <span class="history-entry__detail-label">
                        Observaciones
                    </span>

                    <p>
                        ${
                            consulta.observaciones ??
                            "Sin observaciones registradas."
                        }
                    </p>

                </div>

            </div>


            <!-- =============================================
                 FOOTER
            ============================================== -->

            <div class="history-entry__footer">

                <span class="history-entry__status">
                    ${
                        consulta.estado ??
                        "—"
                    }
                </span>


                <div class="history-entry__actions">

                    <button
                        type="button"
                        class="
                            history-entry__action
                            js-history-view-consultation
                        "
                        data-consulta-id="${consulta.id}"
                    >
                        Ver consulta
                    </button>


                    <button
                        type="button"
                        class="
                            history-entry__action
                            js-history-print-consultation
                        "
                        data-consulta-id="${consulta.id}"
                    >
                        Imprimir
                    </button>

                </div>

            </div>

        </div>
    `;


    return articulo;

}


/* ==========================================================
   CLASE SEGÚN TIPO
========================================================== */

function obtenerClaseConsulta(
    consulta,
) {

    const clase =
        consulta.clase ??
        "general";


    return `
        history-entry
        history-entry--${clase}
    `.trim();

}