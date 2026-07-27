<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Inventario | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/inventario.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="inventory-page">

    <header class="inventory-page__header">

        <div>
            <span class="inventory-page__eyebrow">
                CONTROL DE EXISTENCIAS
            </span>

            <h1 class="inventory-page__title">
                Inventario
            </h1>

            <p class="inventory-page__description">
                Consulta las existencias de productos, identifica artículos
                con poco stock y administra el inventario de la óptica.
            </p>
        </div>

        <button
            type="button"
            class="inventory-page__button"
            id="new-product-button"
        >
            + Nuevo producto
        </button>

    </header>

    <div class="inventory-summary">

        <article class="inventory-summary__card">

            <span class="inventory-summary__label">
                Total de productos
            </span>

            <strong class="inventory-summary__value">
                128
            </strong>

            <span class="inventory-summary__detail">
                Productos registrados
            </span>

        </article>

        <article class="inventory-summary__card">

            <span class="inventory-summary__label">
                Stock disponible
            </span>

            <strong class="inventory-summary__value">
                1,246
            </strong>

            <span class="inventory-summary__detail">
                Unidades disponibles
            </span>

        </article>

        <article class="inventory-summary__card">

            <span class="inventory-summary__label">
                Stock bajo
            </span>

            <strong class="inventory-summary__value">
                12
            </strong>

            <span class="inventory-summary__detail">
                Requieren reposición
            </span>

        </article>

        <article class="inventory-summary__card">

            <span class="inventory-summary__label">
                Sin existencias
            </span>

            <strong class="inventory-summary__value">
                4
            </strong>

            <span class="inventory-summary__detail">
                Productos agotados
            </span>

        </article>

    </div>

    <section class="inventory-panel">

        <div class="inventory-toolbar">

            <div class="inventory-search">

                <span class="inventory-search__icon">
                    🔍
                </span>

                <input
                    type="search"
                    class="inventory-search__input"
                    id="inventory-search"
                    placeholder="Buscar por nombre, código o categoría"
                >

            </div>

            <div class="inventory-filters">

                <select
                    class="inventory-filter"
                    id="inventory-category-filter"
                >
                    <option value="">
                        Todas las categorías
                    </option>

                    <option value="armazones">
                        Armazones
                    </option>

                    <option value="lentes">
                        Lentes
                    </option>

                    <option value="accesorios">
                        Accesorios
                    </option>

                    <option value="soluciones">
                        Soluciones
                    </option>
                </select>

                <select
                    class="inventory-filter"
                    id="inventory-status-filter"
                >
                    <option value="">
                        Todos los estados
                    </option>

                    <option value="disponible">
                        Disponible
                    </option>

                    <option value="bajo">
                        Stock bajo
                    </option>

                    <option value="agotado">
                        Agotado
                    </option>
                </select>

            </div>

        </div>

        <div class="inventory-table-wrapper">

            <table class="inventory-table">

                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Código</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Existencias</th>
                        <th>Estado</th>
                        <th aria-label="Acciones"></th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>
                            <div class="inventory-product">

                                <div class="inventory-product__image">
                                    👓
                                </div>

                                <div>
                                    <strong class="inventory-product__name">
                                        Armazón Classic Black
                                    </strong>

                                    <span class="inventory-product__brand">
                                        Opticool Collection
                                    </span>
                                </div>

                            </div>
                        </td>

                        <td>ARM-001</td>
                        <td>Armazones</td>
                        <td>$1,250.00</td>
                        <td>18</td>

                        <td>
                            <span class="inventory-status inventory-status--available">
                                Disponible
                            </span>
                        </td>

                        <td>
                            <div class="inventory-actions">

                                <button
                                    type="button"
                                    class="inventory-action"
                                    aria-label="Ver producto"
                                    title="Ver producto"
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    class="inventory-action"
                                    aria-label="Editar producto"
                                    title="Editar producto"
                                >
                                    ✏️
                                </button>

                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="inventory-product">

                                <div class="inventory-product__image">
                                    🕶️
                                </div>

                                <div>
                                    <strong class="inventory-product__name">
                                        Armazón Solar Urban
                                    </strong>

                                    <span class="inventory-product__brand">
                                        Urban Vision
                                    </span>
                                </div>

                            </div>
                        </td>

                        <td>ARM-014</td>
                        <td>Armazones</td>
                        <td>$980.00</td>
                        <td>4</td>

                        <td>
                            <span class="inventory-status inventory-status--low">
                                Stock bajo
                            </span>
                        </td>

                        <td>
                            <div class="inventory-actions">

                                <button
                                    type="button"
                                    class="inventory-action"
                                    aria-label="Ver producto"
                                    title="Ver producto"
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    class="inventory-action"
                                    aria-label="Editar producto"
                                    title="Editar producto"
                                >
                                    ✏️
                                </button>

                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="inventory-product">

                                <div class="inventory-product__image">
                                    💧
                                </div>

                                <div>
                                    <strong class="inventory-product__name">
                                        Solución multipropósito
                                    </strong>

                                    <span class="inventory-product__brand">
                                        Clear Care
                                    </span>
                                </div>

                            </div>
                        </td>

                        <td>SOL-006</td>
                        <td>Soluciones</td>
                        <td>$210.00</td>
                        <td>0</td>

                        <td>
                            <span class="inventory-status inventory-status--empty">
                                Agotado
                            </span>
                        </td>

                        <td>
                            <div class="inventory-actions">

                                <button
                                    type="button"
                                    class="inventory-action"
                                    aria-label="Ver producto"
                                    title="Ver producto"
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    class="inventory-action"
                                    aria-label="Editar producto"
                                    title="Editar producto"
                                >
                                    ✏️
                                </button>

                            </div>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

        <footer class="inventory-pagination">

            <span class="inventory-pagination__summary">
                Mostrando 1 a 3 de 128 productos
            </span>

            <div class="inventory-pagination__buttons">

                <button
                    type="button"
                    class="inventory-pagination__button"
                    disabled
                >
                    Anterior
                </button>

                <button
                    type="button"
                    class="inventory-pagination__button inventory-pagination__button--active"
                >
                    1
                </button>

                <button
                    type="button"
                    class="inventory-pagination__button"
                >
                    2
                </button>

                <button
                    type="button"
                    class="inventory-pagination__button"
                >
                    3
                </button>

                <button
                    type="button"
                    class="inventory-pagination__button"
                >
                    Siguiente
                </button>

            </div>

        </footer>

    </section>

</section>

<?= $this->endSection() ?>