<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Graduación | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/graduacion.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="graduacion-page">

    <div class="graduacion-page__header">

        <div>
            <span class="graduacion-page__eyebrow">
                EXPEDIENTE CLÍNICO
            </span>

            <h1 class="graduacion-page__heading">
                Graduación
            </h1>

            <p class="graduacion-page__description">
                Registra la graduación actual y los resultados del nuevo examen visual.
            </p>
        </div>

        <a
            href="<?= base_url('optica/consulta') ?>"
            class="graduacion-page__back"
        >
            Volver a consulta
        </a>

    </div>

    <form class="graduacion-form">

        <section class="graduacion-section">

            <div class="graduacion-section__header">

                <span class="graduacion-section__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"></path>
                    </svg>
                </span>

                <div>
                    <h2 class="graduacion-section__title">
                        Graduación actual
                    </h2>

                    <p class="graduacion-section__description">
                        Captura la graduación que utiliza actualmente el cliente.
                    </p>
                </div>

            </div>

            <div class="graduacion-grid">

                <div class="graduacion-left">

                    <div class="eye-card">

                        <h3>Ojo izquierdo</h3>

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

                    </div>

                    <div class="eye-card">

                        <h3>Ojo derecho</h3>

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
                            Distancia ocular
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
                            class="graduacion-button graduacion-button--secondary"
                        >
                            Omitir
                        </button>
                    </div>

                </div>

            </div>

        </section>

        <section class="graduacion-section">

            <div class="graduacion-section__header">

                <span class="graduacion-section__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                    </svg>
                </span>

                <div>
                    <h2 class="graduacion-section__title">
                        Nueva graduación
                    </h2>

                    <p class="graduacion-section__description">
                        Registra los resultados obtenidos en el examen visual.
                    </p>
                </div>

            </div>

            <div class="graduacion-grid">

                <div class="graduacion-left">

                    <div class="eye-card">

                        <h3>Ojo izquierdo</h3>

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

                    </div>

                    <div class="eye-card">

                        <h3>Ojo derecho</h3>

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
                            Distancia ocular
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

                        <textarea
                            id="diagnostico"
                            name="diagnostico"
                            rows="4"
                        ></textarea>
                    </div>

                </div>

            </div>

        </section>

        <div class="graduacion-form__footer">

            <a
                href="<?= base_url('optica/consulta') ?>"
                class="graduacion-button graduacion-button--secondary"
            >
                Cancelar
            </a>

            <button
                type="submit"
                class="graduacion-button graduacion-button--primary"
            >
                Guardar graduación
            </button>

        </div>

    </form>

</section>

<?= $this->endSection() ?>