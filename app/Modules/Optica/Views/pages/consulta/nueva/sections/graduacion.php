<!-- =========================================================
     SECCIÓN 04 - GRADUACIÓN
========================================================= -->

<section class="new-consultation-graduation" id="new-consultation-graduation">

    <div class="new-consultation-graduation__header">

        <div class="new-consultation-graduation__number">
            04
        </div>

        <div>
            <h2>Graduación</h2>

            <p>
                Consulta la graduación vigente y registra
                una nueva cuando corresponda.
            </p>
        </div>

    </div>


    <!-- =====================================================
         GRADUACIÓN VIGENTE
    ====================================================== -->

    <div class="new-consultation-graduation__current">

        <div class="new-consultation-graduation__subheader">

            <h3>Graduación vigente</h3>

            <p>
                Información de referencia del paciente.
                Estos valores no pueden editarse aquí.
            </p>

        </div>


        <p class="new-consultation-graduation__empty" id="new-consultation-graduation-empty">
            Selecciona un paciente para consultar
            su graduación vigente.
        </p>


        <div class="new-consultation-graduation__current-content" id="new-consultation-graduation-current" hidden>

            <div class="new-consultation-graduation__eyes">

                <!-- OJO IZQUIERDO -->

                <div class="new-consultation-graduation__eye">

                    <h4>Ojo izquierdo (OI)</h4>

                    <div class="new-consultation-graduation__values">

                        <div>
                            <span>Esfera</span>
                            <strong data-current="oi.esfera">—</strong>
                        </div>

                        <div>
                            <span>Cilindro</span>
                            <strong data-current="oi.cilindro">—</strong>
                        </div>

                        <div>
                            <span>Eje</span>
                            <strong data-current="oi.eje">—</strong>
                        </div>

                    </div>

                </div>


                <!-- OJO DERECHO -->

                <div class="new-consultation-graduation__eye">

                    <h4>Ojo derecho (OD)</h4>

                    <div class="new-consultation-graduation__values">

                        <div>
                            <span>Esfera</span>
                            <strong data-current="od.esfera">—</strong>
                        </div>

                        <div>
                            <span>Cilindro</span>
                            <strong data-current="od.cilindro">—</strong>
                        </div>

                        <div>
                            <span>Eje</span>
                            <strong data-current="od.eje">—</strong>
                        </div>

                    </div>

                </div>

            </div>


            <div class="new-consultation-graduation__complementary">

                <div>
                    <span>Adición</span>
                    <strong data-current="adicion">—</strong>
                </div>

                <div>
                    <span>Distancia ocular</span>
                    <strong data-current="distanciaOcular">—</strong>
                </div>

            </div>

        </div>

    </div>


    <!-- =====================================================
         ¿SE REALIZÓ UNA NUEVA GRADUACIÓN?
    ====================================================== -->

    <div class="new-consultation-graduation__decision">

        <h3>
            ¿Se realizó una nueva graduación?
        </h3>

        <div class="new-consultation-graduation__options">

            <label>
                <input type="radio" name="realizo_nueva_graduacion" value="no" checked>
                No
            </label>

            <label>
                <input type="radio" name="realizo_nueva_graduacion" value="si">
                Sí
            </label>

        </div>

        <p class="new-consultation-graduation__help">
            Si no se realizó un nuevo examen visual,
            puedes continuar sin registrar otra graduación.
        </p>

    </div>


    <!-- =====================================================
         NUEVA GRADUACIÓN
    ====================================================== -->

    <fieldset class="new-consultation-graduation__new" id="new-consultation-graduation-new" hidden disabled>

        <legend class="new-consultation-graduation__legend">
            Nueva graduación
        </legend>

        <p class="new-consultation-graduation__help">
            Captura los resultados del nuevo examen visual.
        </p>


        <div class="new-consultation-graduation__form-grid">

            <!-- OJO IZQUIERDO -->

            <div class="new-consultation-graduation__eye">

                <h4>Ojo izquierdo (OI)</h4>

                <div class="new-consultation-graduation__inputs">

                    <div>
                        <label for="consulta_nueva_oi_esfera">
                            Esfera
                        </label>

                        <input type="text" id="consulta_nueva_oi_esfera" name="nueva_oi_esfera" placeholder="Ej. -1.75">
                    </div>

                    <div>
                        <label for="consulta_nueva_oi_cilindro">
                            Cilindro
                        </label>

                        <input type="text" id="consulta_nueva_oi_cilindro" name="nueva_oi_cilindro"
                            placeholder="Ej. -0.75">
                    </div>

                    <div>
                        <label for="consulta_nueva_oi_eje">
                            Eje
                        </label>

                        <input type="text" id="consulta_nueva_oi_eje" name="nueva_oi_eje" placeholder="Ej. 90">
                    </div>

                </div>

            </div>


            <!-- OJO DERECHO -->

            <div class="new-consultation-graduation__eye">

                <h4>Ojo derecho (OD)</h4>

                <div class="new-consultation-graduation__inputs">

                    <div>
                        <label for="consulta_nueva_od_esfera">
                            Esfera
                        </label>

                        <input type="text" id="consulta_nueva_od_esfera" name="nueva_od_esfera" placeholder="Ej. -2.00">
                    </div>

                    <div>
                        <label for="consulta_nueva_od_cilindro">
                            Cilindro
                        </label>

                        <input type="text" id="consulta_nueva_od_cilindro" name="nueva_od_cilindro"
                            placeholder="Ej. -0.50">
                    </div>

                    <div>
                        <label for="consulta_nueva_od_eje">
                            Eje
                        </label>

                        <input type="text" id="consulta_nueva_od_eje" name="nueva_od_eje" placeholder="Ej. 85">
                    </div>

                </div>

            </div>

        </div>


        <!-- DATOS COMPLEMENTARIOS -->

        <div class="new-consultation-graduation__extras">

            <div>
                <label for="consulta_nueva_adicion">
                    Adición
                </label>

                <input type="text" id="consulta_nueva_adicion" name="nueva_adicion" placeholder="Ej. +1.00">
            </div>

            <div>
                <label for="consulta_nueva_distancia_ocular">
                    Distancia ocular
                </label>

                <input type="text" id="consulta_nueva_distancia_ocular" name="nueva_distancia_ocular"
                    placeholder="Ej. 62 mm">
            </div>

        </div>

    </fieldset>

</section>