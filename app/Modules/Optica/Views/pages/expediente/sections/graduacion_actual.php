<!-- =========================================================
     GRADUACIÓN ACTUAL
========================================================= -->

<section class="clinical-record-card" id="expediente-graduacion-actual" data-edit-section="graduation">

    <div class="
        clinical-record-card__header
        clinical-record-card__header--with-action
    ">

        <div class="clinical-record-card__heading">

            <span class="clinical-record-card__icon">
                G
            </span>

            <div>

                <span class="clinical-record-card__eyebrow">
                    GRADUACIÓN
                </span>

                <h2 class="clinical-record-card__title">
                    Graduación actual
                </h2>

            </div>

        </div>


        <a href="<?= base_url('optica/clientes/nuevo/graduacion') ?>" class="clinical-record-card__action">
            Actualizar graduación
        </a>

    </div>


    <div class="clinical-record-graduation">


        <!-- =================================================
             OJO DERECHO
        ================================================== -->

        <article class="clinical-record-eye">

            <div class="clinical-record-eye__header">

                <span>
                    OD
                </span>

                <h3>
                    Ojo derecho
                </h3>

            </div>


            <div class="clinical-record-eye__values">


                <!-- ESFERA -->

                <div>

                    <label for="expediente-esfera-od">
                        Esfera
                    </label>

                    <input type="text" id="expediente-esfera-od" name="esfera_od" class="
                            clinical-record-edit-field
                            clinical-record-graduation__field
                        " value="-1.75" inputmode="decimal" readonly>

                </div>


                <!-- CILINDRO -->

                <div>

                    <label for="expediente-cilindro-od">
                        Cilindro
                    </label>

                    <input type="text" id="expediente-cilindro-od" name="cilindro_od" class="
                            clinical-record-edit-field
                            clinical-record-graduation__field
                        " value="-0.50" inputmode="decimal" readonly>

                </div>


                <!-- EJE -->

                <div>

                    <label for="expediente-eje-od">
                        Eje
                    </label>

                    <input type="number" id="expediente-eje-od" name="eje_od" class="
                            clinical-record-edit-field
                            clinical-record-graduation__field
                        " value="90" min="0" max="180" step="1" readonly>

                </div>

            </div>

        </article>


        <!-- =================================================
             OJO IZQUIERDO
        ================================================== -->

        <article class="clinical-record-eye">

            <div class="clinical-record-eye__header">

                <span>
                    OI
                </span>

                <h3>
                    Ojo izquierdo
                </h3>

            </div>


            <div class="clinical-record-eye__values">


                <!-- ESFERA -->

                <div>

                    <label for="expediente-esfera-oi">
                        Esfera
                    </label>

                    <input type="text" id="expediente-esfera-oi" name="esfera_oi" class="
                            clinical-record-edit-field
                            clinical-record-graduation__field
                        " value="-2.00" inputmode="decimal" readonly>

                </div>


                <!-- CILINDRO -->

                <div>

                    <label for="expediente-cilindro-oi">
                        Cilindro
                    </label>

                    <input type="text" id="expediente-cilindro-oi" name="cilindro_oi" class="
                            clinical-record-edit-field
                            clinical-record-graduation__field
                        " value="-0.75" inputmode="decimal" readonly>

                </div>


                <!-- EJE -->

                <div>

                    <label for="expediente-eje-oi">
                        Eje
                    </label>

                    <input type="number" id="expediente-eje-oi" name="eje_oi" class="
                            clinical-record-edit-field
                            clinical-record-graduation__field
                        " value="85" min="0" max="180" step="1" readonly>

                </div>

            </div>

        </article>


        <!-- =================================================
             DATOS COMPLEMENTARIOS
        ================================================== -->

        <aside class="clinical-record-graduation__extras">


            <!-- ADICIÓN -->

            <div>

                <label for="expediente-adicion">
                    Adición
                </label>

                <input type="text" id="expediente-adicion" name="adicion" class="
                        clinical-record-edit-field
                        clinical-record-graduation__field
                    " value="+1.00" inputmode="decimal" readonly>

            </div>


            <!-- DISTANCIA PUPILAR -->

            <div>

                <label for="expediente-distancia-pupilar">
                    Distancia pupilar
                </label>

                <input type="number" id="expediente-distancia-pupilar" name="distancia_pupilar" class="
                        clinical-record-edit-field
                        clinical-record-graduation__field
                    " value="62" min="1" step="0.5" readonly>

            </div>


            <!-- FECHA -->

            <div>

                <span>
                    Fecha de registro
                </span>

                <strong id="expediente-graduacion-fecha">
                    22/07/2026
                </strong>

            </div>

        </aside>

    </div>

</section>