<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

<?= $this->section('title') ?>
Graduación | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/clientes.css') ?>"
>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/graduacion.css') ?>"
>

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

        <nav
            class="clients-sidebar__nav"
            aria-label="Acciones de clientes"
        >

            <a
                href="<?= base_url('optica/clientes/nuevo') ?>"
                class="clients-sidebar__item"
            >
                <span class="clients-sidebar__icon">+</span>
                <span>Nuevo</span>
            </a>

            <a
                href="<?= base_url('optica/clientes') ?>"
                class="clients-sidebar__item"
            >
                <span class="clients-sidebar__icon">B</span>
                <span>Buscar</span>
            </a>

        </nav>

        <div class="clients-sidebar__footer">

            <a
                href="#"
                class="clients-sidebar__footer-link"
                aria-label="Agenda"
            >
                A
            </a>

            <a
                href="#"
                class="clients-sidebar__footer-link"
                aria-label="Perfil"
            >
                P
            </a>

            <a
                href="#"
                class="clients-sidebar__footer-link"
                aria-label="Configuración"
            >
                C
            </a>

        </div>

    </aside>

    <div class="clients-page__main">

        <nav
            class="clients-topbar"
            aria-label="Navegación principal"
        >

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

        <main class="graduacion-page">

            <form class="graduacion-form">

                <!-- =========================
                     GRADUACIÓN ACTUAL
                ========================== -->

                <section class="graduacion-section">

                    <h2 class="graduacion-section__title">
                        Graduación Actual
                    </h2>

                    <div class="graduacion-grid">

                        <div class="graduacion-left">

                            <h3>
                                Ojo Izquierdo
                            </h3>

                            <div class="eye-grid">

                                <div class="form-group">
                                    <label for="actual_oi_esfera">
                                        Esfera
                                    </label>

                                    <input
                                        type="text"
                                        id="actual_oi_esfera"
                                        name="actual_oi_esfera"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="actual_oi_cilindro">
                                        Cilindro
                                    </label>

                                    <input
                                        type="text"
                                        id="actual_oi_cilindro"
                                        name="actual_oi_cilindro"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="actual_oi_eje">
                                        Eje
                                    </label>

                                    <input
                                        type="text"
                                        id="actual_oi_eje"
                                        name="actual_oi_eje"
                                    >
                                </div>

                            </div>

                            <h3>
                                Ojo Derecho
                            </h3>

                            <div class="eye-grid">

                                <div class="form-group">
                                    <label for="actual_od_esfera">
                                        Esfera
                                    </label>

                                    <input
                                        type="text"
                                        id="actual_od_esfera"
                                        name="actual_od_esfera"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="actual_od_cilindro">
                                        Cilindro
                                    </label>

                                    <input
                                        type="text"
                                        id="actual_od_cilindro"
                                        name="actual_od_cilindro"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="actual_od_eje">
                                        Eje
                                    </label>

                                    <input
                                        type="text"
                                        id="actual_od_eje"
                                        name="actual_od_eje"
                                    >
                                </div>

                            </div>

                        </div>

                        <div class="graduacion-right">

                            <div class="form-group">
                                <label for="actual_adicion">
                                    Adición
                                </label>

                                <input
                                    type="text"
                                    id="actual_adicion"
                                    name="actual_adicion"
                                >
                            </div>

                            <div class="form-group">
                                <label for="actual_distancia_ocular">
                                    Distancia Ocular
                                </label>

                                <input
                                    type="text"
                                    id="actual_distancia_ocular"
                                    name="actual_distancia_ocular"
                                >
                            </div>

                            <div class="graduacion-actions">

                                <button
                                    type="button"
                                    class="graduacion-button"
                                >
                                    Omitir
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

                <!-- =========================
                     NUEVA GRADUACIÓN
                ========================== -->

                <section class="graduacion-section">

                    <h2 class="graduacion-section__title">
                        Nueva Graduación
                    </h2>

                    <div class="graduacion-grid">

                        <div class="graduacion-left">

                            <h3>
                                Ojo Izquierdo
                            </h3>

                            <div class="eye-grid">

                                <div class="form-group">
                                    <label for="nueva_oi_esfera">
                                        Esfera
                                    </label>

                                    <input
                                        type="text"
                                        id="nueva_oi_esfera"
                                        name="nueva_oi_esfera"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="nueva_oi_cilindro">
                                        Cilindro
                                    </label>

                                    <input
                                        type="text"
                                        id="nueva_oi_cilindro"
                                        name="nueva_oi_cilindro"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="nueva_oi_eje">
                                        Eje
                                    </label>

                                    <input
                                        type="text"
                                        id="nueva_oi_eje"
                                        name="nueva_oi_eje"
                                    >
                                </div>

                            </div>

                            <h3>
                                Ojo Derecho
                            </h3>

                            <div class="eye-grid">

                                <div class="form-group">
                                    <label for="nueva_od_esfera">
                                        Esfera
                                    </label>

                                    <input
                                        type="text"
                                        id="nueva_od_esfera"
                                        name="nueva_od_esfera"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="nueva_od_cilindro">
                                        Cilindro
                                    </label>

                                    <input
                                        type="text"
                                        id="nueva_od_cilindro"
                                        name="nueva_od_cilindro"
                                    >
                                </div>

                                <div class="form-group">
                                    <label for="nueva_od_eje">
                                        Eje
                                    </label>

                                    <input
                                        type="text"
                                        id="nueva_od_eje"
                                        name="nueva_od_eje"
                                    >
                                </div>

                            </div>

                        </div>

                        <div class="graduacion-right">

                            <div class="form-group">
                                <label for="nueva_adicion">
                                    Adición
                                </label>

                                <input
                                    type="text"
                                    id="nueva_adicion"
                                    name="nueva_adicion"
                                >
                            </div>

                            <div class="form-group">
                                <label for="nueva_distancia_ocular">
                                    Distancia Ocular
                                </label>

                                <input
                                    type="text"
                                    id="nueva_distancia_ocular"
                                    name="nueva_distancia_ocular"
                                >
                            </div>

                            <div class="form-group">
                                <label for="diagnostico">
                                    Diagnóstico
                                </label>

                                <input
                                    type="text"
                                    id="diagnostico"
                                    name="diagnostico"
                                >
                            </div>

                            <div class="graduacion-actions">

                                <button
                                    type="submit"
                                    class="graduacion-button"
                                >
                                    Guardar
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

            </form>

        </main>

    </div>

</section>

<?= $this->endSection() ?>