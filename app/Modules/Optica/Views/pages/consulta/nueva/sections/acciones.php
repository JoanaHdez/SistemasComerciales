<!-- =========================================================
     SECCIÓN 05 - ACCIONES
========================================================= -->

<section class="new-consultation-actions" id="new-consultation-actions">

    <div class="new-consultation-actions__information">

        <h2>Finalizar consulta</h2>

        <p>
            Revisa la información antes de preparar
            el registro de la consulta.
        </p>

    </div>


    <div class="new-consultation-actions__buttons">

        <a href="<?= base_url('optica/consulta/historial') ?>" class="new-consultation-actions__button
                   new-consultation-actions__button--secondary">
            Cancelar
        </a>


        <button type="button" id="new-consultation-clear" class="new-consultation-actions__button
                   new-consultation-actions__button--secondary">
            Limpiar formulario
        </button>


        <button type="button" id="new-consultation-submit" class="new-consultation-actions__button
                   new-consultation-actions__button--primary">
            Registrar consulta
        </button>

    </div>

</section>


<!-- =========================================================
     MODAL DE RESULTADO
========================================================= -->

<div class="new-consultation-modal" id="new-consultation-modal" role="dialog" aria-modal="true"
    aria-labelledby="new-consultation-modal-title" hidden>

    <div class="new-consultation-modal__overlay"></div>

    <div class="new-consultation-modal__dialog">

        <div class="new-consultation-modal__header">

            <div>
                <span>VISTA DE DEMOSTRACIÓN</span>

                <h2 id="new-consultation-modal-title">
                    Consulta preparada
                </h2>
            </div>

            <button type="button" id="new-consultation-modal-close" class="new-consultation-modal__close"
                aria-label="Cerrar">
                &times;
            </button>

        </div>


        <div class="new-consultation-modal__body">

            <p class="new-consultation-modal__notice">
                La información pasó las validaciones del
                frontend. Esta es una simulación:
                no se ha guardado ninguna consulta.
            </p>

            <div id="new-consultation-modal-summary" class="new-consultation-modal__summary"></div>

        </div>


        <div class="new-consultation-modal__footer">

            <button type="button" id="new-consultation-modal-accept" class="new-consultation-actions__button
                       new-consultation-actions__button--primary">
                Entendido
            </button>

        </div>

    </div>

</div>