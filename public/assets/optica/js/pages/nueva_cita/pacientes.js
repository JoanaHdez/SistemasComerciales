
/* ==========================================================
   OPTICOOL
   Nueva cita - Selección de pacientes
========================================================== */

import {
    buscarPacientes,
    obtenerPacientePorId
} from "./datos.js";


/* ==========================================================
   INICIALIZAR PACIENTES
========================================================== */

export function inicializarPacientesNuevaCita() {

    const pagina = document.querySelector(
        ".new-appointment-page"
    );

    if (!pagina) {
        return;
    }

    const buscador = pagina.querySelector(
        ".new-appointment-search"
    );

    const input = pagina.querySelector(
        ".new-appointment-search__input"
    );

    const botonBuscar = pagina.querySelector(
        ".new-appointment-search__button"
    );

    const tarjeta = pagina.querySelector(
        ".new-appointment-patient"
    );

    const botonCambiar = pagina.querySelector(
        ".new-appointment-patient__change"
    );

    const resumen = pagina.querySelector(
        ".new-appointment-summary__patient"
    );

    if (
        !buscador ||
        !input ||
        !botonBuscar ||
        !tarjeta ||
        !botonCambiar ||
        !resumen
    ) {
        return;
    }

    let pacienteSeleccionado = null;

    /* ======================================================
       CONTENEDOR DE RESULTADOS
    ====================================================== */

    const resultados = document.createElement("div");

    resultados.className =
        "new-appointment-search__results";

    resultados.hidden = true;

    resultados.setAttribute(
        "aria-live",
        "polite"
    );

    buscador.insertAdjacentElement(
        "afterend",
        resultados
    );


    /* ======================================================
       MOSTRAR PACIENTE
    ====================================================== */

    function mostrarPaciente(paciente) {

        pacienteSeleccionado = paciente;

        const iniciales = paciente.nombre
            .split(/\s+/)
            .slice(0, 2)
            .map(parte => parte.charAt(0))
            .join("")
            .toUpperCase();

        tarjeta.querySelector(
            ".new-appointment-patient__avatar"
        ).textContent = iniciales;

        tarjeta.querySelector(
            ".new-appointment-patient__name"
        ).textContent = paciente.nombre;

        const datos = tarjeta.querySelectorAll(
            ".new-appointment-patient__meta span"
        );

        if (datos[0]) {
            datos[0].textContent = paciente.telefono;
        }

        if (datos[1]) {
            datos[1].textContent = paciente.correo;
        }

        if (datos[2]) {
            datos[2].textContent =
                `Expediente ${paciente.folio}`;
        }

        resumen.querySelector(
            ".new-appointment-summary__avatar"
        ).textContent = iniciales;

        resumen.querySelector(
            "strong"
        ).textContent = paciente.nombre;

        resumen.querySelector(
            "span"
        ).textContent = paciente.folio;

        tarjeta.hidden = false;
        resumen.hidden = false;

        resultados.hidden = true;
        resultados.replaceChildren();

        input.value = "";

    }


    /* ======================================================
       MOSTRAR RESULTADOS
    ====================================================== */

    function mostrarResultados() {

        const coincidencias = buscarPacientes(
            input.value
        );

        resultados.replaceChildren();

        if (!input.value.trim()) {

            resultados.hidden = true;
            return;

        }

        if (coincidencias.length === 0) {

            const mensaje = document.createElement("p");

            mensaje.className =
                "new-appointment-search__empty";

            mensaje.textContent =
                "No se encontraron pacientes.";

            resultados.appendChild(mensaje);

            resultados.hidden = false;

            return;

        }

        coincidencias.forEach((paciente) => {

            const boton = document.createElement("button");

            boton.type = "button";

            boton.className =
                "new-appointment-search__result";

            const nombre = document.createElement("strong");
            nombre.textContent = paciente.nombre;

            const detalle = document.createElement("span");
            detalle.textContent =
                `${paciente.folio} · ${paciente.telefono}`;

            boton.append(nombre, detalle);

            boton.addEventListener("click", () => {
                mostrarPaciente(paciente);
            });

            resultados.appendChild(boton);

        });

        resultados.hidden = false;

    }


    /* ======================================================
       CAMBIAR PACIENTE
    ====================================================== */

    function cambiarPaciente() {

        pacienteSeleccionado = null;

        tarjeta.hidden = true;
        resumen.hidden = true;

        input.value = "";

        resultados.replaceChildren();
        resultados.hidden = true;

        input.focus();

    }


    /* ======================================================
       EVENTOS
    ====================================================== */

    input.addEventListener(
        "input",
        mostrarResultados
    );

    botonBuscar.addEventListener(
        "click",
        mostrarResultados
    );

    botonCambiar.addEventListener(
        "click",
        cambiarPaciente
    );


    /* ======================================================
       ESTADO INICIAL
    ====================================================== */

    const parametros = new URLSearchParams(
        window.location.search
    );

    const idPaciente = parametros.get("paciente");

    const pacienteInicial = idPaciente
        ? obtenerPacientePorId(idPaciente)
        : null;

    if (pacienteInicial) {

        mostrarPaciente(pacienteInicial);

    } else {

        cambiarPaciente();

    }

}
