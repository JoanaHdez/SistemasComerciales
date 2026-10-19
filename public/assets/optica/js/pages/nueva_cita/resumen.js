
/* ==========================================================
   OPTICOOL
   Nueva cita - Resumen dinámico
========================================================== */


/* ==========================================================
   INICIALIZAR RESUMEN
========================================================== */

export function inicializarResumenNuevaCita() {

    const pagina = document.querySelector(
        ".new-appointment-page"
    );

    if (!pagina) {
        return;
    }

    const resumen = pagina.querySelector(
        ".new-appointment-summary"
    );

    const inputFecha = pagina.querySelector(
        "#appointment-date"
    );

    const selectResponsable = pagina.querySelector(
        "#appointment-professional"
    );

    if (
        !resumen ||
        !inputFecha ||
        !selectResponsable
    ) {
        return;
    }

    const detalles = resumen.querySelectorAll(
        ".new-appointment-summary__details dd"
    );

    if (detalles.length < 5) {
        return;
    }

    const [
        detalleServicio,
        detalleFecha,
        detalleHora,
        detalleResponsable,
        detalleDuracion
    ] = detalles;


    /* ======================================================
       FORMATEAR FECHA
    ====================================================== */

    function formatearFecha(fecha) {

        if (!fecha) {
            return "Sin seleccionar";
        }

        const partes = fecha.split("-");

        if (partes.length !== 3) {
            return "Sin seleccionar";
        }

        const [anio, mes, dia] = partes.map(Number);

        const fechaLocal = new Date(
            anio,
            mes - 1,
            dia
        );

        if (
            fechaLocal.getFullYear() !== anio ||
            fechaLocal.getMonth() !== mes - 1 ||
            fechaLocal.getDate() !== dia
        ) {
            return "Sin seleccionar";
        }

        return new Intl.DateTimeFormat(
            "es-MX",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(fechaLocal);

    }


    /* ======================================================
       OBTENER SERVICIO SELECCIONADO
    ====================================================== */

    function obtenerServicio() {

        const seleccionado = pagina.querySelector(
            'input[name="tipo_cita"]:checked'
        );

        if (!seleccionado) {
            return "Sin seleccionar";
        }

        const etiqueta = seleccionado.closest(
            ".new-appointment-service"
        );

        return etiqueta?.querySelector(
            "strong"
        )?.textContent.trim() || "Sin seleccionar";

    }


    /* ======================================================
       OBTENER HORA SELECCIONADA
    ====================================================== */

    function obtenerHora() {

        const seleccionado = pagina.querySelector(
            'input[name="hora"]:checked:not(:disabled)'
        );

        return seleccionado?.value ||
            "Sin seleccionar";

    }


    /* ======================================================
       OBTENER RESPONSABLE
    ====================================================== */

    function obtenerResponsable() {

        const opcion = selectResponsable.selectedOptions[0];

        if (!selectResponsable.value || !opcion) {
            return "Sin seleccionar";
        }

        return opcion.textContent.trim();

    }


    /* ======================================================
       ACTUALIZAR RESUMEN
    ====================================================== */

    function actualizarResumen() {

        detalleServicio.textContent =
            obtenerServicio();

        detalleFecha.textContent =
            formatearFecha(inputFecha.value);

        detalleHora.textContent =
            obtenerHora();

        detalleResponsable.textContent =
            obtenerResponsable();

        detalleDuracion.textContent =
            "30 minutos";

    }


    /* ======================================================
       EVENTOS
    ====================================================== */

    pagina.addEventListener(
        "change",
        actualizarResumen
    );


    /* ======================================================
       INICIALIZACIÓN
    ====================================================== */

    actualizarResumen();

}
