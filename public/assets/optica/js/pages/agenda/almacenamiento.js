const CLAVE_CAMBIOS_AGENDA =
    "opticool_agenda_cambios_simulados";


export function recuperarCambiosAgenda() {

    try {

        const datos = sessionStorage.getItem(
            CLAVE_CAMBIOS_AGENDA
        );

        if (!datos) {
            return new Map();
        }

        const cambios = JSON.parse(datos);

        if (!Array.isArray(cambios)) {
            return new Map();
        }

        return new Map(cambios);

    } catch (error) {

        console.error(
            "Error al recuperar cambios de Agenda:",
            error
        );

        return new Map();

    }

}


export function guardarCambiosAgenda(cambiosCitas) {

    try {

        sessionStorage.setItem(
            CLAVE_CAMBIOS_AGENDA,
            JSON.stringify(
                Array.from(cambiosCitas.entries())
            )
        );

        return true;

    } catch (error) {

        console.error(
            "Error al guardar cambios de Agenda:",
            error
        );

        return false;

    }

}
