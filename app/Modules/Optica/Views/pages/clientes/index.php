<?= $this->extend('App\Modules\Optica\Views\layouts\auth') ?>

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

    <aside class="clients-sidebar">

        <div class="clients-sidebar__brand">
            <div class="clients-sidebar__logo">
                Opticool
            </div>

            <span class="clients-sidebar__subtitle">
                Óptica
            </span>
        </div>

        <nav class="clients-sidebar__nav" aria-label="Acciones de clientes">

            <a 
            href="<?= base_url('optica/clientes/nuevo') ?>" 
            class="clients-sidebar__item"
            >
                <span class="clients-sidebar__icon">+</span>
                <span>Nuevo</span>
            </a>

            <a href="#" class="clients-sidebar__item">
                <span class="clients-sidebar__icon">B</span>
                <span>Buscar</span>
            </a>

        </nav>

        <div class="clients-sidebar__footer">

            <a href="#" class="clients-sidebar__footer-link" aria-label="Agenda">
                A
            </a>

            <a href="#" class="clients-sidebar__footer-link" aria-label="Perfil">
                P
            </a>

            <a href="#" class="clients-sidebar__footer-link" aria-label="Configuración">
                C
            </a>

        </div>

    </aside>

    <div class="clients-page__main">

        <nav class="clients-topbar" aria-label="Navegación principal">
            <a href="<?= base_url('optica/menu') ?>">Dashboard</a>
            <a href="#">Pedidos</a>
            <a href="#">Inventario</a>
            <a href="#">Compras</a>
            <a href="#">Reportes</a>
        </nav>

        <div class="clients-page__content">

            <div class="clients-search">

                <label for="client-search" class="sr-only">
                    Buscar cliente
                </label>

                <input
                    type="search"
                    id="client-search"
                    name="search"
                    class="clients-search__input"
                    placeholder="Buscar por nombre, teléfono o correo"
                >

                <button
                    type="button"
                    class="clients-search__button"
                >
                    Buscar
                </button>

            </div>

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

        </div>

    </div>

</section>

<?= $this->endSection() ?>