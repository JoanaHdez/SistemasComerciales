<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Compras | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/compras.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="purchases-page">

    <header class="purchases-page__header">

        <div>

            <span class="purchases-page__eyebrow">
                ABASTECIMIENTO
            </span>

            <h1 class="purchases-page__title">
                Compras
            </h1>

            <p class="purchases-page__description">
                Administra las compras realizadas a proveedores y controla el abastecimiento del inventario.
            </p>

        </div>

        <a
            href="#"
            class="purchases-page__button"
        >
            + Nueva compra
        </a>

    </header>

    <div class="purchases-layout">

    <!-- ==========================================
         RESUMEN
    =========================================== -->

    <section class="purchases-summary">

        <article class="purchases-summary__card">

            <span class="purchases-summary__label">
                Compras del mes
            </span>

            <strong class="purchases-summary__value">
                32
            </strong>

            <small>
                +5 respecto al mes anterior
            </small>

        </article>

        <article class="purchases-summary__card">

            <span class="purchases-summary__label">
                Monto invertido
            </span>

            <strong class="purchases-summary__value">
                $186,500
            </strong>

            <small>
                Julio 2026
            </small>

        </article>

        <article class="purchases-summary__card">

            <span class="purchases-summary__label">
                Proveedores activos
            </span>

            <strong class="purchases-summary__value">
                18
            </strong>

            <small>
                Registrados
            </small>

        </article>

        <article class="purchases-summary__card">

            <span class="purchases-summary__label">
                Órdenes pendientes
            </span>

            <strong class="purchases-summary__value">
                4
            </strong>

            <small>
                En tránsito
            </small>

        </article>

    </section>

    <!-- ==========================================
         FILTROS
    =========================================== -->

    <section class="purchases-filters">

        <input
            type="search"
            class="purchases-filters__search"
            placeholder="Buscar proveedor, folio o producto..."
        >

        <select class="purchases-filters__select">

            <option>
                Todos los proveedores
            </option>

            <option>
                Luxottica
            </option>

            <option>
                Essilor
            </option>

            <option>
                Ray Ban
            </option>

        </select>

        <select class="purchases-filters__select">

            <option>
                Todos los estados
            </option>

            <option>
                Pendiente
            </option>

            <option>
                Recibida
            </option>

            <option>
                Cancelada
            </option>

        </select>

    </section>

    <!-- ==========================================
         COMPRAS
    =========================================== -->

    <section class="purchases-list">

        <article class="purchase-card">

            <div class="purchase-card__header">

                <div>

                    <span class="purchase-card__folio">
                        Compra #00258
                    </span>

                    <h2 class="purchase-card__provider">
                        Luxottica México
                    </h2>

                </div>

                <span class="purchase-card__status">
                    Recibida
                </span>

            </div>

            <div class="purchase-card__body">

                <div>

                    <strong>Fecha</strong>

                    <p>
                        01 Agosto 2026
                    </p>

                </div>

                <div>

                    <strong>Productos</strong>

                    <p>
                        25 artículos
                    </p>

                </div>

                <div>

                    <strong>Total</strong>

                    <p>
                        $18,500
                    </p>

                </div>

                <div>

                    <strong>Responsable</strong>

                    <p>
                        Laura Gómez
                    </p>

                </div>

            </div>

            <div class="purchase-card__footer">

                <div class="purchase-card__links">

                    <a href="#">
                        Ver detalle
                    </a>

                    <a href="#">
                        Proveedor
                    </a>

                </div>

                <button
                    type="button"
                    class="purchase-card__button"
                >
                    Recepción
                </button>

            </div>

        </article>

        <article class="purchase-card purchase-card--warning">

            <div class="purchase-card__header">

                <div>

                    <span class="purchase-card__folio">
                        Compra #00257
                    </span>

                    <h2 class="purchase-card__provider">
                        Essilor
                    </h2>

                </div>

                <span class="purchase-card__status">
                    Pendiente
                </span>

            </div>

            <div class="purchase-card__body">

                <div>

                    <strong>Fecha</strong>

                    <p>
                        30 Julio 2026
                    </p>

                </div>

                <div>

                    <strong>Productos</strong>

                    <p>
                        42 artículos
                    </p>

                </div>

                <div>

                    <strong>Total</strong>

                    <p>
                        $41,800
                    </p>

                </div>

                <div>

                    <strong>Entrega estimada</strong>

                    <p>
                        05 Agosto
                    </p>

                </div>

            </div>

            <div class="purchase-card__footer">

                <div class="purchase-card__links">

                    <a href="#">
                        Ver detalle
                    </a>

                    <a href="#">
                        Contactar
                    </a>

                </div>

                <button
                    type="button"
                    class="purchase-card__button"
                >
                    Seguimiento
                </button>

            </div>

        </article>

    </section>

</div>

</section>

<?= $this->endSection() ?>