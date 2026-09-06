<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Expediente clínico | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/expediente.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

/*expediente clinico */
<section class="clinical-record-page">

    <div class="clinical-record-layout">

        <!-- =====================================================
         RESUMEN DEL PACIENTE
    ====================================================== -->

        <section class="clinical-record-patient">

            <div class="clinical-record-patient__avatar">
                ML
            </div>

            <div class="clinical-record-patient__main">

                <span class="clinical-record-patient__eyebrow">
                    PACIENTE
                </span>

                <h2 class="clinical-record-patient__name">
                    María López Hernández
                </h2>

                <div class="clinical-record-patient__meta">

                    <span>
                        <strong>Folio:</strong>
                        CLI-0001
                    </span>

                    <span>
                        <strong>Edad:</strong>
                        34 años
                    </span>

                    <span>
                        <strong>Registro:</strong>
                        15/06/2026
                    </span>

                </div>

            </div>

            <div class="clinical-record-patient__status">

                <span class="clinical-record-status">
                    Expediente activo
                </span>

                <span class="clinical-record-patient__last-update">
                    Última consulta: 22/07/2026
                </span>

            </div>

        </section>

        <!-- =====================================================
         INFORMACIÓN GENERAL Y RESUMEN CLÍNICO
    ====================================================== -->

        <div class="clinical-record-grid clinical-record-grid--top">

            <section class="clinical-record-card">

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

                <dl class="clinical-record-info">

                    <div class="clinical-record-info__item">
                        <dt>Fecha de nacimiento</dt>
                        <dd>18 de marzo de 1992</dd>
                    </div>

                    <div class="clinical-record-info__item">
                        <dt>Teléfono</dt>
                        <dd>55 1234 5678</dd>
                    </div>

                    <div class="clinical-record-info__item">
                        <dt>Ocupación</dt>
                        <dd>Diseñadora gráfica</dd>
                    </div>

                    <div class="clinical-record-info__item">
                        <dt>Dirección</dt>
                        <dd>
                            Av. Principal 125, Col. Centro,
                            Nezahualcóyotl
                        </dd>
                    </div>

                </dl>

            </section>

            <section class="clinical-record-card">

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

                <dl class="clinical-record-info">

                    <div class="clinical-record-info__item">
                        <dt>Usa lentes actualmente</dt>
                        <dd>Sí</dd>
                    </div>

                    <div class="clinical-record-info__item">
                        <dt>Tipo de lente</dt>
                        <dd>Monofocal</dd>
                    </div>

                    <div class="clinical-record-info__item">
                        <dt>Tiempo de uso</dt>
                        <dd>4 años</dd>
                    </div>

                    <div class="clinical-record-info__item">
                        <dt>Exposición laboral</dt>
                        <dd>Pantallas y luz artificial</dd>
                    </div>

                    <div class="clinical-record-info__item clinical-record-info__item--full">
                        <dt>Diagnóstico actual</dt>
                        <dd>
                            Miopía y astigmatismo bilateral.
                        </dd>
                    </div>

                </dl>

            </section>

        </div>

        <!-- =====================================================
         GRADUACIÓN ACTUAL
    ====================================================== -->

        <section class="clinical-record-card">

            <div class="clinical-record-card__header clinical-record-card__header--with-action">

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

                <article class="clinical-record-eye">

                    <div class="clinical-record-eye__header">
                        <span>OD</span>

                        <h3>
                            Ojo derecho
                        </h3>
                    </div>

                    <div class="clinical-record-eye__values">

                        <div>
                            <span>Esfera</span>
                            <strong>-1.75</strong>
                        </div>

                        <div>
                            <span>Cilindro</span>
                            <strong>-0.50</strong>
                        </div>

                        <div>
                            <span>Eje</span>
                            <strong>90°</strong>
                        </div>

                    </div>

                </article>

                <article class="clinical-record-eye">

                    <div class="clinical-record-eye__header">
                        <span>OI</span>

                        <h3>
                            Ojo izquierdo
                        </h3>
                    </div>

                    <div class="clinical-record-eye__values">

                        <div>
                            <span>Esfera</span>
                            <strong>-2.00</strong>
                        </div>

                        <div>
                            <span>Cilindro</span>
                            <strong>-0.75</strong>
                        </div>

                        <div>
                            <span>Eje</span>
                            <strong>85°</strong>
                        </div>

                    </div>

                </article>

                <aside class="clinical-record-graduation__extras">

                    <div>
                        <span>Adición</span>
                        <strong>+1.00</strong>
                    </div>

                    <div>
                        <span>Distancia pupilar</span>
                        <strong>62 mm</strong>
                    </div>

                    <div>
                        <span>Fecha de registro</span>
                        <strong>22/07/2026</strong>
                    </div>

                </aside>

            </div>

        </section>

        <!-- =====================================================
         ANTECEDENTES
    ====================================================== -->

        <section class="clinical-record-card">

            <div class="clinical-record-card__header">

                <span class="clinical-record-card__icon">
                    A
                </span>

                <div>
                    <span class="clinical-record-card__eyebrow">
                        ANTECEDENTES
                    </span>

                    <h2 class="clinical-record-card__title">
                        Información relevante
                    </h2>
                </div>

            </div>

            <div class="clinical-record-backgrounds">

                <article class="clinical-record-background">

                    <span class="clinical-record-background__label">
                        Antecedentes patológicos
                    </span>

                    <p>
                        Niega diabetes e hipertensión. Sin cirugías
                        oculares previas.
                    </p>

                </article>

                <article class="clinical-record-background">

                    <span class="clinical-record-background__label">
                        Antecedentes visuales
                    </span>

                    <p>
                        Uso de lentes desde los 18 años. Refiere
                        cansancio visual después de jornadas prolongadas.
                    </p>

                </article>

            </div>

        </section>

        <!-- =====================================================
         HISTORIAL DE CONSULTAS
    ====================================================== -->

        <section class="clinical-record-card">

            <div class="clinical-record-card__header clinical-record-card__header--with-action">

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

                <a href="#" class="clinical-record-card__action">
                    Ver historial completo
                </a>

            </div>

            <div class="clinical-record-table-wrapper">

                <table class="clinical-record-table">

                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Diagnóstico</th>
                            <th>Graduación</th>
                            <th>Estado</th>
                            <th aria-label="Acciones"></th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>22/07/2026</td>

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
                                <button type="button" class="clinical-record-table__action">
                                    Ver
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>14/02/2025</td>

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
                                <button type="button" class="clinical-record-table__action">
                                    Ver
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>08/08/2024</td>

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
                                <button type="button" class="clinical-record-table__action">
                                    Ver
                                </button>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

</div>

</section>

<?= $this->endSection() ?>