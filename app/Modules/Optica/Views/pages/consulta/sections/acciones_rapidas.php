<!-- =========================================================
     ACCIONES RÁPIDAS
========================================================= -->

<section class="consulta-card consulta-actions-card">

    <div class="consulta-card-heading">

        <div
            class="consulta-heading-icon"
            aria-hidden="true"
        >

            <svg viewBox="0 0 24 24">

                <path
                    d="M12 3v18"
                ></path>

                <path
                    d="M3 12h18"
                ></path>

            </svg>

        </div>


        <div>

            <h2>
                Acciones rápidas
            </h2>

            <p>
                Continúa con la atención del cliente.
            </p>

        </div>

    </div>


    <div class="consulta-actions-list">

        <!-- Nueva graduación -->

        <a
            href="<?= base_url('optica/clientes/nuevo/graduacion') ?>"
            class="consulta-action-link"
        >

            <span class="consulta-action-icon">

                <svg viewBox="0 0 24 24">

                    <circle
                        cx="7"
                        cy="13"
                        r="4"
                    ></circle>

                    <circle
                        cx="17"
                        cy="13"
                        r="4"
                    ></circle>

                    <path
                        d="M11 13h2"
                    ></path>

                    <path
                        d="M3 11 2 7"
                    ></path>

                    <path
                        d="m21 11 1-4"
                    ></path>

                </svg>

            </span>


            <span>

                <strong>
                    Nueva graduación
                </strong>

                <small>
                    Registra un nuevo examen visual.
                </small>

            </span>


            <span class="consulta-action-arrow">
                ›
            </span>

        </a>


        <!-- Nueva venta -->

        <a
            href="<?= base_url('optica/ventas/nueva') ?>"
            class="consulta-action-link"
        >

            <span class="consulta-action-icon">

                <svg viewBox="0 0 24 24">

                    <path
                        d="M3 5h2l2 10h10l2-7H6"
                    ></path>

                    <circle
                        cx="9"
                        cy="19"
                        r="1"
                    ></circle>

                    <circle
                        cx="17"
                        cy="19"
                        r="1"
                    ></circle>

                </svg>

            </span>


            <span>

                <strong>
                    Nueva venta
                </strong>

                <small>
                    Inicia una venta para este cliente.
                </small>

            </span>


            <span class="consulta-action-arrow">
                ›
            </span>

        </a>


        <!-- Agendar cita -->

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

                    <path
                        d="M8 3v4"
                    ></path>

                    <path
                        d="M16 3v4"
                    ></path>

                    <path
                        d="M4 10h16"
                    ></path>

                </svg>

            </span>


            <span>

                <strong>
                    Agendar cita
                </strong>

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