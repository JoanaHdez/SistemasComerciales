
/* ==========================================================
   SECCIÓN 02 - DATOS DE LA CONSULTA
========================================================== */

export function inicializarFechaActualNuevaConsulta() {

    const fecha = document.querySelector(
        "#new-consultation-date"
    );

    if (!fecha) {
        return;
    }

    const hoy = new Date();

    const anio = hoy.getFullYear();

    const mes = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoy.getDate()
    ).padStart(2, "0");

    fecha.value = `${anio}-${mes}-${dia}`;

}


/* ==========================================================
   INICIALIZACIÓN
========================================================== */

export function inicializarDatosNuevaConsulta() {

    const seccion = document.querySelector(
        "#new-consultation-data"
    );

    if (!seccion) {
        return;
    }

    const fecha = seccion.querySelector(
        "#new-consultation-date"
    );

    if (fecha && !fecha.value) {

        inicializarFechaActualNuevaConsulta();

    }

}
