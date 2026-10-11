
<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>


<?= $this->section('title') ?>

Nueva consulta | Sistema de Gestión para Óptica

<?= $this->endSection() ?>


<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/nueva_consulta.css') ?>"
>

<?= $this->endSection() ?>


<?= $this->section('content') ?>

<div class="new-consultation-page">


    <!-- =====================================================
         ENCABEZADO
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\header'
    ) ?>


    <!-- =====================================================
         SECCIÓN 01 - SELECCIÓN DEL PACIENTE
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\buscador_paciente'
    ) ?>


    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\paciente'
    ) ?>


    <!-- =====================================================
         SECCIÓN 02 - DATOS DE LA CONSULTA
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\datos_consulta'
    ) ?>


    <!-- =====================================================
         SECCIÓN 03 - EVALUACIÓN CLÍNICA
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\evaluacion_clinica'
    ) ?>


    <!-- =====================================================
         SECCIÓN 04 - GRADUACIÓN
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\graduacion'
    ) ?>


    <!-- =====================================================
         SECCIÓN 05 - ACCIONES
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\acciones'
    ) ?>


</div>

<?= $this->endSection() ?>
