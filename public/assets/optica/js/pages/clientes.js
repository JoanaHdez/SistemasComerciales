document.addEventListener("DOMContentLoaded", () => {
    const inputBusqueda = document.getElementById("client-search");

    const botonBuscar = document.querySelector(".clients-search__button");

    const filasClientes = document.querySelectorAll(".clients-table tbody tr");

    const cuerpoTabla = document.querySelector(".clients-table tbody");

    if (!inputBusqueda || !botonBuscar || !cuerpoTabla) {
        console.error("No se encontraron los elementos del buscador de clientes.");

        return;
    }

    /* ==========================================================
         Normalizar texto
      ========================================================== */

    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    /* ==========================================================
         Filtrar clientes
      ========================================================== */

    function buscarClientes() {
        const termino = normalizarTexto(inputBusqueda.value);

        let resultados = 0;

        filasClientes.forEach((fila) => {
            const celdas = fila.querySelectorAll("td");

            const nombre = normalizarTexto(celdas[1]?.textContent ?? "");

            const telefono = normalizarTexto(celdas[2]?.textContent ?? "");

            const correo = normalizarTexto(celdas[3]?.textContent ?? "");

            const coincide =
                termino === "" ||
                nombre.includes(termino) ||
                telefono.includes(termino) ||
                correo.includes(termino);

            fila.hidden = !coincide;

            if (coincide) {
                resultados++;
            }
        });

        mostrarEstadoResultados(resultados, termino);
    }

    /* ==========================================================
         Estado sin resultados
      ========================================================== */

    function mostrarEstadoResultados(resultados, termino) {
        const estadoAnterior = cuerpoTabla.querySelector(".clients-table__empty");

        estadoAnterior?.remove();

        if (resultados > 0 || termino === "") {
            return;
        }

        const filaVacia = document.createElement("tr");

        filaVacia.className = "clients-table__empty";

        filaVacia.innerHTML = `
            <td colspan="7">
                <div class="clients-empty-search">

                    <strong>
                        No se encontraron clientes
                    </strong>

                    <span>
                        Intenta buscar por otro nombre,
                        teléfono o correo.
                    </span>

                </div>
            </td>
        `;

        cuerpoTabla.appendChild(filaVacia);
    }

    /* ==========================================================
         Eventos
      ========================================================== */

    botonBuscar.addEventListener("click", buscarClientes);

    inputBusqueda.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            buscarClientes();
        }
    });

    /* ==========================================================
     Búsqueda en tiempo real
  ========================================================== */

    inputBusqueda.addEventListener("input", () => {
        buscarClientes();
    });
});
