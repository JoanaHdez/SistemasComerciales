<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Reportes | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/reportes.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="reports-page">

    <header class="reports-page__header">

        <div>

            <span class="reports-page__eyebrow">
                INTELIGENCIA DEL NEGOCIO
            </span>

            <h1 class="reports-page__title">
                Reportes
            </h1>

            <p class="reports-page__description">
                Analiza el desempeño de la óptica mediante indicadores,
                comparativas y estadísticas para apoyar la toma de decisiones.
            </p>

        </div>

    </header>

    <div class="reports-layout">

    <!-- ==========================================
         FILTROS
    =========================================== -->

    <section class="reports-toolbar">

        <div class="reports-toolbar__period">

            <label>Periodo</label>

            <select>

                <option>Hoy</option>
                <option>Esta semana</option>
                <option selected>Este mes</option>
                <option>Este año</option>
                <option>Personalizado</option>

            </select>

        </div>

        <div class="reports-toolbar__actions">

            <button class="reports-button">
                PDF
            </button>

            <button class="reports-button">
                Excel
            </button>

            <button class="reports-button">
                CSV
            </button>

        </div>

    </section>

    <!-- ==========================================
         TABS
    =========================================== -->

    <nav class="reports-tabs">

        <button class="reports-tab reports-tab--active">
            General
        </button>

        <button class="reports-tab">
            Ventas
        </button>

        <button class="reports-tab">
            Clientes
        </button>

        <button class="reports-tab">
            Inventario
        </button>

        <button class="reports-tab">
            Compras
        </button>

        <button class="reports-tab">
            Agenda
        </button>

    </nav>

    <!-- ==========================================
         KPIs
    =========================================== -->

    <section class="reports-summary">

        <article class="reports-summary__card">

            <span>
                Ingresos
            </span>

            <strong>
                $845,300
            </strong>

        </article>

        <article class="reports-summary__card">

            <span>
                Ventas
            </span>

            <strong>
                264
            </strong>

        </article>

        <article class="reports-summary__card">

            <span>
                Clientes
            </span>

            <strong>
                143
            </strong>

        </article>

        <article class="reports-summary__card">

            <span>
                Ticket promedio
            </span>

            <strong>
                $3,201
            </strong>

        </article>

    </section>

    <!-- ==========================================
         CONTENIDO
    =========================================== -->

    <section class="reports-grid">

        <article class="reports-card reports-card--large">

            <header>

                <h2>
                    Ventas del periodo
                </h2>

            </header>

            <div class="reports-chart">

                <span style="height:35%"></span>
                <span style="height:60%"></span>
                <span style="height:55%"></span>
                <span style="height:80%"></span>
                <span style="height:95%"></span>
                <span style="height:70%"></span>
                <span style="height:88%"></span>

            </div>

        </article>

        <article class="reports-card">

            <header>

                <h2>
                    Productos más vendidos
                </h2>

            </header>

            <ul class="reports-list">

                <li>RayBan RB3025</li>
                <li>Blue Protect</li>
                <li>Transitions</li>
                <li>Antirreflejante</li>

            </ul>

        </article>

        <article class="reports-card">

            <header>

                <h2>
                    Clientes frecuentes
                </h2>

            </header>

            <ul class="reports-list">

                <li>María López</li>
                <li>José Ramírez</li>
                <li>Ana García</li>
                <li>Carlos Méndez</li>

            </ul>

        </article>

        <article class="reports-card">

            <header>

                <h2>
                    Indicadores
                </h2>

            </header>

            <ul class="reports-list">

                <li>Pedidos pendientes: 8</li>
                <li>Productos agotados: 3</li>
                <li>Stock bajo: 12</li>
                <li>Compras del mes: 32</li>

            </ul>

        </article>

    </section>

</div>

</section>

<?= $this->endSection() ?>