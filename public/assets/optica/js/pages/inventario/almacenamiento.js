const CLAVE_PRODUCTOS = "opticool_inventario_productos";
const CLAVE_MOVIMIENTOS = "opticool_inventario_movimientos";
const CLAVE_VENTAS_APLICADAS = "opticool_inventario_ventas_aplicadas";

const PRODUCTOS_INICIALES = [
    { id: "ARM-RB-2140", codigo: "RB-2140", nombre: "Armazón Ray-Ban clásico", categoria: "Armazones", precioCentavos: 285000, costoCentavos: 0, existencia: 4, stockMinimo: 2, activo: true, inventariable: true },
    { id: "ARM-OPT-101", codigo: "OPT-101", nombre: "Armazón Opticool ligero", categoria: "Armazones", precioCentavos: 145000, costoCentavos: 0, existencia: 8, stockMinimo: 3, activo: true, inventariable: true },
    { id: "MIC-AR-150", codigo: "AR-150", nombre: "Micas monofocales antirreflejantes", categoria: "Micas", precioCentavos: 180000, costoCentavos: 0, existencia: 12, stockMinimo: 4, activo: true, inventariable: true },
    { id: "MIC-PRO-220", codigo: "PRO-220", nombre: "Micas progresivas", categoria: "Micas", precioCentavos: 320000, costoCentavos: 0, existencia: 6, stockMinimo: 2, activo: true, inventariable: true },
    { id: "ACC-EST-01", codigo: "EST-01", nombre: "Estuche rígido", categoria: "Accesorios", precioCentavos: 25000, costoCentavos: 0, existencia: 20, stockMinimo: 5, activo: true, inventariable: true },
    { id: "ACC-LIM-01", codigo: "LIM-01", nombre: "Kit de limpieza", categoria: "Accesorios", precioCentavos: 18000, costoCentavos: 0, existencia: 15, stockMinimo: 5, activo: true, inventariable: true },
];

