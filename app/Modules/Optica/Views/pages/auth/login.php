<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

<?= $this->section('title') ?>
Iniciar sesión | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/login.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="login-page">

    <div class="login-page__decorations" aria-hidden="true">
        <span class="login-page__decoration login-page__decoration--top-left"></span>
        <span class="login-page__decoration login-page__decoration--top-center"></span>
        <span class="login-page__decoration login-page__decoration--top-right"></span>
        <span class="login-page__decoration login-page__decoration--middle"></span>
        <span class="login-page__decoration login-page__decoration--bottom-left"></span>
        <span class="login-page__decoration login-page__decoration--bottom-center"></span>
        <span class="login-page__decoration login-page__decoration--right"></span>
    </div>

    <div class="login-page__container">

        <div class="login-page__content">

            <div class="login-page__brand">

                <div class="login-page__logo-placeholder">
                    <span>Opticool</span>
                </div>

                <p class="login-page__subtitle">
                    Óptica
                </p>

            </div>

            <form
    class="login-form"
    action="<?= base_url('optica/menu') ?>"
    method="get"
    autocomplete="off"
>

                <div class="login-form__field">

                    <div class="login-form__icon" aria-hidden="true">
                        <span>U</span>
                    </div>

                    <div class="login-form__control">
                        <label
                            for="usuario"
                            class="login-form__label"
                        >
                            Usuario
                        </label>

                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            class="login-form__input"
                            placeholder="User name"
                            autocomplete="username"
                        >
                    </div>

                </div>

                <div class="login-form__field">

                    <div class="login-form__icon" aria-hidden="true">
                        <span>C</span>
                    </div>

                    <div class="login-form__control">
                        <label
                            for="password"
                            class="login-form__label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="login-form__input"
                            placeholder="Password"
                            autocomplete="current-password"
                        >
                    </div>

                </div>

                <button
                    type="submit"
                    class="login-form__button"
                >
                    Entrar
                </button>

            </form>

        </div>

        <div class="login-page__visual" aria-hidden="true">

            <div class="login-page__image-placeholder">
                <span>Imagen de modelo</span>
            </div>

        </div>

    </div>

</section>

<?= $this->endSection() ?>