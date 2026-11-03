import { Modal } from "../../components/modal.js";

const CONDICIONES_PERMITIDAS = ["Buen estado", "Dañado", "Pendiente de revisión"];

export class ModalDevolucionVenta {
    constructor(id = "sales-return-modal") {
        this.elemento = document.getElementById(id);

        if (!this.elemento) return;

        this.modal = new Modal(id);
        this.formulario = this.elemento.querySelector("#sales-return-form");
        this.folio = this.elemento.querySelector("#sales-return-folio");
        this.cliente = this.elemento.querySelector("#sales-return-client");
        this.producto = this.elemento.querySelector("#sales-return-product");
        this.cantidad = this.elemento.querySelector("#sales-return-quantity");
        this.disponible = this.elemento.querySelector("#sales-return-available");
        this.motivo = this.elemento.querySelector("#sales-return-reason");
        this.condiciones = [...this.elemento.querySelectorAll("[name='sales-return-condition']")];
        this.botonRestar = this.elemento.querySelector("[data-return-decrease]");
        this.botonSumar = this.elemento.querySelector("[data-return-increase]");
        this.botonConfirmar = this.elemento.querySelector("#sales-return-submit");
        this.mensaje = this.elemento.querySelector("#sales-return-message");
        this.productos = [];
        this.activo = false;
        this.procesando = false;
        this.configuracion = null;
        this.textoConfirmar = this.botonConfirmar.textContent.trim();

        this.registrarEventos();
        this.restablecer();
    }

    registrarEventos() {
        this.producto.addEventListener("change", () => this.actualizarProducto());
        this.botonRestar.addEventListener("click", () => this.cambiarCantidad(-1));
        this.botonSumar.addEventListener("click", () => this.cambiarCantidad(1));
        this.motivo.addEventListener("input", () => this.validar());
        this.condiciones.forEach((condicion) => {
            condicion.addEventListener("change", () => this.validar());
        });

        this.formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.confirmar();
        });

        this.elemento.querySelector("[data-return-back]")
            ?.addEventListener("click", () => this.cancelar());
        this.elemento.querySelector(".modal__close")
            ?.addEventListener("click", () => this.cancelar());
        this.elemento.querySelector(".modal__overlay")
            ?.addEventListener("click", () => this.cancelar());

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && this.activo) this.cancelar();
        });
    }

    productoSeleccionado() {
        return this.productos.find((producto) => String(producto.id) === this.producto.value) ?? null;
    }

    cargarProductos() {
        this.producto.replaceChildren();

        if (!this.productos.length) {
            this.producto.add(new Option("No hay productos disponibles para devolución", ""));
            this.producto.disabled = true;
            return;
        }

        this.producto.disabled = false;
        this.productos.forEach((producto) => {
            this.producto.add(new Option(
                `${producto.descripcion} (cantidad: ${producto.cantidadDisponible})`,
                producto.id,
            ));
        });
    }

    actualizarProducto() {
        const producto = this.productoSeleccionado();
        const cantidadDisponible = producto?.cantidadDisponible ?? 0;
        this.cantidad.value = cantidadDisponible > 0 ? "1" : "0";
        this.disponible.textContent = `Disponible: ${cantidadDisponible}`;
        this.actualizarControlesCantidad();
        this.validar();
    }

    cambiarCantidad(cambio) {
        if (this.procesando) return;

        const producto = this.productoSeleccionado();
        if (!producto) return;

        const actual = Number.parseInt(this.cantidad.value, 10) || 1;
        this.cantidad.value = String(Math.min(
            producto.cantidadDisponible,
            Math.max(1, actual + cambio),
        ));
        this.actualizarControlesCantidad();
        this.validar();
    }

    actualizarControlesCantidad() {
        const producto = this.productoSeleccionado();
        const cantidad = Number.parseInt(this.cantidad.value, 10) || 0;
        const disponible = producto?.cantidadDisponible ?? 0;
        this.botonRestar.disabled = this.procesando || cantidad <= 1 || disponible <= 0;
        this.botonSumar.disabled = this.procesando || cantidad >= disponible || disponible <= 0;
    }

    evaluar() {
        const producto = this.productoSeleccionado();
        const cantidad = Number.parseInt(this.cantidad.value, 10);
        const motivo = this.motivo.value.trim();
        const condicion = this.condiciones.find((opcion) => opcion.checked)?.value ?? "";

        if (!producto || producto.cantidadDisponible <= 0) {
            return { valido: false, mensaje: "No hay productos disponibles para devolución." };
        }
        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > producto.cantidadDisponible) {
            return { valido: false, mensaje: `Selecciona una cantidad entre 1 y ${producto.cantidadDisponible}.` };
        }
        if (!motivo) {
            return { valido: false, mensaje: "Describe el motivo de la devolución." };
        }
        if (!CONDICIONES_PERMITIDAS.includes(condicion)) {
            return { valido: false, mensaje: "Selecciona la condición del producto." };
        }

        return {
            valido: true,
            mensaje: "",
            partidaId: producto.id,
            cantidad,
            motivo,
            condicion,
        };
    }

    validar() {
        const evaluacion = this.evaluar();
        this.mensaje.textContent = evaluacion.mensaje;
        this.mensaje.dataset.estado = evaluacion.valido ? "valido" : "error";
        this.botonConfirmar.disabled = !evaluacion.valido || this.procesando;
        return evaluacion;
    }

    abrir(configuracion) {
        if (!this.elemento) return;

        this.configuracion = configuracion;
        this.productos = (configuracion.productos ?? [])
            .filter((producto) => producto.cantidadDisponible > 0);
        this.folio.textContent = configuracion.folio;
        this.cliente.textContent = configuracion.cliente;
        this.activo = true;
        this.procesando = false;
        this.restablecer();
        this.modal.open();
        this.producto.focus();
    }

    restablecer() {
        if (!this.elemento) return;

        this.formulario.reset();
        this.procesando = false;
        this.botonConfirmar.textContent = this.textoConfirmar;
        this.cargarProductos();
        this.actualizarProducto();
    }

    cancelar() {
        if (!this.activo || this.procesando) return;

        const alCancelar = this.configuracion?.alCancelar;
        this.activo = false;
        this.modal.close();
        this.configuracion = null;
        alCancelar?.();
    }

    async confirmar() {
        if (this.procesando) return;

        const evaluacion = this.validar();
        if (!evaluacion.valido) return;

        this.procesando = true;
        this.botonConfirmar.disabled = true;
        this.actualizarControlesCantidad();

        try {
            const resultado = await this.configuracion.registrar(evaluacion);

            if (!resultado?.exito) {
                this.mensaje.textContent = resultado?.mensaje
                    ?? "No fue posible registrar la devolución.";
                this.mensaje.dataset.estado = "error";
                this.procesando = false;
                this.actualizarControlesCantidad();
                this.botonConfirmar.disabled = false;
                return;
            }

            const alCompletar = this.configuracion?.alCompletar;
            this.mensaje.textContent = "Devolución registrada correctamente.";
            this.mensaje.dataset.estado = "exito";
            this.botonConfirmar.textContent = "Devolución registrada";

            setTimeout(() => {
                this.activo = false;
                this.modal.close();
                this.configuracion = null;
                alCompletar?.(resultado);
            }, 600);
        } catch (error) {
            console.error("No fue posible registrar la devolución:", error);
            this.mensaje.textContent = "No fue posible registrar la devolución.";
            this.mensaje.dataset.estado = "error";
            this.procesando = false;
            this.actualizarControlesCantidad();
            this.botonConfirmar.disabled = false;
        }
    }
}
