<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

<?= $this->section('title') ?>
Nueva Venta | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/clientes.css') ?>"
>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/venta.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="clients-page">

    <aside class="clients-sidebar">

        <div class="clients-sidebar__brand">

            <div class="clients-sidebar__logo">
                Opticool
            </div>

            <span class="clients-sidebar__subtitle">
                Óptica
            </span>

        </div>

        <nav
            class="clients-sidebar__nav"
            aria-label="Acciones de ventas"
        >

            <a
                href="<?= base_url('optica/ventas/nueva') ?>"
                class="clients-sidebar__item"
            >
                <span class="clients-sidebar__icon">+</span>
                <span>Nueva Venta</span>
            </a>

            <a
                href="#"
                class="clients-sidebar__item"
            >
                <span class="clients-sidebar__icon">H</span>
                <span>Historial Venta</span>
            </a>

        </nav>

        <div class="clients-sidebar__footer">

            <a
                href="#"
                class="clients-sidebar__footer-link"
                aria-label="Agenda"
            >
                A
            </a>

            <a
                href="#"
                class="clients-sidebar__footer-link"
                aria-label="Perfil"
            >
                P
            </a>

            <a
                href="#"
                class="clients-sidebar__footer-link"
                aria-label="Configuración"
            >
                C
            </a>

        </div>

    </aside>

    <div class="clients-page__main">

        <nav
            class="clients-topbar"
            aria-label="Navegación principal"
        >
            <a href="<?= base_url('optica/menu') ?>">
                Dashboard
            </a>

            <a href="#">
                Pedidos
            </a>

            <a href="#">
                Inventario
            </a>

            <a href="#">
                Compras
            </a>

            <a href="#">
                Reportes
            </a>
        </nav>

        <main class="sale-page">

            <form class="sale-form">

                <div class="sale-layout">

                    <section class="sale-main">

                        <h1 class="sale-title">
                            Venta
                        </h1>

                        <div class="sale-divider"></div>

                        <section class="sale-section">

                            <h2 class="sale-section__title">
                                Cliente:
                            </h2>

                            <div class="sale-client-row">

                                <div class="sale-client-search">

                                    <label
                                        for="cliente_busqueda"
                                        class="sr-only"
                                    >
                                        Buscar cliente
                                    </label>

                                    <input
                                        type="search"
                                        id="cliente_busqueda"
                                        name="cliente_busqueda"
                                        placeholder="Buscar"
                                    >

                                    <span class="sale-client-name">
                                        Nombre del cliente
                                    </span>

                                </div>

                                <div class="sale-client-actions">

                                    <button
                                        type="button"
                                        class="sale-small-button"
                                    >
                                        Buscar
                                    </button>

                                    <a
                                        href="<?= base_url('optica/clientes/nuevo') ?>"
                                        class="sale-small-button"
                                    >
                                        Nuevo Cliente
                                    </a>

                                </div>

                            </div>

                        </section>

                        <section class="sale-section">

                            <h2 class="sale-section__title">
                                Fecha:
                            </h2>

                            <input
                                type="date"
                                id="fecha_venta"
                                name="fecha_venta"
                                class="sale-date-input"
                                value="<?= date('Y-m-d') ?>"
                            >

                        </section>

                        <section class="sale-section">

                            <h2 class="sale-section__title">
                                Estado de Pago
                            </h2>

                            <select
                                id="estado_pago"
                                name="estado_pago"
                                class="sale-payment-select"
                            >
                                <option value="">
                                    Selecciona una opción
                                </option>

                                <option value="pendiente">
                                    Pendiente
                                </option>

                                <option value="parcial">
                                    Pago parcial
                                </option>

                                <option value="pagado">
                                    Pagado
                                </option>
                            </select>

                        </section>

                        <div class="sale-divider"></div>

                        <section class="sale-products">

                            <div class="sale-products__header">

                                <h2 class="sale-section__title">
                                    Productos
                                </h2>

                                <button
                                    type="button"
                                    class="sale-add-product"
                                    aria-label="Agregar producto"
                                >
                                    +
                                </button>

                            </div>

                            <div class="sale-table-wrapper">

                                <table class="sale-table">

                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Descuento</th>
                                            <th>Subtotal</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr class="sale-table__empty">
                                            <td colspan="6">
                                                No hay productos agregados.
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </section>

                    </section>

                    <aside class="sale-summary">

                        <div class="sale-summary__item">

                            <span class="sale-summary__label">
                                Subtotal
                            </span>

                            <span class="sale-summary__value">
                                $0.00
                            </span>

                        </div>

                        <div class="sale-summary__item">

                            <label
                                for="descuento_venta"
                                class="sale-summary__label"
                            >
                                Descuento
                            </label>

                            <input
                                type="number"
                                id="descuento_venta"
                                name="descuento_venta"
                                class="sale-summary__input"
                                min="0"
                                step="0.01"
                                value="0"
                            >

                        </div>

                        <div class="sale-summary__item sale-summary__item--total">

                            <span class="sale-summary__label">
                                Total
                            </span>

                            <span class="sale-summary__value">
                                $0.00
                            </span>

                        </div>

                        <div class="sale-summary__actions">

                            <button
                                type="submit"
                                class="sale-summary__button"
                            >
                                Guardar
                            </button>

                            <button
                                type="button"
                                class="sale-summary__button"
                            >
                                Cancelar
                            </button>

                        </div>

                    </aside>

                </div>

            </form>

        </main>

    </div>

</section>

<?= $this->endSection() ?>