function uuid(prefijo = "inv") {
    return globalThis.crypto?.randomUUID?.() ?? `${prefijo}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function leer(clave, inicial) {
    try {
        const valor = localStorage.getItem(clave);
        if (valor === null) return structuredClone(inicial);
        const datos = JSON.parse(valor);
        return datos && typeof datos === "object" ? datos : structuredClone(inicial);
    } catch (error) {
        console.error(`No fue posible leer ${clave}:`, error);
        return structuredClone(inicial);
    }
}

function escribir(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error(`No fue posible guardar ${clave}:`, error);
        return false;
    }
}

function normalizar(valor) {
    return String(valor ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function obtenerProductos() {
    const productos = leer(CLAVE_PRODUCTOS, PRODUCTOS_INICIALES);
    return Array.isArray(productos) ? productos : structuredClone(PRODUCTOS_INICIALES);
}

export function obtenerProductosActivos() {
    return obtenerProductos().filter((producto) => producto.activo !== false);
}

export function obtenerProducto(id) {
    return obtenerProductos().find((producto) => String(producto.id) === String(id)) ?? null;
}

export function obtenerMovimientos() {
    const movimientos = leer(CLAVE_MOVIMIENTOS, []);
    return Array.isArray(movimientos) ? movimientos : [];
}

export function guardarProducto(datos, id = null) {
    const productos = obtenerProductos();
    const codigo = datos.codigo.trim().toUpperCase();
    const duplicado = productos.find((producto) => normalizar(producto.codigo) === normalizar(codigo) && String(producto.id) !== String(id));
    if (!codigo || !datos.nombre.trim() || duplicado) return { exito: false, mensaje: duplicado ? "El código ya está registrado." : "Completa los campos obligatorios." };
    if (![datos.precioCentavos, datos.costoCentavos, datos.stockMinimo].every((valor) => Number.isInteger(valor) && valor >= 0)) return { exito: false, mensaje: "Precios, costo y stock mínimo deben ser valores válidos." };

    const indice = productos.findIndex((producto) => String(producto.id) === String(id));
    if (indice >= 0) {
        productos[indice] = { ...productos[indice], ...datos, codigo, id: productos[indice].id, existencia: productos[indice].existencia, fechaActualizacion: new Date().toISOString() };
        return escribir(CLAVE_PRODUCTOS, productos) ? { exito: true, producto: productos[indice] } : { exito: false, mensaje: "No fue posible guardar el producto." };
    }
    const producto = { ...datos, id: uuid("producto"), codigo, existencia: 0, activo: true, fechaCreacion: new Date().toISOString(), fechaActualizacion: new Date().toISOString() };
    productos.push(producto);
    return escribir(CLAVE_PRODUCTOS, productos) ? { exito: true, producto } : { exito: false, mensaje: "No fue posible guardar el producto." };
}

export function cambiarEstadoProducto(id, activo) {
    const productos = obtenerProductos();
    const indice = productos.findIndex((producto) => String(producto.id) === String(id));
    if (indice < 0) return null;
    productos[indice] = { ...productos[indice], activo: Boolean(activo), fechaActualizacion: new Date().toISOString() };
    return escribir(CLAVE_PRODUCTOS, productos) ? productos[indice] : null;
}

export function registrarMovimiento({ productoId, tipo, cantidad, motivo, referencia = "", clave = null }) {
    const movimientos = obtenerMovimientos();
    if (clave) {
        const existente = movimientos.find((movimiento) => movimiento.clave === clave);
        if (existente) return { exito: true, movimiento: existente, duplicado: true };
    }
    const numero = Number(cantidad);
    if (!Number.isInteger(numero) || numero <= 0 || !["entrada", "salida", "ajuste-entrada", "ajuste-salida"].includes(tipo)) return { exito: false, mensaje: "El movimiento o la cantidad no son válidos." };
    const productos = obtenerProductos();
    const indice = productos.findIndex((producto) => String(producto.id) === String(productoId));
    if (indice < 0) return { exito: false, mensaje: "El producto no existe." };
    const suma = tipo === "entrada" || tipo === "ajuste-entrada";
    const nuevaExistencia = productos[indice].existencia + (suma ? numero : -numero);
    if (nuevaExistencia < 0) return { exito: false, mensaje: "El movimiento dejaría existencias negativas." };
    const movimiento = { id: uuid("mov"), productoId: productos[indice].id, producto: productos[indice].nombre, tipo, cantidad: numero, existenciaAnterior: productos[indice].existencia, existenciaNueva: nuevaExistencia, motivo: motivo.trim(), referencia, clave, fecha: new Date().toISOString() };
    productos[indice] = { ...productos[indice], existencia: nuevaExistencia, fechaActualizacion: movimiento.fecha };
    movimientos.push(movimiento);
    if (!escribir(CLAVE_PRODUCTOS, productos) || !escribir(CLAVE_MOVIMIENTOS, movimientos)) return { exito: false, mensaje: "No fue posible guardar el movimiento." };
    return { exito: true, movimiento, duplicado: false };
}

export function aplicarSalidaVenta(venta) {
    const aplicadas = leer(CLAVE_VENTAS_APLICADAS, {});
    if (aplicadas[venta.id]) return { exito: true, duplicado: true };
    const cantidades = new Map();
    (venta.partidas ?? []).filter((partida) => partida.tipo === "catalogo").forEach((partida) => cantidades.set(partida.productoId, (cantidades.get(partida.productoId) ?? 0) + Number(partida.cantidad)));
    for (const [productoId, cantidad] of cantidades) {
        const producto = obtenerProducto(productoId);
        if (!producto || producto.activo === false || cantidad > producto.existencia) return { exito: false, mensaje: `No hay existencia suficiente de ${producto?.nombre ?? "un producto"}.` };
    }
    for (const [productoId, cantidad] of cantidades) {
        const resultado = registrarMovimiento({ productoId, tipo: "salida", cantidad, motivo: `Venta ${venta.folio}`, referencia: venta.id, clave: `venta:${venta.id}:${productoId}` });
        if (!resultado.exito) return resultado;
    }
    aplicadas[venta.id] = Object.fromEntries(cantidades);
    escribir(CLAVE_VENTAS_APLICADAS, aplicadas);
    return { exito: true, duplicado: false };
}

export function sincronizarSalidaVenta(ventaAnterior, ventaNueva) {
    if (!ventaAnterior.inventarioAplicado) return { exito: true, omitido: true };
    const aplicadas = leer(CLAVE_VENTAS_APLICADAS, {});
    const anterior = aplicadas[ventaAnterior.id] ?? {};
    const deseado = {};
    (ventaNueva.partidas ?? []).filter((partida) => partida.tipo === "catalogo").forEach((partida) => {
        deseado[partida.productoId] = (deseado[partida.productoId] ?? 0) + Number(partida.cantidad);
    });
    const ids = new Set([...Object.keys(anterior), ...Object.keys(deseado)]);
    for (const productoId of ids) {
        const diferencia = (deseado[productoId] ?? 0) - (anterior[productoId] ?? 0);
        const producto = obtenerProducto(productoId);
        if (diferencia > 0 && (!producto || producto.activo === false || diferencia > producto.existencia)) return { exito: false, mensaje: `No hay existencia suficiente de ${producto?.nombre ?? "un producto"}.` };
    }
    const operacion = uuid("venta-ajuste");
    for (const productoId of ids) {
        const diferencia = (deseado[productoId] ?? 0) - (anterior[productoId] ?? 0);
        if (!diferencia) continue;
        const resultado = registrarMovimiento({ productoId, tipo: diferencia > 0 ? "salida" : "entrada", cantidad: Math.abs(diferencia), motivo: `Edición de venta ${ventaNueva.folio}`, referencia: ventaNueva.id, clave: `${operacion}:${productoId}` });
        if (!resultado.exito) return resultado;
    }
    aplicadas[ventaAnterior.id] = deseado;
    escribir(CLAVE_VENTAS_APLICADAS, aplicadas);
    return { exito: true };
}

export function reintegrarDevolucion(venta, devolucion) {
    if (!venta.inventarioAplicado || devolucion.condicion !== "Buen estado") return { exito: true, omitido: true };
    const partida = venta.partidas?.find((item) => String(item.id) === String(devolucion.partidaId));
    if (!partida || partida.tipo !== "catalogo" || !partida.productoId) return { exito: true, omitido: true };
    return registrarMovimiento({ productoId: partida.productoId, tipo: "entrada", cantidad: devolucion.cantidad, motivo: `Devolución ${venta.folio}`, referencia: devolucion.id, clave: `devolucion:${devolucion.id}` });
}
