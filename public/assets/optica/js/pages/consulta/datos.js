/* ==========================================================
   DATOS SIMULADOS DE CLIENTES

   Estos datos existen únicamente para desarrollar
   y probar el frontend.

   Posteriormente serán sustituidos por información
   proporcionada por el backend.

   IMPORTANTE:
   historialClinico representa un RESUMEN de la información
   proveniente del historial completo del cliente.
========================================================== */

export const clientes = [

    /* ======================================================
       MARÍA
    ====================================================== */

    {
        id: 24,
        folio: "00024",

        nombre:
            "María Fernanda López Hernández",

        telefono:
            "55 1234 5678",

        correo:
            "maria@example.com",


        /* --------------------------------------------------
           Resumen
        -------------------------------------------------- */

        resumen: {

            ultimaConsulta:
                "15/07/2026",

        },


        /* --------------------------------------------------
           Datos personales
        -------------------------------------------------- */

        datosPersonales: {

            fechaNacimiento:
                "18 de marzo de 1992",

            edad:
                "34 años",

            ocupacion:
                "Diseñadora gráfica",

            fechaRegistro:
                "10 de enero de 2026",

            direccion:
                "Av. Principal 125, Col. Centro, Nezahualcóyotl, Estado de México",

        },


        /* --------------------------------------------------
           Historial clínico

           Resumen proveniente del historial completo.
        -------------------------------------------------- */

        historialClinico: {

            usoActual: {
                valor:
                    "Sí, lentes monofocales",

                detalle:
                    "Uso aproximado de 8 horas al día.",
            },

            usoAnterior: {
                valor:
                    "Desde hace 6 años",

                detalle:
                    "Último cambio realizado en enero de 2025.",
            },

            exposicionLaboral: {
                valor:
                    "Pantallas digitales",

                detalle:
                    "Exposición aproximada de 7 horas diarias.",
            },

            antecedentesPatologicos: {
                valor:
                    "Ninguno registrado",

                detalle:
                    "La cliente no reporta antecedentes relevantes.",
            },

            antecedentesVisuales: {
                valor:
                    "Miopía y astigmatismo",

                detalle:
                    "Sin cirugías oculares registradas.",
            },

            diagnosticoActual: {
                valor:
                    "Miopía compuesta",

                detalle:
                    "Se recomienda actualizar la graduación y mantener revisión anual.",
            },

        },

    },


    /* ======================================================
       CARLOS
    ====================================================== */

    {
        id: 25,
        folio: "00025",

        nombre:
            "Carlos Martínez Ruiz",

        telefono:
            "55 8765 4321",

        correo:
            "carlos@example.com",


        /* --------------------------------------------------
           Resumen
        -------------------------------------------------- */

        resumen: {

            ultimaConsulta:
                "08/06/2026",

        },


        /* --------------------------------------------------
           Datos personales
        -------------------------------------------------- */

        datosPersonales: {

            fechaNacimiento:
                "7 de noviembre de 1987",

            edad:
                "38 años",

            ocupacion:
                "Contador",

            fechaRegistro:
                "22 de febrero de 2026",

            direccion:
                "Calle Reforma 82, Col. Metropolitana, Nezahualcóyotl, Estado de México",

        },


        /* --------------------------------------------------
           Historial clínico
        -------------------------------------------------- */

        historialClinico: {

            usoActual: {
                valor:
                    "Sí, lentes bifocales",

                detalle:
                    "Uso habitual durante la jornada laboral.",
            },

            usoAnterior: {
                valor:
                    "Desde hace 10 años",

                detalle:
                    "Ha utilizado diferentes graduaciones.",
            },

            exposicionLaboral: {
                valor:
                    "Pantallas y lectura prolongada",

                detalle:
                    "Exposición aproximada de 6 horas diarias.",
            },

            antecedentesPatologicos: {
                valor:
                    "Hipertensión",

                detalle:
                    "Antecedente registrado en expediente.",
            },

            antecedentesVisuales: {
                valor:
                    "Hipermetropía",

                detalle:
                    "Sin cirugías oculares registradas.",
            },

            diagnosticoActual: {
                valor:
                    "Hipermetropía con presbicia",

                detalle:
                    "Se recomienda seguimiento periódico.",
            },

        },

    },


    /* ======================================================
       ANA
    ====================================================== */

    {
        id: 26,
        folio: "00026",

        nombre:
            "Ana López García",

        telefono:
            "55 3344 7788",

        correo:
            "ana@example.com",


        /* --------------------------------------------------
           Resumen
        -------------------------------------------------- */

        resumen: {

            ultimaConsulta:
                "22/08/2026",

        },


        /* --------------------------------------------------
           Datos personales
        -------------------------------------------------- */

        datosPersonales: {

            fechaNacimiento:
                "25 de junio de 1998",

            edad:
                "28 años",

            ocupacion:
                "Arquitecta",

            fechaRegistro:
                "5 de abril de 2026",

            direccion:
                "Av. Pantitlán 340, Col. Evolución, Nezahualcóyotl, Estado de México",

        },


        /* --------------------------------------------------
           Historial clínico
        -------------------------------------------------- */

        historialClinico: {

            usoActual: {
                valor:
                    "No utiliza lentes actualmente",

                detalle:
                    "Primera valoración para determinar necesidad de corrección.",
            },

            usoAnterior: {
                valor:
                    "Sin uso anterior",

                detalle:
                    "No se registran lentes previos.",
            },

            exposicionLaboral: {
                valor:
                    "Pantallas digitales",

                detalle:
                    "Exposición aproximada de 5 horas diarias.",
            },

            antecedentesPatologicos: {
                valor:
                    "Ninguno registrado",

                detalle:
                    "No reporta antecedentes patológicos relevantes.",
            },

            antecedentesVisuales: {
                valor:
                    "Fatiga visual",

                detalle:
                    "Molestias asociadas al trabajo prolongado frente a pantalla.",
            },

            diagnosticoActual: {
                valor:
                    "Astigmatismo leve",

                detalle:
                    "Se recomienda seguimiento y valoración de corrección óptica.",
            },

        },

    },

];