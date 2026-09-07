<!-- =========================================================
     RESUMEN CLÍNICO
========================================================= -->

<section class="clinical-record-card" id="expediente-resumen-clinico" data-edit-section="clinical">

    <div class="clinical-record-card__header">

        <span class="clinical-record-card__icon">
            C
        </span>

        <div>

            <span class="clinical-record-card__eyebrow">
                RESUMEN CLÍNICO
            </span>

            <h2 class="clinical-record-card__title">
                Estado visual actual
            </h2>

        </div>

    </div>


    <div class="clinical-record-info">


        <!-- =================================================
             USA LENTES ACTUALMENTE
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-usa-lentes">
                Usa lentes actualmente
            </label>

            <select id="expediente-usa-lentes" name="usa_lentes_actualmente" class="clinical-record-edit-field"
                disabled>
                <option value="si" selected>
                    Sí
                </option>

                <option value="no">
                    No
                </option>
            </select>

        </div>


        <!-- =================================================
             TIPO DE LENTE
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-tipo-lente">
                Tipo de lente
            </label>

            <select id="expediente-tipo-lente" name="tipo_lente" class="clinical-record-edit-field" disabled>
                <option value="monofocal" selected>
                    Monofocal
                </option>

                <option value="bifocal">
                    Bifocal
                </option>

                <option value="progresivo">
                    Progresivo
                </option>

                <option value="contacto">
                    Lente de contacto
                </option>

                <option value="otro">
                    Otro
                </option>
            </select>

        </div>


        <!-- =================================================
             TIEMPO DE USO
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-tiempo-uso">
                Tiempo de uso
            </label>

            <input type="text" id="expediente-tiempo-uso" name="tiempo_uso" class="clinical-record-edit-field"
                value="4 años" readonly>

        </div>


        <!-- =================================================
             EXPOSICIÓN LABORAL
        ================================================== -->

        <div class="clinical-record-info__item">

            <label for="expediente-exposicion-laboral">
                Exposición laboral
            </label>

            <input type="text" id="expediente-exposicion-laboral" name="exposicion_laboral"
                class="clinical-record-edit-field" value="Pantallas y luz artificial" readonly>

        </div>


        <!-- =================================================
             DIAGNÓSTICO ACTUAL
        ================================================== -->

        <div class="
                clinical-record-info__item
                clinical-record-info__item--full
            ">

            <label for="expediente-diagnostico-actual">
                Diagnóstico actual
            </label>

            <textarea id="expediente-diagnostico-actual" name="diagnostico_actual" class="
                    clinical-record-edit-field
                    clinical-record-edit-field--textarea
                " rows="3" readonly>Miopía y astigmatismo bilateral.</textarea>

        </div>

    </div>

</section>