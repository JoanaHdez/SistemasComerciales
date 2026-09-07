<!-- =========================================================
     BUSCADOR DE CLIENTE
========================================================= -->

<section class="clinical-record-search">

    <div class="clinical-record-search__heading">

        <div class="clinical-record-search__icon" aria-hidden="true">

            <svg viewBox="0 0 24 24">

                <circle cx="11" cy="11" r="7"></circle>

                <path d="m20 20-4-4"></path>

            </svg>

        </div>


        <div>

            <h2>
                Buscar cliente
            </h2>

            <p>
                Busca por nombre, teléfono, correo o folio.
            </p>

        </div>

    </div>


    <form class="clinical-record-search__form" id="expediente-search-form" autocomplete="off">

        <div class="clinical-record-search__wrapper">

            <div class="clinical-record-search__control">

                <svg class="clinical-record-search__input-icon" viewBox="0 0 24 24" aria-hidden="true">

                    <circle cx="11" cy="11" r="7"></circle>

                    <path d="m20 20-4-4"></path>

                </svg>


                <input type="search" id="expediente-cliente" name="cliente"
                    placeholder="Nombre, teléfono, correo o folio..." aria-label="Buscar cliente">

            </div>


            <!-- =============================================
                 RESULTADOS DINÁMICOS
            ============================================== -->

            <div class="clinical-record-search-results" id="expediente-search-results" hidden></div>

        </div>


        <button type="submit" class="clinical-record-search__button">
            Buscar
        </button>

    </form>

</section>