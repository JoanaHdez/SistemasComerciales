<!-- <aside class="app-sidebar">
    <div class="app-sidebar__content">
        <h3 class="app-sidebar__title">Menú</h3>
    </div>
</aside> -->


<aside class="app-sidebar">

    <div class="app-sidebar__brand">
        <div class="app-sidebar__logo">
            Opticool
        </div>

        <span class="app-sidebar__subtitle">
            Óptica
        </span>
    </div>

    <nav class="app-sidebar__nav" aria-label="Navegación principal">

        <a
            href="<?= base_url('optica/menu') ?>"
            class="app-sidebar__item"
        >
            <span class="app-sidebar__icon">D</span>
            <span>Dashboard</span>
        </a>

        <a
            href="<?= base_url('optica/clientes') ?>"
            class="app-sidebar__item"
        >
            <span class="app-sidebar__icon">C</span>
            <span>Clientes</span>
        </a>

        <a
            href="<?= base_url('optica/consulta') ?>"
            class="app-sidebar__item app-sidebar__item--active"
        >
            <span class="app-sidebar__icon">Q</span>
            <span>Consulta</span>
        </a>

        <a
            href="#"
            class="app-sidebar__item"
        >
            <span class="app-sidebar__icon">A</span>
            <span>Agenda</span>
        </a>

        <a
            href="<?= base_url('optica/ventas/nueva') ?>"
            class="app-sidebar__item"
        >
            <span class="app-sidebar__icon">V</span>
            <span>Nueva venta</span>
        </a>

    </nav>

    <div class="app-sidebar__footer">

        <a
            href="#"
            class="app-sidebar__footer-link"
            aria-label="Perfil"
        >
            P
        </a>

        <a
            href="#"
            class="app-sidebar__footer-link"
            aria-label="Configuración"
        >
            C
        </a>

    </div>

</aside>