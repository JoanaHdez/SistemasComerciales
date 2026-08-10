<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Perfil | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/perfil.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="profile-page">

    <header class="profile-page__header">

        <div>

            <span class="profile-page__eyebrow">
                CUENTA
            </span>

            <h1 class="profile-page__title">
                Mi perfil
            </h1>

            <p class="profile-page__description">
                Consulta y administra la información de tu cuenta dentro del sistema.
            </p>

        </div>

    </header>

    <div class="profile-layout">

    <!-- ==========================================
         RESUMEN DEL PERFIL
    =========================================== -->

    <section class="profile-card profile-card--summary">

        <div class="profile-summary">

            <div class="profile-summary__avatar">
                JH
            </div>

            <div class="profile-summary__info">

                <span class="profile-summary__eyebrow">
                    USUARIO ACTIVO
                </span>

                <h2 class="profile-summary__name">
                    Joana Hernández
                </h2>

                <p class="profile-summary__role">
                    Administración
                </p>

            </div>

        </div>

        <span class="profile-status">
            Cuenta activa
        </span>

    </section>


    <!-- ==========================================
         INFORMACIÓN PERSONAL
    =========================================== -->

    <section class="profile-card">

        <header class="profile-card__header">

            <div>
                <span class="profile-card__eyebrow">
                    INFORMACIÓN PERSONAL
                </span>

                <h2 class="profile-card__title">
                    Datos del usuario
                </h2>
            </div>

            <button
                type="button"
                class="profile-card__action"
            >
                Editar
            </button>

        </header>

        <div class="profile-info">

            <div class="profile-info__item">
                <span>Nombre</span>
                <strong>Joana Hernández</strong>
            </div>

            <div class="profile-info__item">
                <span>Correo electrónico</span>
                <strong>joana@opticool.com</strong>
            </div>

            <div class="profile-info__item">
                <span>Teléfono</span>
                <strong>55 1234 5678</strong>
            </div>

            <div class="profile-info__item">
                <span>Puesto</span>
                <strong>Administración</strong>
            </div>

        </div>

    </section>


    <!-- ==========================================
         INFORMACIÓN DE LA CUENTA
    =========================================== -->

    <section class="profile-card">

        <header class="profile-card__header">

            <div>
                <span class="profile-card__eyebrow">
                    CUENTA
                </span>

                <h2 class="profile-card__title">
                    Acceso al sistema
                </h2>
            </div>

        </header>

        <div class="profile-info">

            <div class="profile-info__item">
                <span>Usuario</span>
                <strong>joana</strong>
            </div>

            <div class="profile-info__item">
                <span>Rol</span>
                <strong>Administrador</strong>
            </div>

            <div class="profile-info__item">
                <span>Estado</span>
                <strong>Activo</strong>
            </div>

            <div class="profile-info__item">
                <span>Último acceso</span>
                <strong>09/08/2026 · 09:15 PM</strong>
            </div>

        </div>

    </section>


    <!-- ==========================================
         SEGURIDAD
    =========================================== -->

    <section class="profile-card">

        <header class="profile-card__header">

            <div>
                <span class="profile-card__eyebrow">
                    SEGURIDAD
                </span>

                <h2 class="profile-card__title">
                    Contraseña
                </h2>
            </div>

        </header>

        <div class="profile-security">

            <div>
                <strong>
                    Contraseña de acceso
                </strong>

                <p>
                    Actualiza periódicamente tu contraseña para mantener
                    protegida tu cuenta.
                </p>
            </div>

            <button
                type="button"
                class="profile-security__button"
            >
                Cambiar contraseña
            </button>

        </div>

    </section>

</div>

</section>

<?= $this->endSection() ?>