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

<?php

/*
|--------------------------------------------------------------------------
| Datos simulados de clientes
|--------------------------------------------------------------------------
| Estos datos son temporales y sirven únicamente para el Front-End.
| Posteriormente el backend deberá enviar este arreglo desde el controlador.
|--------------------------------------------------------------------------
*/

$clientes = [
    [
        'id' => 1,
        'nombre' => 'María López Hernández',
        'telefono' => '55 1234 5678',
        'correo' => 'maria@example.com',
        'fecha_registro' => '19/07/2026',
        'estado' => 'Activo',
    ],
    [
        'id' => 2,
        'nombre' => 'Carlos Martínez Ruiz',
        'telefono' => '55 8765 4321',
        'correo' => 'carlos@example.com',
        'fecha_registro' => '18/07/2026',
        'estado' => 'Inactivo',
    ],
];

?>

<section class="clients-page">

    <!-- =====================================================
         ENCABEZADO
    ====================================================== -->

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


    <!-- =====================================================
         BUSCADOR
    ====================================================== -->

    <section class="clients-search-card">

        <div class="clients-search-card__intro">

            <span class="clients-search-card__icon">

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="7"
                    ></circle>

                    <path
                        d="m20 20-3.5-3.5"
                    ></path>
                </svg>

            </span>

            <div>

                <h2>
                    Buscar cliente
                </h2>

                <p>
                    Ingresa el nombre, teléfono o correo del cliente.
                </p>

            </div>

        </div>


        <div class="clients-search">

            <label
                for="client-search"
                class="sr-only"
            >
                Buscar cliente
            </label>

            <input
                type="search"
                id="client-search"
                name="search"
                class="clients-search__input"
                placeholder="Ej. María López o 55 1234 5678"
                autocomplete="off"
            >

            <button
                type="button"
                class="clients-search__button"
                id="client-search-button"
            >
                Buscar
            </button>

        </div>

    </section>


    <!-- =====================================================
         TABLA
    ====================================================== -->

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

            <tbody id="clients-table-body">

                <?php foreach ($clientes as $cliente): ?>

                    <?php
                        $esActivo =
                            $cliente['estado'] === 'Activo';
                    ?>

                    <tr
                        data-client-id="<?= esc($cliente['id']) ?>"
                    >

                        <td>
                            <?= esc($cliente['id']) ?>
                        </td>

                        <td>
                            <?= esc($cliente['nombre']) ?>
                        </td>

                        <td>
                            <?= esc($cliente['telefono']) ?>
                        </td>

                        <td>
                            <?= esc($cliente['correo']) ?>
                        </td>

                        <td>
                            <?= esc($cliente['fecha_registro']) ?>
                        </td>

                        <td>

                            <span
                                class="
                                    status-badge
                                    <?= $esActivo
                                        ? 'status-badge--active'
                                        : 'status-badge--inactive'
                                    ?>
                                "
                            >
                                <?= esc($cliente['estado']) ?>
                            </span>

                        </td>

                        <td>

                            <div class="clients-table__actions">

                                <a
                                    href="<?= base_url('optica/consulta/historial') ?>"
                                    class="clients-table__action"
                                    data-action="view"
                                    data-client-id="<?= esc($cliente['id']) ?>"
                                >
                                    Ver
                                </a>

                                <a
                                    href="<?= base_url('optica/consulta/expediente') ?>"
                                    class="clients-table__action"
                                    data-action="edit"
                                    data-client-id="<?= esc($cliente['id']) ?>"
                                >
                                    Editar
                                </a>

                            </div>

                        </td>

                    </tr>

                <?php endforeach; ?>

            </tbody>

        </table>

    </div>

</section>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

<script
    src="<?= base_url('assets/optica/js/pages/clientes.js') ?>"
></script>

<?= $this->endSection() ?>