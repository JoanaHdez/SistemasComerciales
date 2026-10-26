import { Modal } from "./components/modal.js";

import {
    obtenerCitasGuardadas,
    actualizarCitaSimulada
} from "./pages/nueva_cita/almacenamiento.js";

import {
    obtenerDisponibilidadSimulada
} from "./pages/nueva_cita/datos.js";

import {
    recuperarCambiosAgenda
} from "./pages/agenda/almacenamiento.js";

import {
    crearCalendario
} from "./pages/agenda/calendario.js";

import {
    crearGestorCitas
} from "./pages/agenda/citas.js";

import {
    crearModalCitas
} from "./pages/agenda/modal.js";


document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.getElementById("calendar-title");
    const grid = document.getElementById("calendar-grid");

    const botonAnterior = document.getElementById("calendar-prev");
    const botonHoy = document.getElementById("calendar-today");
    const botonSiguiente = document.getElementById("calendar-next");

    const tituloFechaSeleccionada = document.getElementById(
        "selected-date-title",
    );

    const resumenFechaSeleccionada = document.getElementById(
        "selected-date-summary",
    );

    const listaCitas = document.getElementById("appointments-list");

    const appointmentForm = document.getElementById("appointment-form");

    const appointmentModalTitle = document.getElementById(
        "appointment-modal-title",
    );

    const appointmentId = document.getElementById("appointment-id");
    const appointmentMode = document.getElementById("appointment-mode");
    const appointmentClient = document.getElementById("appointment-client");
    const appointmentProfessional = document.getElementById(
        "appointment-professional"
    );
    const appointmentDate = document.getElementById("appointment-date");
    const appointmentTime = document.getElementById("appointment-time");
    const appointmentStatus = document.getElementById("appointment-status");
    const appointmentReason = document.getElementById("appointment-reason");
    const appointmentSave = document.getElementById("appointment-save");

    const appointmentModal = new Modal("appointment-modal");

    if (
        !titulo ||
        !grid ||
        !botonAnterior ||
        !botonHoy ||
        !botonSiguiente ||
        !tituloFechaSeleccionada ||
        !resumenFechaSeleccionada ||
        !listaCitas
    ) {
        console.error("No se encontraron los elementos de la agenda.");

        return;
    }

    const hoy = new Date();

    const contexto = {
        actualizarCitaSimulada,
        anioActual: hoy.getFullYear(),
        appointmentClient,
        appointmentDate,
        appointmentForm,
        appointmentId,
        appointmentModal,
        appointmentModalTitle,
        appointmentMode,
        appointmentProfessional,
        appointmentReason,
        appointmentSave,
        appointmentStatus,
        appointmentTime,
        botonAnterior,
        botonHoy,
        botonSiguiente,
        cambiosCitas: recuperarCambiosAgenda(),
        grid,
        hoy,
        listaCitas,
        mesActual: hoy.getMonth(),
        obtenerCitasGuardadas,
        obtenerDisponibilidadSimulada,
        resumenFechaSeleccionada,
        titulo,
        tituloFechaSeleccionada
    };

    contexto.citas = crearGestorCitas(contexto);
    contexto.calendario = crearCalendario(contexto);
    contexto.modal = crearModalCitas(contexto);

    contexto.modal.inicializarModalCitas();
    contexto.calendario.inicializarCalendario();
});
