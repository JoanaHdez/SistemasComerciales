<!-- =========================================================
     SELECCIÓN DEL PACIENTE
========================================================= -->

<section class="new-consultation-search">

    <div class="new-consultation-search__header">

        <div class="new-consultation-search__number">
            01
        </div>

        <div>

            <h2>
                Selección del paciente
            </h2>

            <p>
                Busca al paciente que recibirá la nueva consulta.
            </p>

        </div>

    </div>


    <div class="new-consultation-search__content">

        <label for="new-consultation-patient-search" class="new-consultation-search__label">
            Buscar paciente
        </label>


        <div class="new-consultation-search__input-wrapper">

            <span class="new-consultation-search__icon" aria-hidden="true">
                &#9906;
            </span>


            <input type="search" id="new-consultation-patient-search" class="new-consultation-search__input"
                placeholder="Nombre, teléfono o folio del paciente..." autocomplete="off"
                aria-controls="new-consultation-patient-results" aria-expanded="false">


            <div class="new-consultation-search__results" id="new-consultation-patient-results" hidden></div>

        </div>


        <p class="new-consultation-search__help">
            Selecciona un paciente registrado para continuar.
        </p>

    </div>

</section>