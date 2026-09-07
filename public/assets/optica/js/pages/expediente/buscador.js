import {
    clientes,
} from "./datos.js";


import {
    normalizarTexto,
    obtenerIniciales,
} from "./utilidades.js";


import {
    seleccionarCliente,
} from "./seleccion.js";


/* ==========================================================
   INICIALIZAR BUSCADOR DEL EXPEDIENTE
========================================================== */

export function inicializarBuscadorExpediente() {

    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const formulario =
        document.getElementById(
            "expediente-search-form",
        );


    const inputBusqueda =
        document.getElementById(
            "expediente-cliente",
        );


    const resultadosContenedor =
        document.getElementById(
            "expediente-search-results",
        );


    if (
        !formulario ||
        !inputBusqueda ||
        !resultadosContenedor
    ) {

        console.error(
            "No se encontraron los elementos del buscador del Expediente.",
        );

        return;

    }


    /* ======================================================
       OCULTAR RESULTADOS
    ====================================================== */

    function ocultarResultados() {

        resultadosContenedor.hidden =
            true;


        resultadosContenedor.innerHTML =
            "";


        inputBusqueda.setAttribute(
            "aria-expanded",
            "false",
        );

    }


    /* ======================================================
       MOSTRAR RESULTADOS
    ====================================================== */

    function mostrarResultados(
        clientesEncontrados,
    ) {

        resultadosContenedor.innerHTML =
            "";


        /* --------------------------------------------------
           Sin resultados
        -------------------------------------------------- */

        if (
            clientesEncontrados.length === 0
        ) {

            resultadosContenedor.innerHTML = `
                <div class="clinical-record-search-empty">

                    <strong>
                        No se encontraron clientes
                    </strong>

                    <span>
                        Intenta buscar por nombre,
                        teléfono, correo o folio.
                    </span>

                </div>
            `;


            resultadosContenedor.hidden =
                false;


            inputBusqueda.setAttribute(
                "aria-expanded",
                "true",
            );


            return;

        }


        /* --------------------------------------------------
           Resultados encontrados
        -------------------------------------------------- */

        clientesEncontrados.forEach(
            (cliente) => {

                const boton =
                    document.createElement(
                        "button",
                    );


                boton.type =
                    "button";


                boton.className =
                    "clinical-record-search-result";


                boton.dataset.clientId =
                    cliente.id;


                const iniciales =
                    obtenerIniciales(
                        cliente.nombre,
                    );


                boton.innerHTML = `
                    <span
                        class="clinical-record-search-result__avatar"
                    >
                        ${iniciales}
                    </span>

                    <span
                        class="clinical-record-search-result__content"
                    >

                        <strong>
                            ${cliente.nombre}
                        </strong>

                        <small>
                            ${cliente.folio}
                            · ${cliente.telefono}
                        </small>

                        <small>
                            ${cliente.correo}
                        </small>

                    </span>
                `;


                boton.addEventListener(
                    "click",
                    () => {

                        seleccionarCliente(
                            cliente,
                            inputBusqueda,
                            ocultarResultados,
                        );

                    },
                );


                resultadosContenedor
                    .appendChild(
                        boton,
                    );

            },
        );


        resultadosContenedor.hidden =
            false;


        inputBusqueda.setAttribute(
            "aria-expanded",
            "true",
        );

    }


    /* ======================================================
       BUSCAR CLIENTES
    ====================================================== */

    function buscarClientes() {

        const termino =
            normalizarTexto(
                inputBusqueda.value,
            );


        if (!termino) {

            ocultarResultados();

            return;

        }


        const encontrados =
            clientes.filter(
                (cliente) => {

                    const nombre =
                        normalizarTexto(
                            cliente.nombre,
                        );


                    const telefono =
                        normalizarTexto(
                            cliente.telefono,
                        );


                    const correo =
                        normalizarTexto(
                            cliente.correo,
                        );


                    const folio =
                        normalizarTexto(
                            cliente.folio,
                        );


                    return (
                        nombre.includes(termino) ||
                        telefono.includes(termino) ||
                        correo.includes(termino) ||
                        folio.includes(termino)
                    );

                },
            );


        mostrarResultados(
            encontrados,
        );

    }


    /* ======================================================
       EVENTOS
    ====================================================== */

    inputBusqueda.addEventListener(
        "input",
        buscarClientes,
    );


    formulario.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            buscarClientes();

        },
    );


    /*
     * Cerrar resultados al hacer clic fuera.
     */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !formulario.contains(
                    event.target,
                )
            ) {

                ocultarResultados();

            }

        },
    );

}