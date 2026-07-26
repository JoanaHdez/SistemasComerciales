<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Clientes | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>

<link
    rel="stylesheet"
    href="<?= base_url('assets/optica/css/pages/clientes.css') ?>"
>

<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="clients-page">

    <div class="clients-page__header">

        <div>
            <span class="clients-page__eyebrow">
                GESTIÓN DE CLIENTES
            </span>

            <h1 class="clients-page__title">
                Buscar cliente
            </h1>

            <p class="clients-page__description">
                Consulta y administra la información de los clientes registrados.
            </p>
        </div>

        <a
            href="<?= base_url('optica/clientes/nuevo') ?>"
            class="clients-page__primary-action"
        >
            <span>+</span>
            Nuevo cliente
        </a>

    </div>

    <section class="clients-search-card">

        <div class="clients-search-card__intro">

            <span class="clients-search-card__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="m20 20-3.5-3.5"></path>
                </svg>
            </span>

            <div>
                <h2>Buscar cliente</h2>

                <p>
                    Ingresa el nombre, teléfono o correo del cliente.
                </p>
            </div>

        </div>

        <div class="clients-search">

            <label for="client-search" class="sr-only">
                Buscar cliente
            </label>

            <input
                type="search"
                id="client-search"
                name="search"
                class="clients-search__input"
                placeholder="Ej. María López o 55 1234 5678"
            >

            <button
                type="button"
                class="clients-search__button"
            >
                Buscar
            </button>

        </div>

    </section>

    <div class="clients-table-wrapper">

        <table class="clients-table">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre completo</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Fecha de registro</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <td>1</td>
                    <td>María López Hernández</td>
                    <td>55 1234 5678</td>
                    <td>maria@example.com</td>
                    <td>19/07/2026</td>
                    <td>
                        <span class="status-badge status-badge--active">
                            Activo
                        </span>
                    </td>
                    <td>
                        <div class="clients-table__actions">
                            <button type="button">Ver</button>
                            <button type="button">Editar</button>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Carlos Martínez Ruiz</td>
                    <td>55 8765 4321</td>
                    <td>carlos@example.com</td>
                    <td>18/07/2026</td>
                    <td>
                        <span class="status-badge status-badge--inactive">
                            Inactivo
                        </span>
                    </td>
                    <td>
                        <div class="clients-table__actions">
                            <button type="button">Ver</button>
                            <button type="button">Editar</button>
                        </div>
                    </td>
                </tr>

            </tbody>

        </table>

    </div>

</section>

<?= $this->endSection() ?>