/* ==========================================================
   DATOS SIMULADOS DEL HISTORIAL CLÍNICO

   Estos datos existen únicamente para desarrollar
   y probar el frontend.

   Posteriormente serán sustituidos por información
   proporcionada por el backend.
========================================================== */

export const clientes = [

    /* ======================================================
       MARÍA LÓPEZ HERNÁNDEZ
    ====================================================== */

    {
        id: 24,

        folio:
            "CLI-0001",

        nombre:
            "María López Hernández",

        telefono:
            "55 1234 5678",

        correo:
            "maria@example.com",

        resumen: {

            edad:
                34,

            ultimaConsulta:
                "22/07/2026",

        },

        consultas: [

            {
                id: 1,

                anio:
                    2026,

                tipo:
                    "graduacion",

                tipoTexto:
                    "ACTUALIZACIÓN DE GRADUACIÓN",

                clase:
                    "graduation",

                titulo:
                    "Consulta general",

                fecha:
                    "22 julio 2026",

                fechaBusqueda:
                    "22/07/2026",

                diagnostico:
                    "Miopía y astigmatismo bilateral.",

                evolucion:
                    "Se detectó aumento de graduación en ambos ojos.",

                graduacion:
                    "OD -1.75 / OI -2.00",

                observaciones:
                    "Se recomienda cambio de lentes y revisión en seis meses.",

                estado:
                    "Finalizada",
            },


            {
                id: 9,

                anio:
                    2026,

                tipo:
                    "seguimiento",

                tipoTexto:
                    "SEGUIMIENTO",

                clase:
                    "follow-up",

                titulo:
                    "Revisión por fatiga visual",

                fecha:
                    "15 marzo 2026",

                fechaBusqueda:
                    "15/03/2026",

                diagnostico:
                    "Fatiga visual asociada a exposición prolongada a pantallas.",

                evolucion:
                    "Se mantiene la graduación sin cambios clínicamente relevantes.",

                graduacion:
                    "Sin cambios significativos.",

                observaciones:
                    "Se recomienda realizar pausas visuales y utilizar filtro de luz azul.",

                estado:
                    "Finalizada",
            },


            {
                id: 10,

                anio:
                    2026,

                tipo:
                    "general",

                tipoTexto:
                    "CONSULTA GENERAL",

                clase:
                    "general",

                titulo:
                    "Revisión periódica",

                fecha:
                    "10 enero 2026",

                fechaBusqueda:
                    "10/01/2026",

                diagnostico:
                    "Condición visual estable.",

                evolucion:
                    "Sin cambios clínicos relevantes.",

                graduacion:
                    "Se conserva graduación anterior.",

                observaciones:
                    "Continuar con lentes actuales y revisión anual.",

                estado:
                    "Finalizada",
            },


            {
                id: 2,

                anio:
                    2025,

                tipo:
                    "seguimiento",

                tipoTexto:
                    "SEGUIMIENTO",

                clase:
                    "follow-up",

                titulo:
                    "Revisión de graduación",

                fecha:
                    "14 febrero 2025",

                fechaBusqueda:
                    "14/02/2025",

                diagnostico:
                    "Fatiga visual leve.",

                evolucion:
                    "Sin cambios importantes respecto a la consulta anterior.",

                graduacion:
                    "Sin cambios.",

                observaciones:
                    "Se mantiene seguimiento periódico.",

                estado:
                    "Finalizada",
            },


            {
                id: 3,

                anio:
                    2024,

                tipo:
                    "general",

                tipoTexto:
                    "PRIMERA CONSULTA",

                clase:
                    "initial",

                titulo:
                    "Evaluación inicial",

                fecha:
                    "8 agosto 2024",

                fechaBusqueda:
                    "08/08/2024",

                diagnostico:
                    "Miopía bilateral.",

                evolucion:
                    "Se realiza primera valoración visual.",

                graduacion:
                    "OD -1.25 / OI -1.50",

                observaciones:
                    "Se indican lentes de uso diario.",

                estado:
                    "Finalizada",
            },

        ],

    },


    /* ======================================================
       CARLOS MARTÍNEZ RUIZ
    ====================================================== */

    {
        id: 25,

        folio:
            "CLI-0002",

        nombre:
            "Carlos Martínez Ruiz",

        telefono:
            "55 8765 4321",

        correo:
            "carlos@example.com",

        resumen: {

            edad:
                41,

            ultimaConsulta:
                "18/08/2026",

        },

        consultas: [

            {
                id: 4,

                anio:
                    2026,

                tipo:
                    "graduacion",

                tipoTexto:
                    "ACTUALIZACIÓN DE GRADUACIÓN",

                clase:
                    "graduation",

                titulo:
                    "Consulta general",

                fecha:
                    "18 agosto 2026",

                fechaBusqueda:
                    "18/08/2026",

                diagnostico:
                    "Hipermetropía con presbicia.",

                evolucion:
                    "Se realizó ajuste de graduación para mejorar visión cercana.",

                graduacion:
                    "OD +1.25 / OI +1.50",

                observaciones:
                    "Se recomienda adaptación progresiva a la nueva graduación.",

                estado:
                    "Finalizada",
            },


            {
                id: 5,

                anio:
                    2026,

                tipo:
                    "seguimiento",

                tipoTexto:
                    "SEGUIMIENTO",

                clase:
                    "follow-up",

                titulo:
                    "Control visual",

                fecha:
                    "20 enero 2026",

                fechaBusqueda:
                    "20/01/2026",

                diagnostico:
                    "Hipermetropía.",

                evolucion:
                    "Sin cambios significativos en la graduación.",

                graduacion:
                    "OD +1.00 / OI +1.25",

                observaciones:
                    "Continuar con corrección óptica habitual.",

                estado:
                    "Finalizada",
            },


            {
                id: 6,

                anio:
                    2025,

                tipo:
                    "general",

                tipoTexto:
                    "PRIMERA CONSULTA",

                clase:
                    "initial",

                titulo:
                    "Valoración inicial",

                fecha:
                    "10 marzo 2025",

                fechaBusqueda:
                    "10/03/2025",

                diagnostico:
                    "Hipermetropía.",

                evolucion:
                    "Se realizó valoración visual inicial.",

                graduacion:
                    "OD +1.00 / OI +1.25",

                observaciones:
                    "Se recomienda revisión anual.",

                estado:
                    "Finalizada",
            },

        ],

    },


    /* ======================================================
       ANA LÓPEZ GARCÍA
    ====================================================== */

    {
        id: 26,

        folio:
            "CLI-0003",

        nombre:
            "Ana López García",

        telefono:
            "55 3344 7788",

        correo:
            "ana@example.com",

        resumen: {

            edad:
                28,

            ultimaConsulta:
                "05/08/2026",

        },

        consultas: [

            {
                id: 7,

                anio:
                    2026,

                tipo:
                    "seguimiento",

                tipoTexto:
                    "SEGUIMIENTO",

                clase:
                    "follow-up",

                titulo:
                    "Consulta de seguimiento",

                fecha:
                    "5 agosto 2026",

                fechaBusqueda:
                    "05/08/2026",

                diagnostico:
                    "Astigmatismo bilateral.",

                evolucion:
                    "La graduación permanece estable.",

                graduacion:
                    "OD 0.00 / -1.00 · OI 0.00 / -1.25",

                observaciones:
                    "Continuar con lentes actuales y revisión periódica.",

                estado:
                    "Finalizada",
            },


            {
                id: 8,

                anio:
                    2025,

                tipo:
                    "general",

                tipoTexto:
                    "PRIMERA CONSULTA",

                clase:
                    "initial",

                titulo:
                    "Valoración inicial",

                fecha:
                    "4 noviembre 2025",

                fechaBusqueda:
                    "04/11/2025",

                diagnostico:
                    "Astigmatismo bilateral.",

                evolucion:
                    "Se detectó astigmatismo y se indicó corrección óptica.",

                graduacion:
                    "OD 0.00 / -1.00 · OI 0.00 / -1.25",

                observaciones:
                    "Se recomienda adaptación a lentes y revisión posterior.",

                estado:
                    "Finalizada",
            },

        ],

    },

];