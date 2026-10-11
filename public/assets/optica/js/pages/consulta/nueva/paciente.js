
import {
    mostrarGraduacionVigenteNuevaConsulta,
    ocultarGraduacionVigenteNuevaConsulta
} from "./graduacion.js";


/* ==========================================================
   FICHA DEL PACIENTE SELECCIONADO
========================================================== */


/* ==========================================================
   OBTENER INICIALES DEL PACIENTE
========================================================== */

function obtenerIniciales(nombre) {

    const palabras = String(nombre ?? "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);


    return palabras
        .slice(0, 2)
        .map(
            palabra => palabra.charAt(0).toUpperCase()
        )
        .join("");

}


/* ==========================================================
   MOSTRAR PACIENTE SELECCIONADO
========================================================== */

export function mostrarPacienteNuevaConsulta(paciente) {

    const contenedor = document.querySelector(
        "#new-consultation-patient"
    );


    if (!contenedor || !paciente) {
        return;
    }


    /* ======================================================
       ELEMENTOS DE LA FICHA
    ====================================================== */

    const campos = {

        avatar:
            "#new-consultation-patient-avatar",

        nombre:
            "#new-consultation-patient-name",

        folio:
            "#new-consultation-patient-folio",

        edad:
            "#new-consultation-patient-age",

        telefono:
            "#new-consultation-patient-phone",

        codigo:
            "#new-consultation-patient-code",

        graduacion:
            "#new-consultation-patient-graduation"

    };


    /* ======================================================
       INFORMACIÓN DEL PACIENTE
    ====================================================== */

    const valores = {

        avatar:
            obtenerIniciales(
                paciente.nombre
            ),

        nombre:
            paciente.nombre || "Sin información",

        folio:
            paciente.folio || "Sin información",

        edad:
            paciente.edad != null
                ? `${paciente.edad} años`
                : "Sin información",

        telefono:
            paciente.telefono || "Sin información",

        codigo:
            paciente.folio || "Sin información",

        graduacion:
            paciente.graduacionVigente
            || "Sin graduación registrada"

    };


    /* ======================================================
       ACTUALIZAR CAMPOS DE LA FICHA
    ====================================================== */

    Object.entries(campos).forEach(
        ([clave, selector]) => {

            const elemento = contenedor.querySelector(
                selector
            );


            if (!elemento) {
                return;
            }


            elemento.textContent =
                valores[clave] ?? "";

        }
    );


    /* ======================================================
       MOSTRAR FICHA DEL PACIENTE
    ====================================================== */

    contenedor.hidden = false;


    /* ======================================================
       ACTUALIZAR GRADUACIÓN VIGENTE - SECCIÓN 04
    ====================================================== */

    mostrarGraduacionVigenteNuevaConsulta(
        paciente
    );

}


/* ==========================================================
   OCULTAR PACIENTE SELECCIONADO
========================================================== */

export function ocultarPacienteNuevaConsulta() {

    const contenedor = document.querySelector(
        "#new-consultation-patient"
    );


    /* ======================================================
       OCULTAR FICHA DEL PACIENTE
    ====================================================== */

    if (contenedor) {

        contenedor.hidden = true;

    }


    /* ======================================================
       OCULTAR GRADUACIÓN VIGENTE - SECCIÓN 04
    ====================================================== */

    ocultarGraduacionVigenteNuevaConsulta();

}
