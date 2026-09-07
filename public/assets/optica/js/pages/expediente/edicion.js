import {
    MODOS_EXPEDIENTE,
    obtenerModoExpediente,
    establecerModoExpediente,
} from "./estado.js";


/* ==========================================================
   INICIALIZAR EDICIÓN
========================================================== */

export function inicializarEdicionExpediente() {

    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const botonEditar =
        document.getElementById(
            "btn-editar-expediente",
        );


    const botonCancelar =
        document.getElementById(
            "btn-cancelar-edicion-expediente",
        );


    const botonGuardar =
        document.getElementById(
            "btn-guardar-expediente",
        );


    const accionesLectura =
        document.getElementById(
            "expediente-actions-view",
        );


    const accionesEdicion =
        document.getElementById(
            "expediente-actions-editing",
        );


    if (
        !botonEditar ||
        !botonCancelar ||
        !botonGuardar ||
        !accionesLectura ||
        !accionesEdicion
    ) {

        console.error(
            "No se encontraron las acciones de edición del Expediente.",
        );

        return;

    }


    /* ======================================================
       VALORES ORIGINALES

       Se utilizan para restaurar los campos
       cuando el usuario presiona Cancelar.
    ====================================================== */

    const valoresOriginales =
        new Map();


    function guardarValoresOriginales() {

        document
            .querySelectorAll(
                ".clinical-record-edit-field",
            )
            .forEach(
                (campo) => {

                    valoresOriginales.set(
                        campo,
                        campo.value,
                    );

                },
            );

    }


    function restaurarValoresOriginales() {

        valoresOriginales.forEach(
            (valor, campo) => {

                campo.value =
                    valor;

            },
        );

    }


    /* ======================================================
       HABILITAR / BLOQUEAR CAMPOS
    ====================================================== */

    function actualizarCamposEditables() {

        const modo =
            obtenerModoExpediente();


        const secciones =
            document.querySelectorAll(
                "[data-edit-section]",
            );


        secciones.forEach(
            (seccion) => {

                const tipo =
                    seccion.dataset.editSection;


                let habilitar =
                    false;


                /* ------------------------------------------
                   EDITAR TODO

                   Habilita:
                   - info
                   - clinical
                   - graduation
                ------------------------------------------ */

                if (
                    modo ===
                    MODOS_EXPEDIENTE.EDITAR_TODO
                ) {

                    habilitar =
                        true;

                }


                /* ------------------------------------------
                   SOLO INFORMACIÓN GENERAL

                   Habilita únicamente:
                   data-edit-section="info"
                ------------------------------------------ */

                if (
                    modo ===
                        MODOS_EXPEDIENTE
                            .EDITAR_INFORMACION &&
                    tipo === "info"
                ) {

                    habilitar =
                        true;

                }


                /* ------------------------------------------
                   SOLO INFORMACIÓN CLÍNICA

                   Habilita únicamente:
                   data-edit-section="clinical"

                   La graduación permanece bloqueada.
                ------------------------------------------ */

                if (
                    modo ===
                        MODOS_EXPEDIENTE
                            .EDITAR_HISTORIAL &&
                    tipo === "clinical"
                ) {

                    habilitar =
                        true;

                }


                /* ------------------------------------------
                   CAMPOS DE LA SECCIÓN
                ------------------------------------------ */

                const campos =
                    seccion.querySelectorAll(
                        ".clinical-record-edit-field",
                    );


                campos.forEach(
                    (campo) => {

                        const etiqueta =
                            campo.tagName
                                .toLowerCase();


                        /*
                         * SELECT utiliza disabled.
                         */

                        if (
                            etiqueta === "select"
                        ) {

                            campo.disabled =
                                !habilitar;

                            return;

                        }


                        /*
                         * INPUT y TEXTAREA utilizan readonly.
                         */

                        campo.readOnly =
                            !habilitar;

                    },
                );


                /* ------------------------------------------
                   ESTADO VISUAL DE LA TARJETA
                ------------------------------------------ */

                seccion.classList.toggle(
                    "clinical-record-card--editing",
                    habilitar,
                );

            },
        );

    }


    /* ======================================================
       ACTUALIZAR INTERFAZ
    ====================================================== */

    function actualizarInterfazEdicion() {

        const modo =
            obtenerModoExpediente();


        const editando =
            modo !==
            MODOS_EXPEDIENTE.VER;


        /* --------------------------------------------------
           Botones
        -------------------------------------------------- */

        accionesLectura.hidden =
            editando;


        accionesEdicion.hidden =
            !editando;


        /* --------------------------------------------------
           Estado global

           Nos sirve también para CSS y futuras
           funcionalidades del Expediente.
        -------------------------------------------------- */

        document.body.dataset.expedienteMode =
            modo;


        /* --------------------------------------------------
           Campos
        -------------------------------------------------- */

        actualizarCamposEditables();


        console.log(
            "Modo actual del Expediente:",
            modo,
        );

    }


    /* ======================================================
       EDITAR EXPEDIENTE COMPLETO
    ====================================================== */

    botonEditar.addEventListener(
        "click",
        () => {

            /*
             * Guardamos el estado antes de comenzar
             * a editar para poder restaurarlo
             * si el usuario cancela.
             */

            guardarValoresOriginales();


            establecerModoExpediente(
                MODOS_EXPEDIENTE
                    .EDITAR_TODO,
            );


            actualizarInterfazEdicion();

        },
    );


    /* ======================================================
       CANCELAR EDICIÓN
    ====================================================== */

    botonCancelar.addEventListener(
        "click",
        () => {

            /*
             * Restaurar exactamente los valores
             * que existían al comenzar la edición.
             */

            restaurarValoresOriginales();


            establecerModoExpediente(
                MODOS_EXPEDIENTE.VER,
            );


            actualizarInterfazEdicion();


            console.log(
                "Edición cancelada.",
            );

        },
    );


    /* ======================================================
       GUARDAR CAMBIOS

       Simulación frontend.
       No se almacena información en BD.
    ====================================================== */

    botonGuardar.addEventListener(
        "click",
        () => {

            /*
             * Por ahora consideramos los valores
             * actuales como el nuevo estado válido.
             *
             * Cuando backend esté conectado,
             * aquí se sustituirá esta simulación
             * por el envío real de los datos.
             */

            guardarValoresOriginales();


            establecerModoExpediente(
                MODOS_EXPEDIENTE.VER,
            );


            actualizarInterfazEdicion();


            console.log(
                "Cambios simulados guardados.",
            );

        },
    );


    /* ======================================================
       ESTADO INICIAL
    ====================================================== */

    guardarValoresOriginales();


    actualizarInterfazEdicion();

}