import { Modal } from "../../components/modal.js";
import { aCentavos, formatearDinero } from "./dinero.js";

const METODOS_PERMITIDOS = ["efectivo", "tarjeta", "transferencia"];

export class ModalReembolsoVenta {
    constructor(id = "sales-refund-modal") {
        this.elemento = document.getElementById(id);

        if (!this.elemento) return;

        this.modal = new Modal(id);
        this.formulario = this.elemento.querySelector("#sales-refund-form");
        this.folio = this.elemento.querySelector("#sales-refund-folio");
        this.cliente = this.elemento.querySelector("#sales-refund-client");
        this.disponible = this.elemento.querySelector("#sales-refund-available");
        this.importe = this.elemento.querySelector("#sales-refund-amount");
        this.metodo = this.elemento.querySelector("#sales-refund-method");
        this.motivo = this.elemento.querySelector("#sales-refund-reason");
        this.mensaje = this.elemento.querySelector("#sales-refund-message");
        this.botonConfirmar = this.elemento.querySelector("#sales-refund-submit");
        this.disponibleCentavos = 0;
        this.activo = false;
        this.procesando = false;
        this.configuracion = null;
        this.textoConfirmar = this.botonConfirmar.textContent.trim();

        this.registrarEventos();
        this.restablecer();
    }

    registrarEventos() {
        [this.importe, this.metodo, this.motivo].forEach((control) => {
            control.addEventListener("input", () => this.validar());
            control.addEventListener("change", () => this.validar());
        });

        this.formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.confirmar();
        });

        this.elemento.querySelector("[data-refund-back]")
            ?.addEventListener("click", () => this.cancelar());
        this.elemento.querySelector(".modal__close")
            ?.addEventListener("click", () => this.cancelar());
        this.elemento.querySelector(".modal__overlay")
            ?.addEventListener("click", () => this.cancelar());

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && this.activo) this.cancelar();
        });
    }

    evaluar() {
        const numero = Number(this.importe.value);
        const importeCentavos = aCentavos(this.importe.value);
        const metodo = this.metodo.value;
        const motivo = this.motivo.value.trim();

        if (!this.importe.value.trim() || !Number.isFinite(numero) || numero <= 0 || importeCentavos <= 0) {
            return { valido: false, mensaje: "Captura un importe mayor que cero." };
        }
        if (importeCentavos > this.disponibleCentavos) {
            return {
                valido: false,
                mensaje: `El reembolso supera el importe disponible por ${formatearDinero(importeCentavos - this.disponibleCentavos)}.`,
            };
        }
        if (!METODOS_PERMITIDOS.includes(metodo)) {
            return { valido: false, mensaje: "Selecciona el método de reembolso." };
        }
        if (!motivo) {
            return { valido: false, mensaje: "Escribe el motivo del reembolso." };
        }

        return { valido: true, mensaje: "", importeCentavos, metodo, motivo };
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
        this.disponibleCentavos = Math.max(0, Number(configuracion.disponibleCentavos) || 0);
        this.folio.textContent = configuracion.folio;
        this.cliente.textContent = configuracion.cliente;
        this.disponible.textContent = formatearDinero(this.disponibleCentavos);
        this.activo = true;
        this.procesando = false;
        this.restablecer();
        this.modal.open();
        this.importe.focus();
    }

    restablecer() {
        if (!this.elemento) return;

        this.formulario.reset();
        this.procesando = false;
        this.botonConfirmar.textContent = this.textoConfirmar;
        this.validar();
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

        try {
            const resultado = await this.configuracion.registrar(evaluacion);

            if (!resultado?.exito) {
                this.mensaje.textContent = resultado?.mensaje
                    ?? "No fue posible registrar el reembolso.";
                this.mensaje.dataset.estado = "error";
                this.procesando = false;
                this.botonConfirmar.disabled = false;
                return;
            }

            const alCompletar = this.configuracion?.alCompletar;
            this.mensaje.textContent = "Reembolso registrado correctamente.";
            this.mensaje.dataset.estado = "exito";
            this.botonConfirmar.textContent = "Reembolso registrado";

            setTimeout(() => {
                this.activo = false;
                this.modal.close();
                this.configuracion = null;
                alCompletar?.(resultado);
            }, 600);
        } catch (error) {
            console.error("No fue posible registrar el reembolso:", error);
            this.mensaje.textContent = "No fue posible registrar el reembolso.";
            this.mensaje.dataset.estado = "error";
            this.procesando = false;
            this.botonConfirmar.disabled = false;
        }
    }
}
