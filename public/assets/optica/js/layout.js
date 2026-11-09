document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('[data-sidebar]');
    const sidebarToggle = document.querySelector(
        '[data-sidebar-toggle]'
    );
    const sidebarOverlay = document.querySelector(
        '[data-sidebar-overlay]'
    );

    const modules = document.querySelectorAll(
        '[data-sidebar-module]'
    );

    const header = document.querySelector('.app-header');
    const headerNav = document.querySelector('.app-header__nav');
    const adminNav = document.querySelector('[data-sidebar-admin-nav]');
    const adminWrapper = document.querySelector('[data-sidebar-admin-wrapper]');
    const primaryLinks = headerNav ? [...headerNav.children] : [];
    headerNav?.classList.add('app-header__nav--measuring');
    const primaryWidth = primaryLinks.reduce(
        (total, link) => total + link.getBoundingClientRect().width,
        0
    ) + Math.max(0, primaryLinks.length - 1) * 8;
    headerNav?.classList.remove('app-header__nav--measuring');

    const updatePrimaryNavigation = () => {
        if (!header || !headerNav || !adminNav || !adminWrapper) return;
        const left = header.querySelector('.app-header__left');
        const actions = header.querySelector('.app-header__actions');
        const required = (left?.getBoundingClientRect().width ?? 0)
            + (actions?.getBoundingClientRect().width ?? 0)
            + primaryWidth
            + 72;
        const compact = window.innerWidth <= 920
            || required > header.getBoundingClientRect().width;
        const destination = compact ? adminNav : headerNav;
        primaryLinks.forEach((link) => destination.append(link));
        adminWrapper.hidden = !compact;
        header.classList.toggle('app-header--compact', compact);
    };

    const closeAllModules = (exceptModule = null) => {
        modules.forEach((module) => {
            if (module === exceptModule) {
                return;
            }

            module.classList.remove(
                'app-sidebar__module--open'
            );

            const button = module.querySelector(
                '[data-sidebar-module-button]'
            );

            if (button) {
                button.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        });
    };

    modules.forEach((module) => {
        const button = module.querySelector(
            '[data-sidebar-module-button]'
        );

        if (!button) {
            return;
        }

        button.addEventListener('click', () => {
            const isOpen = module.classList.contains(
                'app-sidebar__module--open'
            );

            closeAllModules(module);

            module.classList.toggle(
                'app-sidebar__module--open',
                !isOpen
            );

            button.setAttribute(
                'aria-expanded',
                String(!isOpen)
            );
        });
    });

    const openSidebar = () => {
        if (!sidebar || !sidebarOverlay) {
            return;
        }

        sidebar.classList.add('app-sidebar--open');

        sidebarOverlay.classList.add(
            'app-sidebar__overlay--visible'
        );

        document.body.classList.add(
            'app-sidebar-lock'
        );

        sidebarToggle?.setAttribute(
            'aria-expanded',
            'true'
        );
    };

    const closeSidebar = () => {
        if (!sidebar || !sidebarOverlay) {
            return;
        }

        sidebar.classList.remove('app-sidebar--open');

        sidebarOverlay.classList.remove(
            'app-sidebar__overlay--visible'
        );

        document.body.classList.remove(
            'app-sidebar-lock'
        );

        sidebarToggle?.setAttribute(
            'aria-expanded',
            'false'
        );
    };

    sidebarToggle?.addEventListener('click', () => {
        const isOpen = sidebar?.classList.contains(
            'app-sidebar--open'
        );

        if (isOpen) {
            closeSidebar();
            return;
        }

        openSidebar();
    });

    sidebarOverlay?.addEventListener(
        'click',
        closeSidebar
    );

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 920) {
            closeSidebar();
        }
        updatePrimaryNavigation();
    });

    if (globalThis.ResizeObserver) {
        new ResizeObserver(updatePrimaryNavigation).observe(header ?? document.body);
    }
    updatePrimaryNavigation();

    document
        .querySelectorAll('.app-sidebar__submenu-item, .app-sidebar__admin-links a')
        .forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 920) {
                    closeSidebar();
                }
            });
        });
});
