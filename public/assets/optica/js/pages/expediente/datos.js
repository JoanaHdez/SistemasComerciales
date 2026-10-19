
/* ==========================================================
   DATOS SIMULADOS DE CLIENTES

   Fuente temporal de información para el frontend
   del Expediente clínico.

   Posteriormente estos datos serán sustituidos por
   información proporcionada por el backend.
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
            edad: 34,
            fechaRegistro: "08/08/2024",
            ultimaConsulta: "22/07/2026",
            estado: "Expediente activo",
        },

        datosPersonales: {
            fechaNacimiento: "1992-03-18",
            ocupacion: "Diseñadora gráfica",
            direccion:
                "Av. Central 245, Nezahualcóyotl, Estado de México",
        },

        estadoVisual: {
            usaLentes: "Sí",
            tipoLente: "Monofocal",
            tiempoUso: "4 años",
            exposicionLaboral: "Pantallas",
            diagnosticoActual:
                "Miopía y astigmatismo bilateral",
        },

        informacionRelevante: {

            usoActual: {
                valor: "Sí",
                detalle:
                    "Lentes monofocales de uso diario.",
            },

            usoAnterior: {
                valor: "Sí",
                detalle:
                    "Ha utilizado lentes desde hace aproximadamente cuatro años.",
            },

            exposicionLaboral: {
                valor: "Sí",
                detalle:
                    "Exposición prolongada a computadora y dispositivos digitales.",
            },

            antecedentesPatologicos: {
                valor: "Ninguno",
                detalle:
                    "No refiere enfermedades relevantes.",
            },

            antecedentesVisuales: {
                valor: "Miopía y astigmatismo",
                detalle:
                    "Antecedentes de corrección óptica previa.",
            },

            diagnosticoActual: {
                valor: "Miopía y astigmatismo bilateral",
                detalle:
                    "Se detectó aumento de graduación en ambos ojos.",
            },

        },

        graduacionActual: {

            ojoDerecho: {
                esfera: "-1.75",
                cilindro: "-0.50",
                eje: "90",
            },

            ojoIzquierdo: {
                esfera: "-2.00",
                cilindro: "-0.75",
                eje: "85",
            },

            adicion: "1.00",
            distanciaPupilar: "62",
            fecha: "22/07/2026",
        },

        /* ==================================================
           CONSULTAS DE MARÍA

           Se conservan las cinco consultas del Historial,
           ordenadas de la más reciente a la más antigua.

           IDs 9 y 10: nuevas consultas incorporadas.
        ================================================== */

        consultas: [

            {
                id: 1,
                fechaTabla: "22/07/2026",
                tipo: "ACTUALIZACIÓN DE GRADUACIÓN",
                titulo: "Consulta general",
                fecha: "22 julio 2026",

                diagnostico:
                    "Miopía y astigmatismo bilateral.",

                evolucion:
                    "Se detectó aumento de graduación en ambos ojos.",

                estadoGraduacion: "Actualizada",

                graduacion: {
                    od: "-1.75",
                    oi: "-2.00",
                },

                observaciones:
                    "Se recomienda cambio de lentes y revisión en seis meses.",

                estado: "Finalizada",
            },

            /* ----------------------------------------------
               NUEVA CONSULTA INCORPORADA
               15 DE MARZO DE 2026
            ---------------------------------------------- */

            {
                id: 9,
                fechaTabla: "15/03/2026",
                tipo: "SEGUIMIENTO",
                titulo: "Revisión por fatiga visual",
                fecha: "15 marzo 2026",

                diagnostico:
                    "Fatiga visual asociada a exposición prolongada a pantallas.",

                evolucion:
                    "Se mantiene la graduación sin cambios clínicamente relevantes.",

                estadoGraduacion: "Sin cambios",

                graduacion: {
                    od: "-1.50",
                    oi: "-1.75",
                },

                observaciones:
                    "Se recomienda realizar pausas visuales y utilizar filtro de luz azul.",

                estado: "Finalizada",
            },

            /* ----------------------------------------------
               NUEVA CONSULTA INCORPORADA
               10 DE ENERO DE 2026
            ---------------------------------------------- */

            {
                id: 10,
                fechaTabla: "10/01/2026",
                tipo: "CONSULTA GENERAL",
                titulo: "Revisión periódica",
                fecha: "10 enero 2026",

                diagnostico:
                    "Condición visual estable.",

                evolucion:
                    "Sin cambios clínicos relevantes.",

                estadoGraduacion: "Sin cambios",

                graduacion: {
                    od: "-1.50",
                    oi: "-1.75",
                },

                observaciones:
                    "Continuar con lentes actuales y revisión anual.",

                estado: "Finalizada",
            },

            {
                id: 2,
                fechaTabla: "14/02/2025",
                tipo: "SEGUIMIENTO",
                titulo: "Revisión de graduación",
                fecha: "14 febrero 2025",

                diagnostico:
                    "Fatiga visual leve.",

                evolucion:
                    "Sin cambios importantes respecto a la consulta anterior.",

                estadoGraduacion: "Sin cambios",

                graduacion: {
                    od: "-1.50",
                    oi: "-1.75",
                },

                observaciones:
                    "Se mantiene seguimiento periódico.",

                estado: "Finalizada",
            },

            {
                id: 3,
                fechaTabla: "08/08/2024",
                tipo: "VALORACIÓN INICIAL",
                titulo: "Evaluación inicial",
                fecha: "08 agosto 2024",

                diagnostico:
                    "Miopía bilateral.",

                evolucion:
                    "Se realiza primera valoración visual.",

                estadoGraduacion: "Inicial",

                graduacion: {
                    od: "-1.25",
                    oi: "-1.50",
                },

                observaciones:
                    "Se indican lentes de uso diario.",

                estado: "Finalizada",
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
            edad: 41,
            fechaRegistro: "10/03/2025",
            ultimaConsulta: "18/08/2026",
            estado: "Expediente activo",
        },

        datosPersonales: {
            fechaNacimiento: "1985-05-12",
            ocupacion: "Contador",
            direccion:
                "Col. Metropolitana, Nezahualcóyotl, Estado de México",
        },

        estadoVisual: {
            usaLentes: "Sí",
            tipoLente: "Progresivo",
            tiempoUso: "7 años",
            exposicionLaboral: "Pantallas y lectura",
            diagnosticoActual:
                "Hipermetropía con presbicia",
        },

        informacionRelevante: {

            usoActual: {
                valor: "Sí",
                detalle:
                    "Utiliza lentes progresivos durante la mayor parte del día.",
            },

            usoAnterior: {
                valor: "Sí",
                detalle:
                    "Anteriormente utilizaba lentes monofocales.",
            },

            exposicionLaboral: {
                valor: "Sí",
                detalle:
                    "Trabajo administrativo con uso constante de computadora.",
            },

            antecedentesPatologicos: {
                valor: "Hipertensión controlada",
                detalle:
                    "Refiere seguimiento médico periódico.",
            },

            antecedentesVisuales: {
                valor: "Hipermetropía",
                detalle:
                    "Uso previo de corrección óptica.",
            },

            diagnosticoActual: {
                valor: "Hipermetropía con presbicia",
                detalle:
                    "Requiere corrección para visión cercana y lejana.",
            },

        },

        graduacionActual: {

            ojoDerecho: {
                esfera: "+1.25",
                cilindro: "-0.25",
                eje: "80",
            },

            ojoIzquierdo: {
                esfera: "+1.50",
                cilindro: "-0.50",
                eje: "95",
            },

            adicion: "1.75",
            distanciaPupilar: "64",
            fecha: "18/08/2026",
        },

        consultas: [

            {
                id: 4,
                fechaTabla: "18/08/2026",
                tipo: "ACTUALIZACIÓN DE GRADUACIÓN",
                titulo: "Consulta general",
                fecha: "18 agosto 2026",

                diagnostico:
                    "Hipermetropía con presbicia.",

                evolucion:
                    "Se realizó ajuste de graduación para mejorar visión cercana.",

                estadoGraduacion: "Actualizada",

                graduacion: {
                    od: "+1.25",
                    oi: "+1.50",
                },

                observaciones:
                    "Se recomienda adaptación progresiva a la nueva graduación.",

                estado: "Finalizada",
            },

            {
                id: 5,
                fechaTabla: "20/01/2026",
                tipo: "SEGUIMIENTO",
                titulo: "Consulta de seguimiento",
                fecha: "20 enero 2026",

                diagnostico:
                    "Hipermetropía.",

                evolucion:
                    "Sin cambios significativos en la graduación.",

                estadoGraduacion: "Sin cambios",

                graduacion: {
                    od: "+1.00",
                    oi: "+1.25",
                },

                observaciones:
                    "Continuar con corrección óptica habitual.",

                estado: "Finalizada",
            },

            {
                id: 6,
                fechaTabla: "10/03/2025",
                tipo: "VALORACIÓN INICIAL",
                titulo: "Consulta general",
                fecha: "10 marzo 2025",

                diagnostico:
                    "Hipermetropía.",

                evolucion:
                    "Se realizó valoración visual inicial.",

                estadoGraduacion: "Inicial",

                graduacion: {
                    od: "+1.00",
                    oi: "+1.25",
                },

                observaciones:
                    "Se recomienda revisión anual.",

                estado: "Finalizada",
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
            edad: 28,
            fechaRegistro: "04/11/2025",
            ultimaConsulta: "05/08/2026",
            estado: "Expediente activo",
        },

        datosPersonales: {
            fechaNacimiento: "1998-02-07",
            ocupacion: "Arquitecta",
            direccion:
                "Col. Las Águilas, Nezahualcóyotl, Estado de México",
        },

        estadoVisual: {
            usaLentes: "Sí",
            tipoLente: "Monofocal",
            tiempoUso: "2 años",
            exposicionLaboral: "Pantallas y planos",
            diagnosticoActual:
                "Astigmatismo bilateral",
        },

        informacionRelevante: {

            usoActual: {
                valor: "Sí",
                detalle:
                    "Utiliza lentes principalmente durante trabajo y conducción.",
            },

            usoAnterior: {
                valor: "No",
                detalle:
                    "No utilizaba corrección óptica antes del expediente actual.",
            },

            exposicionLaboral: {
                valor: "Sí",
                detalle:
                    "Uso frecuente de computadora y revisión de planos.",
            },

            antecedentesPatologicos: {
                valor: "Ninguno",
                detalle:
                    "No refiere padecimientos relevantes.",
            },

            antecedentesVisuales: {
                valor: "Astigmatismo",
                detalle:
                    "Detectado durante su primera valoración.",
            },

            diagnosticoActual: {
                valor: "Astigmatismo bilateral",
                detalle:
                    "Graduación estable en la consulta más reciente.",
            },

        },

        graduacionActual: {

            ojoDerecho: {
                esfera: "0.00",
                cilindro: "-1.00",
                eje: "100",
            },

            ojoIzquierdo: {
                esfera: "0.00",
                cilindro: "-1.25",
                eje: "80",
            },

            adicion: "0.00",
            distanciaPupilar: "61",
            fecha: "05/08/2026",
        },

        consultas: [

            {
                id: 7,
                fechaTabla: "05/08/2026",
                tipo: "SEGUIMIENTO",
                titulo: "Consulta de seguimiento",
                fecha: "05 agosto 2026",

                diagnostico:
                    "Astigmatismo bilateral.",

                evolucion:
                    "La graduación permanece estable.",

                estadoGraduacion: "Sin cambios",

                graduacion: {
                    od: "0.00 / -1.00",
                    oi: "0.00 / -1.25",
                },

                observaciones:
                    "Continuar con lentes actuales y revisión periódica.",

                estado: "Finalizada",
            },

            {
                id: 8,
                fechaTabla: "04/11/2025",
                tipo: "VALORACIÓN INICIAL",
                titulo: "Consulta general",
                fecha: "04 noviembre 2025",

                diagnostico:
                    "Astigmatismo bilateral.",

                evolucion:
                    "Se detectó astigmatismo y se indicó corrección óptica.",

                estadoGraduacion: "Inicial",

                graduacion: {
                    od: "0.00 / -1.00",
                    oi: "0.00 / -1.25",
                },

                observaciones:
                    "Se recomienda adaptación a lentes y revisión posterior.",

                estado: "Finalizada",
            },

        ],

    },

];
