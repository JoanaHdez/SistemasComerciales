/* ==========================================================
   RENDERIZAR HISTORIAL CLÍNICO

   Esta sección muestra un resumen de la información
   proveniente del historial completo del cliente.
========================================================== */

export function renderHistorialClinico(
    cliente,
) {

    if (!cliente) {
        return;
    }


    const historial =
        cliente.historialClinico || {};


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const elementos = {

        usoActual: {
            valor:
                document.getElementById(
                    "consulta-historial-uso-actual",
                ),

            detalle:
                document.getElementById(
                    "consulta-historial-uso-actual-detalle",
                ),
        },


        usoAnterior: {
            valor:
                document.getElementById(
                    "consulta-historial-uso-anterior",
                ),

            detalle:
                document.getElementById(
                    "consulta-historial-uso-anterior-detalle",
                ),
        },


        exposicionLaboral: {
            valor:
                document.getElementById(
                    "consulta-historial-exposicion",
                ),

            detalle:
                document.getElementById(
                    "consulta-historial-exposicion-detalle",
                ),
        },


        antecedentesPatologicos: {
            valor:
                document.getElementById(
                    "consulta-historial-patologicos",
                ),

            detalle:
                document.getElementById(
                    "consulta-historial-patologicos-detalle",
                ),
        },


        antecedentesVisuales: {
            valor:
                document.getElementById(
                    "consulta-historial-visuales",
                ),

            detalle:
                document.getElementById(
                    "consulta-historial-visuales-detalle",
                ),
        },


        diagnosticoActual: {
            valor:
                document.getElementById(
                    "consulta-historial-diagnostico",
                ),

            detalle:
                document.getElementById(
                    "consulta-historial-diagnostico-detalle",
                ),
        },

    };


    /* ======================================================
       ACTUALIZAR BLOQUE
    ====================================================== */

    Object.entries(
        elementos,
    ).forEach(
        ([clave, elemento]) => {

            if (
                !elemento.valor ||
                !elemento.detalle
            ) {

                console.error(
                    `No se encontraron los elementos del historial: ${clave}.`,
                );

                return;

            }


            const informacion =
                historial[clave] || {};


            elemento.valor.textContent =
                informacion.valor ||
                "Sin información";


            elemento.detalle.textContent =
                informacion.detalle ||
                "Sin información adicional.";

        },
    );

}