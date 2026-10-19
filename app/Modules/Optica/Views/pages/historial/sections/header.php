<!-- =========================================================
     ENCABEZADO
========================================================= -->

<header class="history-page__header">

    <div>

        <span class="history-page__eyebrow">
            CONSULTAS REGISTRADAS
        </span>

        <h1 class="history-page__title">
            Historial Clínico
        </h1>

        <p class="history-page__description">
            Consulta el historial completo de evaluaciones,
            diagnósticos, graduaciones y observaciones del paciente.
        </p>

    </div>


    <div class="history-page__actions">

        <a href="<?= base_url('optica/consulta/expediente') ?>" id="history-back-to-record" class="
        history-page__button
        history-page__button--secondary
    ">
            Volver al expediente
        </a>


        <a href="<?= base_url('optica/consulta/nueva') ?>" id="history-new-consultation" class="
        history-page__button
        history-page__button--primary
    ">
            Nueva consulta
        </a>

    </div>

</header>