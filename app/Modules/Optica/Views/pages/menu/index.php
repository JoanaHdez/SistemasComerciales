<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

<?= $this->section('title') ?>
Menú principal | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/menu.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="main-menu">

    <div class="main-menu__decorations" aria-hidden="true">
        <span class="main-menu__decoration main-menu__decoration--top-left"></span>
        <span class="main-menu__decoration main-menu__decoration--top-center"></span>
        <span class="main-menu__decoration main-menu__decoration--top-right"></span>
        <span class="main-menu__decoration main-menu__decoration--middle-right"></span>
        <span class="main-menu__decoration main-menu__decoration--bottom-left"></span>
        <span class="main-menu__decoration main-menu__decoration--bottom-right"></span>
    </div>

    <div class="main-menu__container">

        <nav class="main-menu__nav" aria-label="Navegación principal">
            <a href="#" class="main-menu__nav-link">Dashboard</a>
            <a href="#" class="main-menu__nav-link">Pedidos</a>
            <a href="#" class="main-menu__nav-link">Inventario</a>
            <a href="#" class="main-menu__nav-link">Compras</a>
            <a href="#" class="main-menu__nav-link">Reportes</a>
        </nav>

        <div class="main-menu__brand">
            <div class="main-menu__logo-placeholder">
                Opticool
            </div>

            <p class="main-menu__subtitle">
                Óptica
            </p>
        </div>

        <div class="main-menu__actions">

            <a
                href="<?= base_url('optica/clientes') ?>"
                class="main-menu__button">
                Cliente
            </a>

            <a href="<?= base_url('optica/consulta') ?>" class="main-menu__button">
                Consulta
            </a>

            <a href="#" class="main-menu__button">
                Agenda
            </a>

            <a href="#" class="main-menu__button">
                Nueva Venta
            </a>

        </div>

        <div class="main-menu__footer-actions" aria-label="Acciones secundarias">

            <a href="#" class="main-menu__footer-icon" aria-label="Configuración">
                <span>CF</span>
            </a>

            <a href="#" class="main-menu__footer-icon" aria-label="Perfil">
                <span>PF</span>
            </a>

            <a href="#" class="main-menu__footer-icon" aria-label="Salir">
                <span>SA</span>
            </a>

        </div>

    </div>

</section>

<?= $this->endSection() ?>