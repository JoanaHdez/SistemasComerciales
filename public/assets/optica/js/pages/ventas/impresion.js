import {
    ajusteDevolucionesCentavos,
    formatearDinero,
    obtenerEstadoFinanciero,
    totalPagadoCentavos,
    totalReembolsadoCentavos,
} from "./dinero.js";

function escapar(valor) {
    const nodo = document.createElement("div");
    nodo.textContent = String(valor ?? "");
    return nodo.innerHTML;
}

function fechaLegible(valor, incluirHora = true) {
    if (!valor) return "—";
    const texto = String(valor);
    const fecha = new Date(texto.length === 10 ? `${texto}T12:00:00` : texto);
    if (Number.isNaN(fecha.getTime())) return escapar(texto);
    return fecha.toLocaleString("es-MX", {
        dateStyle: "medium",
        ...(incluirHora && texto.length !== 10 ? { timeStyle: "short" } : {}),
    });
}

function etiquetaMetodo(metodo) {
    return {
        efectivo: "Efectivo",
        tarjeta: "Tarjeta",
        transferencia: "Transferencia",
    }[metodo] ?? metodo;
}

function metodosPago(pago) {
    return Object.entries(pago.metodos ?? {})
        .filter(([, importe]) => importe > 0)
        .map(([metodo, importe]) => `${escapar(etiquetaMetodo(metodo))}: ${formatearDinero(importe)}`)
        .join(" · ") || "Sin desglose";
}

