
<!-- =========================================================
     SECCIÓN 03 - EVALUACIÓN CLÍNICA
========================================================= -->

<section
    class="new-consultation-evaluation"
    id="new-consultation-evaluation"
>

    <!-- =====================================================
         ENCABEZADO
    ====================================================== -->

    <div class="new-consultation-evaluation__header">

        <div class="new-consultation-evaluation__number">
            03
        </div>

        <div>

            <h2>
                Evaluación clínica
            </h2>

            <p>
                Registra los hallazgos y resultados de
                la evaluación realizada al paciente.
            </p>

        </div>

    </div>


    <!-- =====================================================
         CONTENIDO
    ====================================================== -->

    <div class="new-consultation-evaluation__content">


        <!-- =================================================
             SÍNTOMAS
        ================================================== -->

        <div class="new-consultation-evaluation__field">

            <label for="new-consultation-symptoms">
                Síntomas
            </label>

            <textarea
                id="new-consultation-symptoms"
                name="sintomas"
                rows="4"
                maxlength="3000"
                placeholder="Describe los síntomas o molestias que presenta el paciente..."
            ></textarea>

            <p class="new-consultation-evaluation__help">
                Registra las molestias visuales o cualquier
                síntoma relevante durante la consulta.
            </p>

        </div>


        <!-- =================================================
             DIAGNÓSTICO
        ================================================== -->

        <div class="new-consultation-evaluation__field">

            <label for="new-consultation-diagnosis">
                Diagnóstico
                <span class="required">*</span>
            </label>

            <textarea
                id="new-consultation-diagnosis"
                name="diagnostico"
                rows="4"
                maxlength="3000"
                placeholder="Describe el diagnóstico obtenido durante la evaluación..."
                required
            ></textarea>

            <p class="new-consultation-evaluation__help">
                Registra los resultados y conclusiones
                de la evaluación clínica.
            </p>

        </div>


        <!-- =================================================
             EVOLUCIÓN
        ================================================== -->

        <div class="new-consultation-evaluation__field">

            <label for="new-consultation-evolution">
                Evolución del paciente
            </label>

            <textarea
                id="new-consultation-evolution"
                name="evolucion"
                rows="4"
                maxlength="3000"
                placeholder="Describe los cambios observados respecto a consultas anteriores..."
            ></textarea>

            <p class="new-consultation-evaluation__help">
                Permite documentar mejoras, cambios o
                persistencia de molestias respecto
                a evaluaciones anteriores.
            </p>

        </div>


        <!-- =================================================
             OBSERVACIONES
        ================================================== -->

        <div class="new-consultation-evaluation__field">

            <label for="new-consultation-observations">
                Observaciones e indicaciones
            </label>

            <textarea
                id="new-consultation-observations"
                name="observaciones"
                rows="4"
                maxlength="3000"
                placeholder="Agrega observaciones, recomendaciones o indicaciones adicionales..."
            ></textarea>

            <p class="new-consultation-evaluation__help">
                Incluye recomendaciones, indicaciones
                y cualquier información complementaria.
            </p>

        </div>


    </div>

</section>
