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
   INICIALIZAR BUSCADOR
========================================================== */

export function inicializarBuscadorConsulta() {

    const formulario =
        document.getElementById(
            "consulta-search-form",
        );


    const inputBusqueda =
        document.getElementById(
            "consulta-cliente",
        );


    const resultadosContenedor =
        document.getElementById(
            "consulta-search-results",
        );


    if (
        !formulario ||
        !inputBusqueda ||
        !resultadosContenedor
    ) {

        console.error(
            "No se encontraron los elementos del buscador de Consulta.",
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

    }


    /* ======================================================
       MOSTRAR RESULTADOS
    ====================================================== */

    function mostrarResultados(
        clientesEncontrados,
    ) {

        resultadosContenedor.innerHTML =
            "";


        if (
            clientesEncontrados.length === 0
        ) {

            resultadosContenedor.innerHTML = `
                <div class="consulta-search-empty">

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


            return;

        }


        clientesEncontrados.forEach(
            (cliente) => {

                const boton =
                    document.createElement(
                        "button",
                    );


                boton.type =
                    "button";


                boton.className =
                    "consulta-search-result";


                boton.dataset.clientId =
                    cliente.id;


                const iniciales =
                    obtenerIniciales(
                        cliente.nombre,
                    );


                boton.innerHTML = `
                    <span
                        class="consulta-search-result__avatar"
                    >
                        ${iniciales}
                    </span>

                    <span
                        class="consulta-search-result__content"
                    >

                        <strong>
                            ${cliente.nombre}
                        </strong>

                        <small>
                            Cliente #${cliente.folio}
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


                resultadosContenedor.appendChild(
                    boton,
                );

            },
        );


        resultadosContenedor.hidden =
            false;

    }


    /* ======================================================
       BUSCAR
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