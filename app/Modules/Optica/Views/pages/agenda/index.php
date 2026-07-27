<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Agenda | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/agenda.css') ?>">
<link rel="stylesheet" href="<?= base_url('assets/optica/css/components/modal.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="agenda-page">

    <div class="agenda-page__header">

        <div>

            <span class="agenda-page__eyebrow">
                GESTIÓN DE CITAS
            </span>

            <h1 class="agenda-page__title">
                Agenda
            </h1>

            <p class="agenda-page__description">
                Administra las citas de los clientes, consulta la disponibilidad del día
                y programa nuevas consultas de manera sencilla.
            </p>

        </div>

        <button type="button" class="agenda-page__button" id="open-appointment-modal">
            + Nueva cita
        </button>

    </div>

    <div class="agenda-layout">

        <section class="agenda-calendar">

            <div class="agenda-calendar__header">

                <div>

                    <span class="agenda-calendar__eyebrow">
                        CALENDARIO
                    </span>

                    <h2 class="agenda-calendar__title" id="calendar-title"></h2>

                </div>

                <div class="agenda-calendar__navigation">

                    <button type="button" class="agenda-calendar__nav" id="calendar-prev" aria-label="Mes anterior">
                        ←
                    </button>

                    <button type="button" class="agenda-calendar__today" id="calendar-today">
                        Hoy
                    </button>

                    <button type="button" class="agenda-calendar__nav" id="calendar-next" aria-label="Mes siguiente">
                        →
                    </button>

                </div>

            </div>

            <div class="agenda-weekdays">

                <span>Lun</span>
                <span>Mar</span>
                <span>Mié</span>
                <span>Jue</span>
                <span>Vie</span>
                <span>Sáb</span>
                <span>Dom</span>

            </div>

            <div class="agenda-calendar-grid" id="calendar-grid"></div>

        </section>

        <aside class="agenda-sidebar">

            <div class="agenda-sidebar__header">

                <span class="agenda-sidebar__eyebrow">
                    CITAS DEL DÍA
                </span>

                <h2 class="agenda-sidebar__title" id="selected-date-title">
                    Selecciona un día
                </h2>

                <p class="agenda-sidebar__summary" id="selected-date-summary">
                    Consulta las citas programadas para la fecha seleccionada.
                </p>

            </div>

            <div class="agenda-appointments" id="appointments-list">

                <div class="agenda-empty">

                    <span class="agenda-empty__icon">
                        📅
                    </span>

                    <h3 class="agenda-empty__title">
                        Sin fecha seleccionada
                    </h3>

                    <p class="agenda-empty__text">
                        Selecciona un día del calendario para consultar sus citas.
                    </p>

                </div>

            </div>

            <button type="button" class="agenda-sidebar__button" id="sidebar-new-appointment">
                + Agendar cita
            </button>

        </aside>

    </div>

</section>

<?= view(
    'App\Modules\Optica\Views\components\agenda\appointment-modal'
) ?>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

<script src="<?= base_url('assets/optica/js/components/modal.js') ?>"></script>
<script src="<?= base_url('assets/optica/js/agenda.js') ?>"></script>


<?= $this->endSection() ?>