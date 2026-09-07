import {
    clientes,
} from "./datos.js";


import {
    normalizarTexto,
} from "./utilidades.js";


import {
    seleccionarPaciente,
} from "./seleccion.js";


/* ==========================================================
   INICIALIZAR BUSCADOR DE PACIENTE
========================================================== */

export function inicializarBuscadorPaciente() {

    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const formulario =
        document.getElementById(
            "history-patient-search-form",
        );


    const input =
        document.getElementById(
            "history-patient-search",
        );


    const resultados =
        document.getElementById(
            "history-patient-search-results",
        );


    if (
        !formulario ||
        !input ||
        !resultados
    ) {

        console.error(
            "No se encontraron los elementos del buscador de pacientes.",
        );

        return;

    }


    /* ======================================================
       OCULTAR RESULTADOS
    ====================================================== */

    function ocultarResultados() {

        resultados.innerHTML =
            "";


        resultados.hidden =
            true;


        input.setAttribute(
            "aria-expanded",
            "false",
        );

    }


    /* ======================================================
       OBTENER INICIALES
    ====================================================== */

    function obtenerIniciales(
        nombre,
    ) {

        const partes =
            String(
                nombre ?? "",
            )
                .trim()
                .split(/\s+/)
                .filter(Boolean);


        if (
            partes.length === 0
        ) {

            return "";

        }


        if (
            partes.length === 1
        ) {

            return partes[0]
                .charAt(0)
                .toUpperCase();

        }


        return (
            partes[0].charAt(0) +
            partes[1].charAt(0)
        ).toUpperCase();

    }


    /* ======================================================
       BUSCAR PACIENTES
    ====================================================== */

    function buscarPacientes(
        termino,
    ) {

        const busqueda =
            normalizarTexto(
                termino,
            );


        if (!busqueda) {

            return [];

        }


        return clientes.filter(
            (cliente) => {

                const valores = [

                    cliente.nombre,

                    cliente.telefono,

                    cliente.correo,

                    cliente.folio,

                ];


                return valores.some(
                    (valor) => {

                        return normalizarTexto(
                            valor,
                        ).includes(
                            busqueda,
                        );

                    },
                );

            },
        );

    }


    /* ======================================================
       CREAR RESULTADO
    ====================================================== */

    function crearResultado(
        cliente,
    ) {

        const boton =
            document.createElement(
                "button",
            );


        boton.type =
            "button";


        boton.className =
            "history-patient-search-result";


        boton.dataset.clientId =
            cliente.id;


        const iniciales =
            obtenerIniciales(
                cliente.nombre,
            );


        boton.innerHTML = `
            <span
                class="history-patient-search-result__avatar"
            >
                ${iniciales}
            </span>

            <span
                class="history-patient-search-result__content"
            >

                <strong>
                    ${cliente.nombre}
                </strong>

                <small>
                    ${cliente.folio}
                    ·
                    ${cliente.telefono}
                </small>

                <small>
                    ${cliente.correo}
                </small>

            </span>
        `;


        boton.addEventListener(
            "click",
            () => {

                seleccionarPaciente(
                    cliente,
                    input,
                    ocultarResultados,
                );

            },
        );


        return boton;

    }


    /* ======================================================
       MOSTRAR RESULTADOS
    ====================================================== */

    function mostrarResultados(
        coincidencias,
    ) {

        resultados.innerHTML =
            "";


        /* --------------------------------------------------
           SIN RESULTADOS
        -------------------------------------------------- */

        if (
            coincidencias.length === 0
        ) {

            const vacio =
                document.createElement(
                    "div",
                );


            vacio.className =
                "history-patient-search-result__empty";


            vacio.innerHTML = `
                <strong>
                    No se encontraron pacientes
                </strong>

                <span>
                    Intenta buscar por nombre,
                    teléfono, correo o folio.
                </span>
            `;


            resultados.appendChild(
                vacio,
            );


            resultados.hidden =
                false;


            input.setAttribute(
                "aria-expanded",
                "true",
            );


            return;

        }


        /* --------------------------------------------------
           RESULTADOS ENCONTRADOS
        -------------------------------------------------- */

        coincidencias.forEach(
            (cliente) => {

                const resultado =
                    crearResultado(
                        cliente,
                    );


                resultados.appendChild(
                    resultado,
                );

            },
        );


        resultados.hidden =
            false;


        input.setAttribute(
            "aria-expanded",
            "true",
        );

    }


    /* ======================================================
       BUSCAR MIENTRAS ESCRIBE
    ====================================================== */

    input.addEventListener(
        "input",
        () => {

            /*
             * Si el usuario modifica manualmente
             * el texto, eliminamos la selección previa.
             */

            delete input.dataset.clientId;


            const termino =
                input.value;


            if (
                !termino.trim()
            ) {

                ocultarResultados();

                return;

            }


            const coincidencias =
                buscarPacientes(
                    termino,
                );


            mostrarResultados(
                coincidencias,
            );

        },
    );


    /* ======================================================
       FORMULARIO / ENTER / BOTÓN BUSCAR
    ====================================================== */

    formulario.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            const termino =
                input.value;


            if (
                !termino.trim()
            ) {

                ocultarResultados();

                return;

            }


            const coincidencias =
                buscarPacientes(
                    termino,
                );


            /*
             * Si solamente existe una coincidencia,
             * seleccionamos directamente al paciente.
             */

            if (
                coincidencias.length === 1
            ) {

                seleccionarPaciente(
                    coincidencias[0],
                    input,
                    ocultarResultados,
                );


                return;

            }


            mostrarResultados(
                coincidencias,
            );

        },
    );


    /* ======================================================
       CERRAR AL HACER CLICK FUERA
    ====================================================== */

    document.addEventListener(
        "click",
        (evento) => {

            if (
                formulario.contains(
                    evento.target,
                )
            ) {

                return;

            }


            ocultarResultados();

        },
    );


    /* ======================================================
       CERRAR CON ESC
    ====================================================== */

    input.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key !== "Escape"
            ) {

                return;

            }


            ocultarResultados();

        },
    );

}