/* ==========================================================
   MODAL - DETALLE DE CONSULTA
========================================================== */

export function obtenerModalConsulta() {

    return document.getElementById(
        "modal-detalle-consulta",
    );

}


/* ==========================================================
   ABRIR
========================================================== */

export function abrirModalConsulta() {

    const modal =
        obtenerModalConsulta();


    if (!modal) {

        console.error(
            "No se encontró el modal de detalle de consulta.",
        );

        return;

    }


    modal.hidden =
        false;


    modal.setAttribute(
        "aria-hidden",
        "false",
    );


    document.body.classList.add(
        "consultation-modal-open",
    );

}


/* ==========================================================
   CERRAR
========================================================== */

export function cerrarModalConsulta() {

    const modal =
        obtenerModalConsulta();


    if (!modal) {
        return;
    }


    modal.hidden =
        true;


    modal.setAttribute(
        "aria-hidden",
        "true",
    );


    document.body.classList.remove(
        "consultation-modal-open",
    );

}


/* ==========================================================
   INICIALIZAR
========================================================== */

export function inicializarModalConsulta() {

    const modal =
        obtenerModalConsulta();


    if (!modal) {
        return;
    }


    /* ------------------------------------------------------
       Botones / backdrop de cierre
    ------------------------------------------------------ */

    modal
        .querySelectorAll(
            "[data-close-consultation-modal]",
        )
        .forEach(
            (elemento) => {

                elemento.addEventListener(
                    "click",
                    cerrarModalConsulta,
                );

            },
        );


    /* ------------------------------------------------------
       ESC
    ------------------------------------------------------ */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key !== "Escape" ||
                modal.hidden
            ) {
                return;
            }


            cerrarModalConsulta();

        },
    );

}