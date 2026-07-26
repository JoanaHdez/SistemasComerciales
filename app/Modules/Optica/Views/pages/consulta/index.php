<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Consulta | Sistema de Gestión para Óptica
<?= $this->endSection() ?>

<?= $this->section('styles') ?>
<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/consulta.css') ?>"
>
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<div class="consulta-page">

    <!-- Encabezado -->
    <section class="consulta-header">
        <div>
            <span class="consulta-eyebrow">Expediente clínico</span>

            <h1>Consulta</h1>

            <p>
                Busca un cliente para consultar sus datos, historial clínico
                y graduación actual.
            </p>
        </div>

        <a
            href="<?= base_url('optica/clientes/nuevo') ?>"
            class="consulta-primary-button"
        >
            <span class="consulta-button-icon">+</span>
            Nuevo cliente
        </a>
    </section>

    <!-- Buscador -->
    <section class="consulta-card consulta-search-card">
        <div class="consulta-card-heading">
            <div class="consulta-heading-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="m20 20-4-4"></path>
                </svg>
            </div>

            <div>
                <h2>Buscar cliente</h2>

                <p>
                    Ingresa el nombre, teléfono o número de cliente.
                </p>
            </div>
        </div>

        <form class="consulta-search-form" action="#" method="get">
            <div class="consulta-search-control">
                <svg
                    class="consulta-search-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="m20 20-4-4"></path>
                </svg>

                <input
                    type="search"
                    name="cliente"
                    id="consulta-cliente"
                    placeholder="Ej. María López o 55 1234 5678"
                    autocomplete="off"
                >
            </div>

            <button type="submit" class="consulta-search-button">
                Buscar
            </button>
        </form>
    </section>

    <!-- Resumen del cliente -->
    <section class="consulta-client-summary">
        <div class="consulta-avatar" aria-hidden="true">
            ML
        </div>

        <div class="consulta-client-identity">
            <span>Cliente seleccionado</span>

            <h2>María Fernanda López Hernández</h2>

            <div class="consulta-client-tags">
                <span>Cliente #00024</span>
                <span>Última consulta: 15/07/2026</span>
            </div>
        </div>

        <a
            href="<?= base_url('optica/clientes') ?>"
            class="consulta-secondary-button"
        >
            Ver clientes
        </a>
    </section>

    <div class="consulta-layout">

        <!-- Columna principal -->
        <div class="consulta-main-column">

            <!-- Datos personales -->
            <section class="consulta-card">
                <div class="consulta-card-heading consulta-heading-with-action">
                    <div class="consulta-heading-content">
                        <div class="consulta-heading-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="4"></circle>
                                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>
                            </svg>
                        </div>

                        <div>
                            <h2>Datos del cliente</h2>
                            <p>Información general y de contacto.</p>
                        </div>
                    </div>

                    <button type="button" class="consulta-text-button">
                        Editar información
                    </button>
                </div>

                <div class="consulta-info-grid">
                    <div class="consulta-info-item">
                        <span class="consulta-info-label">
                            Nombre completo
                        </span>

                        <strong>
                            María Fernanda López Hernández
                        </strong>
                    </div>

                    <div class="consulta-info-item">
                        <span class="consulta-info-label">
                            Fecha de nacimiento
                        </span>

                        <strong>18 de marzo de 1992</strong>
                    </div>

                    <div class="consulta-info-item">
                        <span class="consulta-info-label">
                            Edad
                        </span>

                        <strong>34 años</strong>
                    </div>

                    <div class="consulta-info-item">
                        <span class="consulta-info-label">
                            Teléfono
                        </span>

                        <strong>55 1234 5678</strong>
                    </div>

                    <div class="consulta-info-item">
                        <span class="consulta-info-label">
                            Ocupación
                        </span>

                        <strong>Diseñadora gráfica</strong>
                    </div>

                    <div class="consulta-info-item">
                        <span class="consulta-info-label">
                            Fecha de registro
                        </span>

                        <strong>10 de enero de 2026</strong>
                    </div>

                    <div class="consulta-info-item consulta-info-full">
                        <span class="consulta-info-label">
                            Dirección
                        </span>

                        <strong>
                            Av. Principal 125, Col. Centro,
                            Nezahualcóyotl, Estado de México
                        </strong>
                    </div>
                </div>
            </section>

            <!-- Historial clínico -->
            <section class="consulta-card">
                <div class="consulta-card-heading consulta-heading-with-action">
                    <div class="consulta-heading-content">
                        <div class="consulta-heading-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M7 3h10v4H7z"></path>
                                <path d="M5 5H4v16h16V5h-1"></path>
                                <path d="M8 12h8"></path>
                                <path d="M8 16h5"></path>
                            </svg>
                        </div>

                        <div>
                            <h2>Historial clínico</h2>

                            <p>
                                Antecedentes y condiciones relevantes del
                                cliente.
                            </p>
                        </div>
                    </div>

                    <button type="button" class="consulta-text-button">
                        Editar historial
                    </button>
                </div>

                <div class="consulta-clinical-grid">
                    <article class="consulta-clinical-item">
                        <span class="consulta-info-label">
                            Uso actual de lentes
                        </span>

                        <strong>Sí, lentes monofocales</strong>

                        <p>
                            Uso aproximado de 8 horas al día.
                        </p>
                    </article>

                    <article class="consulta-clinical-item">
                        <span class="consulta-info-label">
                            Uso anterior de lentes
                        </span>

                        <strong>Desde hace 6 años</strong>

                        <p>
                            Último cambio realizado en enero de 2025.
                        </p>
                    </article>

                    <article class="consulta-clinical-item">
                        <span class="consulta-info-label">
                            Exposición laboral
                        </span>

                        <strong>Pantallas digitales</strong>

                        <p>
                            Exposición aproximada de 7 horas diarias.
                        </p>
                    </article>

                    <article class="consulta-clinical-item">
                        <span class="consulta-info-label">
                            Antecedentes patológicos
                        </span>

                        <strong>Ninguno registrado</strong>

                        <p>
                            La cliente no reporta antecedentes relevantes.
                        </p>
                    </article>

                    <article class="consulta-clinical-item">
                        <span class="consulta-info-label">
                            Antecedentes visuales
                        </span>

                        <strong>Miopía y astigmatismo</strong>

                        <p>
                            Sin cirugías oculares registradas.
                        </p>
                    </article>

                    <article class="consulta-clinical-item">
                        <span class="consulta-info-label">
                            Diagnóstico actual
                        </span>

                        <strong>Miopía compuesta</strong>

                        <p>
                            Se recomienda actualizar la graduación y mantener
                            revisión anual.
                        </p>
                    </article>
                </div>
            </section>

            <!-- Graduación actual -->
            <section class="consulta-card">
                <div class="consulta-card-heading consulta-heading-with-action">
                    <div class="consulta-heading-content">
                        <div class="consulta-heading-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <circle cx="7" cy="13" r="4"></circle>
                                <circle cx="17" cy="13" r="4"></circle>
                                <path d="M11 13h2"></path>
                                <path d="M3 11 2 7"></path>
                                <path d="m21 11 1-4"></path>
                            </svg>
                        </div>

                        <div>
                            <h2>Graduación actual</h2>

                            <p>
                                Última graduación registrada para el cliente.
                            </p>
                        </div>
                    </div>

                    <span class="consulta-status">
                        Actualizada
                    </span>
                </div>

                <div class="consulta-graduation-date">
                    <span>Fecha de graduación</span>
                    <strong>15 de julio de 2026</strong>
                </div>

                <div class="consulta-graduation-table-wrapper">
                    <table class="consulta-graduation-table">
                        <thead>
                            <tr>
                                <th>Ojo</th>
                                <th>Esfera</th>
                                <th>Cilindro</th>
                                <th>Eje</th>
                                <th>Adición</th>
                                <th>D.P.</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <span class="consulta-eye-badge">
                                        OD
                                    </span>

                                    Ojo derecho
                                </td>

                                <td>-2.25</td>
                                <td>-0.75</td>
                                <td>15°</td>
                                <td>+1.00</td>
                                <td>31 mm</td>
                            </tr>

                            <tr>
                                <td>
                                    <span class="consulta-eye-badge">
                                        OI
                                    </span>

                                    Ojo izquierdo
                                </td>

                                <td>-2.00</td>
                                <td>-0.50</td>
                                <td>170°</td>
                                <td>+1.00</td>
                                <td>31 mm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="consulta-observation">
                    <span class="consulta-info-label">
                        Observaciones
                    </span>

                    <p>
                        Se recomienda lente con tratamiento antirreflejante
                        debido al tiempo prolongado de exposición a pantallas.
                    </p>
                </div>
            </section>

        </div>

        <!-- Columna lateral -->
        <aside class="consulta-side-column">

            <!-- Acciones rápidas -->
            <section class="consulta-card consulta-actions-card">
                <div class="consulta-card-heading">
                    <div class="consulta-heading-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 3v18"></path>
                            <path d="M3 12h18"></path>
                        </svg>
                    </div>

                    <div>
                        <h2>Acciones rápidas</h2>

                        <p>
                            Continúa con la atención del cliente.
                        </p>
                    </div>
                </div>

                <div class="consulta-actions-list">
                    <a
                        href="<?= base_url(
                            'optica/clientes/nuevo/graduacion'
                        ) ?>"
                        class="consulta-action-link"
                    >
                        <span class="consulta-action-icon">
                            <svg viewBox="0 0 24 24">
                                <circle cx="7" cy="13" r="4"></circle>
                                <circle cx="17" cy="13" r="4"></circle>
                                <path d="M11 13h2"></path>
                                <path d="M3 11 2 7"></path>
                                <path d="m21 11 1-4"></path>
                            </svg>
                        </span>

                        <span>
                            <strong>Nueva graduación</strong>

                            <small>
                                Registra un nuevo examen visual.
                            </small>
                        </span>

                        <span class="consulta-action-arrow">
                            ›
                        </span>
                    </a>

                    <a
                        href="<?= base_url('optica/ventas/nueva') ?>"
                        class="consulta-action-link"
                    >
                        <span class="consulta-action-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M3 5h2l2 10h10l2-7H6"></path>
                                <circle cx="9" cy="19" r="1"></circle>
                                <circle cx="17" cy="19" r="1"></circle>
                            </svg>
                        </span>

                        <span>
                            <strong>Nueva venta</strong>

                            <small>
                                Inicia una venta para este cliente.
                            </small>
                        </span>

                        <span class="consulta-action-arrow">
                            ›
                        </span>
                    </a>

                    <button
                        type="button"
                        class="consulta-action-link consulta-action-button"
                    >
                        <span class="consulta-action-icon">
                            <svg viewBox="0 0 24 24">
                                <rect
                                    x="4"
                                    y="5"
                                    width="16"
                                    height="15"
                                    rx="2"
                                ></rect>

                                <path d="M8 3v4"></path>
                                <path d="M16 3v4"></path>
                                <path d="M4 10h16"></path>
                            </svg>
                        </span>

                        <span>
                            <strong>Agendar cita</strong>

                            <small>
                                Programa la próxima revisión.
                            </small>
                        </span>

                        <span class="consulta-action-arrow">
                            ›
                        </span>
                    </button>
                </div>
            </section>

            <!-- Consultas anteriores -->
            <section class="consulta-card">
                <div class="consulta-card-heading">
                    <div class="consulta-heading-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M3 12a9 9 0 1 0 3-6.7"></path>
                            <path d="M3 3v6h6"></path>
                            <path d="M12 7v5l3 2"></path>
                        </svg>
                    </div>

                    <div>
                        <h2>Consultas anteriores</h2>

                        <p>
                            Actividad clínica reciente.
                        </p>
                    </div>
                </div>

                <div class="consulta-history-list">
                    <article class="consulta-history-item">
                        <div class="consulta-history-date">
                            <strong>15</strong>
                            <span>Jul 2026</span>
                        </div>

                        <div>
                            <strong>Examen visual</strong>
                            <p>Actualización de graduación.</p>
                        </div>
                    </article>

                    <article class="consulta-history-item">
                        <div class="consulta-history-date">
                            <strong>10</strong>
                            <span>Ene 2025</span>
                        </div>

                        <div>
                            <strong>Consulta general</strong>
                            <p>Adaptación de lentes monofocales.</p>
                        </div>
                    </article>

                    <article class="consulta-history-item">
                        <div class="consulta-history-date">
                            <strong>22</strong>
                            <span>Nov 2023</span>
                        </div>

                        <div>
                            <strong>Primera valoración</strong>
                            <p>Registro inicial del expediente.</p>
                        </div>
                    </article>
                </div>

                <button type="button" class="consulta-full-history">
                    Ver historial completo
                </button>
            </section>

        </aside>

    </div>

</div>

<?= $this->endSection() ?>