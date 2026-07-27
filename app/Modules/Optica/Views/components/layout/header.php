<header class="app-header">

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

    <nav
        class="app-header__nav"
        aria-label="Navegación administrativa"
    >
        <a href="<?= base_url('optica/menu') ?>">
            Dashboard
        </a>

        <a href="#">
            Pedidos
        </a>

        <a
    href="<?= base_url('optica/inventario') ?>"
    class="main-menu__nav-link"
>
    Inventario
</a>

        <a href="#">
            Compras
        </a>

        <a href="#">
            Reportes
        </a>
    </nav>

    <div class="app-header__actions">

        <button
            type="button"
            class="app-header__action"
            aria-label="Notificaciones"
        >
            N
        </button>

        <button
            type="button"
            class="app-header__profile"
            aria-label="Abrir perfil"
        >
            <span class="app-header__avatar">
                JH
            </span>

            <span class="app-header__profile-info">
                <strong>Joana</strong>
                <small>Administración</small>
            </span>
        </button>

    </div>

</header>