<!-- =========================================================
     HISTORIAL DE CONSULTAS
     Muestra únicamente las 3 consultas más recientes.
========================================================= -->

<section class="clinical-record-card" id="expediente-historial-consultas">

    <div class="
        clinical-record-card__header
        clinical-record-card__header--with-action
    ">

        <div class="clinical-record-card__heading">

            <span class="clinical-record-card__icon">
                H
            </span>

            <div>

                <span class="clinical-record-card__eyebrow">
                    SEGUIMIENTO
                </span>

                <h2 class="clinical-record-card__title">
                    Historial de consultas
                </h2>

            </div>

        </div>


        <a href="<?= base_url('optica/consulta/historial') ?>" class="clinical-record-card__action">
            Ver historial completo
        </a>

    </div>


    <div class="clinical-record-table-wrapper">

        <table class="clinical-record-table">

            <thead>

                <tr>

                    <th>
                        Fecha
                    </th>

                    <th>
                        Diagnóstico
                    </th>

                    <th>
                        Graduación
                    </th>

                    <th>
                        Estado
                    </th>

                    <th aria-label="Acciones"></th>

                </tr>

            </thead>


            <tbody id="expediente-consultas-body">


                <!-- =================================================
                     CONSULTA 1
                     Más reciente
                ================================================== -->

                <tr data-consulta-id="1">

                    <td>
                        22/07/2026
                    </td>

                    <td>
                        Miopía y astigmatismo bilateral
                    </td>

                    <td>
                        Actualizada
                    </td>

                    <td>

                        <span class="clinical-record-table__status">
                            Finalizada
                        </span>

                    </td>

                    <td>

                        <button type="button" class="
                                clinical-record-table__action
                                js-ver-consulta
                            " data-consulta-id="1">
                            Ver
                        </button>

                    </td>

                </tr>


                <!-- =================================================
                     CONSULTA 2
                ================================================== -->

                <tr data-consulta-id="2">

                    <td>
                        14/02/2025
                    </td>

                    <td>
                        Fatiga visual por exposición prolongada
                    </td>

                    <td>
                        Sin cambios
                    </td>

                    <td>

                        <span class="clinical-record-table__status">
                            Finalizada
                        </span>

                    </td>

                    <td>

                        <button type="button" class="
                                clinical-record-table__action
                                js-ver-consulta
                            " data-consulta-id="2">
                            Ver
                        </button>

                    </td>

                </tr>


                <!-- =================================================
                     CONSULTA 3
                ================================================== -->

                <tr data-consulta-id="3">

                    <td>
                        08/08/2024
                    </td>

                    <td>
                        Revisión general
                    </td>

                    <td>
                        Inicial
                    </td>

                    <td>

                        <span class="clinical-record-table__status">
                            Finalizada
                        </span>

                    </td>

                    <td>

                        <button type="button" class="
                                clinical-record-table__action
                                js-ver-consulta
                            " data-consulta-id="3">
                            Ver
                        </button>

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</section>