import { Modal } from "../../components/modal.js";
import {
    aCentavos,
    formatearDinero,
    totalMetodosCentavos,
} from "./dinero.js";

export class ModalAbonoVenta {
    constructor(id = "sales-payment-modal") {
        this.elemento = document.getElementById(id);

        if (!this.elemento) {
            return;
        }

        this.modal = new Modal(id);
        this.formulario = this.elemento.querySelector("#sales-payment-form");
        this.folio = this.elemento.querySelector("#sales-payment-folio");
        this.saldo = this.elemento.querySelector("#sales-payment-balance");
        this.total = this.elemento.querySelector("#sales-payment-total");
        this.restante = this.elemento.querySelector("#sales-payment-remaining");
        this.mensaje = this.elemento.querySelector("#sales-payment-message");
        this.referencia = this.elemento.querySelector("#sales-payment-reference");
        this.botonConfirmar = this.elemento.querySelector("#sales-payment-submit");
        this.metodos = [...this.elemento.querySelectorAll("[data-payment-method]")];
        this.importes = [...this.elemento.querySelectorAll("[data-payment-amount]")];
        this.saldoCentavos = 0;
        this.activo = false;
        this.procesando = false;
        this.configuracion = null;

        this.registrarEventos();
        this.restablecer();
    }

    registrarEventos() {
        this.metodos.forEach((selector) => {
            selector.addEventListener("change", () => {
                const importe = this.obtenerImporte(selector.value);
                const contenedor = importe.closest("[data-payment-amount-wrapper]");

                contenedor.hidden = !selector.checked;

                if (selector.checked) {
                    requestAnimationFrame(() => importe.focus());
                }

                this.validar();
            });
        });

        this.importes.forEach((importe) => {
            importe.addEventListener("input", () => this.validar());
        });

        this.formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.confirmar();
        });

        this.elemento.querySelector("[data-payment-cancel]")
            ?.addEventListener("click", () => this.cancelar());

        this.elemento.querySelector(".modal__close")
            ?.addEventListener("click", () => this.cancelar());

        this.elemento.querySelector(".modal__overlay")
            ?.addEventListener("click", () => this.cancelar());

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && this.activo) {
                this.cancelar();
            }
        });
    }

    obtenerImporte(metodo) {
        return this.importes.find((input) => input.dataset.paymentAmount === metodo);
    }

    obtenerMetodos() {
        return this.metodos.reduce((resultado, selector) => {
            const input = this.obtenerImporte(selector.value);
            resultado[selector.value] = selector.checked
                ? aCentavos(input.value)
                : 0;
            return resultado;
        }, { efectivo: 0, tarjeta: 0, transferencia: 0 });
    }

    evaluar() {
        const seleccionados = this.metodos.filter((selector) => selector.checked);

        if (!seleccionados.length) {
            return {
                valido: false,
                mensaje: "Selecciona al menos un método de pago.",
                metodos: this.obtenerMetodos(),
                totalCentavos: 0,
            };
        }

        for (const selector of seleccionados) {
            const input = this.obtenerImporte(selector.value);
            const numero = Number(input.value);
            const importeCentavos = aCentavos(input.value);

            if (!input.value.trim() || !Number.isFinite(numero) || numero <= 0 || importeCentavos <= 0) {
                return {
                    valido: false,
                    mensaje: `Captura un importe positivo para ${selector.value}.`,
                    metodos: this.obtenerMetodos(),
                    totalCentavos: 0,
                };
            }
        }

        const metodos = this.obtenerMetodos();
        const totalCentavos = totalMetodosCentavos(metodos);

        if (totalCentavos > this.saldoCentavos) {
            return {
                valido: false,
                mensaje: `El abono supera el saldo pendiente por ${formatearDinero(totalCentavos - this.saldoCentavos)}.`,
                metodos,
                totalCentavos,
            };
        }

        return { valido: true, mensaje: "", metodos, totalCentavos };
    }

    validar() {
        const evaluacion = this.evaluar();
        this.total.textContent = formatearDinero(evaluacion.totalCentavos);
        this.restante.textContent = formatearDinero(
            Math.max(0, this.saldoCentavos - evaluacion.totalCentavos),
        );
        this.mensaje.textContent = evaluacion.mensaje;
        this.mensaje.dataset.estado = evaluacion.valido ? "valido" : "error";
        this.botonConfirmar.disabled = !evaluacion.valido || this.procesando;
        return evaluacion;
    }

    abrir(configuracion) {
        if (!this.elemento) return;
        this.configuracion = configuracion;
        this.saldoCentavos = Math.max(0, Number(configuracion.saldoCentavos) || 0);
        this.folio.textContent = configuracion.folio;
        this.saldo.textContent = formatearDinero(this.saldoCentavos);
        this.activo = true;
        this.procesando = false;
        this.restablecer();
        this.modal.open();
        this.metodos[0]?.focus();
    }

    restablecer() {
        if (!this.elemento) return;
        this.formulario.reset();
        this.metodos.forEach((selector) => {
            selector.checked = false;
            const importe = this.obtenerImporte(selector.value);
            importe.disabled = false;
            importe.closest("[data-payment-amount-wrapper]").hidden = true;
        });
        this.referencia.value = "";
        this.validar();
    }

    cancelar() {
        if (!this.activo || this.procesando) return;
        this.activo = false;
        this.modal.close();
        this.configuracion?.alCancelar?.();
        this.configuracion = null;
    }

    async confirmar() {
        if (this.procesando) return;
        const evaluacion = this.validar();
        if (!evaluacion.valido) return;

        this.procesando = true;
        this.botonConfirmar.disabled = true;

        try {
            const resultado = await this.configuracion.registrar({
                metodos: evaluacion.metodos,
                importeCentavos: evaluacion.totalCentavos,
                referencia: this.referencia.value.trim(),
            });

            if (!resultado?.exito) {
                this.mensaje.textContent = resultado?.mensaje ?? "No fue posible registrar el abono.";
                this.mensaje.dataset.estado = "error";
                this.procesando = false;
                this.validar();
                return;
            }

            const completar = this.configuracion?.alCompletar;
            this.activo = false;
            this.modal.close();
            this.configuracion = null;
            completar?.(resultado);
        } catch (error) {
            console.error("No fue posible registrar el abono:", error);
            this.mensaje.textContent = "No fue posible registrar el abono.";
            this.mensaje.dataset.estado = "error";
            this.procesando = false;
            this.validar();
        }
    }
}

