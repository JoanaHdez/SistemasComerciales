
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
       MARÍA LÓPEZ HERNÁNDEZ
    ====================================================== */

    {
        id: 24,
        folio: "CLI-0001",

        nombre: "María López Hernández",
        telefono: "55 1234 5678",
        correo: "maria@example.com",

        resumen: {
            ultimaConsulta: "22/07/2026",
        },

        datosPersonales: {
            fechaNacimiento: "18 de marzo de 1992",
            edad: "34 años",
            ocupacion: "Diseñadora gráfica",
            fechaRegistro: "8 de agosto de 2024",
            direccion:
                "Av. Central 245, Nezahualcóyotl, Estado de México",
        },

        historialClinico: {

            usoActual: {
                valor: "Sí, lentes monofocales",
                detalle:
                    "Uso aproximado de 8 horas al día.",
            },

            usoAnterior: {
                valor: "Desde hace 4 años",
                detalle:
                    "Último cambio realizado en enero de 2025.",
            },

            exposicionLaboral: {
                valor: "Pantallas digitales",
                detalle:
                    "Exposición aproximada de 7 horas diarias.",
            },

            antecedentesPatologicos: {
                valor: "Ninguno registrado",
                detalle:
                    "La cliente no reporta antecedentes relevantes.",
            },

            antecedentesVisuales: {
                valor: "Miopía y astigmatismo",
                detalle:
                    "Sin cirugías oculares registradas.",
            },

            diagnosticoActual: {
                valor: "Miopía y astigmatismo bilateral",
                detalle:
                    "Se recomienda actualizar la graduación y mantener revisión anual.",
            },

        },

        graduacionActual: {

            estado: "Actualizada",
            fecha: "22 de julio de 2026",

            ojoDerecho: {
                esfera: "-1.75",
                cilindro: "-0.50",
                eje: "90°",
                adicion: "+1.00",
                distanciaPupilar: "31 mm",
            },

            ojoIzquierdo: {
                esfera: "-2.00",
                cilindro: "-0.75",
                eje: "85°",
                adicion: "+1.00",
                distanciaPupilar: "31 mm",
            },

            observaciones:
                "Se recomienda lente con tratamiento antirreflejante debido al tiempo prolongado de exposición a pantallas.",

        },

        consultasAnteriores: [

            {
                dia: "22",
                periodo: "Jul 2026",
                tipo: "Actualización de graduación",
                descripcion:
                    "Se detectó aumento de graduación en ambos ojos.",
            },

            {
                dia: "15",
                periodo: "Mar 2026",
                tipo: "Seguimiento",
                descripcion:
                    "Revisión por fatiga visual asociada a pantallas.",
            },

            {
                dia: "10",
                periodo: "Ene 2026",
                tipo: "Consulta general",
                descripcion:
                    "Revisión periódica; condición visual estable.",
            },

            {
                dia: "14",
                periodo: "Feb 2025",
                tipo: "Seguimiento",
                descripcion:
                    "Revisión de graduación y fatiga visual leve.",
            },

            {
                dia: "08",
                periodo: "Ago 2024",
                tipo: "Primera valoración",
                descripcion:
                    "Evaluación visual inicial y prescripción de lentes.",
            },

        ],

    },


    /* ======================================================
       CARLOS MARTÍNEZ RUIZ
    ====================================================== */

    {
        id: 25,
        folio: "CLI-0002",

        nombre: "Carlos Martínez Ruiz",
        telefono: "55 8765 4321",
        correo: "carlos@example.com",

        resumen: {
            ultimaConsulta: "18/08/2026",
        },

        datosPersonales: {
            fechaNacimiento: "12 de mayo de 1985",
            edad: "41 años",
            ocupacion: "Contador",
            fechaRegistro: "10 de marzo de 2025",
            direccion:
                "Col. Metropolitana, Nezahualcóyotl, Estado de México",
        },

        historialClinico: {

            usoActual: {
                valor: "Sí, lentes progresivos",
                detalle:
                    "Uso habitual durante la jornada laboral.",
            },

            usoAnterior: {
                valor: "Desde hace 7 años",
                detalle:
                    "Ha utilizado diferentes graduaciones.",
            },

            exposicionLaboral: {
                valor: "Pantallas y lectura prolongada",
                detalle:
                    "Exposición aproximada de 6 horas diarias.",
            },

            antecedentesPatologicos: {
                valor: "Hipertensión",
                detalle:
                    "Antecedente registrado en expediente.",
            },

            antecedentesVisuales: {
                valor: "Hipermetropía",
                detalle:
                    "Sin cirugías oculares registradas.",
            },

            diagnosticoActual: {
                valor: "Hipermetropía con presbicia",
                detalle:
                    "Se recomienda seguimiento periódico.",
            },

        },

        graduacionActual: {

            estado: "Actualizada",
            fecha: "18 de agosto de 2026",

            ojoDerecho: {
                esfera: "+1.25",
                cilindro: "-0.25",
                eje: "80°",
                adicion: "+1.75",
                distanciaPupilar: "32 mm",
            },

            ojoIzquierdo: {
                esfera: "+1.50",
                cilindro: "-0.50",
                eje: "95°",
                adicion: "+1.75",
                distanciaPupilar: "32 mm",
            },

            observaciones:
                "Se recomienda mantener el uso de lentes progresivos y realizar revisión periódica.",

        },

        consultasAnteriores: [

            {
                dia: "18",
                periodo: "Ago 2026",
                tipo: "Actualización de graduación",
                descripcion:
                    "Ajuste de graduación para visión cercana.",
            },

            {
                dia: "20",
                periodo: "Ene 2026",
                tipo: "Seguimiento",
                descripcion:
                    "Control visual sin cambios significativos.",
            },

            {
                dia: "10",
                periodo: "Mar 2025",
                tipo: "Primera valoración",
                descripcion:
                    "Valoración inicial por hipermetropía.",
            },

        ],

    },


    /* ======================================================
       ANA LÓPEZ GARCÍA
    ====================================================== */

    {
        id: 26,
        folio: "CLI-0003",

        nombre: "Ana López García",
        telefono: "55 3344 7788",
        correo: "ana@example.com",

        resumen: {
            ultimaConsulta: "05/08/2026",
        },

        datosPersonales: {
            fechaNacimiento: "7 de febrero de 1998",
            edad: "28 años",
            ocupacion: "Arquitecta",
            fechaRegistro: "4 de noviembre de 2025",
            direccion:
                "Col. Las Águilas, Nezahualcóyotl, Estado de México",
        },

        historialClinico: {

            usoActual: {
                valor: "Sí, lentes monofocales",
                detalle:
                    "Utiliza lentes durante el trabajo y la conducción.",
            },

            usoAnterior: {
                valor: "Sin corrección anterior al expediente actual",
                detalle:
                    "No utilizaba lentes antes de su primera valoración.",
            },

            exposicionLaboral: {
                valor: "Pantallas digitales",
                detalle:
                    "Exposición aproximada de 5 horas diarias.",
            },

            antecedentesPatologicos: {
                valor: "Ninguno registrado",
                detalle:
                    "No reporta antecedentes patológicos relevantes.",
            },

            antecedentesVisuales: {
                valor: "Astigmatismo",
                detalle:
                    "Molestias asociadas al trabajo prolongado frente a pantalla.",
            },

            diagnosticoActual: {
                valor: "Astigmatismo bilateral",
                detalle:
                    "Se recomienda seguimiento y valoración de corrección óptica.",
            },

        },

        graduacionActual: {

            estado: "Actualizada",
            fecha: "5 de agosto de 2026",

            ojoDerecho: {
                esfera: "0.00",
                cilindro: "-1.00",
                eje: "100°",
                adicion: "0.00",
                distanciaPupilar: "30.5 mm",
            },

            ojoIzquierdo: {
                esfera: "0.00",
                cilindro: "-1.25",
                eje: "80°",
                adicion: "0.00",
                distanciaPupilar: "30.5 mm",
            },

            observaciones:
                "Graduación estable. Se recomienda continuar con los lentes actuales y realizar revisión periódica.",

        },

        consultasAnteriores: [

            {
                dia: "05",
                periodo: "Ago 2026",
                tipo: "Seguimiento",
                descripcion:
                    "Graduación estable; continuar con lentes actuales.",
            },

            {
                dia: "04",
                periodo: "Nov 2025",
                tipo: "Primera valoración",
                descripcion:
                    "Se detectó astigmatismo y se indicó corrección óptica.",
            },

        ],

    },

];
