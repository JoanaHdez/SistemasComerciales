document.addEventListener("DOMContentLoaded", () => {
  const seccionGraduacionActual = document.getElementById(
    "graduacion-actual-section",
  );

  const botonAlternar = document.getElementById("toggle-graduacion-actual");

  if (!seccionGraduacionActual || !botonAlternar) {
    return;
  }

  const camposGraduacionActual = seccionGraduacionActual.querySelectorAll(
    "input, textarea, select",
  );

  let graduacionActualOmitida = false;

  function actualizarGraduacionActual() {
    camposGraduacionActual.forEach((campo) => {
      campo.disabled = graduacionActualOmitida;

      if (graduacionActualOmitida) {
        campo.value = "";
      }
    });

    seccionGraduacionActual.classList.toggle(
      "graduacion-section--disabled",
      graduacionActualOmitida,
    );

    botonAlternar.textContent = graduacionActualOmitida
      ? "Capturar graduación"
      : "Omitir";
  }

  botonAlternar.addEventListener("click", () => {
    graduacionActualOmitida = !graduacionActualOmitida;

    actualizarGraduacionActual();
  });

  const formularioGraduacion = document.getElementById("graduacion-form");

  const botonGuardarGraduacion = document.getElementById("guardar-graduacion");

  function validarCampo(id, mensaje) {
    const campo = document.getElementById(id);

    if (!campo?.value.trim()) {
      campo?.focus();

      window.alert(mensaje);

      return false;
    }

    return true;
  }

  function validarNuevaGraduacion() {
    if (
      !validarCampo("nueva_oi_esfera", "Ingresa la esfera del ojo izquierdo.")
    ) {
      return false;
    }

    if (
      !validarCampo(
        "nueva_oi_cilindro",
        "Ingresa el cilindro del ojo izquierdo.",
      )
    ) {
      return false;
    }

    if (!validarCampo("nueva_oi_eje", "Ingresa el eje del ojo izquierdo.")) {
      return false;
    }

    if (
      !validarCampo("nueva_od_esfera", "Ingresa la esfera del ojo derecho.")
    ) {
      return false;
    }

    if (
      !validarCampo("nueva_od_cilindro", "Ingresa el cilindro del ojo derecho.")
    ) {
      return false;
    }

    if (!validarCampo("nueva_od_eje", "Ingresa el eje del ojo derecho.")) {
      return false;
    }

    if (
      !validarCampo("nueva_distancia_ocular", "Ingresa la distancia ocular.")
    ) {
      return false;
    }

    if (!validarCampo("diagnostico", "Ingresa el diagnóstico del examen.")) {
      return false;
    }

    return true;
  }

  formularioGraduacion?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validarNuevaGraduacion()) {
      return;
    }

    window.alert("Graduación capturada correctamente.");

    /*
     * Frontend únicamente.
     * No se guarda información en BD.
     *
     * Después backend decidirá qué hacer al finalizar:
     * guardar cliente + historial + graduación
     * y redirigir al expediente o a clientes.
     */

const urlDestino =
    botonGuardarGraduacion?.dataset.successUrl;


if (!urlDestino) {

    console.error(
        "No se encontró la ruta de finalización.",
    );

    return;
}


window.location.href =
    urlDestino;  });
});
