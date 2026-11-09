const instances = new WeakMap();

function normalize(value) {
    return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

class CustomSelect {
    constructor(select) {
        this.select = select;
        this.activeIndex = -1;
        this.opened = false;
        this.build();
        this.bind();
        this.refresh();
        instances.set(select, this);
    }

    build() {
        this.root = document.createElement("div");
        this.root.className = "custom-select";
        this.trigger = document.createElement("button");
        this.trigger.type = "button";
        this.trigger.className = "custom-select__trigger";
        this.trigger.setAttribute("aria-haspopup", "listbox");
        this.trigger.setAttribute("aria-expanded", "false");
        this.trigger.id = `${this.select.id || "custom-select"}-trigger`;

        this.panel = document.createElement("div");
        this.panel.className = "custom-select__panel";
        this.panel.hidden = true;

        if (this.select.dataset.customSelectSearch === "true") {
            const searchWrap = document.createElement("div");
            searchWrap.className = "custom-select__search-wrap";
            searchWrap.innerHTML = '<svg class="custom-select__search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"></circle><path d="m20 20-4-4" fill="none" stroke="currentColor" stroke-width="2"></path></svg>';
            this.search = document.createElement("input");
            this.search.type = "search";
            this.search.className = "custom-select__search";
            this.search.placeholder = "Buscar profesional...";
            this.search.setAttribute("aria-label", "Buscar opción");
            searchWrap.append(this.search);
            this.panel.append(searchWrap);
        }

        this.list = document.createElement("ul");
        this.list.className = "custom-select__list";
        this.list.id = `${this.select.id || "custom-select"}-listbox`;
        this.list.setAttribute("role", "listbox");
        this.trigger.setAttribute("aria-controls", this.list.id);
        this.panel.append(this.list);
        this.root.append(this.trigger, this.panel);
        this.select.classList.add("custom-select-native");
        this.select.setAttribute("aria-hidden", "true");
        this.select.insertAdjacentElement("afterend", this.root);
    }

    bind() {
        this.trigger.addEventListener("click", () => this.opened ? this.close() : this.open());
        this.trigger.addEventListener("keydown", event => this.onKeydown(event));
        this.search?.addEventListener("input", () => this.renderOptions(this.search.value));
        this.search?.addEventListener("keydown", event => this.onKeydown(event));
        this.select.addEventListener("change", () => this.refresh());
        this.select.addEventListener("custom-select:sync", () => this.refresh());
        this.select.addEventListener("focus", () => this.trigger.focus());
        document.addEventListener("pointerdown", event => {
            if (this.opened && !this.root.contains(event.target)) this.close();
        });
        window.addEventListener("resize", () => this.opened && this.position());
        window.addEventListener("scroll", () => this.opened && this.position(), true);
        new MutationObserver(() => this.refresh()).observe(this.select, { childList: true, subtree: true, attributes: true });
    }

    refresh() {
        const selected = this.select.selectedOptions[0];
        this.trigger.textContent = selected?.textContent.trim() || this.select.dataset.customSelectPlaceholder || "Seleccionar";
        this.trigger.disabled = this.select.disabled;
        this.root.classList.toggle("custom-select--disabled", this.select.disabled);
        this.renderOptions(this.search?.value || "");
    }

    renderOptions(query = "") {
        const term = normalize(query);
        const options = [...this.select.options].filter(option => !term || normalize(option.textContent).includes(term));
        this.list.replaceChildren();
        options.forEach(option => {
            const item = document.createElement("li");
            item.className = "custom-select__option";
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", String(option.selected));
            item.dataset.value = option.value;
            item.textContent = option.textContent.trim();
            if (option.disabled) item.classList.add("custom-select__option--disabled");
            item.addEventListener("pointerdown", event => event.preventDefault());
            item.addEventListener("click", () => !option.disabled && this.choose(option.value));
            this.list.append(item);
        });
        if (!options.length) {
            const empty = document.createElement("li");
            empty.className = "custom-select__empty";
            empty.textContent = "No se encontraron opciones";
            this.list.append(empty);
        }
        this.activeIndex = Math.max(0, options.findIndex(option => option.selected));
        this.paintActive();
    }

    choose(value) {
        this.select.value = value;
        this.select.dispatchEvent(new Event("change", { bubbles: true }));
        this.close();
        this.trigger.focus();
    }

    open() {
        if (this.select.disabled) return;
        document.querySelectorAll(".custom-select--open").forEach(element => {
            if (element !== this.root) element.querySelector(".custom-select__trigger")?.click();
        });
        this.opened = true;
        this.root.classList.add("custom-select--open");
        this.trigger.setAttribute("aria-expanded", "true");
        this.panel.hidden = false;
        this.position();
        if (this.search) {
            this.search.value = "";
            this.renderOptions();
            requestAnimationFrame(() => this.search.focus());
        }
    }

    close() {
        this.opened = false;
        this.root.classList.remove("custom-select--open");
        this.trigger.setAttribute("aria-expanded", "false");
        this.panel.hidden = true;
    }

    position() {
        const rect = this.trigger.getBoundingClientRect();
        const expectedHeight = Math.min(330, this.panel.scrollHeight || 250);
        const spaceBelow = window.innerHeight - rect.bottom;
        const openAbove = spaceBelow < expectedHeight + 12 && rect.top > spaceBelow;
        this.panel.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - rect.width - 12))}px`;
        this.panel.style.width = `${rect.width}px`;
        this.panel.style.top = openAbove ? `${Math.max(12, rect.top - expectedHeight - 8)}px` : `${rect.bottom + 8}px`;
        this.root.classList.toggle("custom-select--up", openAbove);
    }

    onKeydown(event) {
        if (event.key === "Escape") {
            this.close();
            this.trigger.focus();
            return;
        }
        if (!this.opened && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            this.open();
            return;
        }
        if (!this.opened || !["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;
        event.preventDefault();
        const items = [...this.list.querySelectorAll(".custom-select__option:not(.custom-select__option--disabled)")];
        if (!items.length) return;
        if (event.key === "Enter") {
            items[this.activeIndex]?.click();
            return;
        }
        this.activeIndex = event.key === "ArrowDown"
            ? (this.activeIndex + 1) % items.length
            : (this.activeIndex - 1 + items.length) % items.length;
        this.paintActive();
        items[this.activeIndex]?.scrollIntoView({ block: "nearest" });
    }

    paintActive() {
        const items = [...this.list.querySelectorAll(".custom-select__option")];
        items.forEach((item, index) => item.classList.toggle("custom-select__option--active", index === this.activeIndex));
        const active = items[this.activeIndex];
        if (active) {
            active.id ||= `${this.list.id}-active`;
            this.trigger.setAttribute("aria-activedescendant", active.id);
        }
    }
}

function initializeCustomSelects(root = document) {
    root.querySelectorAll("select[data-custom-select]").forEach(select => {
        if (!instances.has(select)) new CustomSelect(select);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeCustomSelects());
} else {
    initializeCustomSelects();
}

export { CustomSelect, initializeCustomSelects };
