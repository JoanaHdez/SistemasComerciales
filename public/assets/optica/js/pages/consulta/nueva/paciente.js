/* ==========================================================
   FICHA DEL PACIENTE SELECCIONADO
========================================================== */

function obtenerIniciales(nombre) {

    const palabras = String(nombre ?? "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return palabras
        .slice(0, 2)
        .map(palabra => palabra.charAt(0).toUpperCase())
        .join("");

}


export function mostrarPacienteNuevaConsulta(paciente) {

    const contenedor = document.querySelector(
        "#new-consultation-patient"
    );

    if (!contenedor) {
        return;
    }

    const campos = {
        avatar: "#new-consultation-patient-avatar",
        nombre: "#new-consultation-patient-name",
        folio: "#new-consultation-patient-folio",
        edad: "#new-consultation-patient-age",
        telefono: "#new-consultation-patient-phone",
        codigo: "#new-consultation-patient-code",
        graduacion: "#new-consultation-patient-graduation"
    };

    const valores = {
        avatar: obtenerIniciales(paciente.nombre),
        nombre: paciente.nombre,
        folio: paciente.folio,
        edad: paciente.edad != null
            ? `${paciente.edad} años`
            : "Sin información",
        telefono: paciente.telefono || "Sin información",
        codigo: paciente.folio,
        graduacion: paciente.graduacionVigente || "Sin graduación registrada"
    };

    Object.entries(campos).forEach(([clave, selector]) => {

        const elemento = document.querySelector(selector);

        if (elemento) {
            elemento.textContent = valores[clave] ?? "";
        }

    });

    contenedor.hidden = false;

}


export function ocultarPacienteNuevaConsulta() {

    const contenedor = document.querySelector(
        "#new-consultation-patient"
    );

    if (contenedor) {
        contenedor.hidden = true;
    }

}