
/* ==========================================================
   SECCIÓN 04 - GRADUACIÓN
========================================================== */

export function inicializarGraduacionNuevaConsulta() {

    const seccion = document.querySelector(
        "#new-consultation-graduation"
    );

    if (!seccion) {
        return;
    }

    const opciones = seccion.querySelectorAll(
        'input[name="realizo_nueva_graduacion"]'
    );

    const formulario = seccion.querySelector(
        "#new-consultation-graduation-new"
    );

    if (!formulario) {
        return;
    }


    function actualizarVisibilidad() {

        const seleccion = seccion.querySelector(
            'input[name="realizo_nueva_graduacion"]:checked'
        );

        const mostrar = seleccion?.value === "si";

        formulario.hidden = !mostrar;
        formulario.disabled = !mostrar;

    }


    opciones.forEach(opcion => {

        opcion.addEventListener(
            "change",
            actualizarVisibilidad
        );

    });


    actualizarVisibilidad();

}


/* ==========================================================
   MOSTRAR GRADUACIÓN VIGENTE
========================================================== */

export function mostrarGraduacionVigenteNuevaConsulta(
    paciente
) {

    const seccion = document.querySelector(
        "#new-consultation-graduation"
    );

    if (!seccion) {
        return;
    }

    const contenido = seccion.querySelector(
        "#new-consultation-graduation-current"
    );

    const vacio = seccion.querySelector(
        "#new-consultation-graduation-empty"
    );

    const graduacion = paciente?.graduacionDetalle || {};

    const valores = {
        "oi.esfera": graduacion.oi?.esfera,
        "oi.cilindro": graduacion.oi?.cilindro,
        "oi.eje": graduacion.oi?.eje,
        "od.esfera": graduacion.od?.esfera,
        "od.cilindro": graduacion.od?.cilindro,
        "od.eje": graduacion.od?.eje,
        "adicion": graduacion.adicion,
        "distanciaOcular": graduacion.distanciaOcular
    };


    seccion.querySelectorAll(
        "[data-current]"
    ).forEach(elemento => {

        const clave = elemento.dataset.current;

        elemento.textContent =
            String(valores[clave] ?? "").trim() || "—";

    });


    if (contenido) {
        contenido.hidden = false;
    }

    if (vacio) {
        vacio.hidden = true;
    }

}


/* ==========================================================
   OCULTAR GRADUACIÓN VIGENTE
========================================================== */

export function ocultarGraduacionVigenteNuevaConsulta() {

    const seccion = document.querySelector(
        "#new-consultation-graduation"
    );

    if (!seccion) {
        return;
    }

    const contenido = seccion.querySelector(
        "#new-consultation-graduation-current"
    );

    const vacio = seccion.querySelector(
        "#new-consultation-graduation-empty"
    );

    if (contenido) {
        contenido.hidden = true;
    }

    if (vacio) {
        vacio.hidden = false;
    }

}
