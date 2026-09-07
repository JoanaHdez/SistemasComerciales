<!-- =========================================================
     INFORMACIÓN RELEVANTE
========================================================= -->

<section class="clinical-record-card" id="expediente-informacion-relevante" data-edit-section="clinical">

    <div class="clinical-record-card__header">

        <span class="clinical-record-card__icon">
            A
        </span>

        <div>

            <span class="clinical-record-card__eyebrow">
                HISTORIAL CLÍNICO
            </span>

            <h2 class="clinical-record-card__title">
                Información relevante
            </h2>

        </div>

    </div>


    <div class="clinical-record-relevant__grid">


        <!-- =================================================
             USO ACTUAL DE LENTES
        ================================================== -->

        <div class="clinical-record-relevant__item">

            <label class="clinical-record-relevant__label" for="expediente-relevante-uso-actual">
                Uso actual de lentes
            </label>

            <input type="text" id="expediente-relevante-uso-actual" name="uso_actual_lentes" class="
                    clinical-record-edit-field
                    clinical-record-relevant__field
                " value="Sí, lentes monofocales" readonly>

            <textarea id="expediente-relevante-uso-actual-detalle" name="uso_actual_lentes_detalle" class="
                    clinical-record-edit-field
                    clinical-record-relevant__detail-field
                " rows="2" aria-label="Detalle del uso actual de lentes"
                readonly>Uso aproximado de 8 horas al día.</textarea>

        </div>


        <!-- =================================================
             USO ANTERIOR DE LENTES
        ================================================== -->

        <div class="clinical-record-relevant__item">

            <label class="clinical-record-relevant__label" for="expediente-relevante-uso-anterior">
                Uso anterior de lentes
            </label>

            <input type="text" id="expediente-relevante-uso-anterior" name="uso_anterior_lentes" class="
                    clinical-record-edit-field
                    clinical-record-relevant__field
                " value="Desde hace 6 años" readonly>

            <textarea id="expediente-relevante-uso-anterior-detalle" name="uso_anterior_lentes_detalle" class="
                    clinical-record-edit-field
                    clinical-record-relevant__detail-field
                " rows="2" aria-label="Detalle del uso anterior de lentes"
                readonly>Último cambio realizado en enero de 2025.</textarea>

        </div>


        <!-- =================================================
             EXPOSICIÓN LABORAL
        ================================================== -->

        <div class="clinical-record-relevant__item">

            <label class="clinical-record-relevant__label" for="expediente-relevante-exposicion">
                Exposición laboral
            </label>

            <input type="text" id="expediente-relevante-exposicion" name="exposicion_laboral" class="
                    clinical-record-edit-field
                    clinical-record-relevant__field
                " value="Pantallas digitales" readonly>

            <textarea id="expediente-relevante-exposicion-detalle" name="exposicion_laboral_detalle" class="
                    clinical-record-edit-field
                    clinical-record-relevant__detail-field
                " rows="2" aria-label="Detalle de exposición laboral"
                readonly>Exposición aproximada de 7 horas diarias.</textarea>

        </div>


        <!-- =================================================
             ANTECEDENTES PATOLÓGICOS
        ================================================== -->

        <div class="clinical-record-relevant__item">

            <label class="clinical-record-relevant__label" for="expediente-antecedentes-patologicos">
                Antecedentes patológicos
            </label>

            <input type="text" id="expediente-antecedentes-patologicos" name="antecedentes_patologicos" class="
                    clinical-record-edit-field
                    clinical-record-relevant__field
                " value="Ninguno registrado" readonly>

            <textarea id="expediente-antecedentes-patologicos-detalle" name="antecedentes_patologicos_detalle" class="
                    clinical-record-edit-field
                    clinical-record-relevant__detail-field
                " rows="2" aria-label="Detalle de antecedentes patológicos"
                readonly>La paciente no reporta antecedentes relevantes.</textarea>

        </div>


        <!-- =================================================
             ANTECEDENTES VISUALES
        ================================================== -->

        <div class="clinical-record-relevant__item">

            <label class="clinical-record-relevant__label" for="expediente-antecedentes-visuales">
                Antecedentes visuales
            </label>

            <input type="text" id="expediente-antecedentes-visuales" name="antecedentes_visuales" class="
                    clinical-record-edit-field
                    clinical-record-relevant__field
                " value="Miopía y astigmatismo" readonly>

            <textarea id="expediente-antecedentes-visuales-detalle" name="antecedentes_visuales_detalle" class="
                    clinical-record-edit-field
                    clinical-record-relevant__detail-field
                " rows="2" aria-label="Detalle de antecedentes visuales"
                readonly>Sin cirugías oculares registradas.</textarea>

        </div>


        <!-- =================================================
             DIAGNÓSTICO ACTUAL
        ================================================== -->

        <div class="
            clinical-record-relevant__item
            clinical-record-relevant__item--highlight
        ">

            <label class="clinical-record-relevant__label" for="expediente-relevante-diagnostico">
                Diagnóstico actual
            </label>

            <input type="text" id="expediente-relevante-diagnostico" name="diagnostico_relevante" class="
                    clinical-record-edit-field
                    clinical-record-relevant__field
                " value="Miopía compuesta" readonly>

            <textarea id="expediente-relevante-diagnostico-detalle" name="diagnostico_relevante_detalle" class="
                    clinical-record-edit-field
                    clinical-record-relevant__detail-field
                " rows="2" aria-label="Detalle del diagnóstico actual"
                readonly>Se recomienda actualizar la graduación y mantener revisión anual.</textarea>

        </div>

    </div>

</section>