<?= $this->extend('App\Modules\Optica\Views\layouts\main') ?>

<?= $this->section('title') ?>
Historial de ventas | Opticool
<?= $this->endSection() ?>

<?= $this->section('styles') ?>
<link rel="stylesheet" href="<?= base_url('assets/optica/css/components/modal.css') ?>">
<link rel="stylesheet" href="<?= base_url('assets/optica/css/pages/historial_ventas.css') ?>">
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<section class="sales-history-page" data-sales-page="history">
    <header class="sales-history-page__header">
        <div>
            <span class="sales-history-page__eyebrow">CONTROL DE VENTAS</span>
            <h1 class="sales-history-page__title">Historial de ventas</h1>
            <p class="sales-history-page__description">
                Consulta las ventas registradas, revisa su estado y continúa los procesos pendientes de cada cliente.
            </p>
        </div>
        <a href="<?= base_url('optica/ventas/nueva') ?>" class="sales-history-page__button">+ Nueva venta</a>
    </header>

    <div class="sales-test-toolbar" role="note">
        <span>Simulación frontend — rol activo:</span>
        <select id="sales-history-role" aria-label="Rol simulado">
            <option value="ventas">Personal de ventas</option>
            <option value="administrador">Administrador</option>
        </select>
        <small>No representa autenticación ni autorización real.</small>
    </div>

    <div class="sales-history-layout">
        <section class="sales-summary" aria-label="Indicadores de ventas">
            <article class="sales-summary__card">
                <span class="sales-summary__label">Ventas del día</span>
                <strong class="sales-summary__value" id="sales-today">0</strong>
                <small>Registros simulados</small>
            </article>
            <article class="sales-summary__card">
                <span class="sales-summary__label">Pendientes</span>
                <strong class="sales-summary__value" id="sales-pending">0</strong>
                <small>Por preparar o entregar</small>
            </article>
            <article class="sales-summary__card">
                <span class="sales-summary__label">Entregadas</span>
                <strong class="sales-summary__value" id="sales-delivered">0</strong>
                <small>Este mes</small>
            </article>
            <article class="sales-summary__card">
                <span class="sales-summary__label">Ingresos netos</span>
                <strong class="sales-summary__value" id="sales-income">$0.00</strong>
                <small>Pagos menos reembolsos</small>
            </article>
        </section>

        <section class="sales-filters" aria-label="Filtros de ventas">
            <input type="search" class="sales-filters__search" id="sales-search" placeholder="Buscar cliente, folio o teléfono">
            <select class="sales-filters__select" id="sales-payment-filter">
                <option value="">Todos los pagos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Parcialmente pagada">Parcialmente pagada</option>
                <option value="Liquidada">Liquidada</option>
                <option value="Cancelada">Cancelada</option>
            </select>
            <select class="sales-filters__select" id="sales-delivery-filter">
                <option value="">Todas las entregas</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En preparación">En preparación</option>
                <option value="Lista para entregar">Lista para entregar</option>
                <option value="Entregada">Entregada</option>
            </select>
            <button type="button" class="sales-filters__clear" id="sales-clear-filters">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 5h16M7 10h10M10 15h4" stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    <path d="m16.5 17.5 4 4m0-4-4 4" stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                </svg>
                Limpiar filtros
            </button>
        </section>

        <section class="sales-list" id="sales-list" aria-live="polite"></section>
    </div>

    <dialog class="sales-detail" id="sales-detail">
        <div class="sales-detail__header">
            <div>
                <span class="sales-history-page__eyebrow">DETALLE DE VENTA</span>
                <h2 id="sales-detail-title">Venta</h2>
            </div>
            <button type="button" class="sales-detail__close" id="sales-detail-close" aria-label="Cerrar">×</button>
        </div>
        <div id="sales-detail-content"></div>
    </dialog>

    <div class="modal sales-payment-modal" id="sales-payment-modal" aria-hidden="true">
        <div class="modal__overlay"></div>

        <form class="modal__content sales-payment-modal__content" id="sales-payment-form" role="dialog"
            aria-modal="true" aria-labelledby="sales-payment-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">REGISTRO DE PAGO</span>
                    <h2 class="modal__title" id="sales-payment-title">Registrar abono</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar modal">×</button>
            </header>

            <div class="sales-payment-modal__sale">
                <div>
                    <span>Venta</span>
                    <strong id="sales-payment-folio">—</strong>
                </div>
                <div>
                    <span>Saldo pendiente</span>
                    <strong id="sales-payment-balance">$0.00</strong>
                </div>
            </div>

            <fieldset class="sales-payment-methods">
                <legend>Selecciona uno o varios métodos de pago</legend>

                <div class="sales-payment-method">
                    <label class="sales-payment-method__selector">
                        <input type="checkbox" value="efectivo" data-payment-method>
                        <span>Efectivo</span>
                    </label>
                    <label class="sales-payment-method__amount" data-payment-amount-wrapper hidden>
                        <span>Importe</span>
                        <input type="number" min="0.01" step="0.01" inputmode="decimal"
                            data-payment-amount="efectivo" aria-label="Importe en efectivo">
                    </label>
                </div>

                <div class="sales-payment-method">
                    <label class="sales-payment-method__selector">
                        <input type="checkbox" value="tarjeta" data-payment-method>
                        <span>Tarjeta</span>
                    </label>
                    <label class="sales-payment-method__amount" data-payment-amount-wrapper hidden>
                        <span>Importe</span>
                        <input type="number" min="0.01" step="0.01" inputmode="decimal"
                            data-payment-amount="tarjeta" aria-label="Importe con tarjeta">
                    </label>
                </div>

                <div class="sales-payment-method">
                    <label class="sales-payment-method__selector">
                        <input type="checkbox" value="transferencia" data-payment-method>
                        <span>Transferencia</span>
                    </label>
                    <label class="sales-payment-method__amount" data-payment-amount-wrapper hidden>
                        <span>Importe</span>
                        <input type="number" min="0.01" step="0.01" inputmode="decimal"
                            data-payment-amount="transferencia" aria-label="Importe por transferencia">
                    </label>
                </div>
            </fieldset>

            <div class="form-group">
                <label for="sales-payment-reference">Referencia u observación (opcional)</label>
                <input type="text" id="sales-payment-reference" maxlength="120" placeholder="Ej. Anticipo">
            </div>

            <div class="sales-payment-modal__totals" aria-live="polite">
                <div><span>Total del abono</span><strong id="sales-payment-total">$0.00</strong></div>
                <div><span>Saldo restante</span><strong id="sales-payment-remaining">$0.00</strong></div>
            </div>

            <p class="sales-payment-modal__message" id="sales-payment-message" role="status"></p>

            <footer class="modal__footer">
                <button type="button" class="btn btn-secondary" data-payment-cancel>Cancelar</button>
                <button type="submit" class="btn btn-primary" id="sales-payment-submit" disabled>
                    Registrar abono
                </button>
            </footer>
        </form>
    </div>

    <div class="modal sales-cancellation-modal" id="sales-cancellation-modal" aria-hidden="true">
        <div class="modal__overlay"></div>

        <form class="modal__content sales-cancellation-modal__content" id="sales-cancellation-form"
            role="dialog" aria-modal="true" aria-labelledby="sales-cancellation-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">ACCIÓN ADMINISTRATIVA</span>
                    <h2 class="modal__title" id="sales-cancellation-title">Cancelar venta</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar modal">×</button>
            </header>

            <div class="sales-cancellation-modal__sale">
                <div>
                    <span>Venta</span>
                    <strong id="sales-cancellation-folio">—</strong>
                </div>
                <div>
                    <span>Cliente</span>
                    <strong id="sales-cancellation-client">—</strong>
                </div>
            </div>

            <div class="sales-cancellation-modal__warning" role="note">
                <strong>Esta venta será cancelada, pero no eliminada.</strong>
                <span>Sus productos, pagos, comprobantes y movimientos permanecerán en el historial.</span>
            </div>

            <div class="form-group">
                <label for="sales-cancellation-reason">Motivo de cancelación</label>
                <textarea id="sales-cancellation-reason" rows="4" maxlength="500"
                    placeholder="Describe por qué se cancela esta venta" required></textarea>
            </div>

            <p class="sales-cancellation-modal__message" id="sales-cancellation-message" role="status"></p>

            <footer class="modal__footer">
                <button type="button" class="btn btn-secondary" data-cancellation-back>Volver</button>
                <button type="submit" class="btn sales-cancellation-modal__confirm"
                    id="sales-cancellation-submit" disabled>
                    Confirmar cancelación
                </button>
            </footer>
        </form>
    </div>

    <div class="modal sales-return-modal" id="sales-return-modal" aria-hidden="true">
        <div class="modal__overlay"></div>

        <form class="modal__content sales-return-modal__content" id="sales-return-form"
            role="dialog" aria-modal="true" aria-labelledby="sales-return-title" novalidate>
            <header class="modal__header sales-return-modal__header">
                <div class="sales-return-modal__heading">
                    <span class="sales-return-modal__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 7H6.5A3.5 3.5 0 0 0 3 10.5v4A3.5 3.5 0 0 0 6.5 18H17a4 4 0 0 0 4-4v-1"
                                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                            <path d="m7 4-3 3 3 3M4 7h11a4 4 0 0 1 4 4"
                                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                    <div>
                        <span class="modal__subtitle">DEVOLUCIÓN</span>
                        <h2 class="modal__title" id="sales-return-title">Registrar devolución</h2>
                        <p><strong id="sales-return-folio">—</strong><span aria-hidden="true"> · </span><span id="sales-return-client">—</span></p>
                    </div>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar modal">×</button>
            </header>

            <div class="sales-return-modal__notice" role="note">
                <span class="sales-return-modal__notice-icon" aria-hidden="true">i</span>
                <div>
                    <strong>La devolución ajustará el importe de la venta.</strong>
                    <span>No modifica el inventario ni genera un reembolso automáticamente.</span>
                </div>
            </div>

            <div class="sales-return-modal__fields">
                <div class="form-group">
                    <label for="sales-return-product">Producto a devolver *</label>
                    <select id="sales-return-product" required></select>
                </div>

                <div class="form-group">
                    <label>Cantidad a devolver *</label>
                    <div class="sales-return-quantity">
                        <div class="sales-return-quantity__control">
                            <button type="button" data-return-decrease aria-label="Restar una unidad">−</button>
                            <output id="sales-return-quantity" aria-live="polite">1</output>
                            <button type="button" data-return-increase aria-label="Sumar una unidad">+</button>
                        </div>
                        <span class="sales-return-quantity__available" id="sales-return-available">Disponible: 0</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="sales-return-reason">Motivo de devolución *</label>
                    <textarea id="sales-return-reason" rows="4" maxlength="500"
                        placeholder="Describe el motivo de la devolución..." required></textarea>
                </div>

                <fieldset class="sales-return-condition">
                    <legend>Condición del producto *</legend>
                    <div class="sales-return-condition__options">
                        <label>
                            <input type="radio" name="sales-return-condition" value="Buen estado">
                            <span>En buen estado</span>
                        </label>
                        <label>
                            <input type="radio" name="sales-return-condition" value="Dañado">
                            <span>Dañado</span>
                        </label>
                        <label>
                            <input type="radio" name="sales-return-condition" value="Pendiente de revisión">
                            <span>Pendiente de revisión</span>
                        </label>
                    </div>
                </fieldset>
            </div>

            <p class="sales-return-modal__message" id="sales-return-message" role="status"></p>

            <footer class="modal__footer sales-return-modal__footer">
                <button type="button" class="btn btn-secondary" data-return-back>Volver</button>
                <button type="submit" class="btn btn-primary" id="sales-return-submit" disabled>
                    Registrar devolución
                </button>
            </footer>
        </form>
    </div>

    <div class="modal sales-refund-modal" id="sales-refund-modal" aria-hidden="true">
        <div class="modal__overlay"></div>

        <form class="modal__content sales-refund-modal__content" id="sales-refund-form"
            role="dialog" aria-modal="true" aria-labelledby="sales-refund-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">REEMBOLSO</span>
                    <h2 class="modal__title" id="sales-refund-title">Registrar reembolso</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar modal">×</button>
            </header>

            <div class="sales-refund-modal__sale">
                <div>
                    <span>Venta</span>
                    <strong id="sales-refund-folio">—</strong>
                </div>
                <div>
                    <span>Cliente</span>
                    <strong id="sales-refund-client">—</strong>
                </div>
            </div>

            <div class="sales-refund-modal__available">
                <span>Importe disponible para reembolsar</span>
                <strong id="sales-refund-available">$0.00</strong>
                <small>Se consideran los pagos recibidos y los reembolsos registrados.</small>
            </div>

            <div class="sales-refund-modal__fields">
                <div class="form-group">
                    <label for="sales-refund-amount">Importe a reembolsar *</label>
                    <input type="number" id="sales-refund-amount" min="0.01" step="0.01"
                        inputmode="decimal" placeholder="0.00" required>
                </div>

                <div class="form-group">
                    <label for="sales-refund-method">Método de reembolso *</label>
                    <select id="sales-refund-method" required>
                        <option value="">Selecciona un método</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="sales-refund-reason">Motivo del reembolso *</label>
                    <textarea id="sales-refund-reason" rows="3" maxlength="500"
                        placeholder="Describe el motivo del reembolso..." required></textarea>
                </div>
            </div>

            <p class="sales-refund-modal__message" id="sales-refund-message" role="status"></p>

            <footer class="modal__footer sales-refund-modal__footer">
                <button type="button" class="btn btn-secondary" data-refund-back>Volver</button>
                <button type="submit" class="btn btn-primary" id="sales-refund-submit" disabled>
                    Registrar reembolso
                </button>
            </footer>
        </form>
    </div>

    <div class="modal sales-print-modal" id="sales-print-modal" aria-hidden="true">
        <div class="modal__overlay"></div>

        <form class="modal__content sales-print-modal__content" id="sales-print-form"
            role="dialog" aria-modal="true" aria-labelledby="sales-print-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">COMPROBANTE DE VENTA</span>
                    <h2 class="modal__title" id="sales-print-title">Seleccionar formato</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar modal">×</button>
            </header>

            <div class="sales-print-modal__sale">
                <strong id="sales-print-folio">—</strong>
                <span id="sales-print-client">—</span>
            </div>

            <fieldset class="sales-print-formats">
                <legend>Selecciona cómo deseas generar el comprobante</legend>
                <div class="sales-print-formats__options">
                    <label class="sales-print-format">
                        <input type="radio" name="sales-print-format" value="ticket">
                        <span class="sales-print-format__card">
                            <span class="sales-print-format__indicator" aria-hidden="true"></span>
                            <span class="sales-print-format__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 0 1 2-2Z"
                                        stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                                    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor"
                                        stroke-width="1.7" stroke-linecap="round" />
                                </svg>
                            </span>
                            <span class="sales-print-format__copy">
                                <strong>Ticket</strong>
                                <small>Formato compacto para impresora térmica</small>
                            </span>
                        </span>
                    </label>

                    <label class="sales-print-format">
                        <input type="radio" name="sales-print-format" value="carta" checked>
                        <span class="sales-print-format__card">
                            <span class="sales-print-format__indicator" aria-hidden="true"></span>
                            <span class="sales-print-format__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M6 2.75h8l4 4V21.25H6V2.75Z" stroke="currentColor"
                                        stroke-width="1.7" stroke-linejoin="round" />
                                    <path d="M14 2.75v4h4M9 11h6M9 15h6M9 18h4" stroke="currentColor"
                                        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span class="sales-print-format__copy">
                                <strong>Hoja carta</strong>
                                <small>Comprobante detallado para impresión tradicional</small>
                            </span>
                        </span>
                    </label>
                </div>
            </fieldset>

            <p class="sales-print-modal__message" id="sales-print-message" role="status"></p>

            <footer class="modal__footer sales-print-modal__footer">
                <button type="button" class="btn btn-secondary" data-print-back>Volver</button>
                <button type="submit" class="btn btn-primary sales-print-modal__submit" id="sales-print-submit">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                            stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                        <path d="M7 14h10v7H7v-7Z" stroke="currentColor" stroke-width="1.8"
                            stroke-linejoin="round" />
                        <path d="M17.5 11h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                    </svg>
                    Generar comprobante
                </button>
            </footer>
        </form>
    </div>

    <div class="modal sales-order-modal" id="sales-order-modal" aria-hidden="true">
        <div class="modal__overlay"></div>

        <form class="modal__content sales-order-modal__content" id="sales-order-form"
            role="dialog" aria-modal="true" aria-labelledby="sales-order-title" novalidate>
            <header class="modal__header">
                <div>
                    <span class="modal__subtitle">PEDIDO DE LABORATORIO</span>
                    <h2 class="modal__title" id="sales-order-title">Generar pedido</h2>
                </div>
                <button type="button" class="modal__close" aria-label="Cerrar modal">×</button>
            </header>

            <div class="sales-order-modal__sale">
                <strong id="sales-order-folio">—</strong>
                <span id="sales-order-client">—</span>
            </div>

            <fieldset class="sales-order-products">
                <legend>Selecciona los productos o conceptos que requieren pedido *</legend>
                <div id="sales-order-products"></div>
            </fieldset>

            <div class="modal__grid">
                <div class="form-group">
                    <label for="sales-order-date">Entrega estimada *</label>
                    <input type="date" id="sales-order-date" required>
                </div>
                <div class="form-group">
                    <label for="sales-order-lab">Laboratorio</label>
                    <select id="sales-order-lab"></select>
                </div>
                <div class="form-group form-group--full">
                    <label for="sales-order-responsible">Responsable (si no se asigna laboratorio)</label>
                    <input type="text" id="sales-order-responsible" maxlength="120">
                </div>
                <div class="form-group form-group--full">
                    <label for="sales-order-notes">Observaciones</label>
                    <textarea id="sales-order-notes" rows="3" maxlength="1000"></textarea>
                </div>
            </div>

            <p class="sales-order-modal__message" id="sales-order-message" role="status" hidden></p>

            <footer class="modal__footer">
                <button type="button" class="btn btn-secondary" data-order-back>Volver</button>
                <button type="submit" class="btn btn-primary">Generar pedido</button>
            </footer>
        </form>
    </div>
</section>

<?= $this->endSection() ?>