function estilosDocumento(formato) {
    const ticket = formato === "ticket";
    return `
        @page { size: ${ticket ? "80mm auto" : "letter"}; margin: ${ticket ? "4mm" : "14mm"}; }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body {
            color: #2d2632;
            background: #eef0f3;
            font-family: Arial, Helvetica, sans-serif;
            font-size: ${ticket ? "12px" : "14px"};
            line-height: 1.45;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .print-page {
            width: 100%;
            max-width: ${ticket ? "72mm" : "185mm"};
            min-height: ${ticket ? "auto" : "245mm"};
            margin: 24px auto;
            padding: ${ticket ? "5mm" : "11mm"};
            background: #fff;
            box-shadow: 0 12px 40px rgba(35, 25, 43, .12);
        }
        .print-header {
            padding-bottom: ${ticket ? "12px" : "22px"};
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 18px;
            border-bottom: ${ticket ? "2px dashed #b8adbe" : "3px solid #76539b"};
        }
        .brand { color: #60417e; font-size: ${ticket ? "22px" : "30px"}; font-weight: 900; letter-spacing: .08em; }
        .brand-subtitle { margin-top: 2px; color: #8a7d92; font-size: ${ticket ? "9px" : "11px"}; letter-spacing: .12em; text-transform: uppercase; }
        .document-title { text-align: right; }
        .document-title strong { display: block; color: #3e3048; font-size: ${ticket ? "12px" : "18px"}; }
        .document-title span { display: block; margin-top: 4px; color: #7f7088; font-size: ${ticket ? "10px" : "12px"}; }
        .sale-meta {
            margin: ${ticket ? "12px 0" : "20px 0"};
            padding: ${ticket ? "10px 0" : "16px 18px"};
            display: grid;
            grid-template-columns: ${ticket ? "1fr" : "repeat(2, minmax(0, 1fr))"};
            gap: ${ticket ? "6px" : "12px 24px"};
            border-bottom: ${ticket ? "1px dashed #c9c0ce" : "0"};
            background: ${ticket ? "transparent" : "#f7f3fa"};
            border-radius: ${ticket ? "0" : "10px"};
        }
        .meta-item span { display: block; color: #8b7e93; font-size: ${ticket ? "9px" : "10px"}; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
        .meta-item strong { display: block; margin-top: 2px; overflow-wrap: anywhere; color: #3d3146; font-size: ${ticket ? "11px" : "13px"}; }
        .section { margin-top: ${ticket ? "15px" : "24px"}; }
        .section-title {
            margin: 0 0 ${ticket ? "7px" : "10px"};
            padding-bottom: 5px;
            color: #60417e;
            border-bottom: 1px solid #ddd3e4;
            font-size: ${ticket ? "11px" : "13px"};
            font-weight: 900;
            letter-spacing: .06em;
            text-transform: uppercase;
            break-after: avoid;
            page-break-after: avoid;
        }
        table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        th { color: #6e6076; background: #f7f3fa; font-size: 10px; text-transform: uppercase; }
        th, td { padding: 8px 7px; border-bottom: 1px solid #e9e3ed; text-align: left; vertical-align: top; }
        td { font-size: 12px; overflow-wrap: anywhere; }
        .number { text-align: right; white-space: nowrap; }
        .product-name { width: 38%; }
        .ticket-products { display: grid; gap: 9px; }
        .ticket-product { padding-bottom: 9px; border-bottom: 1px dashed #c9c0ce; break-inside: avoid; }
        .ticket-product > strong { display: block; margin-bottom: 5px; font-size: 11px; }
        .ticket-product__values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
        .ticket-product__values span { color: #817487; font-size: 9px; text-transform: uppercase; }
        .ticket-product__values b { display: block; margin-top: 2px; color: #342b39; font-size: 10px; }
        .movements { display: grid; gap: ${ticket ? "7px" : "9px"}; }
        .movement { padding: ${ticket ? "7px 0" : "11px 13px"}; border-bottom: ${ticket ? "1px dashed #c9c0ce" : "0"}; background: ${ticket ? "transparent" : "#faf8fb"}; border-radius: ${ticket ? "0" : "8px"}; break-inside: avoid; }
        .movement__header { display: flex; justify-content: space-between; gap: 10px; font-weight: 800; }
        .movement__meta { margin-top: 3px; color: #817487; font-size: ${ticket ? "10px" : "11px"}; }
        .empty { margin: 0; color: #8c7f93; font-style: italic; }
        .financial-summary {
            margin-top: ${ticket ? "15px" : "26px"};
            padding: ${ticket ? "12px 0 0" : "20px"};
            border-top: ${ticket ? "2px dashed #9f90a7" : "0"};
            background: ${ticket ? "transparent" : "#f3edf7"};
            border-radius: ${ticket ? "0" : "12px"};
            break-inside: avoid;
        }
        .summary-row { padding: 3px 0; display: flex; justify-content: space-between; gap: 14px; }
        .summary-row span { color: #6f6277; }
        .summary-row strong { white-space: nowrap; }
        .summary-row--divider { margin-top: 5px; padding-top: 8px; border-top: 1px solid #cfc3d7; }
        .summary-row--total { margin-top: 5px; padding-top: 9px; color: #4f3569; border-top: 2px solid #76539b; font-size: ${ticket ? "14px" : "18px"}; }
        .summary-row--balance { color: #8c3e49; font-size: ${ticket ? "13px" : "16px"}; }
        .fiscal-note { margin: ${ticket ? "18px 0 0" : "32px 0 0"}; padding-top: ${ticket ? "12px" : "16px"}; color: #786c7e; border-top: 1px solid #d9d0de; font-size: ${ticket ? "9px" : "10px"}; text-align: center; }
        .ticket-only { display: ${ticket ? "block" : "none"}; }
        .letter-only { display: ${ticket ? "none" : "block"}; }
        ${ticket ? `
            .print-header { display: block; text-align: center; }
            .document-title { margin-top: 9px; text-align: center; }
        ` : ""}
        @media print {
            html, body { width: 100%; background: #fff !important; }
            body { font-size: ${ticket ? "12px" : "14px"}; }
            .print-page { width: 100%; max-width: none; min-height: 0; margin: 0; padding: 0; box-shadow: none; }
            thead { display: table-header-group; }
            tr, .movement, .ticket-product, .financial-summary { break-inside: avoid; page-break-inside: avoid; }
        }
    `;
}

