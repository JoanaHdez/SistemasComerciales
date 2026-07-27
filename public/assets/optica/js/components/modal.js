class Modal {

    constructor(id) {

        this.modal = document.getElementById(id);

        if (!this.modal) {
            return;
        }

        this.overlay = this.modal.querySelector(".modal__overlay");

        this.closeButton = this.modal.querySelector(".modal__close");

        this.closeTriggers = this.modal.querySelectorAll("[data-modal-close]");

        this.registerEvents();
    }

    registerEvents() {

        this.overlay?.addEventListener("click", () => this.close());

        this.closeButton?.addEventListener("click", () => this.close());

        this.closeTriggers.forEach((element) => {
            element.addEventListener("click", () => this.close());
        });

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                this.close();

            }

        });

    }

    open() {

        this.modal.classList.add("is-active");

        this.modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    }

    close() {

        this.modal.classList.remove("is-active");

        this.modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }

    toggle() {

        if (this.modal.classList.contains("is-active")) {

            this.close();

            return;

        }

        this.open();

    }

}