<!-- =========================================================
     ENCABEZADO
========================================================= -->

<header class="clinical-record-page__header">

    <div>

        <span class="clinical-record-page__eyebrow">
            EXPEDIENTE CLÍNICO
        </span>

        <h1 class="clinical-record-page__title">
            Expediente clínico
        </h1>

        <p class="clinical-record-page__description">
            Consulta y administra la información general,
            clínica y visual del paciente.
        </p>

    </div>


    <div class="clinical-record-page__actions">

        <a href="<?= base_url('optica/consulta') ?>" class="
            clinical-record-page__button
            clinical-record-page__button--secondary
        ">
            Volver a consulta
        </a>


        <?= $this->include(
        'App\Modules\Optica\Views\pages\expediente\sections\acciones_edicion'
    ) ?>

    </div>

</header>