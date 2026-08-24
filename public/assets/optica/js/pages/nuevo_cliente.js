document.addEventListener("DOMContentLoaded", () => {
  const radiosUsaLentes = document.querySelectorAll(
    'input[name="usa_lentes_actualmente"]',
  );

  const radiosUsoAnterior = document.querySelectorAll(
    'input[name="uso_lentes_anteriormente"]',
  );

  const radiosExposicionLaboral = document.querySelectorAll(
    'input[name="exposicion_laboral"]',
  );

  const grupoTipoLente = document.getElementById("group-tipo-lente");

  const grupoTiempoUsoLentes = document.getElementById(
    "group-tiempo-uso-lentes",
  );

  const grupoTipoExposicion = document.getElementById("group-tipo-exposicion");

  const tipoLente = document.getElementById("tipo_lente");

  const tiempoUsoLentes = document.getElementById("tiempo_uso_lentes");

  const tipoExposicion = document.getElementById("tipo_exposicion");

  /* ==========================================================
       Mostrar / ocultar campo condicional
    ========================================================== */

  function actualizarCampoCondicional(grupo, campo, mostrar) {
    if (!grupo || !campo) {
      return;
    }

    grupo.hidden = !mostrar;

    campo.disabled = !mostrar;

    if (!mostrar) {
      campo.value = "";
    }
  }

  /* ==========================================================
       Usa lentes actualmente
    ========================================================== */

  radiosUsaLentes.forEach((radio) => {
    radio.addEventListener("change", () => {
      actualizarCampoCondicional(
        grupoTipoLente,
        tipoLente,
        radio.value === "si",
      );
    });
  });

  /* ==========================================================
       Ha usado lentes anteriormente
    ========================================================== */

  radiosUsoAnterior.forEach((radio) => {
    radio.addEventListener("change", () => {
      actualizarCampoCondicional(
        grupoTiempoUsoLentes,
        tiempoUsoLentes,
        radio.value === "si",
      );
    });
  });

  /* ==========================================================
       Exposición laboral
    ========================================================== */

  radiosExposicionLaboral.forEach((radio) => {
    radio.addEventListener("change", () => {
      actualizarCampoCondicional(
        grupoTipoExposicion,
        tipoExposicion,
        radio.value === "si",
      );
    });
  });

  /* ==========================================================
       Estado inicial
    ========================================================== */

  actualizarCampoCondicional(grupoTipoLente, tipoLente, false);

  actualizarCampoCondicional(grupoTiempoUsoLentes, tiempoUsoLentes, false);

  actualizarCampoCondicional(grupoTipoExposicion, tipoExposicion, false);

  const formularioNuevoCliente = document.getElementById("new-client-form");

  const botonSiguiente = document.getElementById("new-client-next");

  function obtenerRadioSeleccionado(nombre) {
    return document.querySelector(`input[name="${nombre}"]:checked`);
  }

  function validarNuevoCliente() {
    const apellidoPaterno = document.getElementById("apellido_paterno");

    const nombre = document.getElementById("nombre");

    const fechaNacimiento = document.getElementById("fecha_nacimiento");

    const telefono = document.getElementById("telefono");

    const fechaHistorial = document.getElementById("fecha_historial");

    const usaLentes = obtenerRadioSeleccionado("usa_lentes_actualmente");

    const usoAnterior = obtenerRadioSeleccionado("uso_lentes_anteriormente");

    const exposicionLaboral = obtenerRadioSeleccionado("exposicion_laboral");

    if (!apellidoPaterno?.value.trim()) {
      apellidoPaterno?.focus();

      window.alert("Ingresa el apellido paterno del cliente.");

      return false;
    }

    if (!nombre?.value.trim()) {
      nombre?.focus();

      window.alert("Ingresa el nombre del cliente.");

      return false;
    }

    if (!fechaNacimiento?.value) {
      fechaNacimiento?.focus();

      window.alert("Selecciona la fecha de nacimiento.");

      return false;
    }

    if (!telefono?.value.trim()) {
      telefono?.focus();

      window.alert("Ingresa el teléfono del cliente.");

      return false;
    }

    if (!fechaHistorial?.value) {
      fechaHistorial?.focus();

      window.alert("Selecciona la fecha del historial clínico.");

      return false;
    }

    if (!usaLentes) {
      window.alert("Indica si el cliente usa lentes actualmente.");

      return false;
    }

    if (usaLentes.value === "si" && !tipoLente?.value) {
      tipoLente?.focus();

      window.alert("Selecciona el tipo de lente.");

      return false;
    }

    if (!usoAnterior) {
      window.alert("Indica si el cliente ha usado lentes anteriormente.");

      return false;
    }

    if (usoAnterior.value === "si" && !tiempoUsoLentes?.value.trim()) {
      tiempoUsoLentes?.focus();

      window.alert("Indica hace cuánto tiempo usa o usó lentes.");

      return false;
    }

    if (!exposicionLaboral) {
      window.alert("Indica si el cliente tiene exposición laboral.");

      return false;
    }

    if (exposicionLaboral.value === "si" && !tipoExposicion?.value.trim()) {
      tipoExposicion?.focus();

      window.alert("Indica el tipo de exposición laboral.");

      return false;
    }

    return true;
  }

  botonSiguiente?.addEventListener("click", () => {
    if (!validarNuevoCliente()) {
      return;
    }

    const siguienteUrl = botonSiguiente.dataset.nextUrl;

    if (!siguienteUrl) {
      console.error("No se encontró la ruta hacia Graduación.");

      return;
    }

    window.location.href = siguienteUrl;
  });
});
