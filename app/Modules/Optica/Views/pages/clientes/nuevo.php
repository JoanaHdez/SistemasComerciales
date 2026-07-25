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
                                    name="apellido_paterno">
                            </div>

                            <div class="form-group">
                                <label for="apellido_materno">
                                    Apellido Materno
                                </label>

                                <input
                                    type="text"
                                    id="apellido_materno"
                                    name="apellido_materno">
                            </div>

                            <div class="form-group">
                                <label for="nombre">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre">
                            </div>

                            <div class="form-group">
                                <label for="fecha_nacimiento">
                                    Fecha de Nacimiento
                                </label>

                                <input
                                    type="date"
                                    id="fecha_nacimiento"
                                    name="fecha_nacimiento">
                            </div>

                            <div class="form-group">
                                <label for="telefono">
                                    Teléfono
                                </label>

                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono">
                            </div>

                            <div class="form-group">
                                <label for="ocupacion">
                                    Ocupación
                                </label>

                                <input
                                    type="text"
                                    id="ocupacion"
                                    name="ocupacion">
                            </div>

                            <div class="form-group form-group--full">
                                <label for="domicilio">
                                    Domicilio
                                </label>

                                <input
                                    type="text"
                                    id="domicilio"
                                    name="domicilio">
                            </div>

                        </div>

                    </section>

                    <section class="new-client-section">

                        <h2 class="new-client-section__title">
                            Historial Clínico
                        </h2>

                        <div class="clinical-history">

                            <div class="form-group">
                                <label for="fecha_historial">
                                    Fecha
                                </label>

                                <input
                                    type="date"
                                    id="fecha_historial"
                                    name="fecha_historial">
                            </div>

                            <div class="form-group">
                                <span class="form-group__label">
                                    ¿Actualmente usa lentes?
                                </span>

                                <div class="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="usa_lentes_actualmente"
                                            value="si">
                                        Sí
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="usa_lentes_actualmente"
                                            value="no">
                                        No
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tipo_lente">
                                    Tipo de lente
                                </label>

                                <select
                                    id="tipo_lente"
                                    name="tipo_lente">
                                    <option value="">
                                        Selecciona una opción
                                    </option>

                                    <option value="monofocal">
                                        Monofocal
                                    </option>

                                    <option value="bifocal">
                                        Bifocal
                                    </option>

                                    <option value="progresivo">
                                        Progresivo
                                    </option>

                                    <option value="contacto">
                                        Lente de contacto
                                    </option>

                                    <option value="otro">
                                        Otro
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <span class="form-group__label">
                                    ¿Ha usado lentes anteriormente?
                                </span>

                                <div class="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="uso_lentes_anteriormente"
                                            value="si">
                                        Sí
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="uso_lentes_anteriormente"
                                            value="no">
                                        No
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tiempo_uso_lentes">
                                    ¿Hace cuánto tiempo?
                                </label>

                                <input
                                    type="text"
                                    id="tiempo_uso_lentes"
                                    name="tiempo_uso_lentes">
                            </div>

                            <div class="form-group">
                                <span class="form-group__label">
                                    Experiencia laboral
                                </span>

                                <div class="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="experiencia_laboral"
                                            value="si">
                                        Sí
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="experiencia_laboral"
                                            value="no">
                                        No
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tipo_exposicion">
                                    Tipo de exposición
                                </label>

                                <input
                                    type="text"
                                    id="tipo_exposicion"
                                    name="tipo_exposicion">
                            </div>

                            <div class="form-group">
                                <label for="antecedentes_patologicos">
                                    Antecedentes patológicos
                                </label>

                                <input
                                    type="text"
                                    id="antecedentes_patologicos"
                                    name="antecedentes_patologicos">
                            </div>

                            <div class="form-group">
                                <label for="antecedentes_familiares">
                                    Antecedentes familiares
                                </label>

                                <input
                                    type="text"
                                    id="antecedentes_familiares"
                                    name="antecedentes_familiares">
                            </div>

                        </div>

                    </section>

                    <button
    type="button"
    class="new-client-page__button"
    onclick="window.location.href='<?= base_url('optica/clientes/nuevo/graduacion') ?>'"
>
    Siguiente
</button>

                </form>

            </div>

        </main>

    </div>

</section>

<?= $this->endSection() ?>