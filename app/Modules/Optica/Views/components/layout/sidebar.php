<?php

$uri = service('uri');

$segment1 = $uri->getSegment(1);
$segment2 = $uri->getSegment(2);
$segment3 = $uri->getSegment(3);

$currentPath = trim($uri->getPath(), '/');

$isClientes = str_starts_with($currentPath, 'optica/clientes');

$isConsulta = str_starts_with($currentPath, 'optica/consulta')
    || str_starts_with($currentPath, 'optica/graduacion');

$isAgenda = str_starts_with($currentPath, 'optica/agenda');

$isVentas = str_starts_with($currentPath, 'optica/ventas');

$isNuevoCliente = $currentPath === 'optica/clientes/nuevo';

$isBuscarCliente = $currentPath === 'optica/clientes';

$isBuscarConsulta = $currentPath === 'optica/consulta';

$isExpediente = str_starts_with($currentPath, 'optica/consulta/expediente')
    || str_starts_with($currentPath, 'optica/graduacion');

$isHistorialConsulta = str_starts_with(
    $currentPath,
    'optica/consulta/historial'
);

$isNuevaCita = str_starts_with($currentPath, 'optica/agenda/nueva');

$isCalendario = $currentPath === 'optica/agenda';

$isNuevaVenta = $currentPath === 'optica/ventas/nueva';

$isHistorialVentas = str_starts_with(
    $currentPath,
    'optica/ventas/historial'
);
?>

<div class="app-sidebar__overlay" data-sidebar-overlay></div>

<aside class="app-sidebar" data-sidebar>

    <div class="app-sidebar__top">

        <div class="app-sidebar__brand">

            <a
                href="<?= base_url('optica/menu') ?>"
                class="app-sidebar__logo"
            >
                Opticool
            </a>

            <span class="app-sidebar__subtitle">
                Sistema de Gestión
            </span>

        </div>

        <nav
            class="app-sidebar__nav"
            aria-label="Navegación operativa"
        >

            <div
                class="
                    app-sidebar__module
                    <?= $isClientes
                        ? 'app-sidebar__module--open'
                        : ''
                    ?>
                "
                data-sidebar-module
            >

                <button
                    type="button"
                    class="
                        app-sidebar__module-button
                        <?= $isClientes
                            ? 'app-sidebar__module-button--active'
                            : ''
                        ?>
                    "
                    data-sidebar-module-button
                    aria-expanded="<?= $isClientes ? 'true' : 'false' ?>"
                >

                    <span class="app-sidebar__module-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                            />
                            <circle cx="9" cy="7" r="4" />
                            <path
                                d="M22 21v-2a4 4 0 0 0-3-3.87"
                            />
                            <path
                                d="M16 3.13a4 4 0 0 1 0 7.75"
                            />
                        </svg>

                    </span>

                    <span class="app-sidebar__module-label">
                        Clientes
                    </span>

                    <span class="app-sidebar__chevron">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>

                </button>

                <div class="app-sidebar__submenu">

                    <a
                        href="<?= base_url('optica/clientes') ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isBuscarCliente
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Buscar cliente
                    </a>

                    <a
                        href="<?= base_url(
                            'optica/clientes/nuevo'
                        ) ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isNuevoCliente
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Nuevo cliente
                    </a>

                </div>

            </div>

            <div
                class="
                    app-sidebar__module
                    <?= $isConsulta
                        ? 'app-sidebar__module--open'
                        : ''
                    ?>
                "
                data-sidebar-module
            >

                <button
                    type="button"
                    class="
                        app-sidebar__module-button
                        <?= $isConsulta
                            ? 'app-sidebar__module-button--active'
                            : ''
                        ?>
                    "
                    data-sidebar-module-button
                    aria-expanded="<?= $isConsulta ? 'true' : 'false' ?>"
                >

                    <span class="app-sidebar__module-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="3" />
                            <path
                                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                            />
                        </svg>

                    </span>

                    <span class="app-sidebar__module-label">
                        Consulta
                    </span>

                    <span class="app-sidebar__chevron">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>

                </button>

                <div class="app-sidebar__submenu">

                    <a
                        href="<?= base_url('optica/consulta') ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isBuscarConsulta
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Consulta
                    </a>

                    <a
                        href="<?= base_url(
                            'optica/consulta/expediente'
                        ) ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isExpediente
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Expediente clínico
                    </a>

                    <a
                        href="<?= base_url(
                            'optica/consulta/historial'
                        ) ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isHistorialConsulta
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Historial
                    </a>

                </div>

            </div>

            <div
                class="
                    app-sidebar__module
                    <?= $isAgenda
                        ? 'app-sidebar__module--open'
                        : ''
                    ?>
                "
                data-sidebar-module
            >

                <button
                    type="button"
                    class="
                        app-sidebar__module-button
                        <?= $isAgenda
                            ? 'app-sidebar__module-button--active'
                            : ''
                        ?>
                    "
                    data-sidebar-module-button
                    aria-expanded="<?= $isAgenda ? 'true' : 'false' ?>"
                >

                    <span class="app-sidebar__module-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="2"
                            />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M3 11h18" />
                        </svg>

                    </span>

                    <span class="app-sidebar__module-label">
                        Agenda
                    </span>

                    <span class="app-sidebar__chevron">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>

                </button>

                <div class="app-sidebar__submenu">

                    <a
                        href="<?= base_url('optica/agenda/nueva') ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isNuevaCita
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Nueva cita
                    </a>

                    <a
                        href="<?= base_url('optica/agenda') ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isCalendario
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Calendario
                    </a>

                </div>

            </div>

            <div
                class="
                    app-sidebar__module
                    <?= $isVentas
                        ? 'app-sidebar__module--open'
                        : ''
                    ?>
                "
                data-sidebar-module
            >

                <button
                    type="button"
                    class="
                        app-sidebar__module-button
                        <?= $isVentas
                            ? 'app-sidebar__module-button--active'
                            : ''
                        ?>
                    "
                    data-sidebar-module-button
                    aria-expanded="<?= $isVentas ? 'true' : 'false' ?>"
                >

                    <span class="app-sidebar__module-icon">

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M3 3h2l2.4 10.2a2 2 0 0 0 2 1.5h7.7a2 2 0 0 0 2-1.6L21 6H6" />
                            <circle cx="10" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                        </svg>

                    </span>

                    <span class="app-sidebar__module-label">
                        Ventas
                    </span>

                    <span class="app-sidebar__chevron">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>

                </button>

                <div class="app-sidebar__submenu">

                    <a
                        href="<?= base_url('optica/ventas/nueva') ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isNuevaVenta
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Nueva venta
                    </a>

                    <a
                        href="<?= base_url(
                            'optica/ventas/historial'
                        ) ?>"
                        class="
                            app-sidebar__submenu-item
                            <?= $isHistorialVentas
                                ? 'app-sidebar__submenu-item--active'
                                : ''
                            ?>
                        "
                    >
                        Historial de ventas
                    </a>

                </div>

            </div>

        </nav>

    </div>

    <div class="app-sidebar__footer">

        <a
    href="<?= base_url('optica/perfil') ?>"
    class="app-sidebar__footer-link"
>
    <span class="app-sidebar__footer-icon">

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>

    </span>

    <span>Mi perfil</span>
</a>

        <a
    href="<?= base_url('optica/configuracion') ?>"
    class="app-sidebar__footer-link"
>
    <span class="app-sidebar__footer-icon">

        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="3" />
            <path
                d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"
            />
        </svg>

    </span>

    <span>Configuración</span>
</a>

    </div>

</aside>