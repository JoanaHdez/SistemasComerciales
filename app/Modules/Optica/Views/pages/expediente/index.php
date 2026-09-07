<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>


<?= $this->section('title') ?>

Expediente clínico | Opticool

<?= $this->endSection() ?>


<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/expediente.css') ?>">

<?= $this->endSection() ?>


<?= $this->section('content') ?>

<section class="clinical-record-page">


    <!-- =====================================================
         ENCABEZADO
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\expediente\sections\header'
    ) ?>

    <!-- =====================================================
     BUSCADOR
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\expediente\sections\buscador'
    ) ?>



    <div class="clinical-record-layout">


        <!-- =================================================
             PACIENTE
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\expediente\sections\paciente'
        ) ?>


        <!-- =================================================
             INFORMACIÓN GENERAL + RESUMEN CLÍNICO
        ================================================== -->

        <div class="clinical-record-grid clinical-record-grid--top">

            <?= $this->include(
                'App\Modules\Optica\Views\pages\expediente\sections\datos_paciente'
            ) ?>

            <?= $this->include(
                'App\Modules\Optica\Views\pages\expediente\sections\resumen_clinico'
            ) ?>

        </div>


        <!-- =================================================
             GRADUACIÓN ACTUAL
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\expediente\sections\graduacion_actual'
        ) ?>


        <!-- =================================================
             ANTECEDENTES
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\expediente\sections\antecedentes'
        ) ?>


        <!-- =================================================
             HISTORIAL DE CONSULTAS
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\expediente\sections\historial_consultas'
        ) ?>

        <?= $this->include(
            'App\Modules\Optica\Views\pages\expediente\sections\modal_consulta'
        ) ?>

    </div>

</section>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

<script type="module" src="<?= base_url(
        'assets/optica/js/pages/expediente/expediente.js'
    ) ?>"></script>

<?= $this->endSection() ?>