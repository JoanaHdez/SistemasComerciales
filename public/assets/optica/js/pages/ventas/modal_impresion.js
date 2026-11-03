import { Modal } from "../../components/modal.js";

const FORMATOS_PERMITIDOS = ["ticket", "carta"];

export class ModalFormatoImpresion {
    constructor(id = "sales-print-modal") {
        this.elemento = document.getElementById(id);

        if (!this.elemento) return;

        this.modal = new Modal(id);
        this.formulario = this.elemento.querySelector("#sales-print-form");
        this.folio = this.elemento.querySelector("#sales-print-folio");
        this.cliente = this.elemento.querySelector("#sales-print-client");
        this.formatos = [...this.elemento.querySelectorAll("[name='sales-print-format']")];
        this.botonGenerar = this.elemento.querySelector("#sales-print-submit");
        this.mensaje = this.elemento.querySelector("#sales-print-message");
        this.activo = false;
        this.procesando = false;
        this.configuracion = null;

        this.registrarEventos();
        this.restablecer();
    }

    registrarEventos() {
        this.formatos.forEach((formato) => {
            formato.addEventListener("change", () => this.validar());
        });

        this.formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.generar();
        });

        this.elemento.querySelector("[data-print-back]")
            ?.addEventListener("click", () => this.cancelar());
        this.elemento.querySelector(".modal__close")
            ?.addEventListener("click", () => this.cancelar());
        this.elemento.querySelector(".modal__overlay")
            ?.addEventListener("click", () => this.cancelar());

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && this.activo) this.cancelar();
        });
    }

    formatoSeleccionado() {
        return this.formatos.find((formato) => formato.checked)?.value ?? "";
    }

    validar() {
        const formato = this.formatoSeleccionado();
        const valido = FORMATOS_PERMITIDOS.includes(formato);
        this.botonGenerar.disabled = !valido || this.procesando;
        return { valido, formato };
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
        this.formatos.find((formato) => formato.checked)?.focus();
    }

    restablecer() {
        if (!this.elemento) return;

        this.formulario.reset();
        this.formatos.forEach((formato) => {
            formato.checked = formato.value === "carta";
        });
        this.mensaje.textContent = "";
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

    async generar() {
        if (this.procesando) return;

        const evaluacion = this.validar();
        if (!evaluacion.valido) return;

        this.procesando = true;
        this.botonGenerar.disabled = true;

        try {
            const resultado = await this.configuracion.generar(evaluacion.formato);

            if (!resultado?.exito) {
                this.mensaje.textContent = resultado?.mensaje
                    ?? "No fue posible abrir la ventana de impresión.";
                this.procesando = false;
                this.botonGenerar.disabled = false;
                return;
            }

            const alCompletar = this.configuracion?.alCompletar;
            this.activo = false;
            this.modal.close();
            this.configuracion = null;
            alCompletar?.(resultado);
        } catch (error) {
            console.error("No fue posible generar el comprobante:", error);
            this.mensaje.textContent = "No fue posible abrir la ventana de impresión.";
            this.procesando = false;
            this.botonGenerar.disabled = false;
        }
    }
}
