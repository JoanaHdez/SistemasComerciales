<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Historial Clínico | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/historial.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="history-page">

    <header class="history-page__header">

        <div>

            <span class="history-page__eyebrow">
                CONSULTAS REGISTRADAS
            </span>

            <h1 class="history-page__title">
                Historial Clínico
            </h1>

            <p class="history-page__description">
                Consulta el historial completo de evaluaciones, diagnósticos,
                graduaciones y observaciones del paciente.
            </p>

        </div>

        <div class="history-page__actions">

            <a
                href="<?= base_url('optica/consulta/expediente') ?>"
                class="history-page__button history-page__button--secondary"
            >
                Volver al expediente
            </a>

            <button
                type="button"
                class="history-page__button history-page__button--primary"
            >
                Nueva consulta
            </button>

        </div>

    </header>

    <div class="history-layout">

    <section class="history-patient">

        <div class="history-patient__avatar">
            ML
        </div>

        <div class="history-patient__content">

            <span class="history-patient__eyebrow">
                PACIENTE
            </span>

            <h2 class="history-patient__name">
                María López Hernández
            </h2>

            <div class="history-patient__meta">

                <span>
                    <strong>Folio:</strong>
                    CLI-0001
                </span>

                <span>
                    <strong>Edad:</strong>
                    34 años
                </span>

                <span>
                    <strong>Total de consultas:</strong>
                    5
                </span>

            </div>

        </div>

        <div class="history-patient__summary">

            <span class="history-patient__summary-label">
                Última consulta
            </span>

            <strong>
                22/07/2026
            </strong>

        </div>

    </section>

    <section class="history-filters">

        <div class="history-search">

            <label
                for="history-search"
                class="sr-only"
            >
                Buscar en historial
            </label>

            <input
                type="search"
                id="history-search"
                class="history-search__input"
                placeholder="Buscar por diagnóstico, fecha u observación"
            >

        </div>

        <div class="history-filter-group">

            <select class="history-filter">
                <option value="">
                    Todos los años
                </option>

                <option value="2026">
                    2026
                </option>

                <option value="2025">
                    2025
                </option>

                <option value="2024">
                    2024
                </option>
            </select>

            <select class="history-filter">
                <option value="">
                    Todos los tipos
                </option>

                <option value="general">
                    Consulta general
                </option>

                <option value="seguimiento">
                    Seguimiento
                </option>

                <option value="graduacion">
                    Actualización de graduación
                </option>
            </select>

        </div>

    </section>

    <section class="history-timeline">

        <div class="history-year">

            <div class="history-year__header">

                <span class="history-year__label">
                    2026
                </span>

                <span class="history-year__count">
                    3 consultas
                </span>

            </div>

            <div class="history-year__entries">

                <article class="history-entry history-entry--graduation">

                    <div class="history-entry__marker"></div>

                    <div class="history-entry__card">

                        <div class="history-entry__header">

                            <div>

                                <span class="history-entry__type">
                                    ACTUALIZACIÓN DE GRADUACIÓN
                                </span>

                                <h3 class="history-entry__title">
                                    Consulta general
                                </h3>

                            </div>

                            <time class="history-entry__date">
                                22 julio 2026
                            </time>

                        </div>

                        <div class="history-entry__content">

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Diagnóstico
                                </span>

                                <p>
                                    Miopía y astigmatismo bilateral.
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Evolución
                                </span>

                                <p>
                                    Se detectó aumento de graduación en ambos ojos.
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Graduación
                                </span>

                                <p>
                                    OD -1.75 / OI -2.00
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Observaciones
                                </span>

                                <p>
                                    Se recomienda cambio de lentes y revisión en seis meses.
                                </p>

                            </div>

                        </div>

                        <div class="history-entry__footer">

                            <span class="history-entry__status">
                                Finalizada
                            </span>

                            <div class="history-entry__actions">

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Ver consulta
                                </button>

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Imprimir
                                </button>

                            </div>

                        </div>

                    </div>

                </article>

                <article class="history-entry history-entry--follow-up">

                    <div class="history-entry__marker"></div>

                    <div class="history-entry__card">

                        <div class="history-entry__header">

                            <div>

                                <span class="history-entry__type">
                                    SEGUIMIENTO
                                </span>

                                <h3 class="history-entry__title">
                                    Revisión por fatiga visual
                                </h3>

                            </div>

                            <time class="history-entry__date">
                                15 marzo 2026
                            </time>

                        </div>

                        <div class="history-entry__content">

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Diagnóstico
                                </span>

                                <p>
                                    Fatiga visual asociada a exposición prolongada a pantallas.
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Graduación
                                </span>

                                <p>
                                    Sin cambios significativos.
                                </p>

                            </div>

                            <div class="history-entry__detail history-entry__detail--full">

                                <span class="history-entry__detail-label">
                                    Observaciones
                                </span>

                                <p>
                                    Se recomienda realizar pausas visuales y utilizar filtro de luz azul.
                                </p>

                            </div>

                        </div>

                        <div class="history-entry__footer">

                            <span class="history-entry__status">
                                Finalizada
                            </span>

                            <div class="history-entry__actions">

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Ver consulta
                                </button>

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Imprimir
                                </button>

                            </div>

                        </div>

                    </div>

                </article>

                <article class="history-entry history-entry--general">

                    <div class="history-entry__marker"></div>

                    <div class="history-entry__card">

                        <div class="history-entry__header">

                            <div>

                                <span class="history-entry__type">
                                    CONSULTA GENERAL
                                </span>

                                <h3 class="history-entry__title">
                                    Revisión periódica
                                </h3>

                            </div>

                            <time class="history-entry__date">
                                10 enero 2026
                            </time>

                        </div>

                        <div class="history-entry__content">

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Diagnóstico
                                </span>

                                <p>
                                    Condición visual estable.
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Graduación
                                </span>

                                <p>
                                    Se conserva graduación anterior.
                                </p>

                            </div>

                            <div class="history-entry__detail history-entry__detail--full">

                                <span class="history-entry__detail-label">
                                    Observaciones
                                </span>

                                <p>
                                    Continuar con lentes actuales y revisión anual.
                                </p>

                            </div>

                        </div>

                        <div class="history-entry__footer">

                            <span class="history-entry__status">
                                Finalizada
                            </span>

                            <div class="history-entry__actions">

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Ver consulta
                                </button>

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Imprimir
                                </button>

                            </div>

                        </div>

                    </div>

                </article>

            </div>

        </div>

        <div class="history-year">

            <div class="history-year__header">

                <span class="history-year__label">
                    2025
                </span>

                <span class="history-year__count">
                    1 consulta
                </span>

            </div>

            <div class="history-year__entries">

                <article class="history-entry history-entry--follow-up">

                    <div class="history-entry__marker"></div>

                    <div class="history-entry__card">

                        <div class="history-entry__header">

                            <div>

                                <span class="history-entry__type">
                                    SEGUIMIENTO
                                </span>

                                <h3 class="history-entry__title">
                                    Revisión de graduación
                                </h3>

                            </div>

                            <time class="history-entry__date">
                                14 febrero 2025
                            </time>

                        </div>

                        <div class="history-entry__content">

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Diagnóstico
                                </span>

                                <p>
                                    Fatiga visual leve.
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Graduación
                                </span>

                                <p>
                                    Sin cambios.
                                </p>

                            </div>

                        </div>

                        <div class="history-entry__footer">

                            <span class="history-entry__status">
                                Finalizada
                            </span>

                            <div class="history-entry__actions">

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Ver consulta
                                </button>

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Imprimir
                                </button>

                            </div>

                        </div>

                    </div>

                </article>

            </div>

        </div>

        <div class="history-year">

            <div class="history-year__header">

                <span class="history-year__label">
                    2024
                </span>

                <span class="history-year__count">
                    1 consulta
                </span>

            </div>

            <div class="history-year__entries">

                <article class="history-entry history-entry--initial">

                    <div class="history-entry__marker"></div>

                    <div class="history-entry__card">

                        <div class="history-entry__header">

                            <div>

                                <span class="history-entry__type">
                                    PRIMERA CONSULTA
                                </span>

                                <h3 class="history-entry__title">
                                    Evaluación inicial
                                </h3>

                            </div>

                            <time class="history-entry__date">
                                8 agosto 2024
                            </time>

                        </div>

                        <div class="history-entry__content">

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Diagnóstico
                                </span>

                                <p>
                                    Miopía bilateral.
                                </p>

                            </div>

                            <div class="history-entry__detail">

                                <span class="history-entry__detail-label">
                                    Graduación inicial
                                </span>

                                <p>
                                    OD -1.25 / OI -1.50
                                </p>

                            </div>

                            <div class="history-entry__detail history-entry__detail--full">

                                <span class="history-entry__detail-label">
                                    Observaciones
                                </span>

                                <p>
                                    Se indican lentes de uso diario.
                                </p>

                            </div>

                        </div>

                        <div class="history-entry__footer">

                            <span class="history-entry__status">
                                Finalizada
                            </span>

                            <div class="history-entry__actions">

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Ver consulta
                                </button>

                                <button
                                    type="button"
                                    class="history-entry__action"
                                >
                                    Imprimir
                                </button>

                            </div>

                        </div>

                    </div>

                </article>

            </div>

        </div>

    </section>

</div>

</section>

<?= $this->endSection() ?>