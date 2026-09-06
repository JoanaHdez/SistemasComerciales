/* ==========================================================
   RENDERIZAR CONSULTAS ANTERIORES
========================================================== */

export function renderConsultas(
    cliente,
) {

    if (!cliente) {
        return;
    }


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const contenedor =
        document.getElementById(
            "consulta-history-list",
        );


    if (!contenedor) {

        console.error(
            "No se encontró el contenedor de Consultas anteriores.",
        );

        return;

    }


    /* ======================================================
       DATOS
    ====================================================== */

    const consultas =
        Array.isArray(
            cliente.consultasAnteriores,
        )
            ? cliente.consultasAnteriores
            : [];


    /* ======================================================
       LIMPIAR CONTENEDOR
    ====================================================== */

    contenedor.innerHTML =
        "";


    /* ======================================================
       SIN CONSULTAS
    ====================================================== */

    if (
        consultas.length === 0
    ) {

        const mensaje =
            document.createElement(
                "div",
            );


        mensaje.className =
            "consulta-history-empty";


        mensaje.innerHTML = `
            <strong>
                Sin consultas anteriores
            </strong>

            <p>
                Este cliente todavía no tiene
                actividad clínica registrada.
            </p>
        `;


        contenedor.appendChild(
            mensaje,
        );


        return;

    }


    /* ======================================================
       RENDERIZAR CONSULTAS
    ====================================================== */

    consultas.forEach(
        (consulta) => {

            const articulo =
                document.createElement(
                    "article",
                );


            articulo.className =
                "consulta-history-item";


            articulo.innerHTML = `
                <div
                    class="consulta-history-date"
                >

                    <strong>
                        ${consulta.dia || "—"}
                    </strong>

                    <span>
                        ${consulta.periodo || ""}
                    </span>

                </div>


                <div>

                    <strong>
                        ${
                            consulta.tipo ||
                            "Consulta"
                        }
                    </strong>

                    <p>
                        ${
                            consulta.descripcion ||
                            "Sin descripción registrada."
                        }
                    </p>

                </div>
            `;


            contenedor.appendChild(
                articulo,
            );

        },
    );

}