function imprimirDocumento(titulo, contenido, formato) {
    const formatoNormalizado = formato === "ticket" ? "ticket" : "carta";
    const ventana = window.open("", "_blank");
    if (!ventana) return false;
    ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapar(titulo)}</title><style>${estilosDocumento(formatoNormalizado)}</style></head><body class="format-${formatoNormalizado}"><main class="print-page">${contenido}</main></body></html>`);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    return true;
}

function encabezadoVenta(venta, titulo, estado) {
    return `<header class="print-header"><div><div class="brand">OPTICOOL</div><div class="brand-subtitle">Óptica y salud visual</div></div><div class="document-title"><strong>${escapar(titulo)}</strong><span>${escapar(venta.folio)}</span></div></header><section class="sale-meta"><div class="meta-item"><span>Folio</span><strong>${escapar(venta.folio)}</strong></div><div class="meta-item"><span>Fecha</span><strong>${fechaLegible(venta.fecha, false)}</strong></div><div class="meta-item"><span>Cliente</span><strong>${escapar(venta.cliente?.nombre ?? "Público general")}</strong></div><div class="meta-item"><span>Estado</span><strong>${escapar(estado)}</strong></div></section>`;
}

function productosCarta(venta) {
    const filas = venta.partidas.map((partida) => {
        const bruto = partida.brutoCentavos ?? partida.cantidad * partida.precioCentavos;
        return `<tr><td class="product-name">${escapar(partida.descripcion)}</td><td class="number">${partida.cantidad}</td><td class="number">${formatearDinero(partida.precioCentavos)}</td><td class="number">${formatearDinero(partida.descuentoCentavos ?? 0)}</td><td class="number">${formatearDinero(bruto - (partida.descuentoCentavos ?? 0))}</td></tr>`;
    }).join("");
    return `<div class="letter-only"><table><thead><tr><th class="product-name">Producto</th><th class="number">Cant.</th><th class="number">Precio</th><th class="number">Descuento</th><th class="number">Importe</th></tr></thead><tbody>${filas}</tbody></table></div>`;
}

function productosTicket(venta) {
    const productos = venta.partidas.map((partida) => `<article class="ticket-product"><strong>${escapar(partida.descripcion)}</strong><div class="ticket-product__values"><span>Cant.<b>${partida.cantidad}</b></span><span>Precio<b>${formatearDinero(partida.precioCentavos)}</b></span><span>Desc.<b>${formatearDinero(partida.descuentoCentavos ?? 0)}</b></span><span>Importe<b>${formatearDinero(partida.importeCentavos)}</b></span></div></article>`).join("");
    return `<div class="ticket-only ticket-products">${productos}</div>`;
}

function movimientosPagos(venta) {
    if (!(venta.pagos ?? []).length) return '<p class="empty">Sin pagos registrados.</p>';
    return `<div class="movements">${venta.pagos.map((pago, indice) => `<article class="movement"><div class="movement__header"><span>Pago ${indice + 1}</span><strong>${formatearDinero(pago.importeCentavos)}</strong></div><div class="movement__meta">${fechaLegible(pago.fecha)} · ${metodosPago(pago)}${pago.referencia ? ` · ${escapar(pago.referencia)}` : ""}</div></article>`).join("")}</div>`;
}

function movimientosDevoluciones(venta) {
    if (!(venta.devoluciones ?? []).length) return '<p class="empty">Sin devoluciones registradas.</p>';
    return `<div class="movements">${venta.devoluciones.map((devolucion) => `<article class="movement"><div class="movement__header"><span>${escapar(devolucion.descripcion)}</span><strong>−${formatearDinero(devolucion.importeCentavos)}</strong></div><div class="movement__meta">${fechaLegible(devolucion.fecha)} · Cantidad: ${devolucion.cantidad} · ${escapar(devolucion.condicion)}</div></article>`).join("")}</div>`;
}

function movimientosReembolsos(venta) {
    if (!(venta.reembolsos ?? []).length) return '<p class="empty">Sin reembolsos registrados.</p>';
    return `<div class="movements">${venta.reembolsos.map((reembolso, indice) => `<article class="movement"><div class="movement__header"><span>Reembolso ${indice + 1}</span><strong>−${formatearDinero(reembolso.importeCentavos)}</strong></div><div class="movement__meta">${fechaLegible(reembolso.fecha)} · ${escapar(etiquetaMetodo(reembolso.metodo))} · ${escapar(reembolso.estado)}${reembolso.motivo ? ` · ${escapar(reembolso.motivo)}` : ""}</div></article>`).join("")}</div>`;
}

function resumenFinanciero(venta, financiero) {
    const devoluciones = ajusteDevolucionesCentavos(venta);
    const pagos = totalPagadoCentavos(venta);
    const reembolsos = totalReembolsadoCentavos(venta);
    return `<section class="financial-summary"><div class="summary-row"><span>Subtotal de productos</span><strong>${formatearDinero(venta.subtotalCentavos)}</strong></div><div class="summary-row"><span>Descuento general</span><strong>−${formatearDinero(venta.descuentoGeneralCentavos)}</strong></div><div class="summary-row summary-row--divider"><span>Total original de la venta</span><strong>${formatearDinero(venta.totalCentavos)}</strong></div><div class="summary-row"><span>Ajuste por devoluciones</span><strong>−${formatearDinero(devoluciones)}</strong></div><div class="summary-row summary-row--total"><span>Total ajustado</span><strong>${formatearDinero(financiero.totalAjustadoCentavos)}</strong></div><div class="summary-row summary-row--divider"><span>Pagos históricos</span><strong>${formatearDinero(pagos)}</strong></div><div class="summary-row"><span>Reembolsos procesados</span><strong>−${formatearDinero(reembolsos)}</strong></div><div class="summary-row"><span>Recibido neto</span><strong>${formatearDinero(financiero.recibidoNetoCentavos)}</strong></div><div class="summary-row summary-row--balance"><span>Saldo pendiente</span><strong>${formatearDinero(financiero.saldoCentavos)}</strong></div></section>`;
}

export function imprimirVenta(venta, formato = "carta") {
    const financiero = obtenerEstadoFinanciero(venta);
    const estado = venta.cancelacion ? "Cancelada" : `${financiero.estadoPago} · ${venta.estadoEntrega ?? "Entrega pendiente"}`;
    const contenido = `${encabezadoVenta(venta, "Comprobante de venta", estado)}<section class="section"><h2 class="section-title">Productos y descuentos</h2>${productosCarta(venta)}${productosTicket(venta)}</section><section class="section"><h2 class="section-title">Pagos</h2>${movimientosPagos(venta)}</section><section class="section"><h2 class="section-title">Devoluciones</h2>${movimientosDevoluciones(venta)}</section><section class="section"><h2 class="section-title">Reembolsos</h2>${movimientosReembolsos(venta)}</section>${resumenFinanciero(venta, financiero)}<footer class="fiscal-note">Comprobante interno sin validez fiscal. No es CFDI</footer>`;
    return imprimirDocumento(`Comprobante ${venta.folio}`, contenido, formato);
}

export function imprimirRecibo(venta, pago, formato = "carta") {
    const estado = venta.cancelacion ? "Cancelada" : "Recibo de pago";
    const contenido = `${encabezadoVenta(venta, "Recibo de pago", estado)}<section class="section"><h2 class="section-title">Pago recibido</h2><div class="financial-summary"><div class="summary-row summary-row--total"><span>Importe recibido</span><strong>${formatearDinero(pago.importeCentavos)}</strong></div><div class="summary-row"><span>Métodos</span><strong>${metodosPago(pago)}</strong></div><div class="summary-row"><span>Referencia</span><strong>${escapar(pago.referencia || "—")}</strong></div><div class="summary-row summary-row--balance"><span>Saldo resultante</span><strong>${formatearDinero(pago.saldoResultanteCentavos)}</strong></div></div></section><footer class="fiscal-note">Comprobante interno sin validez fiscal. No es CFDI</footer>`;
    return imprimirDocumento(`Recibo ${venta.folio}`, contenido, formato);
}
