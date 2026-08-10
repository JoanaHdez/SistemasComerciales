<?php

// ==========================================================
// Detectar módulo actual
// ==========================================================

$uri = service('uri');

$seccionActual = $uri->getSegment(2);

$isDashboard  = $seccionActual === 'dashboard';
$isPedidos    = $seccionActual === 'pedidos';
$isInventario = $seccionActual === 'inventario';
$isCompras    = $seccionActual === 'compras';
$isReportes   = $seccionActual === 'reportes';

?>

<header class="app-header">

    <!-- =====================================================
         IZQUIERDA
    ====================================================== -->

    <div class="app-header__left">

        <button
            type="button"
            class="app-header__menu-button"
            data-sidebar-toggle
            aria-label="Abrir menú"
            aria-expanded="false"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>

        <a
            href="<?= base_url('optica/menu') ?>"
            class="app-header__brand"
        >
            Sistema de Gestión para Óptica
        </a>

    </div>


    <!-- =====================================================
         NAVEGACIÓN SUPERIOR
    ====================================================== -->

    <nav
        class="app-header__nav"
        aria-label="Navegación administrativa"
    >

        <a
            href="<?= base_url('optica/dashboard') ?>"
            class="<?= $isDashboard ? 'app-header__nav-link--active' : '' ?>"
            <?= $isDashboard ? 'aria-current="page"' : '' ?>
        >
            Dashboard
        </a>

        <a
            href="<?= base_url('optica/pedidos') ?>"
            class="<?= $isPedidos ? 'app-header__nav-link--active' : '' ?>"
            <?= $isPedidos ? 'aria-current="page"' : '' ?>
        >
            Pedidos
        </a>

        <a
            href="<?= base_url('optica/inventario') ?>"
            class="<?= $isInventario ? 'app-header__nav-link--active' : '' ?>"
            <?= $isInventario ? 'aria-current="page"' : '' ?>
        >
            Inventario
        </a>

        <a
            href="<?= base_url('optica/compras') ?>"
            class="<?= $isCompras ? 'app-header__nav-link--active' : '' ?>"
            <?= $isCompras ? 'aria-current="page"' : '' ?>
        >
            Compras
        </a>

        <a
            href="<?= base_url('optica/reportes') ?>"
            class="<?= $isReportes ? 'app-header__nav-link--active' : '' ?>"
            <?= $isReportes ? 'aria-current="page"' : '' ?>
        >
            Reportes
        </a>

    </nav>


    <!-- =====================================================
         ACCIONES
    ====================================================== -->

    <div class="app-header__actions">

        <button
            type="button"
            class="app-header__action"
            aria-label="Notificaciones"
        >
            N
        </button>

        <a
            href="<?= base_url('optica/perfil') ?>"
            class="app-header__profile"
            aria-label="Abrir perfil"
        >

            <span class="app-header__avatar">
                JH
            </span>

            <span class="app-header__profile-info">

                <strong>
                    Joana
                </strong>

                <small>
                    Administración
                </small>

            </span>

        </a>

    </div>

</header>