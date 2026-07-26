<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>
        <?= $this->renderSection('title') ?: 'Sistema de Gestión para Óptica' ?>
    </title>

    <link rel="stylesheet" href="<?= base_url('assets/optica/css/base/variables.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/base/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/base/utilities.css') ?>">

    <link rel="stylesheet" href="<?= base_url('assets/optica/css/layouts/main.css') ?>">

    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/sidebar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/navbar.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/breadcrumb.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/alerts.css') ?>">

    <?= $this->renderSection('styles') ?>

</head>

<body>

    <div class="app-layout">

        <?= $this->include(
            'App\Modules\Optica\Views\components\layout\sidebar'
        ) ?>

        <div class="app-layout__content">

            <?= $this->include(
                'App\Modules\Optica\Views\components\layout\header'
            ) ?>

            <?= $this->include(
                'App\Modules\Optica\Views\components\ui\alerts'
            ) ?>

            <main class="app-main">

                <?= $this->include(
                    'App\Modules\Optica\Views\components\layout\breadcrumb'
                ) ?>

                <?= $this->renderSection('content') ?>

            </main>

            <?= $this->include(
                'App\Modules\Optica\Views\components\layout\footer'
            ) ?>

        </div>

    </div>

    <script src="<?= base_url('assets/optica/js/global.js') ?>"></script>
    <script src="<?= base_url('assets/optica/js/layout.js') ?>"></script>
    <script src="<?= base_url('assets/optica/js/agenda.js') ?>"></script>

    <?= $this->renderSection('scripts') ?>

</body>

</html>