<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Configuración | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/configuracion.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="settings-page">

    <header class="settings-page__header">

        <div>

            <span class="settings-page__eyebrow">
                SISTEMA
            </span>

            <h1 class="settings-page__title">
                Configuración
            </h1>

            <p class="settings-page__description">
                Administra las preferencias generales y parámetros de funcionamiento de Opticool.
            </p>

        </div>

    </header>

    <div class="settings-layout">

        <!-- ==========================================
         DATOS DEL NEGOCIO
    =========================================== -->

        <section class="settings-card">

            <header class="settings-card__header">

                <div>
                    <span class="settings-card__eyebrow">
                        GENERAL
                    </span>

                    <h2 class="settings-card__title">
                        Datos del negocio
                    </h2>

                    <p class="settings-card__description">
                        Información general utilizada dentro del sistema.
                    </p>
                </div>

                <button type="button" class="settings-card__action">
                    Editar
                </button>

            </header>

            <div class="settings-info">

                <div class="settings-info__item">
                    <span>Nombre comercial</span>
                    <strong>Opticool</strong>
                </div>

                <div class="settings-info__item">
                    <span>Teléfono</span>
                    <strong>55 1234 5678</strong>
                </div>

                <div class="settings-info__item">
                    <span>Correo</span>
                    <strong>contacto@opticool.com</strong>
                </div>

                <div class="settings-info__item">
                    <span>Dirección</span>
                    <strong>
                        Av. Principal 125, Col. Centro
                    </strong>
                </div>

            </div>

        </section>


        <!-- ==========================================
         OPERACIÓN
    =========================================== -->

        <section class="settings-card">

            <header class="settings-card__header">

                <div>
                    <span class="settings-card__eyebrow">
                        OPERACIÓN
                    </span>

                    <h2 class="settings-card__title">
                        Preferencias generales
                    </h2>

                    <p class="settings-card__description">
                        Define algunos comportamientos generales de la operación.
                    </p>
                </div>

            </header>

            <div class="settings-options">

                <div class="settings-option">

                    <div>
                        <strong>
                            Alertas de stock bajo
                        </strong>

                        <p>
                            Mostrar avisos cuando un producto alcance
                            el nivel mínimo de existencia.
                        </p>
                    </div>

                    <label class="settings-switch">
                        <input type="checkbox" checked>
                        <span class="settings-switch__control"></span>
                    </label>

                </div>

                <div class="settings-option">

                    <div>
                        <strong>
                            Confirmar cancelaciones
                        </strong>

                        <p>
                            Solicitar confirmación antes de cancelar
                            ventas, citas o pedidos.
                        </p>
                    </div>

                    <label class="settings-switch">
                        <input type="checkbox" checked>
                        <span class="settings-switch__control"></span>
                    </label>

                </div>

                <div class="settings-option">

                    <div>
                        <strong>
                            Seguimiento de pedidos
                        </strong>

                        <p>
                            Mostrar alertas relacionadas con pedidos
                            pendientes o próximos a entrega.
                        </p>
                    </div>

                    <label class="settings-switch">
                        <input type="checkbox" checked>
                        <span class="settings-switch__control"></span>
                    </label>

                </div>

            </div>

        </section>


        <!-- ==========================================
         NOTIFICACIONES
    =========================================== -->

        <section class="settings-card">

            <header class="settings-card__header">

                <div>
                    <span class="settings-card__eyebrow">
                        NOTIFICACIONES
                    </span>

                    <h2 class="settings-card__title">
                        Avisos del sistema
                    </h2>

                    <p class="settings-card__description">
                        Selecciona qué eventos deben generar una notificación.
                    </p>
                </div>

            </header>

            <div class="settings-options">

                <div class="settings-option">

                    <div>
                        <strong>
                            Próximas citas
                        </strong>

                        <p>
                            Mostrar recordatorios de las citas programadas.
                        </p>
                    </div>

                    <label class="settings-switch">
                        <input type="checkbox" checked>
                        <span class="settings-switch__control"></span>
                    </label>

                </div>

                <div class="settings-option">

                    <div>
                        <strong>
                            Pedidos listos
                        </strong>

                        <p>
                            Avisar cuando un pedido cambie a estado listo para entrega.
                        </p>
                    </div>

                    <label class="settings-switch">
                        <input type="checkbox" checked>
                        <span class="settings-switch__control"></span>
                    </label>

                </div>

                <div class="settings-option">

                    <div>
                        <strong>
                            Productos agotados
                        </strong>

                        <p>
                            Generar una alerta cuando un producto quede sin existencia.
                        </p>
                    </div>

                    <label class="settings-switch">
                        <input type="checkbox" checked>
                        <span class="settings-switch__control"></span>
                    </label>

                </div>

            </div>

        </section>


        <!-- ==========================================
         SEGURIDAD
    =========================================== -->

        <section class="settings-card">

            <header class="settings-card__header">

                <div>
                    <span class="settings-card__eyebrow">
                        SEGURIDAD
                    </span>

                    <h2 class="settings-card__title">
                        Usuarios y acceso
                    </h2>

                    <p class="settings-card__description">
                        Administra el acceso de los usuarios al sistema.
                    </p>
                </div>

            </header>

            <div class="settings-access">

                <div>
                    <strong>
                        Usuarios y permisos
                    </strong>

                    <p>
                        Administra usuarios, roles y permisos para controlar
                        el acceso a los diferentes módulos.
                    </p>
                </div>

                <button type="button" class="settings-access__button">
                    Administrar usuarios
                </button>

            </div>

        </section>

    </div>

</section>

<?= $this->endSection() ?>