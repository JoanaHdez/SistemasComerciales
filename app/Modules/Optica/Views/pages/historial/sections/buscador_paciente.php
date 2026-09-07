<!-- =========================================================
     BUSCADOR DE PACIENTE
========================================================= -->

<section class="history-patient-search">

    <div class="history-patient-search__heading">

        <div class="history-patient-search__icon" aria-hidden="true">

            <svg viewBox="0 0 24 24">

                <circle cx="11" cy="11" r="7"></circle>

                <path d="m20 20-4-4"></path>

            </svg>

        </div>


        <div>

            <h2>
                Buscar paciente
            </h2>

            <p>
                Busca por nombre, teléfono, correo o folio.
            </p>

        </div>

    </div>


    <form class="history-patient-search__form" id="history-patient-search-form" autocomplete="off">

        <div class="history-patient-search__wrapper">

            <div class="history-patient-search__control">

                <svg class="history-patient-search__input-icon" viewBox="0 0 24 24" aria-hidden="true">

                    <circle cx="11" cy="11" r="7"></circle>

                    <path d="m20 20-4-4"></path>

                </svg>


                <input type="search" id="history-patient-search" name="paciente"
                    placeholder="Nombre, teléfono, correo o folio..." aria-label="Buscar paciente"
                    aria-expanded="false">

            </div>


            <div class="history-patient-search-results" id="history-patient-search-results" hidden></div>

        </div>


        <button type="submit" class="history-patient-search__button">
            Buscar
        </button>

    </form>

</section>