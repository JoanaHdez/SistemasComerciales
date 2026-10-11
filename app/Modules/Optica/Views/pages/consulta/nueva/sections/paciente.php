<!-- =========================================================
     FICHA DEL PACIENTE SELECCIONADO
========================================================= -->

<section
    class="new-consultation-patient"
    id="new-consultation-patient"
    aria-label="Paciente seleccionado"
    hidden
>

    <div class="new-consultation-patient__header">

        <div>
            <span class="new-consultation-patient__eyebrow">
                PACIENTE SELECCIONADO
            </span>

            <h2>
                Información del paciente
            </h2>
        </div>

        <span class="new-consultation-patient__status">
            Seleccionado
        </span>

    </div>


    <div class="new-consultation-patient__identity">

        <div
            class="new-consultation-patient__avatar"
            id="new-consultation-patient-avatar"
        ></div>

        <div>
            <h3 id="new-consultation-patient-name"></h3>

            <span id="new-consultation-patient-folio"></span>
        </div>

    </div>


    <div class="new-consultation-patient__grid">

        <div class="new-consultation-patient__field">
            <span>Edad</span>
            <strong id="new-consultation-patient-age"></strong>
        </div>

        <div class="new-consultation-patient__field">
            <span>Teléfono</span>
            <strong id="new-consultation-patient-phone"></strong>
        </div>

        <div class="new-consultation-patient__field">
            <span>Folio</span>
            <strong id="new-consultation-patient-code"></strong>
        </div>

    </div>


    <div class="new-consultation-patient__graduation">

        <span>
            GRADUACIÓN VIGENTE
        </span>

        <strong id="new-consultation-patient-graduation"></strong>

        <small>
            Información de referencia para la nueva evaluación.
        </small>

    </div>

</section>