
/* ==========================================================
   OPTICOOL
   Nueva cita - Fecha, responsable y horarios
========================================================== */

import {
    responsables,
    obtenerDisponibilidadSimulada
} from "./datos.js";


/* ==========================================================
   INICIALIZAR HORARIOS
========================================================== */

export function inicializarHorariosNuevaCita() {

    const pagina = document.querySelector(
        ".new-appointment-page"
    );

    if (!pagina) {
        return;
    }

    const inputFecha = pagina.querySelector(
        "#appointment-date"
    );

    const selectResponsable = pagina.querySelector(
        "#appointment-professional"
    );

    const contenedorHorarios = pagina.querySelector(
        ".new-appointment-times"
    );

    if (
        !inputFecha ||
        !selectResponsable ||
        !contenedorHorarios
    ) {
        return;
    }


    /* ======================================================
       FECHA LOCAL EN FORMATO YYYY-MM-DD
    ====================================================== */

    function formatearFechaLocal(fecha) {

        const anio = fecha.getFullYear();

        const mes = String(
            fecha.getMonth() + 1
        ).padStart(2, "0");

        const dia = String(
            fecha.getDate()
        ).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;

    }


    /* ======================================================
       OBTENER FECHA ACTUAL
    ====================================================== */

    function obtenerFechaActual() {

        return formatearFechaLocal(
            new Date()
        );

    }


    /* ======================================================
       OBTENER HORA ACTUAL EN MINUTOS
    ====================================================== */

    function obtenerMinutosActuales() {

        const ahora = new Date();

        return (
            ahora.getHours() * 60 +
            ahora.getMinutes()
        );

    }


    /* ======================================================
       CONVERTIR HORA A MINUTOS
    ====================================================== */

    function convertirHoraAMinutos(hora) {

        const [horas, minutos] = hora
            .split(":")
            .map(Number);

        return horas * 60 + minutos;

    }


    /* ======================================================
       CARGAR RESPONSABLES
    ====================================================== */

    function cargarResponsables() {

        const responsableAnterior =
            selectResponsable.value;

        selectResponsable.replaceChildren();

        const opcionInicial = document.createElement(
            "option"
        );

        opcionInicial.value = "";

        opcionInicial.textContent =
            "Selecciona una opción";

        selectResponsable.appendChild(
            opcionInicial
        );

        responsables.forEach((responsable) => {

            const opcion = document.createElement(
                "option"
            );

            opcion.value = String(
                responsable.id
            );

            opcion.textContent =
                responsable.nombre;

            selectResponsable.appendChild(
                opcion
            );

        });

        const existeResponsable = responsables.some(
            (responsable) => {

                return String(responsable.id) ===
                    responsableAnterior;

            }
        );

        selectResponsable.value =
            existeResponsable
                ? responsableAnterior
                : "";

    }


    /* ======================================================
       MOSTRAR MENSAJE
    ====================================================== */

    function mostrarMensaje(mensaje) {

        contenedorHorarios.replaceChildren();

        const elemento = document.createElement(
            "p"
        );

        elemento.className =
            "new-appointment-times__message";

        elemento.textContent = mensaje;

        contenedorHorarios.appendChild(
            elemento
        );

    }


    /* ======================================================
       ACTUALIZAR HORARIOS
    ====================================================== */

    function actualizarHorarios() {

        const fecha = inputFecha.value;

        const responsableId =
            selectResponsable.value;

        const hoy = obtenerFechaActual();

        if (!fecha) {

            mostrarMensaje(
                "Selecciona una fecha para consultar los horarios."
            );

            return;

        }

        if (fecha < hoy) {

            mostrarMensaje(
                "No puedes seleccionar una fecha anterior a hoy."
            );

            return;

        }

        if (!responsableId) {

            mostrarMensaje(
                "Selecciona un responsable para consultar los horarios."
            );

            return;

        }

        const disponibilidad =
            obtenerDisponibilidadSimulada(
                fecha,
                responsableId
            );

        contenedorHorarios.replaceChildren();

        const esHoy = fecha === hoy;

        const minutosActuales =
            obtenerMinutosActuales();

        let horariosDisponibles = 0;

        disponibilidad.forEach((horario) => {

            const horarioPasado =
                esHoy &&
                convertirHoraAMinutos(horario.hora) <=
                    minutosActuales;

            const disponible =
                horario.disponible &&
                !horarioPasado;

            const etiqueta = document.createElement(
                "label"
            );

            etiqueta.className =
                "new-appointment-time";

            const radio = document.createElement(
                "input"
            );

            radio.type = "radio";
            radio.name = "hora";
            radio.value = horario.hora;
            radio.disabled = !disponible;

            const texto = document.createElement(
                "span"
            );

            texto.textContent = horario.hora;

            etiqueta.append(
                radio,
                texto
            );

            contenedorHorarios.appendChild(
                etiqueta
            );

            if (disponible) {
                horariosDisponibles++;
            }

        });

        if (disponibilidad.length === 0) {

            mostrarMensaje(
                "No hay horarios configurados para esta fecha."
            );

            return;

        }

        if (horariosDisponibles === 0) {

            const aviso = document.createElement(
                "p"
            );

            aviso.className =
                "new-appointment-times__message";

            aviso.textContent =
                "No hay horarios disponibles para esta fecha y responsable.";

            contenedorHorarios.appendChild(
                aviso
            );

        }

    }


    /* ======================================================
       EVENTOS
    ====================================================== */

    inputFecha.addEventListener(
        "change",
        actualizarHorarios
    );

    selectResponsable.addEventListener(
        "change",
        actualizarHorarios
    );


    /* ======================================================
       ESTADO INICIAL
    ====================================================== */

    const hoy = obtenerFechaActual();

    inputFecha.min = hoy;

    inputFecha.value = hoy;

    cargarResponsables();

    actualizarHorarios();

}
