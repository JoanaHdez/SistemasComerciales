<!-- =========================================================
     MODAL - DETALLE DE CONSULTA
========================================================= -->

<div class="history-modal" id="history-modal-consulta" hidden>
    <div class="history-modal__overlay" data-history-close></div>

    <div class="history-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="history-modal-title"
        tabindex="-1">

        <header class="history-modal__header">

            <div>
                <span class="history-modal__eyebrow">
                    HISTORIAL CLÍNICO
                </span>

                <h2 id="history-modal-title">
                    Detalle de consulta
                </h2>
            </div>

            <button type="button" class="history-modal__close" data-history-close aria-label="Cerrar modal">
                &times;
            </button>

        </header>

        <div class="history-modal__body" id="history-modal-body"></div>

        <footer class="history-modal__footer">

            <button type="button" class="history-modal__button" data-history-close>
                Cerrar
            </button>

        </footer>

    </div>
</div>