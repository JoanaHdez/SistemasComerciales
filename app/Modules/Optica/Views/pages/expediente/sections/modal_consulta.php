<!-- =========================================================
     MODAL - DETALLE DE CONSULTA
========================================================= -->

<div class="consultation-modal" id="modal-detalle-consulta" hidden aria-hidden="true">

    <div class="consultation-modal__backdrop" data-close-consultation-modal></div>


    <div class="consultation-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-consulta-titulo">

        <!-- =================================================
             HEADER
        ================================================== -->

        <div class="consultation-modal__header">

            <div>

                <span class="consultation-modal__eyebrow" id="modal-consulta-tipo">
                    CONSULTA
                </span>

                <h2 class="consultation-modal__title" id="modal-consulta-titulo">
                    Detalle de consulta
                </h2>

                <span class="consultation-modal__date" id="modal-consulta-fecha"></span>

            </div>


            <button type="button" class="consultation-modal__close" data-close-consultation-modal
                aria-label="Cerrar detalle de consulta">
                ×
            </button>

        </div>


        <!-- =================================================
             CONTENIDO
        ================================================== -->

        <div class="consultation-modal__body">


            <!-- DIAGNÓSTICO -->

            <section class="consultation-modal__section">

                <span class="consultation-modal__label">
                    Diagnóstico
                </span>

                <p class="consultation-modal__text" id="modal-consulta-diagnostico"></p>

            </section>


            <!-- EVOLUCIÓN -->

            <section class="consultation-modal__section">

                <span class="consultation-modal__label">
                    Evolución
                </span>

                <p class="consultation-modal__text" id="modal-consulta-evolucion"></p>

            </section>


            <!-- GRADUACIÓN -->

            <section class="consultation-modal__section">

                <span class="consultation-modal__label">
                    Graduación
                </span>

                <div class="consultation-modal__graduation">

                    <div>

                        <span>
                            OD
                        </span>

                        <strong id="modal-consulta-od">
                            —
                        </strong>

                    </div>


                    <div>

                        <span>
                            OI
                        </span>

                        <strong id="modal-consulta-oi">
                            —
                        </strong>

                    </div>

                </div>

            </section>


            <!-- OBSERVACIONES -->

            <section class="consultation-modal__section">

                <span class="consultation-modal__label">
                    Observaciones
                </span>

                <p class="consultation-modal__text" id="modal-consulta-observaciones"></p>

            </section>

        </div>


        <!-- =================================================
             FOOTER
        ================================================== -->

        <div class="consultation-modal__footer">

            <span class="consultation-modal__status" id="modal-consulta-estado">
                Finalizada
            </span>


            <button type="button" class="consultation-modal__button" data-close-consultation-modal>
                Cerrar
            </button>

        </div>

    </div>

</div>