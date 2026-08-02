<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Historial de ventas | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/historial_ventas.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="sales-history-page">

    <header class="sales-history-page__header">

        <div>

            <span class="sales-history-page__eyebrow">
                CONTROL DE VENTAS
            </span>

            <h1 class="sales-history-page__title">
                Historial de ventas
            </h1>

            <p class="sales-history-page__description">
                Consulta las ventas registradas, revisa su estado y continúa
                los procesos pendientes de cada cliente.
            </p>

        </div>

        <a
            href="<?= base_url('optica/ventas/nueva') ?>"
            class="sales-history-page__button"
        >
            + Nueva venta
        </a>

    </header>

    <div class="sales-history-layout">

    <!-- ==========================================
         RESUMEN
    =========================================== -->

    <section class="sales-summary">

        <article class="sales-summary__card">

            <span class="sales-summary__label">
                Ventas del día
            </span>

            <strong class="sales-summary__value">
                12
            </strong>

            <small>
                +3 respecto a ayer
            </small>

        </article>

        <article class="sales-summary__card">

            <span class="sales-summary__label">
                Pendientes
            </span>

            <strong class="sales-summary__value">
                8
            </strong>

            <small>
                En laboratorio
            </small>

        </article>

        <article class="sales-summary__card">

            <span class="sales-summary__label">
                Entregadas
            </span>

            <strong class="sales-summary__value">
                45
            </strong>

            <small>
                Este mes
            </small>

        </article>

        <article class="sales-summary__card">

            <span class="sales-summary__label">
                Ingresos
            </span>

            <strong class="sales-summary__value">
                $86,250
            </strong>

            <small>
                Mes actual
            </small>

        </article>

    </section>

    <!-- ==========================================
         FILTROS
    =========================================== -->

    <section class="sales-filters">

        <input
            type="search"
            class="sales-filters__search"
            placeholder="Buscar cliente, folio o teléfono"
        >

        <select class="sales-filters__select">

            <option>
                Todos los estados
            </option>

            <option>
                Pendiente
            </option>

            <option>
                Laboratorio
            </option>

            <option>
                Entregado
            </option>

            <option>
                Cancelado
            </option>

        </select>

        <select class="sales-filters__select">

            <option>
                Todos los responsables
            </option>

            <option>
                Laura Gómez
            </option>

            <option>
                Carlos Mendoza
            </option>

        </select>

    </section>

    <!-- ==========================================
         TARJETAS
    =========================================== -->

    <section class="sales-list">

        <article class="sale-card sale-card--warning">

            <div class="sale-card__header">

                <div>

                    <span class="sale-card__folio">
                        Venta #00035
                    </span>

                    <h2 class="sale-card__client">
                        María López Hernández
                    </h2>

                </div>

                <span class="sale-card__status">
                    Laboratorio
                </span>

            </div>

            <div class="sale-card__body">

                <div>

                    <strong>Producto</strong>

                    <p>
                        Armazón Ray-Ban + Micas Antirreflejantes
                    </p>

                </div>

                <div>

                    <strong>Entrega</strong>

                    <p>
                        05 Agosto 2026
                    </p>

                </div>

                <div>

                    <strong>Saldo pendiente</strong>

                    <p>
                        $1,250
                    </p>

                </div>

                <div>

                    <strong>Responsable</strong>

                    <p>
                        Laura Gómez
                    </p>

                </div>

            </div>

            <div class="sale-card__footer">

                <div class="sale-card__links">

                    <a href="#">
                        Expediente
                    </a>

                    <a href="#">
                        Graduación
                    </a>

                    <a href="#">
                        Pedido
                    </a>

                </div>

                <button
                    type="button"
                    class="sale-card__button"
                >
                    Continuar venta
                </button>

            </div>

        </article>

        <article class="sale-card sale-card--success">

            <div class="sale-card__header">

                <div>

                    <span class="sale-card__folio">
                        Venta #00034
                    </span>

                    <h2 class="sale-card__client">
                        José Ramírez
                    </h2>

                </div>

                <span class="sale-card__status">
                    Entregado
                </span>

            </div>

            <div class="sale-card__body">

                <div>

                    <strong>Total</strong>

                    <p>
                        $3,850
                    </p>

                </div>

                <div>

                    <strong>Entrega</strong>

                    <p>
                        28 Julio 2026
                    </p>

                </div>

                <div>

                    <strong>Garantía</strong>

                    <p>
                        Vigente
                    </p>

                </div>

                <div>

                    <strong>Responsable</strong>

                    <p>
                        Carlos Mendoza
                    </p>

                </div>

            </div>

            <div class="sale-card__footer">

                <div class="sale-card__links">

                    <a href="#">
                        Expediente
                    </a>

                    <a href="#">
                        Venta
                    </a>

                </div>

                <button
                    type="button"
                    class="sale-card__button"
                >
                    Ver detalle
                </button>

            </div>

        </article>

    </section>

</div>

</section>

<?= $this->endSection() ?>