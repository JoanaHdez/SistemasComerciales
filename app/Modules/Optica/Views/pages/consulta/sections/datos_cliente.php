<!-- =========================================================
     DATOS PERSONALES
========================================================= -->

<section class="consulta-card" id="consulta-datos-cliente">

    <div class="consulta-card-heading consulta-heading-with-action">

        <div class="consulta-heading-content">

            <div class="consulta-heading-icon" aria-hidden="true">

                <svg viewBox="0 0 24 24">

                    <circle cx="12" cy="8" r="4"></circle>

                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>

                </svg>

            </div>


            <div>

                <h2>
                    Datos del cliente
                </h2>

                <p>
                    Información general y de contacto.
                </p>

            </div>

        </div>


        <a href="<?= base_url('optica/consulta/expediente') ?>" class="consulta-text-button">
            Editar información
        </a>

    </div>


    <div class="consulta-info-grid">


        <!-- Nombre -->

        <div class="consulta-info-item">

            <span class="consulta-info-label">
                Nombre completo
            </span>

            <strong id="consulta-datos-nombre">
                María Fernanda López Hernández
            </strong>

        </div>


        <!-- Fecha de nacimiento -->

        <div class="consulta-info-item">

            <span class="consulta-info-label">
                Fecha de nacimiento
            </span>

            <strong id="consulta-datos-fecha-nacimiento">
                18 de marzo de 1992
            </strong>

        </div>


        <!-- Edad -->

        <div class="consulta-info-item">

            <span class="consulta-info-label">
                Edad
            </span>

            <strong id="consulta-datos-edad">
                34 años
            </strong>

        </div>


        <!-- Teléfono -->

        <div class="consulta-info-item">

            <span class="consulta-info-label">
                Teléfono
            </span>

            <strong id="consulta-datos-telefono">
                55 1234 5678
            </strong>

        </div>


        <!-- Ocupación -->

        <div class="consulta-info-item">

            <span class="consulta-info-label">
                Ocupación
            </span>

            <strong id="consulta-datos-ocupacion">
                Diseñadora gráfica
            </strong>

        </div>


        <!-- Fecha de registro -->

        <div class="consulta-info-item">

            <span class="consulta-info-label">
                Fecha de registro
            </span>

            <strong id="consulta-datos-fecha-registro">
                10 de enero de 2026
            </strong>

        </div>


        <!-- Dirección -->

        <div class="consulta-info-item consulta-info-full">

            <span class="consulta-info-label">
                Dirección
            </span>

            <strong id="consulta-datos-direccion">
                Av. Principal 125, Col. Centro,
                Nezahualcóyotl, Estado de México
            </strong>

        </div>

    </div>

</section>