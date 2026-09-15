<!-- =========================================================
     FILTROS DEL HISTORIAL
========================================================= -->

<section class="history-filters">

    <!-- =====================================================
         BÚSQUEDA
    ====================================================== -->

    <div class="history-search">

        <label
            for="history-search"
            class="sr-only"
        >
            Buscar dentro del historial
        </label>

        <input
            type="search"
            id="history-search"
            class="history-search__input"
            placeholder="Buscar por diagnóstico, fecha u observación..."
            autocomplete="off"
        >

    </div>


    <!-- =====================================================
         FILTROS
    ====================================================== -->

    <div class="history-filter-group">

        <!-- AÑO -->

        <select
            id="history-filter-year"
            class="history-filter"
            aria-label="Filtrar por año"
        >

            <option value="all">
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


        <!-- TIPO -->

        <select
            id="history-filter-type"
            class="history-filter"
            aria-label="Filtrar por tipo de consulta"
        >

            <option value="all">
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