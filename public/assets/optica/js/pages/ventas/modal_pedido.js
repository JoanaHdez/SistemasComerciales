import { Modal } from "../../components/modal.js";
import {
    obtenerLaboratorios,
    registrarPedidoDesdeVenta,
} from "../pedidos/almacenamiento.js";
import {
    escaparHtml,
    fechaLocal,
    validarFecha,
} from "../pedidos/datos.js";

function uuid() {
    return globalThis.crypto?.randomUUID?.()
        ?? `venta-pedido-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function fechaSugerida() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fechaLocal(fecha);
}

export class ModalPedidoVenta {
    constructor() {
        this.modal = new Modal("sales-order-modal");
        this.raiz = document.getElementById("sales-order-modal");
        this.formulario = document.getElementById("sales-order-form");
        this.folio = document.getElementById("sales-order-folio");
        this.cliente = document.getElementById("sales-order-client");
        this.productos = document.getElementById("sales-order-products");
        this.fecha = document.getElementById("sales-order-date");
        this.laboratorio = document.getElementById("sales-order-lab");
        this.responsable = document.getElementById("sales-order-responsible");
        this.observaciones = document.getElementById("sales-order-notes");
        this.mensaje = document.getElementById("sales-order-message");
        this.venta = null;
        this.token = null;
        this.alCompletar = null;
        this.alCancelar = null;

        this.formulario?.addEventListener("submit", (evento) => this.guardar(evento));
        this.raiz?.querySelector("[data-order-back]")?.addEventListener("click", () => this.cerrar(false));
        this.raiz?.querySelector(".modal__close")?.addEventListener("click", () => this.cancelarPorCierre());
        this.raiz?.querySelector(".modal__overlay")?.addEventListener("click", () => this.cancelarPorCierre());
        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && this.venta) this.cancelarPorCierre();
        });
    }

    mostrarMensaje(texto, tipo = "error") {
        this.mensaje.textContent = texto;
        this.mensaje.dataset.tipo = tipo;
        this.mensaje.hidden = false;
    }

    ocultarMensaje() {
        this.mensaje.textContent = "";
        this.mensaje.hidden = true;
        delete this.mensaje.dataset.tipo;
    }

    llenarLaboratorios() {
        this.laboratorio.replaceChildren(new Option("Sin laboratorio", ""));
        obtenerLaboratorios()
            .filter((laboratorio) => laboratorio.activo)
            .forEach((laboratorio) => {
                this.laboratorio.add(new Option(laboratorio.nombre, laboratorio.id));
            });
    }

    renderizarProductos() {
        this.productos.innerHTML = this.venta.partidas.map((partida) => `
            <label class="sales-order-product">
                <input type="checkbox" value="${escaparHtml(partida.id)}" data-product-check>
                <span>
                    <strong>${escaparHtml(partida.descripcion)}</strong>
                    <small>${escaparHtml(partida.codigo || "Concepto manual")} · Disponible en venta: ${partida.cantidad}</small>
                </span>
                <input type="number" min="1" max="${partida.cantidad}" step="1" value="${partida.cantidad}"
                    data-product-quantity="${escaparHtml(partida.id)}" aria-label="Cantidad para ${escaparHtml(partida.descripcion)}" disabled>
            </label>
        `).join("");
        this.productos.querySelectorAll("[data-product-check]").forEach((control) => {
            control.addEventListener("change", () => {
                const cantidad = this.productos.querySelector(
                    `[data-product-quantity="${CSS.escape(control.value)}"]`,
                );
                cantidad.disabled = !control.checked;
            });
        });
    }

    abrir({ venta, alCompletar, alCancelar }) {
        this.venta = venta;
        this.alCompletar = alCompletar;
        this.alCancelar = alCancelar;
        this.token = uuid();
        this.formulario.reset();
        this.ocultarMensaje();
        this.folio.textContent = venta.folio;
        this.cliente.textContent = venta.cliente?.nombre ?? "Público general";
        this.fecha.min = fechaLocal();
        this.fecha.value = fechaSugerida();
        this.responsable.value = venta.responsable ?? "";
        this.llenarLaboratorios();
        this.renderizarProductos();
        this.modal.open();
    }

    productosSeleccionados() {
        return [...this.productos.querySelectorAll("[data-product-check]:checked")]
            .map((control) => {
                const partida = this.venta.partidas.find(
                    (item) => String(item.id) === control.value,
                );
                const cantidad = Number(this.productos.querySelector(
                    `[data-product-quantity="${CSS.escape(control.value)}"]`,
                ).value);
                return partida ? {
                    partidaId: partida.id,
                    productoId: partida.productoId ?? null,
                    codigo: partida.codigo ?? null,
                    descripcion: partida.descripcion,
                    cantidad,
                    maximo: partida.cantidad,
                } : null;
            })
            .filter(Boolean);
    }

    guardar(evento) {
        evento.preventDefault();
        const partidas = this.productosSeleccionados();
        if (!partidas.length) {
            this.mostrarMensaje("Selecciona al menos un producto o concepto de la venta.");
            return;
        }
        if (partidas.some((partida) => !Number.isInteger(partida.cantidad)
            || partida.cantidad <= 0
            || partida.cantidad > partida.maximo)) {
            this.mostrarMensaje("Las cantidades deben ser enteras y no superar las registradas en la venta.");
            return;
        }
        if (!validarFecha(this.fecha.value) || this.fecha.value < fechaLocal()) {
            this.mostrarMensaje("Selecciona una fecha estimada válida, igual o posterior a hoy.");
            return;
        }
        const laboratorio = obtenerLaboratorios().find(
            (item) => String(item.id) === this.laboratorio.value && item.activo,
        );
        if (!laboratorio && !this.responsable.value.trim()) {
            this.mostrarMensaje("Selecciona un laboratorio o indica un responsable.");
            return;
        }
        const resultado = registrarPedidoDesdeVenta(
            this.venta,
            partidas.map(({ maximo, ...partida }) => partida),
            {
                fechaEstimada: this.fecha.value,
                laboratorio: laboratorio
                    ? { id: laboratorio.id, nombre: laboratorio.nombre }
                    : null,
                responsable: this.responsable.value.trim(),
                observaciones: this.observaciones.value.trim(),
            },
            this.token,
        );
        if (!resultado.exito) {
            this.mostrarMensaje(resultado.mensaje ?? "No fue posible generar el pedido.");
            return;
        }
        const pedido = resultado.pedido;
        this.modal.close();
        this.venta = null;
        this.alCompletar?.(pedido);
        this.alCompletar = null;
        this.alCancelar = null;
    }

    cancelarPorCierre() {
        if (!this.venta) return;
        const callback = this.alCancelar;
        this.venta = null;
        this.alCompletar = null;
        this.alCancelar = null;
        callback?.();
    }

    cerrar(completado) {
        const callback = completado ? this.alCompletar : this.alCancelar;
        this.modal.close();
        this.venta = null;
        this.alCompletar = null;
        this.alCancelar = null;
        callback?.();
    }
}
