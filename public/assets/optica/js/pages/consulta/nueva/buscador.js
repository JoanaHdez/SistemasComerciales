
import {
    pacientesNuevaConsulta
} from "./datos.js";

import {
    mostrarPacienteNuevaConsulta,
    ocultarPacienteNuevaConsulta
} from "./paciente.js";


/* ==========================================================
   NORMALIZAR TEXTO
========================================================== */

function normalizarTexto(valor) {

    return String(valor ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}


/* ==========================================================
   INICIALIZAR BUSCADOR DE PACIENTES
========================================================== */

export function inicializarBuscadorNuevaConsulta() {

    const input = document.querySelector(
        "#new-consultation-patient-search"
    );

    const resultados = document.querySelector(
        "#new-consultation-patient-results"
    );


    if (!input || !resultados) {
        return;
    }


    /* ======================================================
       CERRAR RESULTADOS
    ====================================================== */

    function cerrarResultados() {

        resultados.hidden = true;

        input.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* ======================================================
       SELECCIONAR PACIENTE
    ====================================================== */

    function seleccionarPaciente(paciente) {

        if (!paciente) {
            return;
        }


        /* --------------------------------------------------
           ACTUALIZAR BUSCADOR
        -------------------------------------------------- */

        input.value =
            paciente.nombre;


        /* --------------------------------------------------
           CONSERVAR IDENTIFICADOR
        -------------------------------------------------- */

        input.dataset.pacienteId =
            String(paciente.id);


        /* --------------------------------------------------
           LIMPIAR VALIDACIÓN ANTERIOR
        -------------------------------------------------- */

        input.setCustomValidity("");


        /* --------------------------------------------------
           MOSTRAR FICHA DEL PACIENTE
        -------------------------------------------------- */

        mostrarPacienteNuevaConsulta(
            paciente
        );


        /* --------------------------------------------------
           CERRAR RESULTADOS
        -------------------------------------------------- */

        cerrarResultados();

    }


    /* ======================================================
       MOSTRAR RESULTADOS
    ====================================================== */

    function mostrarResultados() {

        const busqueda = normalizarTexto(
            input.value
        );


        resultados.replaceChildren();


        if (!busqueda) {

            cerrarResultados();

            return;

        }


        /* ==================================================
           FILTRAR PACIENTES
        ================================================== */

        const encontrados = pacientesNuevaConsulta.filter(
            paciente => {

                const texto = normalizarTexto(
                    [
                        paciente.nombre,
                        paciente.folio,
                        paciente.telefono
                    ].join(" ")
                );

                return texto.includes(busqueda);

            }
        );


        /* ==================================================
           SIN RESULTADOS
        ================================================== */

        if (!encontrados.length) {

            const vacio = document.createElement(
                "div"
            );

            vacio.className =
                "new-consultation-search__empty";

            vacio.textContent =
                "No se encontraron pacientes.";

            resultados.appendChild(
                vacio
            );

        } else {

            /* ==============================================
               CONSTRUIR RESULTADOS
            ============================================== */

            encontrados.forEach(paciente => {

                const boton = document.createElement(
                    "button"
                );

                boton.type = "button";

                boton.className =
                    "new-consultation-search__result";


                /* ==========================================
                   NOMBRE DEL PACIENTE
                ========================================== */

                const nombre = document.createElement(
                    "span"
                );

                nombre.className =
                    "new-consultation-search__result-name";

                nombre.textContent =
                    paciente.nombre;


                /* ==========================================
                   FOLIO Y TELÉFONO
                ========================================== */

                const detalle = document.createElement(
                    "span"
                );

                detalle.className =
                    "new-consultation-search__result-detail";

                detalle.textContent =
                    `${paciente.folio} · ${paciente.telefono}`;


                boton.append(
                    nombre,
                    detalle
                );


                /* ==========================================
                   SELECCIONAR PACIENTE
                ========================================== */

                boton.addEventListener(
                    "click",
                    () => {

                        seleccionarPaciente(
                            paciente
                        );

                    }
                );


                resultados.appendChild(
                    boton
                );

            });

        }


        /* ==================================================
           ABRIR LISTA DE RESULTADOS
        ================================================== */

        resultados.hidden = false;

        input.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    /* ======================================================
       PRESELECCIONAR PACIENTE DESDE LA URL
    ====================================================== */

    function seleccionarPacienteDesdeURL() {

        const parametros = new URLSearchParams(
            window.location.search
        );

        const idSolicitado = parametros.get(
            "paciente"
        );


        /* --------------------------------------------------
           SIN IDENTIFICADOR
        -------------------------------------------------- */

        if (!idSolicitado) {
            return;
        }


        /* --------------------------------------------------
           VALIDAR IDENTIFICADOR
        -------------------------------------------------- */

        if (!/^\d+$/.test(idSolicitado)) {
            return;
        }


        /* --------------------------------------------------
           BUSCAR PACIENTE
        -------------------------------------------------- */

        const paciente = pacientesNuevaConsulta.find(
            item => String(item.id) === idSolicitado
        );


        /* --------------------------------------------------
           PACIENTE NO ENCONTRADO
        -------------------------------------------------- */

        if (!paciente) {
            return;
        }


        /* --------------------------------------------------
           SELECCIONAR PACIENTE
        -------------------------------------------------- */

        seleccionarPaciente(
            paciente
        );

    }


    /* ======================================================
       MODIFICAR BÚSQUEDA
    ====================================================== */

    input.addEventListener(
        "input",
        () => {

            /* ----------------------------------------------
               ELIMINAR SELECCIÓN ANTERIOR
            ---------------------------------------------- */

            delete input.dataset.pacienteId;

            input.setCustomValidity("");


            /* ----------------------------------------------
               OCULTAR FICHA ANTERIOR
            ---------------------------------------------- */

            ocultarPacienteNuevaConsulta();


            /* ----------------------------------------------
               ACTUALIZAR RESULTADOS
            ---------------------------------------------- */

            mostrarResultados();

        }
    );


    /* ======================================================
       TECLADO
    ====================================================== */

    input.addEventListener(
        "keydown",
        evento => {

            if (evento.key === "Escape") {

                cerrarResultados();

            }

        }
    );


    /* ======================================================
       CERRAR AL HACER CLIC FUERA
    ====================================================== */

    document.addEventListener(
        "click",
        evento => {

            if (
                !input.contains(evento.target)
                && !resultados.contains(evento.target)
            ) {

                cerrarResultados();

            }

        }
    );


    /* ======================================================
       INICIALIZAR PACIENTE DESDE HISTORIAL
    ====================================================== */

    seleccionarPacienteDesdeURL();

}
