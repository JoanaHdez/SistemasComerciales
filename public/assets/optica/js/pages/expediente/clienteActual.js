import {
    clientes,
} from "./datos.js";


/* ==========================================================
   CLIENTE ACTUAL DEL EXPEDIENTE
========================================================== */

let clienteActual =
    clientes[0] ?? null;


/* ==========================================================
   OBTENER CLIENTE ACTUAL
========================================================== */

export function obtenerClienteActual() {

    return clienteActual;

}


/* ==========================================================
   ESTABLECER CLIENTE ACTUAL
========================================================== */

export function establecerClienteActual(
    cliente,
) {

    if (!cliente) {
        return;
    }


    clienteActual =
        cliente;

}