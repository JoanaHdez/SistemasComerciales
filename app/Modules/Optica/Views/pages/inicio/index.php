<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

<?= $this->section('title') ?>
Inicio | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/welcome.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="welcome">

    <div class="welcome__decorations" aria-hidden="true">
        <span class="welcome__decoration welcome__decoration--top-left"></span>
        <span class="welcome__decoration welcome__decoration--top-center"></span>
        <span class="welcome__decoration welcome__decoration--top-right"></span>
        <span class="welcome__decoration welcome__decoration--middle"></span>
        <span class="welcome__decoration welcome__decoration--bottom-left"></span>
        <span class="welcome__decoration welcome__decoration--bottom-center"></span>
        <span class="welcome__decoration welcome__decoration--right"></span>
    </div>

    <div class="welcome__container">

        <div class="welcome__content">

            <div class="welcome__brand">

                <div class="welcome__logo-placeholder">
                    <span>Opticool</span>
                </div>

                <p class="welcome__subtitle">
                    Óptica
                </p>

            </div>

            <a
                href="<?= base_url('optica/login') ?>"
                class="welcome__button"
            >
                Iniciar sesión
            </a>

        </div>

        <div class="welcome__visual" aria-hidden="true">

            <div class="welcome__glasses-placeholder">
                <span>Imagen de lentes</span>
            </div>

            <div class="welcome__pedestals">

                <div class="welcome__pedestal welcome__pedestal--back">
                    <span>Imagen</span>
                </div>

                <div class="welcome__pedestal welcome__pedestal--front">
                    <span>Imagen</span>
                </div>

                <div class="welcome__pedestal welcome__pedestal--small">
                    <span>Imagen</span>
                </div>

            </div>

        </div>

    </div>

</section>

<?= $this->endSection() ?>