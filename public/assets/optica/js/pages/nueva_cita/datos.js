
/* ==========================================================
   OPTICOOL
   Página: Nueva cita
   Datos simulados de pacientes

   Estos datos son exclusivos del frontend.
   Posteriormente serán proporcionados por el backend.
========================================================== */

export const pacientes = [

    {
        id: 24,
        folio: "CLI-0001",
        nombre: "María López Hernández",
        telefono: "55 1234 5678",
        correo: "maria@example.com"
    },

    {
        id: 25,
        folio: "CLI-0002",
        nombre: "Carlos Martínez Ruiz",
        telefono: "55 8765 4321",
        correo: "carlos@example.com"
    },

    {
        id: 26,
        folio: "CLI-0003",
        nombre: "Ana López García",
        telefono: "55 3344 7788",
        correo: "ana@example.com"
    }

];


/* ==========================================================
   BUSCAR PACIENTES

   Permite buscar por:
   - Nombre
   - Teléfono
   - Correo
   - Folio
========================================================== */

export function buscarPacientes(termino) {

    const normalizar = (valor) => {

        return String(valor ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();

    };

    const busqueda = normalizar(termino);

    if (!busqueda) {
        return [];
    }

    return pacientes.filter((paciente) => {

        return [
            paciente.nombre,
            paciente.telefono,
            paciente.correo,
            paciente.folio
        ].some((valor) => {

            return normalizar(valor).includes(busqueda);

        });

    });

}


/* ==========================================================
   OBTENER PACIENTE POR ID
========================================================== */

export function obtenerPacientePorId(id) {

    return pacientes.find((paciente) => {

        return String(paciente.id) === String(id);

    }) || null;

}



/* ==========================================================
   OPTICOOL
   NUEVA CITA - DISPONIBILIDAD SIMULADA

   Datos exclusivos del frontend.
   El backend proporcionará posteriormente los horarios
   reales, responsables y citas ocupadas.
========================================================== */


/* ==========================================================
   RESPONSABLES SIMULADOS
========================================================== */

export const responsables = [

    {
        id: 1,
        nombre: "Dra. Laura Gómez"
    },

    {
        id: 2,
        nombre: "Dr. Carlos Mendoza"
    }

];


/* ==========================================================
   HORARIOS SIMULADOS

   Esta configuración es únicamente para pruebas.
   No representa una restricción definitiva del sistema.
========================================================== */

export const configuracionHorarios = {

    horaInicio: "09:00",

    horaFin: "18:00",

    intervaloMinutos: 30

};


/* ==========================================================
   GENERAR HORARIOS SIMULADOS
========================================================== */

export function generarHorariosSimulados() {

    const {
        horaInicio,
        horaFin,
        intervaloMinutos
    } = configuracionHorarios;

    const convertirAMinutos = (hora) => {

        const [horas, minutos] = hora
            .split(":")
            .map(Number);

        return horas * 60 + minutos;

    };

    const convertirAHora = (minutosTotales) => {

        const horas = Math.floor(
            minutosTotales / 60
        );

        const minutos = minutosTotales % 60;

        return [
            String(horas).padStart(2, "0"),
            String(minutos).padStart(2, "0")
        ].join(":");

    };

    const inicio = convertirAMinutos(
        horaInicio
    );

    const fin = convertirAMinutos(
        horaFin
    );

    const horarios = [];

    for (
        let minuto = inicio;
        minuto + intervaloMinutos <= fin;
        minuto += intervaloMinutos
    ) {

        horarios.push(
            convertirAHora(minuto)
        );

    }

    return horarios;

}


/* ==========================================================
   CITAS OCUPADAS SIMULADAS

   Las fechas son relativas para facilitar las pruebas.
   No se guardan en una base de datos.
========================================================== */

function obtenerFechaSimulada(diasAdicionales = 0) {

    const fecha = new Date();

    fecha.setDate(
        fecha.getDate() + diasAdicionales
    );

    const anio = fecha.getFullYear();

    const mes = String(
        fecha.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        fecha.getDate()
    ).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;

}


export const citasOcupadasSimuladas = [

    {
        fecha: obtenerFechaSimulada(1),
        responsableId: 1,
        hora: "10:00"
    },

    {
        fecha: obtenerFechaSimulada(1),
        responsableId: 1,
        hora: "11:30"
    },

    {
        fecha: obtenerFechaSimulada(1),
        responsableId: 2,
        hora: "12:00"
    },

    {
        fecha: obtenerFechaSimulada(2),
        responsableId: 1,
        hora: "16:00"
    }

];


/* ==========================================================
   CONSULTAR DISPONIBILIDAD SIMULADA
========================================================== */

export function obtenerDisponibilidadSimulada(
    fecha,
    responsableId
) {

    if (!fecha || !responsableId) {
        return [];
    }

    const horarios = generarHorariosSimulados();

    return horarios.map((hora) => {

        const ocupado = citasOcupadasSimuladas.some(
            (cita) => {

                return (
                    cita.fecha === fecha &&
                    String(cita.responsableId) ===
                        String(responsableId) &&
                    cita.hora === hora
                );

            }
        );

        return {

            hora,

            disponible: !ocupado

        };

    });

}
