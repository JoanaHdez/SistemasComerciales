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


        /* --------------------------------------------------
           Graduación actual
        -------------------------------------------------- */

        graduacionActual: {

            estado:
                "Actualizada",

            fecha:
                "15 de julio de 2026",

            ojoDerecho: {

                esfera:
                    "-2.25",

                cilindro:
                    "-0.75",

                eje:
                    "15°",

                adicion:
                    "+1.00",

                distanciaPupilar:
                    "31 mm",

            },

            ojoIzquierdo: {

                esfera:
                    "-2.00",

                cilindro:
                    "-0.50",

                eje:
                    "170°",

                adicion:
                    "+1.00",

                distanciaPupilar:
                    "31 mm",

            },

            observaciones:
                "Se recomienda lente con tratamiento antirreflejante debido al tiempo prolongado de exposición a pantallas.",

        },


        /* --------------------------------------------------
           Consultas anteriores
        -------------------------------------------------- */

        consultasAnteriores: [

            {
                dia: "15",
                periodo: "Jul 2026",
                tipo: "Examen visual",
                descripcion:
                    "Actualización de graduación.",
            },

            {
                dia: "10",
                periodo: "Ene 2025",
                tipo: "Consulta general",
                descripcion:
                    "Adaptación de lentes monofocales.",
            },

            {
                dia: "22",
                periodo: "Nov 2023",
                tipo: "Primera valoración",
                descripcion:
                    "Registro inicial del expediente.",
            },

        ],

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


        resumen: {

            ultimaConsulta:
                "08/06/2026",

        },


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


        graduacionActual: {

            estado:
                "Actualizada",

            fecha:
                "8 de junio de 2026",

            ojoDerecho: {

                esfera:
                    "+1.50",

                cilindro:
                    "-0.50",

                eje:
                    "90°",

                adicion:
                    "+1.75",

                distanciaPupilar:
                    "32 mm",

            },

            ojoIzquierdo: {

                esfera:
                    "+1.25",

                cilindro:
                    "-0.25",

                eje:
                    "85°",

                adicion:
                    "+1.75",

                distanciaPupilar:
                    "32 mm",

            },

            observaciones:
                "Se recomienda mantener el uso de lentes bifocales y realizar revisión periódica.",

        },


        consultasAnteriores: [

            {
                dia: "08",
                periodo: "Jun 2026",
                tipo: "Examen visual",
                descripcion:
                    "Revisión y actualización de graduación.",
            },

            {
                dia: "14",
                periodo: "Feb 2026",
                tipo: "Consulta general",
                descripcion:
                    "Seguimiento de adaptación de lentes bifocales.",
            },

            {
                dia: "03",
                periodo: "Sep 2024",
                tipo: "Valoración visual",
                descripcion:
                    "Control de hipermetropía.",
            },

        ],

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


        resumen: {

            ultimaConsulta:
                "22/08/2026",

        },


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


        graduacionActual: {

            estado:
                "Actualizada",

            fecha:
                "22 de agosto de 2026",

            ojoDerecho: {

                esfera:
                    "0.00",

                cilindro:
                    "-0.50",

                eje:
                    "20°",

                adicion:
                    "0.00",

                distanciaPupilar:
                    "30 mm",

            },

            ojoIzquierdo: {

                esfera:
                    "0.00",

                cilindro:
                    "-0.75",

                eje:
                    "165°",

                adicion:
                    "0.00",

                distanciaPupilar:
                    "30 mm",

            },

            observaciones:
                "Se detecta astigmatismo leve. Se recomienda valorar adaptación de corrección óptica según síntomas.",

        },


        consultasAnteriores: [

            {
                dia: "22",
                periodo: "Ago 2026",
                tipo: "Examen visual",
                descripcion:
                    "Detección de astigmatismo leve.",
            },

            {
                dia: "05",
                periodo: "Abr 2026",
                tipo: "Primera valoración",
                descripcion:
                    "Apertura de expediente clínico.",
            },

        ],

    },

];