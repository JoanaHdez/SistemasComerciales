/* ==========================================================
   UTILIDADES
========================================================== */


/* ==========================================================
   NORMALIZAR TEXTO
========================================================== */

export function normalizarTexto(texto) {

    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


/* ==========================================================
   OBTENER INICIALES
========================================================== */

export function obtenerIniciales(nombre) {

    const partes = String(nombre)
        .trim()
        .split(/\s+/)
        .filter(Boolean);


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