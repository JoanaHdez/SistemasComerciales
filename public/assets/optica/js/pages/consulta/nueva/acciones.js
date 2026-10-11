
/* ==========================================================
   NUEVA CONSULTA - ACCIONES Y VALIDACIONES
========================================================== */

import {
    pacientesNuevaConsulta
} from "./datos.js";

import {
    ocultarPacienteNuevaConsulta
} from "./paciente.js";

import {
    inicializarFechaActualNuevaConsulta
} from "./datos_consulta.js";


/* ==========================================================
   INICIALIZAR ACCIONES
========================================================== */

export function inicializarAccionesNuevaConsulta() {

    const pagina = document.querySelector(
        ".new-consultation-page"
    );

    if (!pagina) {
        return;
    }

    const botonRegistrar = pagina.querySelector(
        "#new-consultation-submit"
    );

    const botonLimpiar = pagina.querySelector(
        "#new-consultation-clear"
    );

    const modal = document.querySelector(
        "#new-consultation-modal"
    );

    const resumen = document.querySelector(
        "#new-consultation-modal-summary"
    );

    const botonCerrar = document.querySelector(
        "#new-consultation-modal-close"
    );

    const botonAceptar = document.querySelector(
        "#new-consultation-modal-accept"
    );

    if (
        !botonRegistrar ||
        !botonLimpiar ||
        !modal ||
        !resumen ||
        !botonCerrar ||
        !botonAceptar
    ) {
        return;
    }

    let elementoAnterior = null;


    /* ======================================================
       OBTENER CAMPO
    ====================================================== */

    function campo(selector) {

        return pagina.querySelector(selector);

    }


    function valor(selector) {

        return campo(selector)?.value.trim() || "";

    }


    /* ======================================================
       VALIDAR CAMPO
    ====================================================== */

    function validarCampo(selector, mensaje) {

        const elemento = campo(selector);

        if (!elemento) {
            return false;
        }

        if (!elemento.value.trim()) {

            elemento.setCustomValidity(mensaje);

            elemento.reportValidity();

            elemento.focus();

            return false;
        }

        elemento.setCustomValidity("");

        return true;

    }


    /* ======================================================
       OBTENER NUEVA GRADUACIÓN
    ====================================================== */

    function obtenerNuevaGraduacion() {

        const seleccion = campo(
            'input[name="realizo_nueva_graduacion"]:checked'
        );

        if (seleccion?.value !== "si") {
            return null;
        }

        return {
            oi: {
                esfera: valor("#consulta_nueva_oi_esfera"),
                cilindro: valor("#consulta_nueva_oi_cilindro"),
                eje: valor("#consulta_nueva_oi_eje")
            },
            od: {
                esfera: valor("#consulta_nueva_od_esfera"),
                cilindro: valor("#consulta_nueva_od_cilindro"),
                eje: valor("#consulta_nueva_od_eje")
            },
            adicion: valor("#consulta_nueva_adicion"),
            distanciaOcular: valor(
                "#consulta_nueva_distancia_ocular"
            )
        };

    }


    /* ======================================================
       VALIDAR GRADUACIÓN
    ====================================================== */

    function validarGraduacion(graduacion) {

        if (!graduacion) {
            return true;
        }

        const campos = [
            ["#consulta_nueva_oi_esfera", "Esfera OI"],
            ["#consulta_nueva_oi_cilindro", "Cilindro OI"],
            ["#consulta_nueva_oi_eje", "Eje OI"],
            ["#consulta_nueva_od_esfera", "Esfera OD"],
            ["#consulta_nueva_od_cilindro", "Cilindro OD"],
            ["#consulta_nueva_od_eje", "Eje OD"],
            ["#consulta_nueva_adicion", "Adición"],
            ["#consulta_nueva_distancia_ocular", "Distancia ocular"]
        ];

        const tieneValores = campos.some(
            ([selector]) => valor(selector) !== ""
        );

        if (!tieneValores) {

            const primero = campo(campos[0][0]);

            primero?.setCustomValidity(
                "Captura al menos un valor de la nueva graduación."
            );

            primero?.reportValidity();
            primero?.focus();

            return false;
        }

        for (const [selector, etiqueta] of campos) {

            const elemento = campo(selector);

            if (!elemento) {
                return false;
            }

            const contenido = elemento.value.trim();

            elemento.setCustomValidity("");

            if (!contenido) {
                continue;
            }

            const esEje = etiqueta.startsWith("Eje");

            const esDistancia = etiqueta === "Distancia ocular";

            let valido = false;

            if (esEje) {

                const numero = Number(contenido);

                valido =
                    /^\d{1,3}$/.test(contenido) &&
                    numero >= 0 &&
                    numero <= 180;

            } else if (esDistancia) {

                valido =
                    /^\d+(?:[.,]\d+)?(?:\s*mm)?$/i.test(
                        contenido
                    ) &&
                    Number(
                        contenido.replace(/mm/i, "")
                            .trim()
                            .replace(",", ".")
                    ) > 0;

            } else {

                valido =
                    /^[+-]?\d+(?:[.,]\d+)?$/.test(
                        contenido
                    );

            }

            if (!valido) {

                elemento.setCustomValidity(
                    `Revisa el valor de ${etiqueta}.`
                );

                elemento.reportValidity();
                elemento.focus();

                return false;
            }

        }

        return true;

    }


    /* ======================================================
       VALIDAR CONSULTA
    ====================================================== */

    function validarConsulta() {

        const buscador = campo(
            "#new-consultation-patient-search"
        );

        const idPaciente = Number(
            buscador?.dataset.pacienteId || 0
        );

        const paciente = pacientesNuevaConsulta.find(
            item => item.id === idPaciente
        );

        if (!paciente) {

            buscador?.setCustomValidity(
                "Selecciona un paciente de los resultados."
            );

            buscador?.reportValidity();
            buscador?.focus();

            return null;
        }

        buscador.setCustomValidity("");

        const obligatorios = [
            [
                "#new-consultation-date",
                "Selecciona la fecha de consulta."
            ],
            [
                "#new-consultation-type",
                "Selecciona el tipo de consulta."
            ],
            [
                "#new-consultation-reason",
                "Captura el motivo de consulta."
            ],
            [
                "#new-consultation-diagnosis",
                "Captura el diagnóstico."
            ]
        ];

        for (const [selector, mensaje] of obligatorios) {

            if (!validarCampo(selector, mensaje)) {
                return null;
            }

        }

        const graduacion = obtenerNuevaGraduacion();

        if (!validarGraduacion(graduacion)) {
            return null;
        }

        return {
            paciente: {
                id: paciente.id,
                folio: paciente.folio,
                nombre: paciente.nombre
            },

            fecha: valor("#new-consultation-date"),

            tipo: valor("#new-consultation-type"),

            motivo: valor("#new-consultation-reason"),

            evaluacion: {
                sintomas: valor("#new-consultation-symptoms"),
                diagnostico: valor("#new-consultation-diagnosis"),
                evolucion: valor("#new-consultation-evolution"),
                observaciones: valor(
                    "#new-consultation-observations"
                )
            },

            nuevaGraduacion: graduacion
        };

    }


    /* ======================================================
       CONSTRUIR RESUMEN
    ====================================================== */

    function agregarResumen(etiqueta, contenido) {

        const item = document.createElement("div");

        item.className =
            "new-consultation-modal__summary-item";

        const titulo = document.createElement("span");

        titulo.textContent = etiqueta;

        const texto = document.createElement("strong");

        texto.textContent =
            String(contenido ?? "").trim() || "Sin información";

        item.append(titulo, texto);

        resumen.appendChild(item);

    }


    function mostrarResumen(datos) {

        resumen.replaceChildren();

        agregarResumen(
            "Paciente",
            `${datos.paciente.nombre} (${datos.paciente.folio})`
        );

        agregarResumen("Fecha", datos.fecha);

        agregarResumen("Tipo de consulta", datos.tipo);

        agregarResumen("Motivo", datos.motivo);

        agregarResumen(
            "Síntomas",
            datos.evaluacion.sintomas
        );

        agregarResumen(
            "Diagnóstico",
            datos.evaluacion.diagnostico
        );

        agregarResumen(
            "Evolución",
            datos.evaluacion.evolucion
        );

        agregarResumen(
            "Observaciones",
            datos.evaluacion.observaciones
        );

        if (datos.nuevaGraduacion) {

            const g = datos.nuevaGraduacion;

            agregarResumen(
                "Nueva graduación - OI",
                `Esfera: ${g.oi.esfera || "—"} | ` +
                `Cilindro: ${g.oi.cilindro || "—"} | ` +
                `Eje: ${g.oi.eje || "—"}`
            );

            agregarResumen(
                "Nueva graduación - OD",
                `Esfera: ${g.od.esfera || "—"} | ` +
                `Cilindro: ${g.od.cilindro || "—"} | ` +
                `Eje: ${g.od.eje || "—"}`
            );

            agregarResumen(
                "Adición",
                g.adicion
            );

            agregarResumen(
                "Distancia ocular",
                g.distanciaOcular
            );

        } else {

            agregarResumen(
                "Nueva graduación",
                "No se realizó"
            );

        }

    }


    /* ======================================================
       MODAL
    ====================================================== */

    function abrirModal() {

        elementoAnterior = document.activeElement;

        modal.hidden = false;

        document.body.style.overflow = "hidden";

        botonCerrar.focus();

    }


    function cerrarModal() {

        modal.hidden = true;

        document.body.style.overflow = "";

        elementoAnterior?.focus();

    }


    /* ======================================================
       LIMPIAR FORMULARIO
    ====================================================== */

    function limpiarFormulario() {

        const controles = pagina.querySelectorAll(
            "input, select, textarea"
        );

        controles.forEach(elemento => {

            elemento.setCustomValidity("");

            if (elemento.type === "radio") {

                elemento.checked =
                    elemento.name === "realizo_nueva_graduacion" &&
                    elemento.value === "no";

                return;
            }

            if (
                elemento.type !== "button" &&
                elemento.type !== "submit"
            ) {
                elemento.value = "";
            }

        });

        const buscador = campo(
            "#new-consultation-patient-search"
        );

        if (buscador) {
            delete buscador.dataset.pacienteId;
            buscador.setAttribute("aria-expanded", "false");
        }

        const resultados = campo(
            "#new-consultation-patient-results"
        );

        if (resultados) {
            resultados.hidden = true;
            resultados.replaceChildren();
        }

        ocultarPacienteNuevaConsulta();

        const nuevaGraduacion = campo(
            "#new-consultation-graduation-new"
        );

        if (nuevaGraduacion) {
            nuevaGraduacion.hidden = true;
            nuevaGraduacion.disabled = true;
        }

        inicializarFechaActualNuevaConsulta();

        buscador?.focus();

    }


    /* ======================================================
       EVENTOS
    ====================================================== */

    botonRegistrar.addEventListener("click", () => {

        const datos = validarConsulta();

        if (!datos) {
            return;
        }

        mostrarResumen(datos);

        abrirModal();

    });


    botonLimpiar.addEventListener(
        "click",
        limpiarFormulario
    );


    botonCerrar.addEventListener(
        "click",
        cerrarModal
    );


    botonAceptar.addEventListener(
        "click",
        cerrarModal
    );


    modal.addEventListener("click", evento => {

        if (
            evento.target.classList.contains(
                "new-consultation-modal__overlay"
            )
        ) {
            cerrarModal();
        }

    });


    document.addEventListener("keydown", evento => {

        if (
            evento.key === "Escape" &&
            !modal.hidden
        ) {
            cerrarModal();
        }

    });


    pagina.addEventListener("input", evento => {

        if (
            evento.target instanceof HTMLInputElement ||
            evento.target instanceof HTMLTextAreaElement
        ) {
            evento.target.setCustomValidity("");
        }

    });


    pagina.addEventListener("change", evento => {

        if (
            evento.target instanceof HTMLSelectElement ||
            evento.target instanceof HTMLInputElement
        ) {
            evento.target.setCustomValidity("");
        }

    });

}
