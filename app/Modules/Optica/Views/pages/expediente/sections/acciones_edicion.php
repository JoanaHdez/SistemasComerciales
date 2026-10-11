<!-- =========================================================
     ACCIONES DE EDICIÓN DEL EXPEDIENTE
========================================================= -->

<div class="clinical-record-edit-actions" id="expediente-edit-actions">

    <!-- =====================================================
         MODO LECTURA
    ====================================================== -->

    <div class="clinical-record-edit-actions__view" id="expediente-actions-view">


        <a href="<?= base_url('optica/consulta/nueva') ?>" id="expediente-nueva-consulta" class="
            clinical-record-page__button
            clinical-record-page__button--secondary
        ">
                Nueva consulta
        </a>

        <button type="button" class="
                clinical-record-page__button
                clinical-record-page__button--primary
            " id="btn-editar-expediente">
            Editar expediente
        </button>

    </div>


    <!-- =====================================================
         MODO EDICIÓN
    ====================================================== -->

    <div class="clinical-record-edit-actions__editing" id="expediente-actions-editing" hidden>

        <button type="button" class="
                clinical-record-page__button
                clinical-record-page__button--secondary
            " id="btn-cancelar-edicion-expediente">
            Cancelar
        </button>


        <button type="button" class="
                clinical-record-page__button
                clinical-record-page__button--primary
            " id="btn-guardar-expediente">
            Guardar cambios
        </button>

    </div>

</div>