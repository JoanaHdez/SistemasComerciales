
import {
    inicializarBuscadorPaciente
} from "./buscador.js";

import {
    obtenerClienteActual
} from "./clienteActual.js";

import {
    seleccionarPaciente
} from "./seleccion.js";

import {
    clientes
} from "./datos.js";

import {
    renderPaciente
} from "./render/paciente.js";

import {
    renderTimeline
} from "./render/timeline.js";

import {
    inicializarFiltrosHistorial
} from "./filtros.js";

import {
    inicializarModalConsulta
} from "./modal/modal.js";

import {
    inicializarDetalleConsultas
} from "./modal/consulta.js";

import {
    inicializarImpresionHistorial
} from "./impresion.js";


/* ==========================================================
   INICIALIZAR HISTORIAL CLÍNICO
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ==================================================
           INICIALIZAR COMPONENTES
        ================================================== */

        inicializarBuscadorPaciente();

        inicializarFiltrosHistorial();

        inicializarModalConsulta();

        inicializarDetalleConsultas();

        inicializarImpresionHistorial();


        /* ==================================================
           OBTENER PACIENTE DESDE URL
        ================================================== */

        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const idPaciente =
            parametros.get(
                "paciente"
            );


        if (
            idPaciente &&
            /^\d+$/.test(idPaciente)
        ) {

            const cliente =
                clientes.find(
                    (item) =>
                        String(item.id) === idPaciente
                );


            if (cliente) {

                const inputBusqueda =
                    document.getElementById(
                        "history-patient-search"
                    );


                if (inputBusqueda) {

                    seleccionarPaciente(
                        cliente,
                        inputBusqueda,
                        () => {

                            const resultados =
                                document.getElementById(
                                    "history-patient-search-results"
                                );


                            if (resultados) {

                                resultados.replaceChildren();

                                resultados.hidden = true;

                            }


                            inputBusqueda.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }
                    );


                    return;

                }

            }

        }


        /* ==================================================
           PACIENTE INICIAL
           Comportamiento habitual sin parámetro válido
        ================================================== */

        const cliente =
            obtenerClienteActual();


        if (!cliente) {
            return;
        }


        renderPaciente(cliente);

        renderTimeline(cliente);

    }
);
