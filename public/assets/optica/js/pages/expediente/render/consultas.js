/* ==========================================================
   RENDER - ÚLTIMAS CONSULTAS
========================================================== */

export function renderizarConsultas(
    cliente,
) {

    if (!cliente) {
        return;
    }


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const cuerpo =
        document.getElementById(
            "expediente-consultas-body",
        );


    if (!cuerpo) {

        console.error(
            "No se encontró el cuerpo de la tabla de consultas.",
        );

        return;

    }


    /* ======================================================
       CONSULTAS

       El Expediente muestra como máximo
       las 3 consultas más recientes.
    ====================================================== */

    const consultas =
        Array.isArray(
            cliente.consultas,
        )
            ? cliente.consultas.slice(
                0,
                3,
            )
            : [];


    /* ======================================================
       LIMPIAR TABLA
    ====================================================== */

    cuerpo.innerHTML =
        "";


    /* ======================================================
       SIN CONSULTAS
    ====================================================== */

    if (
        consultas.length === 0
    ) {

        cuerpo.innerHTML = `
            <tr>

                <td
                    colspan="5"
                    class="clinical-record-table__empty"
                >
                    No existen consultas registradas
                    para este paciente.
                </td>

            </tr>
        `;


        return;

    }


    /* ======================================================
       RENDERIZAR CONSULTAS
    ====================================================== */

    consultas.forEach(
        (consulta) => {

            const fila =
                document.createElement(
                    "tr",
                );


            fila.dataset.consultaId =
                consulta.id;


            fila.innerHTML = `
                <td>
                    ${
                        consulta.fechaTabla ??
                        "—"
                    }
                </td>


                <td>
                    ${
                        consulta.diagnostico ??
                        "Sin diagnóstico"
                    }
                </td>


                <td>
                    ${
                        consulta.estadoGraduacion ??
                        "—"
                    }
                </td>


                <td>

                    <span
                        class="clinical-record-table__status"
                    >
                        ${
                            consulta.estado ??
                            "—"
                        }
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="
                            clinical-record-table__action
                            js-ver-consulta
                        "
                        data-consulta-id="${consulta.id}"
                    >
                        Ver
                    </button>

                </td>
            `;


            cuerpo.appendChild(
                fila,
            );

        },
    );

}