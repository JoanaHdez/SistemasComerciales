<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>


<?= $this->section('title') ?>

Nueva consulta | Sistema de Gestión para Óptica

<?= $this->endSection() ?>


<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/nueva_consulta.css') ?>">

<?= $this->endSection() ?>


<?= $this->section('content') ?>

<div class="new-consultation-page">

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\header'
    ) ?>


    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\buscador_paciente'
    ) ?>

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\nueva\sections\paciente'
    ) ?>

</div>

<?= $this->endSection() ?>