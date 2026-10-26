
/* ==========================================================
   OPTICOOL
   Nueva cita - Almacenamiento temporal

   Permite compartir citas simuladas entre Nueva cita
   y Agenda durante la sesión de la pestaña.

   No utiliza base de datos.
========================================================== */

const CLAVE_CITAS = "opticool_citas_simuladas";


/* ==========================================================
   OBTENER CITAS SIMULADAS
========================================================== */

export function obtenerCitasGuardadas() {

    try {

        const datos = sessionStorage.getItem(
            CLAVE_CITAS
        );

        if (!datos) {
            return [];
        }

        const citas = JSON.parse(datos);

        return Array.isArray(citas)
            ? citas
            : [];

    } catch (error) {

        console.error(
            "No fue posible leer las citas simuladas:",
            error
        );

        return [];

    }

}


/* ==========================================================
   GUARDAR NUEVA CITA SIMULADA
========================================================== */

export function guardarCitaSimulada(datos) {

    try {

        const citas = obtenerCitasGuardadas();

        const cita = {

            ...datos,

            id: crypto.randomUUID(),

            estado: "Confirmada",

            fechaRegistro: new Date().toISOString()

        };

        citas.push(cita);

        sessionStorage.setItem(
            CLAVE_CITAS,
            JSON.stringify(citas)
        );

        return {
            exito: true,
            cita
        };

    } catch (error) {

        console.error(
            "No fue posible guardar la cita simulada:",
            error
        );

        return {
            exito: false,
            cita: null
        };

    }

}

/* ==========================================================
   ACTUALIZAR CITA SIMULADA

   Permite modificar una cita existente conservando:
   - Su identificador original
   - Su fecha de registro
   - Los demás datos que no se modificaron
========================================================== */

export function actualizarCitaSimulada(idCita, cambios = {}) {

    try {

        const citas = obtenerCitasGuardadas();

        const indice = citas.findIndex(
            (cita) => String(cita.id) === String(idCita)
        );

        if (indice === -1) {

            return {
                exito: false,
                cita: null,
                mensaje: "No se encontró la cita."
            };

        }

        const citaOriginal = citas[indice];

        const citaActualizada = {
            ...citaOriginal,
            ...cambios,

            // Estos datos no deben modificarse.
            id: citaOriginal.id,
            fechaRegistro: citaOriginal.fechaRegistro,

            fechaActualizacion: new Date().toISOString()
        };

        citas[indice] = citaActualizada;

        sessionStorage.setItem(
            "opticool_citas_simuladas",
            JSON.stringify(citas)
        );

        return {
            exito: true,
            cita: citaActualizada,
            mensaje: "Cita actualizada correctamente."
        };

    } catch (error) {

        console.error(
            "Error al actualizar la cita simulada:",
            error
        );

        return {
            exito: false,
            cita: null,
            mensaje: "No fue posible actualizar la cita."
        };

    }

}