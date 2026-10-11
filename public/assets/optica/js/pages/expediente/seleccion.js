import { establecerClienteActual } from "./clienteActual.js";

import { renderizarPaciente } from "./render/paciente.js";

import { renderizarDatosPaciente } from "./render/datosPaciente.js";

import { renderizarResumenClinico } from "./render/resumenClinico.js";

import { renderizarInformacionRelevante } from "./render/informacionRelevante.js";

import { renderizarGraduacion } from "./render/graduacion.js";

import { renderizarConsultas } from "./render/consultas.js";

/* ==========================================================
   SELECCIONAR CLIENTE
========================================================== */

export function seleccionarCliente(cliente, inputBusqueda, ocultarResultados) {
    if (!cliente || !inputBusqueda) {
        return;
    }

    /* ======================================================
         ESTABLECER CLIENTE ACTUAL
      ====================================================== */

    establecerClienteActual(cliente);

    /* ======================================================
     ACTUALIZAR ENLACE A NUEVA CONSULTA
  ====================================================== */

    const enlaceNuevaConsulta = document.getElementById(
        "expediente-nueva-consulta",
    );

    if (enlaceNuevaConsulta) {
        const url = new URL(enlaceNuevaConsulta.href);

        if (cliente.id != null) {
            url.searchParams.set("paciente", String(cliente.id));
        } else {
            url.searchParams.delete("paciente");
        }

        enlaceNuevaConsulta.href = url.toString();
    }

    /* ======================================================
         ACTUALIZAR BUSCADOR
      ====================================================== */

    inputBusqueda.value = cliente.nombre;

    inputBusqueda.dataset.clientId = cliente.id;

    /* ======================================================
         CERRAR RESULTADOS
      ====================================================== */

    ocultarResultados();

    /* ======================================================
         ACTUALIZAR EXPEDIENTE
      ====================================================== */

    renderizarPaciente(cliente);

    renderizarDatosPaciente(cliente);

    renderizarResumenClinico(cliente);

    renderizarInformacionRelevante(cliente);

    renderizarGraduacion(cliente);

    renderizarConsultas(cliente);

    /* ======================================================
         COMPROBACIÓN TEMPORAL
      ====================================================== */

    console.log("Cliente seleccionado en Expediente:", cliente);
}
