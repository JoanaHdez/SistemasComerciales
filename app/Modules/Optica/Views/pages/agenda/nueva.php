<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Nueva cita | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/nueva_cita.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="new-appointment-page">

    <header class="new-appointment-page__header">

        <div>

            <span class="new-appointment-page__eyebrow">
                AGENDA
            </span>

            <h1 class="new-appointment-page__title">
                Nueva cita
            </h1>

            <p class="new-appointment-page__description">
                Programa una nueva cita y registra la información necesaria
                para dar seguimiento al cliente.
            </p>

        </div>

        <a href="<?= base_url('optica/agenda') ?>" class="new-appointment-page__back">
            Volver a la agenda
        </a>

    </header>

    <form class="new-appointment-form">

        <div class="new-appointment-progress">

            <div class="new-appointment-progress__step new-appointment-progress__step--active">

                <span class="new-appointment-progress__number">
                    1
                </span>

                <div>
                    <strong>Paciente</strong>
                    <small>Seleccionar cliente</small>
                </div>

            </div>

            <div class="new-appointment-progress__line"></div>

            <div class="new-appointment-progress__step">

                <span class="new-appointment-progress__number">
                    2
                </span>

                <div>
                    <strong>Horario</strong>
                    <small>Fecha y hora</small>
                </div>

            </div>

            <div class="new-appointment-progress__line"></div>

            <div class="new-appointment-progress__step">

                <span class="new-appointment-progress__number">
                    3
                </span>

                <div>
                    <strong>Confirmación</strong>
                    <small>Resumen de cita</small>
                </div>

            </div>

        </div>

        <div class="new-appointment-layout">

            <div class="new-appointment-main">

                <!-- ==========================================
                 PACIENTE
            =========================================== -->

                <section class="new-appointment-card">

                    <div class="new-appointment-card__header">

                        <span class="new-appointment-card__icon">
                            P
                        </span>

                        <div>
                            <span class="new-appointment-card__eyebrow">
                                PASO 1
                            </span>

                            <h2 class="new-appointment-card__title">
                                Seleccionar paciente
                            </h2>

                            <p class="new-appointment-card__description">
                                Busca un cliente registrado o crea uno nuevo.
                            </p>
                        </div>

                    </div>

                    <div class="new-appointment-search">

                        <input type="search" class="new-appointment-search__input"
                            placeholder="Buscar por nombre, teléfono o correo">

                        <button type="button" class="new-appointment-search__button">
                            Buscar
                        </button>

                    </div>

                    <div class="new-appointment-patient">

                        <div class="new-appointment-patient__avatar">
                            ML
                        </div>

                        <div class="new-appointment-patient__content">

                            <span class="new-appointment-patient__eyebrow">
                                PACIENTE SELECCIONADO
                            </span>

                            <h3 class="new-appointment-patient__name">
                                María López Hernández
                            </h3>

                            <div class="new-appointment-patient__meta">

                                <span>
                                    55 1234 5678
                                </span>

                                <span>
                                    maria@example.com
                                </span>

                                <span>
                                    Expediente CLI-0001
                                </span>

                            </div>

                        </div>

                        <button type="button" class="new-appointment-patient__change">
                            Cambiar
                        </button>

                    </div>

                    <a href="<?= base_url('optica/clientes/nuevo') ?>" class="new-appointment-new-client">
                        + Registrar nuevo cliente
                    </a>

                </section>

                <!-- ==========================================
                 TIPO DE CITA
            =========================================== -->

                <section class="new-appointment-card">

                    <div class="new-appointment-card__header">

                        <span class="new-appointment-card__icon">
                            S
                        </span>

                        <div>
                            <span class="new-appointment-card__eyebrow">
                                SERVICIO
                            </span>

                            <h2 class="new-appointment-card__title">
                                Tipo de cita
                            </h2>

                            <p class="new-appointment-card__description">
                                Selecciona el motivo principal de la visita.
                            </p>
                        </div>

                    </div>

                    <div class="new-appointment-services">

                        <label class="new-appointment-service">

                            <input type="radio" name="tipo_cita" value="consulta-general" checked>

                            <span class="new-appointment-service__content">

                                <strong>
                                    Consulta general
                                </strong>

                                <small>
                                    Evaluación visual completa
                                </small>

                            </span>

                        </label>

                        <label class="new-appointment-service">

                            <input type="radio" name="tipo_cita" value="seguimiento">

                            <span class="new-appointment-service__content">

                                <strong>
                                    Seguimiento
                                </strong>

                                <small>
                                    Revisión de tratamiento o graduación
                                </small>

                            </span>

                        </label>

                        <label class="new-appointment-service">

                            <input type="radio" name="tipo_cita" value="entrega">

                            <span class="new-appointment-service__content">

                                <strong>
                                    Entrega de lentes
                                </strong>

                                <small>
                                    Entrega y ajuste de producto
                                </small>

                            </span>

                        </label>

                        <label class="new-appointment-service">

                            <input type="radio" name="tipo_cita" value="ajuste">

                            <span class="new-appointment-service__content">

                                <strong>
                                    Ajuste de armazón
                                </strong>

                                <small>
                                    Corrección, limpieza o mantenimiento
                                </small>

                            </span>

                        </label>

                        <label class="new-appointment-service">

                            <input type="radio" name="tipo_cita" value="garantia">

                            <span class="new-appointment-service__content">

                                <strong>
                                    Garantía
                                </strong>

                                <small>
                                    Revisión de producto o servicio
                                </small>

                            </span>

                        </label>

                    </div>

                </section>

                <!-- ==========================================
                 FECHA Y HORA
            =========================================== -->

                <section class="new-appointment-card">

                    <div class="new-appointment-card__header">

                        <span class="new-appointment-card__icon">
                            F
                        </span>

                        <div>
                            <span class="new-appointment-card__eyebrow">
                                PASO 2
                            </span>

                            <h2 class="new-appointment-card__title">
                                Fecha y horario
                            </h2>

                            <p class="new-appointment-card__description">
                                Selecciona la fecha y uno de los horarios disponibles.
                            </p>
                        </div>

                    </div>

                    <div class="new-appointment-date-grid">

                        <div class="new-appointment-field">

                            <label for="appointment-date">
                                Fecha
                            </label>

                            <input type="date" id="appointment-date" name="fecha" value="2026-08-04">

                        </div>

                        <div class="new-appointment-field">

                            <label for="appointment-professional">
                                Responsable
                            </label>

                            <select id="appointment-professional" name="responsable">
                                <option value="">
                                    Selecciona una opción
                                </option>

                                <option value="1" selected>
                                    Dra. Laura Gómez
                                </option>

                                <option value="2">
                                    Dr. Carlos Mendoza
                                </option>
                            </select>

                        </div>

                    </div>

                    <div class="new-appointment-schedule">

                        <span class="new-appointment-schedule__label">
                            Horarios disponibles
                        </span>

                        <div class="new-appointment-times">

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="09:00">

                                <span>09:00</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="09:30">

                                <span>09:30</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="10:00" checked>

                                <span>10:00</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="10:30">

                                <span>10:30</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="11:00">

                                <span>11:00</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="11:30">

                                <span>11:30</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="12:00">

                                <span>12:00</span>

                            </label>

                            <label class="new-appointment-time">

                                <input type="radio" name="hora" value="12:30" disabled>

                                <span>12:30</span>

                            </label>

                        </div>

                        <p class="new-appointment-schedule__hint">
                            Los horarios deshabilitados ya se encuentran ocupados.
                        </p>

                    </div>

                </section>

                <!-- ==========================================
                 OBSERVACIONES
            =========================================== -->

                <section class="new-appointment-card">

                    <div class="new-appointment-card__header">

                        <span class="new-appointment-card__icon">
                            O
                        </span>

                        <div>
                            <span class="new-appointment-card__eyebrow">
                                INFORMACIÓN ADICIONAL
                            </span>

                            <h2 class="new-appointment-card__title">
                                Observaciones
                            </h2>

                            <p class="new-appointment-card__description">
                                Agrega información relevante para la atención.
                            </p>
                        </div>

                    </div>

                    <div class="new-appointment-field">

                        <label for="appointment-notes">
                            Motivo u observaciones
                        </label>

                        <textarea id="appointment-notes" name="observaciones" rows="5"
                            placeholder="Escribe observaciones adicionales"></textarea>

                    </div>

                </section>

            </div>

            <!-- ==============================================
             RESUMEN
        =============================================== -->

            <aside class="new-appointment-summary">

                <span class="new-appointment-summary__eyebrow">
                    RESUMEN
                </span>

                <h2 class="new-appointment-summary__title">
                    Detalles de la cita
                </h2>

                <div class="new-appointment-summary__patient">

                    <div class="new-appointment-summary__avatar">
                        ML
                    </div>

                    <div>
                        <strong>
                            María López Hernández
                        </strong>

                        <span>
                            CLI-0001
                        </span>
                    </div>

                </div>

                <dl class="new-appointment-summary__details">

                    <div>
                        <dt>Servicio</dt>
                        <dd>Consulta general</dd>
                    </div>

                    <div>
                        <dt>Fecha</dt>
                        <dd>4 de agosto de 2026</dd>
                    </div>

                    <div>
                        <dt>Hora</dt>
                        <dd>10:00</dd>
                    </div>

                    <div>
                        <dt>Responsable</dt>
                        <dd>Dra. Laura Gómez</dd>
                    </div>

                    <div>
                        <dt>Duración estimada</dt>
                        <dd>30 minutos</dd>
                    </div>

                </dl>

                <div class="new-appointment-summary__notice">

                    <strong>
                        Horario disponible
                    </strong>

                    <p>
                        No existen otras citas registradas en este horario.
                    </p>

                </div>

                <div class="new-appointment-summary__actions">

                    <a href="<?= base_url('optica/agenda') ?>"
                        class="new-appointment-summary__button new-appointment-summary__button--secondary">
                        Cancelar
                    </a>

                    <button type="submit"
                        class="new-appointment-summary__button new-appointment-summary__button--primary">
                        Agendar cita
                    </button>

                </div>

            </aside>

        </div>

    </form>

</section>

<?= $this->endSection() ?>