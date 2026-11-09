<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Pedidos | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>
<link rel="stylesheet" href="<?= base_url('assets/optica/css/components/modal.css') ?>">
<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/pedidos.css') ?>">
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="orders-page" data-orders-page>
    <header class="orders-page__header">
        <div>
            <span class="orders-page__eyebrow">LABORATORIO</span>
            <h1 class="orders-page__title">Pedidos</h1>
            <p class="orders-page__description">
                Da seguimiento a los pedidos enviados al laboratorio y consulta
                el estado de fabricación de cada trabajo.
            </p>
        </div>

        <div class="orders-page__actions">
            <label class="orders-role">
                Rol
                <select id="orders-role">
                    <option value="ventas">Personal de ventas</option>
                    <option value="administrador">Administrador</option>
                </select>
            </label>
            <button type="button" class="orders-button orders-button--secondary" id="orders-labs-open">
                Laboratorios
            </button>
            <button type="button" class="orders-button orders-button--primary" id="orders-new-open">
                + Nuevo pedido
            </button>
        </div>
    </header>

    <p class="orders-message" id="orders-message" role="status" hidden></p>

    <div class="orders-layout">
        <section class="orders-summary" aria-label="Indicadores de pedidos">
            <article class="orders-summary__card">
                <span class="orders-summary__label">Pedidos del día</span>
                <strong class="orders-summary__value" id="orders-summary-today">0</strong>
                <small id="orders-summary-new">Sin pedidos nuevos</small>
            </article>
            <article class="orders-summary__card">
                <span class="orders-summary__label">En laboratorio</span>
                <strong class="orders-summary__value" id="orders-summary-progress">0</strong>
                <small>En proceso</small>
            </article>
            <article class="orders-summary__card">
                <span class="orders-summary__label">Listos</span>
                <strong class="orders-summary__value" id="orders-summary-ready">0</strong>
                <small>Esperando entrega</small>
            </article>
            <article class="orders-summary__card">
                <span class="orders-summary__label">Entregados</span>
                <strong class="orders-summary__value" id="orders-summary-delivered">0</strong>
                <small>Este mes</small>
            </article>
        </section>

        <section class="orders-filters" aria-label="Filtros de pedidos">
            <input type="search" class="orders-filters__search" id="orders-search"
                placeholder="Buscar cliente, pedido, venta o producto...">
            <select class="orders-filters__select" id="orders-state-filter">
                <option value="">Todos los estados</option>
                <option>Pendiente</option>
                <option>En laboratorio</option>
                <option>Listo</option>
                <option>Entregado</option>
            </select>
            <select class="orders-filters__select" id="orders-lab-filter">
                <option value="">Todos los laboratorios</option>
            </select>
            <select class="orders-filters__select" id="orders-origin-filter">
                <option value="">Todos los orígenes</option>
                <option value="venta">Desde venta</option>
                <option value="manual">Manual</option>
            </select>
            <label class="orders-filters__date">Desde<input type="date" id="orders-date-from"></label>
            <label class="orders-filters__date">Hasta<input type="date" id="orders-date-to"></label>
            <button type="button" class="orders-filters__clear" id="orders-clear-filters">Limpiar filtros</button>
        </section>

        <section class="orders-board" aria-live="polite">
            <?php foreach ([
                ['Pendiente', 'pending'],
                ['En laboratorio', 'progress'],
                ['Listo', 'ready'],
                ['Entregado', 'done'],
            ] as [$estado, $clave]): ?>
                <article class="orders-column" data-order-column="<?= esc($estado) ?>">
                    <header class="orders-column__header">
                        <h2><?= esc($estado === 'Pendiente' ? 'Pendientes' : ($estado === 'Entregado' ? 'Entregados' : $estado)) ?></h2>
                        <span id="orders-count-<?= esc($clave) ?>">0</span>
                    </header>
                    <div class="orders-column__body" id="orders-column-<?= esc($clave) ?>"></div>
                </article>
            <?php endforeach ?>
        </section>
    </div>

    <div class="modal" id="orders-new-modal" aria-hidden="true">
        <div class="modal__overlay"></div>
        <form class="modal__content orders-modal__content" id="orders-new-form" role="dialog"
            aria-modal="true" aria-labelledby="orders-new-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">REGISTRO MANUAL</span>
                    <h2 class="modal__title" id="orders-new-title">Nuevo pedido</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar">×</button>
            </header>

            <div class="modal__grid">
                <div class="form-group form-group--full">
                    <label for="orders-new-client">Cliente *</label>
                    <select id="orders-new-client" required></select>
                </div>
                <div class="form-group">
                    <label for="orders-new-date">Entrega estimada *</label>
                    <input type="date" id="orders-new-date" required>
                </div>
                <div class="form-group">
                    <label for="orders-new-lab">Laboratorio</label>
                    <select id="orders-new-lab"></select>
                </div>
                <div class="form-group form-group--full">
                    <label for="orders-new-responsible">Responsable (si no se asigna laboratorio)</label>
                    <input type="text" id="orders-new-responsible" maxlength="120" placeholder="Nombre del responsable">
                </div>
                <div class="form-group form-group--full">
                    <label>Productos o trabajos *</label>
                    <div class="orders-items" id="orders-new-items"></div>
                    <button type="button" class="orders-inline-button" id="orders-new-item-add">+ Agregar concepto</button>
                </div>
                <div class="form-group form-group--full">
                    <label for="orders-new-notes">Observaciones</label>
                    <textarea id="orders-new-notes" rows="3" maxlength="1000"></textarea>
                </div>
            </div>

            <p class="orders-modal__message" id="orders-new-message" role="status"></p>
            <footer class="modal__footer">
                <button type="button" class="btn btn-secondary" data-modal-close>Cancelar</button>
                <button type="submit" class="btn btn-primary">Registrar pedido</button>
            </footer>
        </form>
    </div>

    <div class="modal" id="orders-detail-modal" aria-hidden="true">
        <div class="modal__overlay"></div>
        <form class="modal__content orders-modal__content orders-detail" id="orders-detail-form" role="dialog"
            aria-modal="true" aria-labelledby="orders-detail-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle" id="orders-detail-origin">PEDIDO</span>
                    <h2 class="modal__title" id="orders-detail-title">Detalle del pedido</h2>
                    <p class="orders-detail__client" id="orders-detail-client"></p>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar">×</button>
            </header>

            <div class="orders-detail__status" id="orders-detail-status"></div>
            <div class="orders-detail__meta" id="orders-detail-meta"></div>

            <div class="modal__grid">
                <div class="form-group">
                    <label for="orders-detail-date">Entrega estimada *</label>
                    <input type="date" id="orders-detail-date" required>
                </div>
                <div class="form-group">
                    <label for="orders-detail-lab">Laboratorio</label>
                    <select id="orders-detail-lab"></select>
                </div>
                <div class="form-group form-group--full">
                    <label for="orders-detail-responsible">Responsable</label>
                    <input type="text" id="orders-detail-responsible" maxlength="120">
                </div>
                <div class="form-group form-group--full">
                    <label>Productos o trabajos *</label>
                    <div class="orders-items" id="orders-detail-items"></div>
                    <button type="button" class="orders-inline-button" id="orders-detail-item-add">+ Agregar concepto</button>
                </div>
                <div class="form-group form-group--full">
                    <label for="orders-detail-notes">Observaciones</label>
                    <textarea id="orders-detail-notes" rows="3" maxlength="1000"></textarea>
                </div>
                <div class="form-group form-group--full">
                    <label for="orders-detail-movement-note">Observación para el siguiente movimiento</label>
                    <textarea id="orders-detail-movement-note" rows="2" maxlength="500"></textarea>
                </div>
            </div>

            <section class="orders-history">
                <h3>Historial de movimientos</h3>
                <ol id="orders-detail-history"></ol>
            </section>

            <p class="orders-modal__message" id="orders-detail-message" role="status"></p>
            <footer class="modal__footer orders-detail__footer">
                <button type="button" class="btn btn-secondary" id="orders-detail-state"></button>
                <button type="submit" class="btn btn-primary" id="orders-detail-save">Guardar cambios</button>
            </footer>
        </form>
    </div>

    <div class="modal" id="orders-labs-modal" aria-hidden="true">
        <div class="modal__overlay"></div>
        <div class="modal__content modal__content--medium orders-labs" role="dialog" aria-modal="true" aria-labelledby="orders-labs-title">
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">CATÁLOGO</span>
                    <h2 class="modal__title" id="orders-labs-title">Laboratorios</h2>
                    <p class="modal__description">Administra los laboratorios disponibles para asignar pedidos.</p>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar">×</button>
            </header>
            <div class="modal__body">
                <form class="orders-labs__new" id="orders-labs-form" novalidate>
                    <label class="admin-field"><span>Nuevo laboratorio</span><input type="text" id="orders-labs-name" maxlength="120" placeholder="Nombre del laboratorio" required></label>
                    <button type="submit" class="orders-button orders-button--primary">Agregar</button>
                </form>
                <p class="orders-modal__message" id="orders-labs-message" role="status"></p>
                <section class="catalog-list">
                    <header class="catalog-list__header"><h3>Laboratorios registrados</h3></header>
                    <div class="orders-labs__list" id="orders-labs-list"></div>
                </section>
            </div>
        </div>
    </div>

    <div class="modal" id="orders-confirm-modal" aria-hidden="true">
        <div class="modal__overlay"></div>
        <div class="modal__content orders-confirm" role="dialog" aria-modal="true" aria-labelledby="orders-confirm-title">
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">CONFIRMACIÓN</span>
                    <h2 class="modal__title" id="orders-confirm-title">Confirmar acción</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar">×</button>
            </header>
            <p id="orders-confirm-text"></p>
            <footer class="modal__footer">
                <button type="button" class="btn btn-secondary" id="orders-confirm-cancel">Cancelar</button>
                <button type="button" class="btn btn-primary" id="orders-confirm-accept">Confirmar</button>
            </footer>
        </div>
    </div>
</section>

<?= $this->endSection() ?>
