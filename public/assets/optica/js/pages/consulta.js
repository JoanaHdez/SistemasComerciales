document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       Elementos
    ========================================================== */

    const formulario = document.getElementById(
        "consulta-search-form",
    );

    const inputBusqueda = document.getElementById(
        "consulta-cliente",
    );

    const resultadosContenedor = document.getElementById(
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


    /* ==========================================================
       Datos simulados

       Posteriormente estos datos serán proporcionados
       por el backend.
    ========================================================== */

    const clientes = [
        {
            id: 24,
            folio: "00024",
            nombre: "María Fernanda López Hernández",
            telefono: "55 1234 5678",
            correo: "maria@example.com",
        },
        {
            id: 25,
            folio: "00025",
            nombre: "Carlos Martínez Ruiz",
            telefono: "55 8765 4321",
            correo: "carlos@example.com",
        },
        {
            id: 26,
            folio: "00026",
            nombre: "Ana López García",
            telefono: "55 3344 7788",
            correo: "ana@example.com",
        },
    ];


    /* ==========================================================
       Normalizar texto
    ========================================================== */

    function normalizarTexto(texto) {

        return String(texto)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }


    /* ==========================================================
       Ocultar resultados
    ========================================================== */

    function ocultarResultados() {

        resultadosContenedor.hidden = true;
        resultadosContenedor.innerHTML = "";

        inputBusqueda.setAttribute(
            "aria-expanded",
            "false",
        );
    }


    /* ==========================================================
       Renderizar resultados
    ========================================================== */

    function mostrarResultados(clientesEncontrados) {

        resultadosContenedor.innerHTML = "";


        if (clientesEncontrados.length === 0) {

            resultadosContenedor.innerHTML = `
                <div class="consulta-search-empty">

                    <strong>
                        No se encontraron clientes
                    </strong>

                    <span>
                        Intenta buscar por nombre,
                        teléfono, correo o número de cliente.
                    </span>

                </div>
            `;

            resultadosContenedor.hidden = false;

            inputBusqueda.setAttribute(
                "aria-expanded",
                "true",
            );

            return;
        }


        clientesEncontrados.forEach((cliente) => {

            const boton =
                document.createElement("button");

            boton.type = "button";

            boton.className =
                "consulta-search-result";

            boton.dataset.clientId =
                cliente.id;


            const iniciales =
                obtenerIniciales(
                    cliente.nombre,
                );


            boton.innerHTML = `
                <span class="consulta-search-result__avatar">
                    ${iniciales}
                </span>

                <span class="consulta-search-result__content">

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
                    );
                },
            );


            resultadosContenedor.appendChild(
                boton,
            );
        });


        resultadosContenedor.hidden = false;

        inputBusqueda.setAttribute(
            "aria-expanded",
            "true",
        );
    }


    /* ==========================================================
       Buscar clientes
    ========================================================== */

    function buscarClientes() {

        const termino =
            normalizarTexto(
                inputBusqueda.value,
            );


        if (!termino) {

            ocultarResultados();

            return;
        }


        const clientesEncontrados =
            clientes.filter((cliente) => {

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
            });


        mostrarResultados(
            clientesEncontrados,
        );
    }


    /* ==========================================================
       Seleccionar cliente

       Por ahora solo comprobamos la selección.
       En el siguiente paso esta función actualizará
       toda la pantalla de Consulta.
    ========================================================== */

    function seleccionarCliente(cliente) {

        inputBusqueda.value =
            cliente.nombre;

        inputBusqueda.dataset.clientId =
            cliente.id;

        ocultarResultados();


        console.log(
            "Cliente seleccionado:",
            cliente,
        );
    }


    /* ==========================================================
       Obtener iniciales
    ========================================================== */

    function obtenerIniciales(nombre) {

        const partes =
            nombre
                .trim()
                .split(/\s+/);


        if (partes.length === 0) {
            return "";
        }


        if (partes.length === 1) {
            return partes[0]
                .charAt(0)
                .toUpperCase();
        }


        return (
            partes[0].charAt(0) +
            partes[1].charAt(0)
        ).toUpperCase();
    }


    /* ==========================================================
       Eventos
    ========================================================== */

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

});