<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

<?= $this->section('title') ?>
Nuevo Cliente | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/clientes.css') ?>">

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/nuevo_cliente.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="clients-page">

    <aside class="clients-sidebar">

        <div class="clients-sidebar__brand">

            <div class="clients-sidebar__logo">
                Opticool
            </div>

            <span class="clients-sidebar__subtitle">
                Óptica
            </span>

        </div>

        <nav class="clients-sidebar__nav" aria-label="Acciones de clientes">

            <a href="<?= base_url('optica/clientes/nuevo') ?>" class="clients-sidebar__item">
                <span class="clients-sidebar__icon">+</span>
                <span>Nuevo</span>
            </a>

            <a href="<?= base_url('optica/clientes') ?>" class="clients-sidebar__item">
                <span class="clients-sidebar__icon">B</span>
                <span>Buscar</span>
            </a>

        </nav>

        <div class="clients-sidebar__footer">

            <a href="#" class="clients-sidebar__footer-link" aria-label="Agenda">
                A
            </a>

            <a href="#" class="clients-sidebar__footer-link" aria-label="Perfil">
                P
            </a>

            <a href="#" class="clients-sidebar__footer-link" aria-label="Configuración">
                C
            </a>

        </div>

    </aside>

    <div class="clients-page__main">

        <nav class="clients-topbar" aria-label="Navegación principal">
            <a href="<?= base_url('optica/menu') ?>">
                Dashboard
            </a>

            <a href="#">
                Pedidos
            </a>

            <a href="#">
                Inventario
            </a>

            <a href="#">
                Compras
            </a>

            <a href="#">
                Reportes
            </a>
        </nav>

        <main class="new-client-page__content">

            <div class="new-client-page">

                <h1 class="new-client-page__heading">
                    Nuevo Cliente
                </h1>

                <form class="new-client-form">

                    <section class="new-client-section">

                        <h2 class="new-client-section__title">
                            Datos Personales
                        </h2>

                        <div class="personal-data">

    <div class="form-group">
        <label for="apellido_paterno">
            Apellido Paterno
        </label>

        <input
            type="text"
            id="apellido_paterno"
            name="apellido_paterno"
        >
    </div>

    <div class="form-group">
        <label for="apellido_materno">
            Apellido Materno
        </label>

        <input
            type="text"
            id="apellido_materno"
            name="apellido_materno"
        >
    </div>

    <div class="form-group">
        <label for="nombre">
            Nombre
        </label>

        <input
            type="text"
            id="nombre"
            name="nombre"
        >
    </div>

</div>

                    </section>

                    <section class="new-client-section">

                        <h2 class="new-client-section__title">
                            Historial Clínico
                        </h2>

                        <div class="clinical-history">

                            <!-- Aquí van todos los campos del historial -->

                        </div>

                    </section>

                    <div class="new-client-page__actions">

                        <button type="submit" class="new-client-page__button">
                            Siguiente
                        </button>

                    </div>

                </form>

            </div>

        </main>

    </div>

</section>

<?= $this->endSection() ?>