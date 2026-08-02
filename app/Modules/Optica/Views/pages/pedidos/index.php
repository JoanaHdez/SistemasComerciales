<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Pedidos | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/pedidos.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="orders-page">

    <header class="orders-page__header">

        <div>

            <span class="orders-page__eyebrow">
                LABORATORIO
            </span>

            <h1 class="orders-page__title">
                Pedidos
            </h1>

            <p class="orders-page__description">
                Da seguimiento a los pedidos enviados al laboratorio y consulta
                el estado de fabricación de cada trabajo.
            </p>

        </div>

    </header>

    <div class="orders-layout">

    <!-- ==========================================
         RESUMEN
    =========================================== -->

    <section class="orders-summary">

        <article class="orders-summary__card">

            <span class="orders-summary__label">
                Pedidos del día
            </span>

            <strong class="orders-summary__value">
                12
            </strong>

            <small>
                4 nuevos
            </small>

        </article>

        <article class="orders-summary__card">

            <span class="orders-summary__label">
                En laboratorio
            </span>

            <strong class="orders-summary__value">
                8
            </strong>

            <small>
                En proceso
            </small>

        </article>

        <article class="orders-summary__card">

            <span class="orders-summary__label">
                Listos
            </span>

            <strong class="orders-summary__value">
                3
            </strong>

            <small>
                Esperando entrega
            </small>

        </article>

        <article class="orders-summary__card">

            <span class="orders-summary__label">
                Entregados
            </span>

            <strong class="orders-summary__value">
                42
            </strong>

            <small>
                Este mes
            </small>

        </article>

    </section>

    <!-- ==========================================
         FILTROS
    =========================================== -->

    <section class="orders-filters">

        <input
            type="search"
            class="orders-filters__search"
            placeholder="Buscar cliente, pedido o venta..."
        >

        <select class="orders-filters__select">

            <option>
                Todos los estados
            </option>

            <option>
                Pendiente
            </option>

            <option>
                En laboratorio
            </option>

            <option>
                Listo
            </option>

            <option>
                Entregado
            </option>

        </select>

        <select class="orders-filters__select">

            <option>
                Todos los laboratorios
            </option>

            <option>
                Luxottica
            </option>

            <option>
                Essilor
            </option>

        </select>

    </section>

    <!-- ==========================================
         TABLERO
    =========================================== -->

    <section class="orders-board">

        <!-- Pendientes -->

        <article class="orders-column">

            <header class="orders-column__header">

                <h2>
                    Pendientes
                </h2>

                <span>
                    2
                </span>

            </header>

            <div class="orders-column__body">

                <article class="order-card">

                    <span class="order-card__number">
                        Venta #00035
                    </span>

                    <h3>
                        María López Hernández
                    </h3>

                    <p>
                        Armazón + Micas Blue Protect
                    </p>

                    <div class="order-card__footer">

                        <small>
                            Laura Gómez
                        </small>

                        <strong>
                            05 Ago
                        </strong>

                    </div>

                </article>

            </div>

        </article>

        <!-- Laboratorio -->

        <article class="orders-column">

            <header class="orders-column__header">

                <h2>
                    En laboratorio
                </h2>

                <span>
                    3
                </span>

            </header>

            <div class="orders-column__body">

                <article class="order-card order-card--progress">

                    <span class="order-card__number">
                        Venta #00034
                    </span>

                    <h3>
                        José Ramírez
                    </h3>

                    <p>
                        Micas Antirreflejantes
                    </p>

                    <div class="order-card__footer">

                        <small>
                            Luxottica
                        </small>

                        <strong>
                            08 Ago
                        </strong>

                    </div>

                </article>

            </div>

        </article>

        <!-- Listos -->

        <article class="orders-column">

            <header class="orders-column__header">

                <h2>
                    Listos
                </h2>

                <span>
                    1
                </span>

            </header>

            <div class="orders-column__body">

                <article class="order-card order-card--ready">

                    <span class="order-card__number">
                        Venta #00033
                    </span>

                    <h3>
                        Ana García
                    </h3>

                    <p>
                        Lentes completos
                    </p>

                    <div class="order-card__footer">

                        <small>
                            Avisar al cliente
                        </small>

                        <strong>
                            Hoy
                        </strong>

                    </div>

                </article>

            </div>

        </article>

        <!-- Entregados -->

        <article class="orders-column">

            <header class="orders-column__header">

                <h2>
                    Entregados
                </h2>

                <span>
                    4
                </span>

            </header>

            <div class="orders-column__body">

                <article class="order-card order-card--done">

                    <span class="order-card__number">
                        Venta #00031
                    </span>

                    <h3>
                        Carlos Méndez
                    </h3>

                    <p>
                        Entregado correctamente
                    </p>

                    <div class="order-card__footer">

                        <small>
                            Finalizado
                        </small>

                        <strong>
                            29 Jul
                        </strong>

                    </div>

                </article>

            </div>

        </article>

    </section>

</div>

</section>

<?= $this->endSection() ?>