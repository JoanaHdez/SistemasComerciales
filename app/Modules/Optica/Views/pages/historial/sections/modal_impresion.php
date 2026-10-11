<!-- =========================================================
     MODAL - VISTA PREVIA DE IMPRESIÓN
========================================================= -->

<div class="history-print-modal" id="history-print-modal" hidden>
    <div class="history-print-modal__overlay" data-history-print-close></div>

    <div class="history-print-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="history-print-title"
        tabindex="-1">

        <!-- HEADER FIJO -->

        <header class="history-print-modal__header">

            <div>
                <span class="history-print-modal__eyebrow">
                    DOCUMENTO CLÍNICO
                </span>

                <h2 id="history-print-title">
                    Vista previa de impresión
                </h2>
            </div>

            <button type="button" class="history-print-modal__close" data-history-print-close
                aria-label="Cerrar vista previa">
                &times;
            </button>

        </header>

        <!-- CONTENIDO CON SCROLL -->

        <div class="history-print-modal__body">

            <div class="history-print-document" id="history-print-document"></div>

        </div>

        <!-- FOOTER FIJO -->

        <footer class="history-print-modal__footer">

            <button type="button" class="history-print-modal__button history-print-modal__button--secondary"
                data-history-print-close>
                Cancelar
            </button>

            <button type="button" class="history-print-modal__button history-print-modal__button--primary"
                id="history-print-confirm">
                Imprimir documento
            </button>

        </footer>

    </div>
</div>