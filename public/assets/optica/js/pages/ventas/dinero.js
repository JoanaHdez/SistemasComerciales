export function aCentavos(valor) {
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return 0;
    return Math.round(numero * 100);
}

export function desdeCentavos(valor) {
    return (Number(valor) || 0) / 100;
}

export function formatearDinero(valor) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
    }).format(desdeCentavos(valor));
}

export function calcularPartida(partida) {
    const cantidad = Math.max(0, Number.parseInt(partida.cantidad, 10) || 0);
    const precioCentavos = Math.max(0, Number(partida.precioCentavos) || 0);
    const brutoCentavos = cantidad * precioCentavos;
    const valorDescuento = Math.max(0, Number(partida.descuentoValor) || 0);
    const descuentoCentavos = partida.descuentoTipo === "porcentaje"
        ? Math.round(brutoCentavos * Math.min(valorDescuento, 100) / 100)
        : Math.min(aCentavos(valorDescuento), brutoCentavos);

    return {
        ...partida,
        cantidad,
        precioCentavos,
        brutoCentavos,
        descuentoCentavos,
        importeCentavos: Math.max(0, brutoCentavos - descuentoCentavos),
    };
}

export function calcularTotales(partidas, descuentoTipo = "importe", descuentoValor = 0) {
    const calculadas = partidas.map(calcularPartida);
    const subtotalCentavos = calculadas.reduce((total, partida) => total + partida.importeCentavos, 0);
    const valor = Math.max(0, Number(descuentoValor) || 0);
    const descuentoGeneralCentavos = descuentoTipo === "porcentaje"
        ? Math.round(subtotalCentavos * Math.min(valor, 100) / 100)
        : Math.min(aCentavos(valor), subtotalCentavos);

    return {
        partidas: calculadas,
        subtotalCentavos,
        descuentoGeneralCentavos,
        totalCentavos: Math.max(0, subtotalCentavos - descuentoGeneralCentavos),
    };
}

export function totalMetodosCentavos(metodos = {}) {
    return ["efectivo", "tarjeta", "transferencia"]
        .reduce((total, metodo) => total + Math.max(0, Number(metodos[metodo]) || 0), 0);
}

export function totalPagadoCentavos(venta) {
    return (venta.pagos ?? []).reduce((total, pago) => total + pago.importeCentavos, 0);
}

export function totalReembolsadoCentavos(venta) {
    return (venta.reembolsos ?? [])
        .filter((movimiento) => movimiento.estado === "procesado")
        .reduce((total, movimiento) => total + movimiento.importeCentavos, 0);
}

export function ajusteDevolucionesCentavos(venta) {
    return (venta.devoluciones ?? []).reduce((total, devolucion) => total + devolucion.importeCentavos, 0);
}

export function obtenerEstadoFinanciero(venta) {
    const totalAjustadoCentavos = Math.max(0, venta.totalCentavos - ajusteDevolucionesCentavos(venta));
    const recibidoNetoCentavos = Math.max(0, totalPagadoCentavos(venta) - totalReembolsadoCentavos(venta));
    const saldoCentavos = Math.max(0, totalAjustadoCentavos - recibidoNetoCentavos);
    const estadoPago = venta.cancelacion
        ? "Cancelada"
        : saldoCentavos <= 0
            ? "Liquidada"
            : recibidoNetoCentavos <= 0
                ? "Pendiente"
                : "Parcialmente pagada";
    return { totalAjustadoCentavos, recibidoNetoCentavos, saldoCentavos, estadoPago };
}

