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
    });

    document
        .querySelectorAll('.app-sidebar__submenu-item')
        .forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 920) {
                    closeSidebar();
                }
            });
        });
});