<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Dashboard | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet"
      href="<?= base_url('assets/optica/css/pages/dashboard.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="dashboard-page">

    <header class="dashboard-page__header">

        <div>

            <span class="dashboard-page__eyebrow">
                CENTRO DE OPERACIONES
            </span>

            <h1 class="dashboard-page__title">
                Dashboard
            </h1>

            <p class="dashboard-page__description">
                Consulta el estado general de la óptica, visualiza indicadores clave y da seguimiento a la operación diaria.
            </p>

        </div>

    </header>

    <div class="dashboard-layout">

    <!-- ==========================================
         BIENVENIDA
    =========================================== -->

    <section class="dashboard-hero">

        <div>

            <span class="dashboard-hero__eyebrow">
                BUENOS DÍAS
            </span>

            <h2 class="dashboard-hero__title">
                Bienvenida, Joana 👋
            </h2>

            <p class="dashboard-hero__text">
                Hoy tienes 14 citas programadas, 5 ventas registradas
                y 8 pedidos en seguimiento.
            </p>

        </div>

        <div class="dashboard-hero__date">

            <strong>
                02 Agosto 2026
            </strong>

            <small>
                Domingo
            </small>

        </div>

    </section>

    <!-- ==========================================
         KPIs
    =========================================== -->

    <section class="dashboard-stats">

        <article class="dashboard-stat">

            <span class="dashboard-stat__icon">
                📅
            </span>

            <strong>
                14
            </strong>

            <small>
                Citas hoy
            </small>

        </article>

        <article class="dashboard-stat">

            <span class="dashboard-stat__icon">
                💰
            </span>

            <strong>
                5
            </strong>

            <small>
                Ventas del día
            </small>

        </article>

        <article class="dashboard-stat">

            <span class="dashboard-stat__icon">
                📦
            </span>

            <strong>
                8
            </strong>

            <small>
                Pedidos activos
            </small>

        </article>

        <article class="dashboard-stat">

            <span class="dashboard-stat__icon">
                ⚠
            </span>

            <strong>
                12
            </strong>

            <small>
                Stock bajo
            </small>

        </article>

    </section>

    <!-- ==========================================
     WIDGETS
========================================== -->

<section class="dashboard-widgets">

    <!-- ==========================================
         VENTAS
    =========================================== -->

    <article class="dashboard-card dashboard-card--large">

        <header class="dashboard-card__header">

            <div>

                <span class="dashboard-card__eyebrow">
                    VENTAS
                </span>

                <h2>
                    Últimos 7 días
                </h2>

            </div>

        </header>

        <div class="dashboard-chart-placeholder">

            <div class="dashboard-chart">

                <span style="height:40%"></span>
                <span style="height:65%"></span>
                <span style="height:55%"></span>
                <span style="height:85%"></span>
                <span style="height:70%"></span>
                <span style="height:95%"></span>
                <span style="height:80%"></span>

            </div>

        </div>

    </article>

    <!-- ==========================================
         CITAS
    =========================================== -->

    <article class="dashboard-card">

        <header class="dashboard-card__header">

            <div>

                <span class="dashboard-card__eyebrow">
                    AGENDA
                </span>

                <h2>
                    Próximas citas
                </h2>

            </div>

        </header>

        <ul class="dashboard-list">

            <li>

                <strong>09:00</strong>

                <span>
                    María López Hernández
                </span>

            </li>

            <li>

                <strong>10:30</strong>

                <span>
                    José Ramírez
                </span>

            </li>

            <li>

                <strong>12:00</strong>

                <span>
                    Ana García
                </span>

            </li>

        </ul>

    </article>

</section>

<!-- ==========================================
     SEGUNDA FILA
========================================== -->

<section class="dashboard-widgets">

    <!-- ==========================================
         PEDIDOS
    =========================================== -->

    <article class="dashboard-card">

        <header class="dashboard-card__header">

            <div>

                <span class="dashboard-card__eyebrow">
                    LABORATORIO
                </span>

                <h2>
                    Pedidos recientes
                </h2>

            </div>

        </header>

        <ul class="dashboard-list">

            <li>

                <strong>#00035</strong>

                <span>
                    En producción
                </span>

            </li>

            <li>

                <strong>#00034</strong>

                <span>
                    Listo para entrega
                </span>

            </li>

            <li>

                <strong>#00033</strong>

                <span>
                    Pendiente
                </span>

            </li>

        </ul>

    </article>

    <!-- ==========================================
         STOCK
    =========================================== -->

    <article class="dashboard-card">

        <header class="dashboard-card__header">

            <div>

                <span class="dashboard-card__eyebrow">
                    INVENTARIO
                </span>

                <h2>
                    Productos críticos
                </h2>

            </div>

        </header>

        <ul class="dashboard-list dashboard-list--danger">

            <li>

                <strong>RayBan RB3025</strong>

                <span>
                    Stock: 2
                </span>

            </li>

            <li>

                <strong>Blue Protect</strong>

                <span>
                    Stock: 1
                </span>

            </li>

            <li>

                <strong>Solución multipropósito</strong>

                <span>
                    Agotado
                </span>

            </li>

        </ul>

    </article>

    <!-- ==========================================
         ACTIVIDAD
    =========================================== -->

    <article class="dashboard-card">

        <header class="dashboard-card__header">

            <div>

                <span class="dashboard-card__eyebrow">
                    ACTIVIDAD
                </span>

                <h2>
                    Últimos movimientos
                </h2>

            </div>

        </header>

        <ul class="dashboard-list">

            <li>

                <strong>Venta registrada</strong>

                <span>
                    Hace 10 minutos
                </span>

            </li>

            <li>

                <strong>Cliente agregado</strong>

                <span>
                    Hace 25 minutos
                </span>

            </li>

            <li>

                <strong>Pedido enviado</strong>

                <span>
                    Hace 40 minutos
                </span>

            </li>

        </ul>

    </article>

</section>

</div>

</section>

<?= $this->endSection() ?>