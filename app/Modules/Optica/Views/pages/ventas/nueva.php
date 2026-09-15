<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Nueva venta | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/venta.css') ?>">

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="sale-page">

    <div class="sale-page__header">

        <div>
            <span class="sale-page__eyebrow">
                GESTIÓN DE VENTAS
            </span>

            <h1 class="sale-page__title">
                Nueva venta
            </h1>

            <p class="sale-page__description">
                Selecciona un cliente, agrega los productos y registra el pago de la venta.
            </p>
        </div>

        <a href="<?= base_url('optica/ventas/historial') ?>" class="sale-page__back">
            Historial de ventas
        </a>

    </div>

    <form class="sale-form">

        <div class="sale-layout">

            <div class="sale-content">

                <section class="sale-card">

                    <div class="sale-card__header">

                        <span class="sale-card__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="8" r="4"></circle>
                                <path d="M4 21a8 8 0 0 1 16 0"></path>
                            </svg>
                        </span>

                        <div>
                            <h2 class="sale-card__title">
                                Cliente
                            </h2>

                            <p class="sale-card__description">
                                Busca un cliente registrado o crea uno nuevo.
                            </p>
                        </div>

                    </div>

                    <div class="sale-client-row">

                        <div class="sale-client-search">

                            <label for="cliente_busqueda" class="sr-only">
                                Buscar cliente
                            </label>

                            <input type="search" id="cliente_busqueda" name="cliente_busqueda"
                                placeholder="Ej. María López o 55 1234 5678">

                            <span class="sale-client-name">
                                Ningún cliente seleccionado
                            </span>

                        </div>

                        <div class="sale-client-actions">

                            <button type="button" class="sale-button sale-button--primary">
                                Buscar
                            </button>

                            <a href="<?= base_url('optica/clientes/nuevo') ?>"
                                class="sale-button sale-button--secondary">
                                Nuevo cliente
                            </a>

                        </div>

                    </div>

                </section>

                <section class="sale-card">

                    <div class="sale-card__header">

                        <span class="sale-card__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                                <path d="M16 3v4"></path>
                                <path d="M8 3v4"></path>
                                <path d="M3 11h18"></path>
                            </svg>
                        </span>

                        <div>
                            <h2 class="sale-card__title">
                                Datos de la venta
                            </h2>

                            <p class="sale-card__description">
                                Define la fecha y el estado de pago.
                            </p>
                        </div>

                    </div>

                    <div class="sale-data-grid">

                        <div class="sale-form-group">
                            <label for="fecha_venta">
                                Fecha de venta
                            </label>

                            <input type="date" id="fecha_venta" name="fecha_venta" value="<?= date('Y-m-d') ?>">
                        </div>

                        <div class="sale-form-group">
                            <label for="estado_pago">
                                Estado de pago
                            </label>

                            <select id="estado_pago" name="estado_pago">
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
                        </div>

                    </div>

                </section>

                <section class="sale-card">

                    <div class="sale-products__header">

                        <div class="sale-card__header">

                            <span class="sale-card__icon">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M3 3h2l2.4 10.2a2 2 0 0 0 2 1.5h7.7a2 2 0 0 0 2-1.6L21 6H6"></path>
                                    <circle cx="10" cy="20" r="1"></circle>
                                    <circle cx="18" cy="20" r="1"></circle>
                                </svg>
                            </span>

                            <div>
                                <h2 class="sale-card__title">
                                    Productos
                                </h2>

                                <p class="sale-card__description">
                                    Agrega los productos incluidos en la venta.
                                </p>
                            </div>

                        </div>

                        <button type="button" class="sale-add-product">
                            <span>+</span>
                            Agregar producto
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
                                    <th>Acciones</th>
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

            </div>

            <aside class="sale-summary">

                <div class="sale-summary__header">

                    <span class="sale-summary__icon">
                        $
                    </span>

                    <div>
                        <h2>Resumen</h2>
                        <p>Importes de la venta</p>
                    </div>

                </div>

                <div class="sale-summary__item">

                    <span class="sale-summary__label">
                        Subtotal
                    </span>

                    <strong class="sale-summary__value">
                        $0.00
                    </strong>

                </div>

                <div class="sale-summary__item">

                    <label for="descuento_venta" class="sale-summary__label">
                        Descuento
                    </label>

                    <input type="number" id="descuento_venta" name="descuento_venta" class="sale-summary__input" min="0"
                        step="0.01" value="0">

                </div>

                <div class="sale-summary__separator"></div>

                <div class="sale-summary__item sale-summary__item--total">

                    <span class="sale-summary__label">
                        Total
                    </span>

                    <strong class="sale-summary__total">
                        $0.00
                    </strong>

                </div>

                <div class="sale-summary__actions">

                    <button type="submit" class="sale-button sale-button--primary">
                        Guardar venta
                    </button>

                    <button type="button" class="sale-button sale-button--secondary">
                        Cancelar
                    </button>

                </div>

            </aside>

        </div>

    </form>

</section>

<?= $this->endSection() ?>