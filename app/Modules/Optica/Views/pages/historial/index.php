<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>


<?= $this->section('title') ?>

Historial Clínico | Opticool

<?= $this->endSection() ?>


<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/historial.css') ?>">

<?= $this->endSection() ?>


<?= $this->section('content') ?>

<section class="history-page">


    <!-- =====================================================
         ENCABEZADO
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\historial\sections\header'
    ) ?>

    <?= $this->include(
        'App\Modules\Optica\Views\pages\historial\sections\buscador_paciente'
    ) ?>

    <div class="history-layout">


        <!-- =================================================
             PACIENTE
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\historial\sections\paciente'
        ) ?>


        <!-- =================================================
             FILTROS
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\historial\sections\filtros'
        ) ?>


        <!-- =================================================
             HISTORIAL COMPLETO
        ================================================== -->

        <?= $this->include(
            'App\Modules\Optica\Views\pages\historial\sections\timeline'
        ) ?>


    </div>

</section>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

<script
    type="module"
    src="<?= base_url('assets/optica/js/pages/historial/historial.js') ?>"
></script>

<?= $this->endSection() ?>
