<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>


<?= $this->section('title') ?>

Consulta | Sistema de Gestión para Óptica

<?= $this->endSection() ?>


<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/consulta.css') ?>"
>

<?= $this->endSection() ?>


<?= $this->section('content') ?>

<div class="consulta-page">


    <!-- =====================================================
         ENCABEZADO
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\sections\header'
    ) ?>


    <!-- =====================================================
         BUSCADOR
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\sections\buscador'
    ) ?>


    <!-- =====================================================
         RESUMEN DEL CLIENTE
    ====================================================== -->

    <?= $this->include(
        'App\Modules\Optica\Views\pages\consulta\sections\resumen_cliente'
    ) ?>


    <!-- =====================================================
         CONTENIDO
    ====================================================== -->

    <div class="consulta-layout">


        <!-- ===============================================
             COLUMNA PRINCIPAL
        ================================================ -->

        <div class="consulta-main-column">

            <?= $this->include(
                'App\Modules\Optica\Views\pages\consulta\sections\datos_cliente'
            ) ?>


            <?= $this->include(
                'App\Modules\Optica\Views\pages\consulta\sections\historial_clinico'
            ) ?>


            <?= $this->include(
                'App\Modules\Optica\Views\pages\consulta\sections\graduacion_actual'
            ) ?>

        </div>


        <!-- ===============================================
             COLUMNA LATERAL
        ================================================ -->

        <aside class="consulta-side-column">

            <?= $this->include(
                'App\Modules\Optica\Views\pages\consulta\sections\acciones_rapidas'
            ) ?>


            <?= $this->include(
                'App\Modules\Optica\Views\pages\consulta\sections\consultas_anteriores'
            ) ?>

        </aside>


    </div>

</div>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

<script
    type="module"
    src="<?= base_url(
        'assets/optica/js/pages/consulta/consulta.js'
    ) ?>"
></script>

<?= $this->endSection() ?>