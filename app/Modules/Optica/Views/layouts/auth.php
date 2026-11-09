<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?= $this->renderSection('title') ?></title>

    <link rel="stylesheet" href="<?= base_url('assets/optica/css/base/variables.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/base/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/base/utilities.css') ?>">

    <link rel="stylesheet" href="<?= base_url('assets/optica/css/layouts/auth.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/buttons.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/forms.css') ?>">

    <?= $this->renderSection('styles') ?>

    <link rel="stylesheet" href="<?= base_url('assets/optica/css/components/design-system.css') ?>">

</head>

<body>

    <main class="auth-layout">
        <?= $this->renderSection('content') ?>
    </main>

    <script src="<?= base_url('assets/optica/js/global.js') ?>"></script>

    <?= $this->renderSection('scripts') ?>
</body>

</html>
