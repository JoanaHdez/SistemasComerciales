/* ==========================================================
   OBTENER INICIALES
========================================================== */

function obtenerIniciales(nombre) {
  const partes = String(nombre ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (partes.length === 0) {
    return "";
  }

  if (partes.length === 1) {
    return partes[0].charAt(0).toUpperCase();
  }

  return (partes[0].charAt(0) + partes[1].charAt(0)).toUpperCase();
}

/* ==========================================================
   RENDERIZAR PACIENTE
========================================================== */

/* ==========================================================
   RENDERIZAR PACIENTE
========================================================== */

export function renderPaciente(cliente) {

    if (!cliente) {
        return;
    }


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const avatar = document.getElementById(
        "history-patient-avatar"
    );

    const nombre = document.getElementById(
        "history-patient-name"
    );

    const folio = document.getElementById(
        "history-patient-folio"
    );

    const edad = document.getElementById(
        "history-patient-age"
    );

    const total = document.getElementById(
        "history-patient-total"
    );

    const ultimaConsulta = document.getElementById(
        "history-patient-last"
    );


    /* ======================================================
       ACTUALIZAR INFORMACIÓN
    ====================================================== */

    if (avatar) {
        avatar.textContent = obtenerIniciales(cliente.nombre);
    }

    if (nombre) {
        nombre.textContent = cliente.nombre ?? "—";
    }

    if (folio) {
        folio.textContent = cliente.folio ?? "—";
    }

    if (edad) {

        const edadCliente = cliente.resumen?.edad;

        edad.textContent = edadCliente
            ? `Edad: ${edadCliente} años`
            : "Edad: —";

    }

    if (total) {

        total.textContent = Array.isArray(cliente.consultas)
            ? cliente.consultas.length
            : 0;

    }

    if (ultimaConsulta) {

        ultimaConsulta.textContent =
            cliente.resumen?.ultimaConsulta ?? "—";

    }


    /* ======================================================
       ENLACE A NUEVA CONSULTA
    ====================================================== */

    const enlaceNuevaConsulta = document.getElementById(
        "history-new-consultation"
    );

    if (enlaceNuevaConsulta) {

        const url = new URL(
            enlaceNuevaConsulta.href
        );

        if (cliente.id != null) {

            url.searchParams.set(
                "paciente",
                String(cliente.id)
            );

        } else {

            url.searchParams.delete(
                "paciente"
            );

        }

        enlaceNuevaConsulta.href =
            url.toString();

    }


    /* ======================================================
       ENLACE VOLVER AL EXPEDIENTE
    ====================================================== */

    const enlaceExpediente = document.getElementById(
        "history-back-to-record"
    );

    if (enlaceExpediente) {

        const url = new URL(
            enlaceExpediente.href
        );

        if (cliente.id != null) {

            url.searchParams.set(
                "paciente",
                String(cliente.id)
            );

        } else {

            url.searchParams.delete(
                "paciente"
            );

        }

        enlaceExpediente.href =
            url.toString();

    }

}
