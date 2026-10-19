
/* ==========================================================
   PACIENTES SIMULADOS - NUEVA CONSULTA

   Datos unificados provisionalmente con Expediente clínico.

   Posteriormente serán proporcionados por el backend.
========================================================== */

export const pacientesNuevaConsulta = [

    /* ======================================================
       MARÍA LÓPEZ HERNÁNDEZ
    ====================================================== */

    {
        id: 24,
        folio: "CLI-0001",
        nombre: "María López Hernández",
        edad: 34,
        telefono: "55 1234 5678",

        graduacionVigente: "OD -1.75 / OI -2.00",

        graduacionDetalle: {

            oi: {
                esfera: "-2.00",
                cilindro: "-0.75",
                eje: "85"
            },

            od: {
                esfera: "-1.75",
                cilindro: "-0.50",
                eje: "90"
            },

            adicion: "1.00",
            distanciaOcular: "62"

        }
    },


    /* ======================================================
       CARLOS MARTÍNEZ RUIZ
    ====================================================== */

    {
        id: 25,
        folio: "CLI-0002",
        nombre: "Carlos Martínez Ruiz",
        edad: 41,
        telefono: "55 8765 4321",

        graduacionVigente: "OD +1.25 / OI +1.50",

        graduacionDetalle: {

            oi: {
                esfera: "+1.50",
                cilindro: "-0.50",
                eje: "95"
            },

            od: {
                esfera: "+1.25",
                cilindro: "-0.25",
                eje: "80"
            },

            adicion: "1.75",
            distanciaOcular: "64"

        }
    },


    /* ======================================================
       ANA LÓPEZ GARCÍA
    ====================================================== */

    {
        id: 26,
        folio: "CLI-0003",
        nombre: "Ana López García",
        edad: 28,
        telefono: "55 3344 7788",

        graduacionVigente: "OD 0.00 / -1.00 / OI 0.00 / -1.25",

        graduacionDetalle: {

            oi: {
                esfera: "0.00",
                cilindro: "-1.25",
                eje: "80"
            },

            od: {
                esfera: "0.00",
                cilindro: "-1.00",
                eje: "100"
            },

            adicion: "0.00",
            distanciaOcular: "61"

        }
    }

];
