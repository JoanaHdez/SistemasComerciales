/* ==========================================================
   MODOS DEL EXPEDIENTE
========================================================== */

export const MODOS_EXPEDIENTE = {
    VER: "view",
    EDITAR_TODO: "edit-all",
    EDITAR_INFORMACION: "edit-info",
    EDITAR_HISTORIAL: "edit-clinical",
};


/* ==========================================================
   ESTADO ACTUAL

   Por ahora el Expediente siempre inicia en modo lectura.

   Más adelante este valor podrá establecerse dependiendo
   de la pantalla desde la que se abra el Expediente.
========================================================== */

let modoActual =
    MODOS_EXPEDIENTE.VER;


/* ==========================================================
   OBTENER MODO
========================================================== */

export function obtenerModoExpediente() {

    return modoActual;

}


/* ==========================================================
   CAMBIAR MODO
========================================================== */

export function establecerModoExpediente(
    nuevoModo,
) {

    if (
        !Object.values(
            MODOS_EXPEDIENTE,
        ).includes(
            nuevoModo,
        )
    ) {

        console.error(
            "Modo de Expediente no válido:",
            nuevoModo,
        );

        return false;

    }


    modoActual =
        nuevoModo;


    return true;

}