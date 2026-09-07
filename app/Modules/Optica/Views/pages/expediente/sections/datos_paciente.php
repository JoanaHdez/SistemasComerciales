<!-- =========================================================
     DATOS DEL PACIENTE
========================================================= -->

<section class="clinical-record-card" id="expediente-datos-paciente" data-edit-section="info">

    <div class="clinical-record-card__header">

        <span class="clinical-record-card__icon">
            P
        </span>

        <div>

            <span class="clinical-record-card__eyebrow">
                INFORMACIÓN GENERAL
            </span>

            <h2 class="clinical-record-card__title">
                Datos del paciente
            </h2>

        </div>

    </div>


    <div class="clinical-record-info">


        <!-- =================================================
             FECHA DE NACIMIENTO
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-fecha-nacimiento">
                Fecha de nacimiento
            </label>

            <input type="date" id="expediente-fecha-nacimiento" name="fecha_nacimiento"
                class="clinical-record-edit-field" value="1992-03-18" readonly>

        </div>


        <!-- =================================================
             TELÉFONO
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-telefono">
                Teléfono
            </label>

            <input type="tel" id="expediente-telefono" name="telefono" class="clinical-record-edit-field"
                value="55 1234 5678" readonly>

        </div>


        <!-- =================================================
             OCUPACIÓN
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-ocupacion">
                Ocupación
            </label>

            <input type="text" id="expediente-ocupacion" name="ocupacion" class="clinical-record-edit-field"
                value="Diseñadora gráfica" readonly>

        </div>


        <!-- =================================================
             DIRECCIÓN
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-direccion">
                Dirección
            </label>

            <input type="text" id="expediente-direccion" name="direccion" class="clinical-record-edit-field"
                value="Av. Principal 125, Col. Centro, Nezahualcóyotl" readonly>

        </div>

    </div>

</section>