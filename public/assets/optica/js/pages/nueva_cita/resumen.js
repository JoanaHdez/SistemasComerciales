/* ==========================================================
   OPTICOOL
   Nueva cita - Resumen dinámico
========================================================== */

import { obtenerDuracionServicio } from "./datos.js";

/* ==========================================================
   INICIALIZAR RESUMEN
========================================================== */

export function inicializarResumenNuevaCita() {
  const pagina = document.querySelector(".new-appointment-page");

  if (!pagina) {
    return;
  }

  const resumen = pagina.querySelector(".new-appointment-summary");

  const inputFecha = pagina.querySelector("#appointment-date");

  const selectResponsable = pagina.querySelector("#appointment-professional");

  if (!resumen || !inputFecha || !selectResponsable) {
    return;
  }

  const avisoDisponibilidad = resumen.querySelector(
    ".new-appointment-summary__notice",
  );

  const detalles = resumen.querySelectorAll(
    ".new-appointment-summary__details dd",
  );

  if (detalles.length < 5) {
    return;
  }

  const [
    detalleServicio,
    detalleFecha,
    detalleHora,
    detalleResponsable,
    detalleDuracion,
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

    const fechaLocal = new Date(anio, mes - 1, dia);

    if (
      fechaLocal.getFullYear() !== anio ||
      fechaLocal.getMonth() !== mes - 1 ||
      fechaLocal.getDate() !== dia
    ) {
      return "Sin seleccionar";
    }

    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(fechaLocal);
  }

  /* ======================================================
       OBTENER SERVICIO SELECCIONADO
    ====================================================== */

  function obtenerServicio() {
    const seleccionado = pagina.querySelector(
      'input[name="tipo_cita"]:checked',
    );

    if (!seleccionado) {
      return "Sin seleccionar";
    }

    const etiqueta = seleccionado.closest(".new-appointment-service");

    return (
      etiqueta?.querySelector("strong")?.textContent.trim() || "Sin seleccionar"
    );
  }

  /* ======================================================
       OBTENER HORA SELECCIONADA
    ====================================================== */

  function obtenerHora() {
    const seleccionado = pagina.querySelector(
      'input[name="hora"]:checked:not(:disabled)',
    );

    return seleccionado?.value || "Sin seleccionar";
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
       ACTUALIZAR AVISO DE DISPONIBILIDAD
    ====================================================== */

  function actualizarAvisoDisponibilidad() {
    if (!avisoDisponibilidad) {
      return;
    }

    const titulo = avisoDisponibilidad.querySelector("strong");

    const descripcion = avisoDisponibilidad.querySelector("p");

    if (!titulo || !descripcion) {
      return;
    }

    const fecha = inputFecha.value;

    const responsable = selectResponsable.value;

    const horario = pagina.querySelector(
      'input[name="hora"]:checked:not(:disabled)',
    );

    /* --------------------------------------------------
           SIN FECHA
        -------------------------------------------------- */

    if (!fecha) {
      titulo.textContent = "Selecciona una fecha";

      descripcion.textContent =
        "Elige una fecha para consultar los horarios disponibles.";

      return;
    }

    /* --------------------------------------------------
           SIN RESPONSABLE
        -------------------------------------------------- */

    if (!responsable) {
      titulo.textContent = "Selecciona un responsable";

      descripcion.textContent =
        "Elige un profesional para consultar su disponibilidad.";

      return;
    }

    /* --------------------------------------------------
           SIN HORARIO
        -------------------------------------------------- */

    if (!horario) {
      titulo.textContent = "Selecciona un horario";

      descripcion.textContent =
        "Elige uno de los horarios disponibles para continuar.";

      return;
    }

    /* --------------------------------------------------
           HORARIO DISPONIBLE
        -------------------------------------------------- */

    titulo.textContent = "Horario disponible";

    descripcion.textContent =
      "El horario seleccionado está disponible para agendar la cita.";
  }

  /* ======================================================
       ACTUALIZAR RESUMEN
    ====================================================== */

  function actualizarResumen() {
    detalleServicio.textContent = obtenerServicio();

    detalleFecha.textContent = formatearFecha(inputFecha.value);

    detalleHora.textContent = obtenerHora();

    detalleResponsable.textContent = obtenerResponsable();

    const servicioSeleccionado = pagina.querySelector(
      'input[name="tipo_cita"]:checked',
    );

    const duracion = servicioSeleccionado
      ? obtenerDuracionServicio(servicioSeleccionado.value)
      : null;

    detalleDuracion.textContent =
      duracion !== null ? `${duracion} minutos` : "Sin definir";

    actualizarAvisoDisponibilidad();
  }

  /* ======================================================
       EVENTOS
    ====================================================== */

  pagina.addEventListener("change", actualizarResumen);

  /* ======================================================
       INICIALIZACIÓN
    ====================================================== */

  actualizarResumen();
}
