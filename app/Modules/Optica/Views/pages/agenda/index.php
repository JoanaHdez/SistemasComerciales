<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Agenda | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/agenda.css') ?>">

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

        <button
            type="button"
            class="agenda-page__button"
            id="open-appointment-modal"
        >
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

                    <h2
                        class="agenda-calendar__title"
                        id="calendar-title"
                    ></h2>

                </div>

                <div class="agenda-calendar__navigation">

                    <button
                        type="button"
                        class="agenda-calendar__nav"
                        id="calendar-prev"
                        aria-label="Mes anterior"
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        class="agenda-calendar__today"
                        id="calendar-today"
                    >
                        Hoy
                    </button>

                    <button
                        type="button"
                        class="agenda-calendar__nav"
                        id="calendar-next"
                        aria-label="Mes siguiente"
                    >
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

            <div
                class="agenda-calendar-grid"
                id="calendar-grid"
            ></div>

        </section>

        <aside class="agenda-sidebar">

            <span class="agenda-calendar__eyebrow">
                PRÓXIMAS CITAS
            </span>

            <h2 class="agenda-calendar__title">
                Citas programadas
            </h2>

            <p>
                Aquí mostraremos las próximas citas registradas.
            </p>

        </aside>

    </div>

</section>

<?= $this->endSection() ?>

