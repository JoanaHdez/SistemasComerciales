import { Modal } from "../../components/modal.js";

export class ModalCancelacionVenta {
    constructor(id = "sales-cancellation-modal") {
        this.elemento = document.getElementById(id);

        if (!this.elemento) return;

        this.modal = new Modal(id);
        this.formulario = this.elemento.querySelector("#sales-cancellation-form");
        this.folio = this.elemento.querySelector("#sales-cancellation-folio");
        this.cliente = this.elemento.querySelector("#sales-cancellation-client");
        this.motivo = this.elemento.querySelector("#sales-cancellation-reason");
        this.mensaje = this.elemento.querySelector("#sales-cancellation-message");
        this.botonConfirmar = this.elemento.querySelector("#sales-cancellation-submit");
        this.activo = false;
        this.procesando = false;
        this.configuracion = null;

        this.registrarEventos();
        this.restablecer();
    }

    registrarEventos() {
        this.motivo.addEventListener("input", () => this.validar());

        this.formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.confirmar();
        });

        this.elemento.querySelector("[data-cancellation-back]")
            ?.addEventListener("click", () => this.cancelar());

        this.elemento.querySelector(".modal__close")
            ?.addEventListener("click", () => this.cancelar());

        this.elemento.querySelector(".modal__overlay")
            ?.addEventListener("click", () => this.cancelar());

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && this.activo) this.cancelar();
        });
    }

    validar() {
        const motivo = this.motivo.value.trim();
        const valido = motivo.length > 0;

        this.mensaje.textContent = valido
            ? ""
            : "Escribe el motivo de la cancelación para continuar.";
        this.botonConfirmar.disabled = !valido || this.procesando;

        return { valido, motivo };
    }

    abrir(configuracion) {
        if (!this.elemento) return;

        this.configuracion = configuracion;
        this.folio.textContent = configuracion.folio;
        this.cliente.textContent = configuracion.cliente;
        this.activo = true;
        this.procesando = false;
        this.restablecer();
        this.modal.open();
        this.motivo.focus();
    }

    restablecer() {
        if (!this.elemento) return;
        this.formulario.reset();
        this.procesando = false;
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
            const resultado = await this.configuracion.cancelar(evaluacion.motivo);

            if (!resultado?.exito) {
                this.mensaje.textContent = resultado?.mensaje
                    ?? "No fue posible cancelar la venta.";
                this.procesando = false;
                this.botonConfirmar.disabled = false;
                return;
            }

            const alCompletar = this.configuracion?.alCompletar;
            this.activo = false;
            this.modal.close();
            this.configuracion = null;
            alCompletar?.(resultado);
        } catch (error) {
            console.error("No fue posible cancelar la venta:", error);
            this.mensaje.textContent = "No fue posible cancelar la venta.";
            this.procesando = false;
            this.botonConfirmar.disabled = false;
        }
    }
}
