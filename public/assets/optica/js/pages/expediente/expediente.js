import {
    inicializarBuscadorExpediente,
} from "./buscador.js";


import {
    inicializarEdicionExpediente,
} from "./edicion.js";


import {
    inicializarModalConsulta,
} from "./modal/modal.js";


import {
    inicializarDetalleConsultas,
} from "./modal/consulta.js";


import {
    seleccionarCliente,
} from "./seleccion.js";


import {
    clientes,
} from "./datos.js";


/* ==========================================================
   EXPEDIENTE CLÍNICO
   Coordinador principal
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarBuscadorExpediente();

        inicializarEdicionExpediente();

        inicializarModalConsulta();

        inicializarDetalleConsultas();


        /* ==================================================
           SELECCIONAR PACIENTE DESDE URL
        ================================================== */

        const parametros =
            new URLSearchParams(
                window.location.search,
            );


        const idPaciente =
            parametros.get(
                "paciente",
            );


        if (
            !idPaciente ||
            !/^\d+$/.test(idPaciente)
        ) {
            return;
        }


        const cliente =
            clientes.find(
                (item) =>
                    String(item.id) === idPaciente,
            );


        if (!cliente) {
            return;
        }


        const inputBusqueda =
            document.getElementById(
                "expediente-cliente",
            );


        if (!inputBusqueda) {
            return;
        }


        seleccionarCliente(
            cliente,
            inputBusqueda,
            () => {

                const resultados =
                    document.getElementById(
                        "expediente-search-results",
                    );


                if (resultados) {

                    resultados.hidden = true;

                    resultados.replaceChildren();

                }

            },
        );

    },
);