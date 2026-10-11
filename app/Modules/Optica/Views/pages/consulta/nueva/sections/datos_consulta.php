<!-- =========================================================
     SECCIÓN 02 - DATOS DE LA CONSULTA
========================================================= -->

<section
    class="new-consultation-data"
    id="new-consultation-data"
>

    <div class="new-consultation-data__header">

        <div class="new-consultation-data__number">
            02
        </div>

        <div>
            <h2>Datos de la consulta</h2>

            <p>
                Registra la información general de la
                atención clínica.
            </p>
        </div>

    </div>


    <div class="new-consultation-data__content">

        <div class="new-consultation-data__grid">

            <!-- FECHA DE CONSULTA -->

            <div class="new-consultation-data__field">

                <label for="new-consultation-date">
                    Fecha de consulta
                    <span class="required">*</span>
                </label>

                <input
                    type="date"
                    id="new-consultation-date"
                    name="fecha_consulta"
                    required
                >

            </div>


            <!-- TIPO DE CONSULTA -->

            <div class="new-consultation-data__field">

                <label for="new-consultation-type">
                    Tipo de consulta
                    <span class="required">*</span>
                </label>

                <select
                    id="new-consultation-type"
                    name="tipo_consulta"
                    required
                >

                    <option value="">
                        Selecciona una opción
                    </option>

                    <option value="General">
                        General
                    </option>

                    <option value="Seguimiento">
                        Seguimiento
                    </option>

                </select>

            </div>

        </div>


        <!-- MOTIVO DE CONSULTA -->

        <div class="new-consultation-data__field">

            <label for="new-consultation-reason">
                Motivo de consulta
                <span class="required">*</span>
            </label>

            <textarea
                id="new-consultation-reason"
                name="motivo_consulta"
                rows="4"
                maxlength="2000"
                placeholder="Describe brevemente el motivo de la consulta..."
                required
            ></textarea>

            <p class="new-consultation-data__help">
                Describe los síntomas, molestias o razones
                por las que el paciente solicita atención.
            </p>

        </div>

    </div>

</section>