import { Modal } from "../../components/modal.js";
import { aCentavos, desdeCentavos, formatearDinero } from "../ventas/dinero.js";
import { cambiarEstadoProducto, guardarProducto, obtenerMovimientos, obtenerProducto, obtenerProductos, registrarMovimiento } from "./almacenamiento.js";
import { obtenerConfiguracion } from "../configuracion/almacenamiento.js";

function normalizar(valor) { return String(valor ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(); }
function escapar(valor) { const nodo = document.createElement("div"); nodo.textContent = String(valor ?? ""); return nodo.innerHTML; }
function fecha(valor) { return new Date(valor).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" }); }

export function inicializarInventario() {
    const pagina = document.querySelector("[data-inventory-page]"); if (!pagina) return;
    const $ = (s) => pagina.querySelector(s); const productoModal = new Modal("inventory-product-modal"); const movimientoModal = new Modal("inventory-movement-modal"); const historialModal = new Modal("inventory-history-modal");
    const busqueda = $("#inventory-search"); const categoria = $("#inventory-category-filter"); const estado = $("#inventory-status-filter"); const cuerpo = $("#inventory-body");
    let paginaActual = 1; const porPagina = 8; let productoEditado = null; let productoMovimiento = null;

    function mensaje(elemento, texto, tipo = "error") { elemento.textContent = texto; elemento.dataset.tipo = tipo; elemento.hidden = false; }
    function ocultar(elemento) { elemento.hidden = true; elemento.textContent = ""; }
    function estadoProducto(p) { if (p.activo === false) return "inactivo"; if (p.existencia === 0) return "agotado"; if (p.existencia <= p.stockMinimo) return "bajo"; return "disponible"; }
    function filtrados() { const q = normalizar(busqueda.value); return obtenerProductos().filter((p) => (!q || [p.nombre,p.codigo,p.categoria].some((v)=>normalizar(v).includes(q))) && (!categoria.value || p.categoria === categoria.value) && (!estado.value || estadoProducto(p) === estado.value)); }
    function categorias() { const valor = categoria.value; categoria.replaceChildren(new Option("Todas las categorías", "")); [...new Set(obtenerProductos().map((p)=>p.categoria))].sort().forEach((c)=>categoria.add(new Option(c,c))); categoria.value = valor; }
    function indicadores() { const activos=obtenerProductos().filter((p)=>p.activo!==false); $("#inventory-total").textContent=activos.length; $("#inventory-units").textContent=activos.reduce((t,p)=>t+p.existencia,0); $("#inventory-low").textContent=activos.filter((p)=>p.existencia>0&&p.existencia<=p.stockMinimo).length; $("#inventory-empty").textContent=activos.filter((p)=>p.existencia===0).length; }
    function render() {
        categorias();
        indicadores();
        const lista = filtrados();
        const paginas = Math.max(1, Math.ceil(lista.length / porPagina));
        paginaActual = Math.min(paginaActual, paginas);
        const inicio = (paginaActual - 1) * porPagina;
        $("#inventory-results-count").textContent = `${lista.length} ${lista.length === 1 ? "producto" : "productos"}`;
        cuerpo.replaceChildren();

        lista.slice(inicio, inicio + porPagina).forEach((p) => {
            const tr = document.createElement("tr");
            const e = estadoProducto(p);
            const accionEstado = p.activo === false ? "Activar" : "Desactivar";
            tr.innerHTML = `<td><div class="inventory-product"><div class="inventory-product__image">${p.activo === false ? "—" : "◉"}</div><div><strong>${escapar(p.nombre)}</strong><span>${p.inventariable === false ? "No inventariable" : "Inventariable"}</span></div></div></td><td>${escapar(p.codigo)}</td><td>${escapar(p.categoria)}</td><td>${formatearDinero(p.precioCentavos)}</td><td>${formatearDinero(p.costoCentavos)}</td><td>${p.existencia} <small>/ mín. ${p.stockMinimo}</small></td><td><span class="inventory-status inventory-status--${e}">${({ disponible: "Disponible", bajo: "Stock bajo", agotado: "Agotado", inactivo: "Inactivo" })[e]}</span></td><td><div class="inventory-actions"><button type="button" data-edit title="Editar producto" aria-label="Editar ${escapar(p.nombre)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"></path><path d="m14 7 3 3"></path></svg></button><button type="button" data-move title="Registrar movimiento" aria-label="Registrar movimiento de ${escapar(p.nombre)}" ${p.activo === false ? "disabled" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h11l-3-3M17 17H6l3 3"></path></svg></button><button type="button" data-toggle title="${accionEstado} producto" aria-label="${accionEstado} ${escapar(p.nombre)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path></svg></button></div></td>`;
            tr.querySelector("[data-edit]").onclick = () => abrirProducto(p.id);
            tr.querySelector("[data-move]").onclick = () => abrirMovimiento(p.id);
            tr.querySelector("[data-toggle]").onclick = () => {
                cambiarEstadoProducto(p.id, p.activo === false);
                render();
                mensaje($("#inventory-message"), `Producto ${p.activo === false ? "activado" : "desactivado"}.`, "exito");
            };
            cuerpo.append(tr);
        });

        if (!lista.length) cuerpo.innerHTML = '<tr><td colspan="8" class="inventory-empty-row">No hay productos para estos filtros.</td></tr>';
        $("#inventory-pagination-summary").textContent = lista.length ? `Mostrando ${inicio + 1} a ${Math.min(inicio + porPagina, lista.length)} de ${lista.length}` : "Sin resultados";
        const pag = $("#inventory-pagination");
        pag.replaceChildren();
        for (let i = 1; i <= paginas; i++) {
            const b = document.createElement("button");
            b.type = "button";
            b.className = `inventory-pagination__button ${i === paginaActual ? "inventory-pagination__button--active" : ""}`;
            b.textContent = i;
            b.onclick = () => { paginaActual = i; render(); };
            pag.append(b);
        }
    }
    function abrirProducto(id=null){ productoEditado=id; const p=id?obtenerProducto(id):null; $("#inventory-product-title").textContent=p?"Editar producto":"Nuevo producto"; $("#inventory-product-form").reset(); $("#inventory-product-code").value=p?.codigo??""; $("#inventory-product-name").value=p?.nombre??""; $("#inventory-product-category").value=p?.categoria??""; $("#inventory-product-min").value=p?.stockMinimo??0; $("#inventory-product-price").value=desdeCentavos(p?.precioCentavos??0); $("#inventory-product-cost").value=desdeCentavos(p?.costoCentavos??0); ocultar($("#inventory-product-message")); productoModal.open(); }
    function abrirMovimiento(id){ productoMovimiento=id; const p=obtenerProducto(id); $("#inventory-movement-title").textContent=`Movimiento · ${p.nombre}`; $("#inventory-movement-form").reset(); ocultar($("#inventory-movement-message")); movimientoModal.open(); }
    function renderHistorial(){ const movimientos=obtenerMovimientos().sort((a,b)=>b.fecha.localeCompare(a.fecha)); $("#inventory-history-list").innerHTML=movimientos.map((m)=>`<article class="inventory-history-item"><strong>${escapar(m.producto)} · ${escapar(m.tipo)}</strong><span>${m.cantidad} unidad(es) · ${m.existenciaAnterior} → ${m.existenciaNueva}</span><small>${escapar(m.motivo)} · ${fecha(m.fecha)}</small></article>`).join("")||'<p>No hay movimientos registrados.</p>'; }
    $("#inventory-product-form").onsubmit=(e)=>{e.preventDefault(); const datos={codigo:$("#inventory-product-code").value,nombre:$("#inventory-product-name").value.trim(),categoria:$("#inventory-product-category").value.trim(),stockMinimo:Number($("#inventory-product-min").value),precioCentavos:aCentavos($("#inventory-product-price").value),costoCentavos:aCentavos($("#inventory-product-cost").value),inventariable:true}; const r=guardarProducto(datos,productoEditado); if(!r.exito){mensaje($("#inventory-product-message"),r.mensaje);return;} productoModal.close();render();mensaje($("#inventory-message"),"Producto guardado correctamente.","exito");};
    $("#inventory-movement-form").onsubmit=(e)=>{e.preventDefault(); const motivo=$("#inventory-movement-reason").value.trim(); if(!motivo){mensaje($("#inventory-movement-message"),"Escribe el motivo del movimiento.");return;} const r=registrarMovimiento({productoId:productoMovimiento,tipo:$("#inventory-movement-type").value,cantidad:Number($("#inventory-movement-quantity").value),motivo}); if(!r.exito){mensaje($("#inventory-movement-message"),r.mensaje);return;} movimientoModal.close();render();mensaje($("#inventory-message"),"Movimiento registrado correctamente.","exito");};
    $("#new-product-button").onclick=()=>abrirProducto(); $("#inventory-history-open").onclick=()=>{renderHistorial();historialModal.open();}; [busqueda,categoria,estado].forEach((c)=>c.addEventListener("input",()=>{paginaActual=1;render();}));
    $("#inventory-clear-filters").onclick=()=>{busqueda.value="";categoria.value="";estado.value="";paginaActual=1;render();};
    render();
    const bajos = obtenerProductos().filter((producto) => producto.activo !== false && producto.existencia <= producto.stockMinimo).length;
    if (bajos && obtenerConfiguracion().operacion.alertasStock) mensaje($("#inventory-message"), `${bajos} producto(s) requieren atención por stock bajo.`, "advertencia");
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",inicializarInventario);else inicializarInventario();
