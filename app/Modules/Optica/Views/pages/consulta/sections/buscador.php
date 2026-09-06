<!-- =========================================================
     BUSCADOR
========================================================= -->

<section class="consulta-card consulta-search-card">

    <div class="consulta-card-heading">

        <div
            class="consulta-heading-icon"
            aria-hidden="true"
        >

            <svg viewBox="0 0 24 24">
                <circle
                    cx="11"
                    cy="11"
                    r="7"
                ></circle>

                <path
                    d="m20 20-4-4"
                ></path>
            </svg>

        </div>

        <div>

            <h2>
                Buscar cliente
            </h2>

            <p>
                Ingresa el nombre, teléfono o número de cliente.
            </p>

        </div>

    </div>


    <form
        class="consulta-search-form"
        id="consulta-search-form"
        autocomplete="off"
    >

        <div class="consulta-search-wrapper">

            <div class="consulta-search-control">

                <svg
                    class="consulta-search-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="7"
                    ></circle>

                    <path
                        d="m20 20-4-4"
                    ></path>
                </svg>


                <input
                    type="search"
                    name="cliente"
                    id="consulta-cliente"
                    placeholder="Ej. María López o 55 1234 5678"
                    autocomplete="off"
                    aria-controls="consulta-search-results"
                    aria-expanded="false"
                >

            </div>


            <!-- Resultados dinámicos -->

            <div
                class="consulta-search-results"
                id="consulta-search-results"
                hidden
            ></div>

        </div>


        <button
            type="submit"
            class="consulta-search-button"
        >
            Buscar
        </button>

    </form>

</section>