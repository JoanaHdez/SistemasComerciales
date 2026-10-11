/* ==========================================================
   MODAL DE CONSULTA
========================================================== */

let elementoAnterior = null;

export function abrirModalConsulta() {

    const modal = document.getElementById(
        "history-modal-consulta"
    );

    if (!modal) return;

    elementoAnterior = document.activeElement;

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    modal.querySelector(
        ".history-modal__dialog"
    )?.focus();

}


export function cerrarModalConsulta() {

    const modal = document.getElementById(
        "history-modal-consulta"
    );

    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = "";

    elementoAnterior?.focus();
    elementoAnterior = null;

}


export function inicializarModalConsulta() {

    const modal = document.getElementById(
        "history-modal-consulta"
    );

    if (!modal) return;

    modal.addEventListener("click", (evento) => {

        if (
            evento.target.closest(
                "[data-history-close]"
            )
        ) {
            cerrarModalConsulta();
        }

    });

    document.addEventListener("keydown", (evento) => {

        if (
            evento.key === "Escape" &&
            !modal.hidden
        ) {
            cerrarModalConsulta();
        }

    });

}