import { Modal } from "./components/modal.js";

import {
    obtenerCitasGuardadas,
    actualizarCitaSimulada
} from "./pages/nueva_cita/almacenamiento.js";

import {
    obtenerDisponibilidadSimulada
} from "./pages/nueva_cita/datos.js";

document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================
    Meses
    ========================================================== */

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    /* ==========================================================
    Elementos de Agenda
    ========================================================== */

    const titulo = document.getElementById("calendar-title");
    const grid = document.getElementById("calendar-grid");

    const botonAnterior = document.getElementById("calendar-prev");
    const botonHoy = document.getElementById("calendar-today");
    const botonSiguiente = document.getElementById("calendar-next");

    const tituloFechaSeleccionada = document.getElementById(
        "selected-date-title",
    );

    const resumenFechaSeleccionada = document.getElementById(
        "selected-date-summary",
    );

    const listaCitas = document.getElementById("appointments-list");

    /* ==========================================================
    Elementos del modal
    ========================================================== */

    const appointmentForm = document.getElementById("appointment-form");

    const appointmentModalTitle = document.getElementById(
        "appointment-modal-title",
    );

    const appointmentId = document.getElementById("appointment-id");

    const appointmentMode = document.getElementById("appointment-mode");

    const appointmentClient = document.getElementById("appointment-client");

    const appointmentProfessional = document.getElementById("appointment-professional");

    const appointmentDate = document.getElementById("appointment-date");

    const appointmentTime = document.getElementById("appointment-time");

    const appointmentStatus = document.getElementById("appointment-status");

    const appointmentReason = document.getElementById("appointment-reason");

    const appointmentSave = document.getElementById("appointment-save");

    const appointmentModal = new Modal("appointment-modal");

    /* ==========================================================
    Validación inicial
    ========================================================== */

    if (
        !titulo ||
        !grid ||
        !botonAnterior ||
        !botonHoy ||
        !botonSiguiente ||
        !tituloFechaSeleccionada ||
        !resumenFechaSeleccionada ||
        !listaCitas
    ) {
        console.error("No se encontraron los elementos de la agenda.");

        return;
    }

    /* ==========================================================
    Fecha actual
    ========================================================== */

    const hoy = new Date();

    let mesActual = hoy.getMonth();
    let anioActual = hoy.getFullYear();

    /* ==========================================================
    Cambios temporales de la sesión
    ========================================================== */

    /* ==========================================================
    CAMBIOS TEMPORALES DE AGENDA
    ========================================================== */

    const CLAVE_CAMBIOS_AGENDA =
        "opticool_agenda_cambios_simulados";

    function recuperarCambiosAgenda() {

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

    const cambiosCitas = recuperarCambiosAgenda();

    function guardarCambiosAgenda() {

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

    /* ==========================================================
    Indicadores del calendario
    ========================================================== */

    function crearIndicadoresCitas(cantidad) {
        const cantidadVisible = Math.min(cantidad, 3);

        const puntos = Array.from(
            {
                length: cantidadVisible,
            },
            () => {
                return `
                    <span class="agenda-day__dot"></span>
                `;
            },
        ).join("");

        const adicionales =
            cantidad > 3
                ? `
                    <span class="agenda-day__more">
                        +${cantidad - 3}
                    </span>
                `
                : "";

        return `
            <span class="agenda-day__indicators">
                ${puntos}
                ${adicionales}
            </span>
        `;
    }

    /* ==========================================================
    Crear cita simulada
    ========================================================== */

    function crearCita(
        fecha,
        numero,
        hora,
        cliente,
        motivo,
        estado,
        responsableId = null
    ) {
        return {
            id: `${fecha}-${numero}`,
            hora,
            cliente,
            motivo,
            estado,
            responsableId,
        };
    }

    /* ==========================================================
    Datos simulados originales
    ========================================================== */

    function obtenerCitasBase(fecha) {
        const numeroDia = Number(fecha.split("-")[2]);

        if (numeroDia % 5 === 0) {
            return [
                crearCita(
                    fecha,
                    1,
                    "09:00",
                    "María Hernández",
                    "Examen visual",
                    "Confirmada",
                ),

                crearCita(
                    fecha,
                    2,
                    "10:30",
                    "Daniel Ortega",
                    "Consulta inicial",
                    "En espera",
                ),

                crearCita(
                    fecha,
                    3,
                    "12:00",
                    "José Ramírez",
                    "Ajuste de graduación",
                    "Pendiente",
                ),

                crearCita(
                    fecha,
                    4,
                    "14:30",
                    "Fernanda Cruz",
                    "Revisión de armazón",
                    "Confirmada",
                ),

                crearCita(
                    fecha,
                    5,
                    "16:00",
                    "Ana López",
                    "Entrega de lentes",
                    "Confirmada",
                ),
            ];
        }

        if (numeroDia % 3 === 0) {
            return [
                crearCita(
                    fecha,
                    1,
                    "09:00",
                    "María Hernández",
                    "Examen visual",
                    "Confirmada",
                ),

                crearCita(
                    fecha,
                    2,
                    "11:30",
                    "José Ramírez",
                    "Ajuste de graduación",
                    "Pendiente",
                ),

                crearCita(
                    fecha,
                    3,
                    "16:00",
                    "Ana López",
                    "Entrega de lentes",
                    "Confirmada",
                ),
            ];
        }

        if (numeroDia % 2 === 0) {
            return [
                crearCita(
                    fecha,
                    1,
                    "10:00",
                    "Carlos Martínez",
                    "Consulta de seguimiento",
                    "Confirmada",
                ),

                crearCita(
                    fecha,
                    2,
                    "13:30",
                    "Fernanda Cruz",
                    "Revisión de armazón",
                    "Pendiente",
                ),
            ];
        }

        return [];
    }

    /* ==========================================================
    Aplicar cambios simulados
    ========================================================== */

    function aplicarCambiosSimulados(citas, fecha) {
        return citas
            .map((cita) => {
                const cambios = cambiosCitas.get(cita.id);

                if (!cambios) {
                    return cita;
                }

                if (cambios.fecha && cambios.fecha !== fecha) {
                    return null;
                }

                return {
                    ...cita,
                    ...cambios,
                };
            })
            .filter(Boolean);
    }

    /* ==========================================================
    Obtener citas movidas a una fecha
    ========================================================== */

    function obtenerCitasMovidas(fecha) {
        const citasMovidas = [];

        cambiosCitas.forEach((cambios, id) => {

            if (
                cambios.fecha === fecha &&
                cambios.fechaOriginal !== fecha
            ) {
                citasMovidas.push({
                    id,
                    cliente: cambios.cliente,
                    hora: cambios.hora,
                    estado: cambios.estado,
                    motivo: cambios.motivo,

                    // Conservar el profesional responsable
                    responsableId: cambios.responsableId ?? null,

                    // Conservar la fecha de la cita
                    fecha: cambios.fecha
                });
            }

        });

        return citasMovidas;
    }

    /* ==========================================================
    CONVERTIR NOMBRE DE SERVICIO A CÓDIGO INTERNO
    ========================================================== */

    function obtenerCodigoServicio(nombreServicio) {

        const servicios = {
            "consulta general": "consulta-general",
            "seguimiento": "seguimiento",
            "entrega de lentes": "entrega",
            "ajuste de armazón": "ajuste",
            "garantía": "garantia"
        };

        const nombreNormalizado = String(nombreServicio || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const servicioEncontrado = Object.entries(servicios).find(
            ([nombre]) => {

                const nombreCatalogo = nombre
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                return nombreCatalogo === nombreNormalizado;

            }
        );

        return servicioEncontrado
            ? servicioEncontrado[1]
            : null;

    }

    /* ==========================================================
    OBTENER CITAS REGISTRADAS DESDE NUEVA CITA
    ========================================================== */

    function obtenerCitasRegistradas(fecha) {

        const citasGuardadas = obtenerCitasGuardadas();

        const nombresServicios = {
            "consulta-general": "Consulta general",
            "seguimiento": "Seguimiento",
            "entrega": "Entrega de lentes",
            "ajuste": "Ajuste de armazón",
            "garantia": "Garantía"
        };

        return citasGuardadas
            .filter((cita) => {

                return cita.fecha === fecha;

            })
            .map((cita) => {

                return {
                    id: cita.id,
                    fecha: cita.fecha,
                    hora: cita.hora,
                    cliente: cita.pacienteNombre,
                    motivo:
                        nombresServicios[cita.tipoCita] ||
                        cita.tipoCita,
                    estado: cita.estado
                };

            });

    }

    /* ==========================================================
    OBTENER CITAS FINALES

    Combina:
    - Citas simuladas originales
    - Cambios realizados en Agenda
    - Citas registradas desde Nueva cita
    ========================================================== */

    function obtenerCitasSimuladas(fecha) {

        const citasBase = obtenerCitasBase(
            fecha
        );

        const citasActualizadas =
            aplicarCambiosSimulados(
                citasBase,
                fecha
            );

        const citasMovidas =
            obtenerCitasMovidas(
                fecha
            );

        const citasRegistradas =
            obtenerCitasRegistradas(
                fecha
            );

        return [
            ...citasActualizadas,
            ...citasMovidas,
            ...citasRegistradas
        ].sort((a, b) => {

            return a.hora.localeCompare(
                b.hora
            );

        });

    }

    /* ==========================================================
    Renderizar calendario
    ========================================================== */

    function renderizarCalendario() {
        titulo.textContent = `${meses[mesActual]} ${anioActual}`;

        grid.innerHTML = "";

        const primerDiaMes = new Date(anioActual, mesActual, 1);

        const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);

        let posicionInicial = primerDiaMes.getDay();

        posicionInicial = posicionInicial === 0 ? 6 : posicionInicial - 1;

        const ultimoDiaMesAnterior = new Date(anioActual, mesActual, 0).getDate();

        for (let posicion = posicionInicial - 1; posicion >= 0; posicion--) {
            const dia = document.createElement("button");

            dia.type = "button";

            dia.className = "agenda-day agenda-day--other";

            dia.textContent = ultimoDiaMesAnterior - posicion;

            dia.disabled = true;

            grid.appendChild(dia);
        }

        for (let numeroDia = 1; numeroDia <= ultimoDiaMes.getDate(); numeroDia++) {
            const dia = document.createElement("button");

            dia.type = "button";

            dia.className = "agenda-day";

            const fechaDia = crearFechaLocal(anioActual, mesActual, numeroDia);

            dia.dataset.date = fechaDia;

            const cantidadCitas = obtenerCitasSimuladas(fechaDia).length;

            dia.innerHTML = `
                <span class="agenda-day__number">
                    ${numeroDia}
                </span>

                ${cantidadCitas > 0 ? crearIndicadoresCitas(cantidadCitas) : ""}
            `;

            const esHoy =
                numeroDia === hoy.getDate() &&
                mesActual === hoy.getMonth() &&
                anioActual === hoy.getFullYear();

            if (esHoy) {
                dia.classList.add("agenda-day--today");
            }

            dia.addEventListener("click", () => {
                seleccionarDia(dia);
            });

            grid.appendChild(dia);
        }

        const cantidadActual = grid.children.length;

        const diasSiguientes = 42 - cantidadActual;

        for (let numeroDia = 1; numeroDia <= diasSiguientes; numeroDia++) {
            const dia = document.createElement("button");

            dia.type = "button";

            dia.className = "agenda-day agenda-day--other";

            dia.textContent = numeroDia;

            dia.disabled = true;

            grid.appendChild(dia);
        }
    }

    /* ==========================================================
    Seleccionar día
    ========================================================== */

    function seleccionarDia(diaSeleccionado) {
        const diaAnterior = grid.querySelector(".agenda-day--selected");

        if (diaAnterior) {
            diaAnterior.classList.remove("agenda-day--selected");
        }

        diaSeleccionado.classList.add("agenda-day--selected");

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        mostrarCitasDelDia(fechaSeleccionada);
    }

    /* ==========================================================
    Ir a una fecha
    ========================================================== */

    function irAFecha(fecha) {
        const [anio, mes] = fecha.split("-").map(Number);

        anioActual = anio;
        mesActual = mes - 1;

        renderizarCalendario();

        const dia = grid.querySelector(`[data-date="${fecha}"]`);

        if (dia) {
            seleccionarDia(dia);
        }
    }

    /* ==========================================================
    Mostrar citas del día
    ========================================================== */

    function mostrarCitasDelDia(fecha) {
        const fechaObjeto = new Date(`${fecha}T12:00:00`);

        const fechaFormateada = new Intl.DateTimeFormat("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(fechaObjeto);

        tituloFechaSeleccionada.textContent = capitalizarTexto(fechaFormateada);

        const citasSimuladas = obtenerCitasSimuladas(fecha);

        if (citasSimuladas.length === 0) {
            resumenFechaSeleccionada.textContent =
                "No hay citas programadas para este día.";

            listaCitas.innerHTML = `
                <div class="agenda-empty">

                    <span class="agenda-empty__icon">
                        📅
                    </span>

                    <h3 class="agenda-empty__title">
                        Día disponible
                    </h3>

                    <p class="agenda-empty__text">
                        No existen citas registradas
                        para esta fecha.
                    </p>

                </div>
            `;

            return;
        }

        resumenFechaSeleccionada.textContent = `${citasSimuladas.length} ${citasSimuladas.length === 1 ? "cita programada" : "citas programadas"
            }`;

        listaCitas.innerHTML = citasSimuladas
            .map(
                (cita) => `
                        <article
                            class="agenda-appointment"
                            data-appointment-id="${cita.id}"
                        >

                            <div class="agenda-appointment__content">

                                <span class="agenda-appointment__time">
                                    ${cita.hora}
                                </span>

                                <h3 class="agenda-appointment__client">
                                    ${cita.cliente}
                                </h3>

                                <p class="agenda-appointment__reason">
                                    ${cita.motivo}
                                </p>

                                <span
                                    class="
                                        agenda-appointment__status
                                        ${obtenerClaseEstado(cita.estado)}
                                    "
                                >
                                    ${cita.estado}
                                </span>

                            </div>


                            <div class="agenda-appointment__actions">

                                <button
                                    type="button"
                                    class="agenda-appointment__action"
                                    data-action="view"
                                    title="Ver detalles"
                                    aria-label="Ver detalles de la cita"
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    class="agenda-appointment__action"
                                    data-action="edit"
                                    title="Editar cita"
                                    aria-label="Editar cita"
                                >
                                    ✏️
                                </button>

                                <button
                                    type="button"
                                    class="agenda-appointment__action"
                                    data-action="reschedule"
                                    title="Reagendar cita"
                                    aria-label="Reagendar cita"
                                >
                                    📅
                                </button>

                                <button
                                    type="button"
                                    class="
                                        agenda-appointment__action
                                        agenda-appointment__action--danger
                                    "
                                    data-action="cancel"
                                    title="Cancelar cita"
                                    aria-label="Cancelar cita"
                                >
                                    ✕
                                </button>

                            </div>

                        </article>
                    `,
            )
            .join("");

        activarAccionesCitas(citasSimuladas);
    }

    /* ==========================================================
    Activar botones de cada cita
    ========================================================== */

    function activarAccionesCitas(citas) {
        const botonesAccion = listaCitas.querySelectorAll(
            ".agenda-appointment__action",
        );

        botonesAccion.forEach((boton) => {
            boton.addEventListener("click", (evento) => {
                evento.stopPropagation();

                const tarjeta = boton.closest(".agenda-appointment");

                if (!tarjeta) {
                    return;
                }

                const idCita = tarjeta.dataset.appointmentId;

                const cita = citas.find((elemento) => elemento.id === idCita);

                if (!cita) {
                    console.error("No se encontró la cita seleccionada.");

                    return;
                }

                const accion = boton.dataset.action;

                ejecutarAccionCita(accion, cita);
            });
        });
    }

    /* ==========================================================
    Preparar modal de cita
    ========================================================== */

    function prepararModalCita(cita, modo) {
        if (
            !appointmentModalTitle ||
            !appointmentId ||
            !appointmentMode ||
            !appointmentClient ||
            !appointmentProfessional ||
            !appointmentDate ||
            !appointmentTime ||
            !appointmentStatus ||
            !appointmentReason ||
            !appointmentSave
        ) {
            console.error(
                "No se encontraron los campos del modal de cita."
            );

            return;
        }

        /* ======================================================
        Identificación de la cita
        ====================================================== */

        appointmentId.value = cita.id;

        appointmentMode.value = modo;

        /* ======================================================
        Datos generales
        ====================================================== */

        appointmentClient.value = cita.cliente;

        appointmentTime.value = cita.hora;

        appointmentStatus.value = cita.estado;

        appointmentReason.value = cita.motivo;

        const diaSeleccionado = grid.querySelector(
            ".agenda-day--selected"
        );

        appointmentDate.value =
            cita.fecha ||
            diaSeleccionado?.dataset.date ||
            "";

        /* ======================================================
        Identificar el profesional
        ====================================================== */

        const citaRegistrada = obtenerCitasGuardadas().find(
            registro =>
                String(registro.id) === String(cita.id)
        );

        const cambiosOriginales = cambiosCitas.get(cita.id);

        const responsableId =
            citaRegistrada?.responsableId ??
            cambiosOriginales?.responsableId ??
            cita.responsableId ??
            null;

        appointmentProfessional.value =
            responsableId === null ||
                responsableId === undefined
                ? ""
                : String(responsableId);

        /* ======================================================
        Restaurar campos
        ====================================================== */

        appointmentClient.disabled = false;

        appointmentProfessional.disabled = false;

        appointmentDate.disabled = false;

        appointmentTime.disabled = false;

        appointmentStatus.disabled = false;

        appointmentReason.disabled = false;

        appointmentSave.hidden = false;

        /* ======================================================
        Modo: Ver detalles
        ====================================================== */

        if (modo === "view") {
            appointmentModalTitle.textContent =
                "Detalles de la cita";

            appointmentClient.disabled = true;

            appointmentProfessional.disabled = true;

            appointmentDate.disabled = true;

            appointmentTime.disabled = true;

            appointmentStatus.disabled = true;

            appointmentReason.disabled = true;

            appointmentSave.hidden = true;
        }

        /* ======================================================
        Modo: Editar
        ====================================================== */

        if (modo === "edit") {
            appointmentModalTitle.textContent =
                "Editar cita";

            appointmentSave.textContent =
                "Guardar cambios";

            // Las citas creadas desde Nueva cita
            // conservan su profesional original.
            if (citaRegistrada) {
                appointmentProfessional.disabled = true;
            }
        }

        /* ======================================================
        Modo: Reagendar
        ====================================================== */

        if (modo === "reschedule") {
            appointmentModalTitle.textContent =
                "Reagendar cita";

            appointmentClient.disabled = true;

            appointmentStatus.disabled = true;

            appointmentReason.disabled = true;

            appointmentSave.textContent =
                "Reagendar cita";

            // Las citas creadas desde Nueva cita
            // conservan su profesional original.
            if (citaRegistrada) {
                appointmentProfessional.disabled = true;
            }
        }

        appointmentModal.open();
    }

    /* ==========================================================
    CANCELAR CITA

    - Citas registradas: sessionStorage
    - Citas originales: Map temporal
    - Conserva el registro cancelado
    ========================================================== */

    function cancelarCita(cita) {

        if (cita.estado === "Cancelada") {
            window.alert("Esta cita ya se encuentra cancelada.");
            return;
        }

        const confirmar = window.confirm(
            `¿Deseas cancelar la cita de ${cita.cliente}?`
        );

        if (!confirmar) {
            return;
        }

        const diaSeleccionado = grid.querySelector(
            ".agenda-day--selected"
        );

        if (!diaSeleccionado) {
            return;
        }

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        /* ======================================================
        IDENTIFICAR SI LA CITA ESTÁ EN SESSIONSTORAGE
        ====================================================== */

        const citaGuardada = obtenerCitasGuardadas().find(
            (registro) => String(registro.id) === String(cita.id)
        );

        if (citaGuardada) {

            /* ==============================================
            CANCELAR CITA REGISTRADA
            ============================================== */

            const resultado = actualizarCitaSimulada(
                cita.id,
                {
                    estado: "Cancelada"
                }
            );

            if (!resultado.exito) {

                window.alert(
                    "No fue posible cancelar la cita. Inténtalo nuevamente."
                );

                return;
            }

        } else {

            /* ==============================================
            CANCELAR CITA SIMULADA ORIGINAL
            ============================================== */

            const cambiosAnteriores =
                cambiosCitas.get(cita.id) ?? {};

            cambiosCitas.set(cita.id, {

                ...cambiosAnteriores,

                cliente:
                    cambiosAnteriores.cliente ?? cita.cliente,

                hora:
                    cambiosAnteriores.hora ?? cita.hora,

                motivo:
                    cambiosAnteriores.motivo ?? cita.motivo,

                estado: "Cancelada",

                fechaOriginal:
                    cambiosAnteriores.fechaOriginal ??
                    fechaSeleccionada,

                fecha:
                    cambiosAnteriores.fecha ??
                    fechaSeleccionada

            });

            guardarCambiosAgenda();

        }

        /* ======================================================
        ACTUALIZAR CALENDARIO Y LISTA
        ====================================================== */

        renderizarCalendario();

        const diaActual = grid.querySelector(
            `[data-date="${fechaSeleccionada}"]`
        );

        if (diaActual) {
            seleccionarDia(diaActual);
        }

    }

    /* ==========================================================
    Ejecutar acción
    ========================================================== */

    function ejecutarAccionCita(accion, cita) {
        switch (accion) {
            case "view":
                prepararModalCita(cita, "view");

                break;

            case "edit":
                prepararModalCita(cita, "edit");

                break;

            case "reschedule":
                prepararModalCita(cita, "reschedule");

                break;

            case "cancel":
                cancelarCita(cita);

                break;

            default:
                console.warn("La acción seleccionada no existe.");
        }
    }

    /* ==========================================================
    Guardar edición / reagendar
    ========================================================== */

    appointmentForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const idCita = appointmentId.value;

        const modo = appointmentMode.value;

        if (!idCita) {
            console.error("No se encontró el ID de la cita.");

            return;
        }

        const diaSeleccionado = grid.querySelector(".agenda-day--selected");

        if (!diaSeleccionado) {
            return;
        }

        /* ======================================================
        Conservar la fecha de origen de citas originales
        ====================================================== */

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        const citaRegistradaAnterior = obtenerCitasGuardadas().find(
            (cita) => String(cita.id) === String(idCita)
        );

        const cambiosAnteriores = cambiosCitas.get(idCita);

        const fechaOriginal = citaRegistradaAnterior
            ? fechaSeleccionada
            : (
                cambiosAnteriores?.fechaOriginal ||
                fechaSeleccionada
            );

        const nuevaFecha = appointmentDate.value || fechaSeleccionada;

        const cambios = {
            cliente: appointmentClient.value.trim(),
            hora: appointmentTime.value,
            estado: appointmentStatus.value,
            motivo: appointmentReason.value.trim(),
            fechaOriginal,
            fecha: nuevaFecha,

            responsableId: appointmentProfessional.value
                ? Number(appointmentProfessional.value)
                : null
        };

        if (modo === "reschedule") {
            cambios.estado = "Reagendada";
        }

        /* ======================================================
        IDENTIFICAR ORIGEN DE LA CITA
        ====================================================== */

        const citaRegistrada = obtenerCitasGuardadas().find(
            (cita) => String(cita.id) === String(idCita)
        );

        console.log(
            "Opticool - Origen de la cita:",
            citaRegistrada
                ? "Nueva cita (sessionStorage)"
                : "Agenda (datos simulados)"
        );

        /* ======================================================
        Validar profesional de citas originales
        ====================================================== */

        if (!citaRegistrada && !cambios.responsableId) {
            window.alert(
                "Selecciona un profesional responsable para continuar."
            );

            appointmentProfessional.focus();

            return;
        }

        /* ======================================================
        GUARDAR SEGÚN EL ORIGEN DE LA CITA
        ====================================================== */

        if (citaRegistrada) {

            /* ==============================================
               VALIDAR SERVICIO DE LA CITA
            ============================================== */

            const codigoServicio = obtenerCodigoServicio(
                cambios.motivo
            );

            if (!codigoServicio) {

                window.alert(
                    "El servicio indicado no es válido. " +
                    "Selecciona uno de los servicios disponibles."
                );

                return;
            }

            /* ==============================================
            VALIDAR CONFLICTOS DE HORARIO
            ============================================== */

            const fechaCita = cambios.fecha;
            const horaCita = cambios.hora;

            const fechaValida =
                /^\d{4}-\d{2}-\d{2}$/.test(fechaCita) &&
                !Number.isNaN(
                    new Date(`${fechaCita}T00:00:00`).getTime()
                ) &&
                new Date(`${fechaCita}T00:00:00`)
                    .toLocaleDateString("en-CA") === fechaCita;

            if (!fechaValida) {
                window.alert("Selecciona una fecha válida.");
                return;
            }

            const ahora = new Date();

            const fechaHoy = [
                ahora.getFullYear(),
                String(ahora.getMonth() + 1).padStart(2, "0"),
                String(ahora.getDate()).padStart(2, "0")
            ].join("-");

            if (fechaCita < fechaHoy) {
                window.alert(
                    "No puedes reagendar una cita a una fecha anterior a hoy."
                );
                return;
            }

            const horaValida = /^\d{2}:\d{2}$/.test(horaCita);

            if (!horaValida) {
                window.alert("Selecciona un horario válido.");
                return;
            }

            const fechaHoraSeleccionada = new Date(
                `${fechaCita}T${horaCita}:00`
            );

            if (
                Number.isNaN(fechaHoraSeleccionada.getTime()) ||
                fechaHoraSeleccionada < ahora
            ) {
                window.alert(
                    "No puedes reagendar una cita a un horario que ya pasó."
                );
                return;
            }

            const horarioOcupado = obtenerCitasGuardadas().some(
                (otraCita) => {

                    if (String(otraCita.id) === String(idCita)) {
                        return false;
                    }

                    if (otraCita.estado === "Cancelada") {
                        return false;
                    }

                    return (
                        otraCita.fecha === fechaCita &&
                        otraCita.hora === horaCita &&
                        String(otraCita.responsableId) ===
                        String(citaRegistrada.responsableId)
                    );
                }
            );

            if (horarioOcupado) {
                window.alert(
                    "Este horario ya está ocupado para el profesional seleccionado."
                );
                return;
            }

            /* ==============================================
            VALIDAR DISPONIBILIDAD SIMULADA
            ============================================== */

            const disponibilidadSimulada = obtenerDisponibilidadSimulada(
                fechaCita,
                citaRegistrada.responsableId
            );

            const horarioSimulado = disponibilidadSimulada.find(
                (horario) => horario.hora === horaCita
            );

            if (!horarioSimulado) {

                window.alert(
                    "El horario seleccionado no pertenece a los horarios disponibles."
                );

                return;
            }

            if (!horarioSimulado.disponible) {

                window.alert(
                    "Este horario no está disponible para el profesional seleccionado."
                );

                return;
            }

            /* ==============================================
            PREPARAR DATOS ACTUALIZADOS
            ============================================== */

            const cambiosRegistro = {
                pacienteNombre: cambios.cliente,
                fecha: cambios.fecha,
                hora: cambios.hora,
                estado: cambios.estado,
                tipoCita: codigoServicio
            };

            const resultado = actualizarCitaSimulada(
                idCita,
                cambiosRegistro
            );

            if (!resultado.exito) {

                window.alert(
                    "No fue posible actualizar la cita registrada."
                );

                return;
            }

        } else {

            /* ==============================================
            VALIDAR CONFLICTOS CON CITAS REGISTRADAS
            ============================================== */

            const conflictoConCitaRegistrada = obtenerCitasGuardadas().some(
                (otraCita) => {

                    if (otraCita.estado === "Cancelada") {
                        return false;
                    }

                    return (
                        otraCita.fecha === cambios.fecha &&
                        otraCita.hora === cambios.hora &&
                        String(otraCita.responsableId) ===
                        String(cambios.responsableId)
                    );
                }
            );

            if (conflictoConCitaRegistrada) {

                window.alert(
                    "Este horario ya está ocupado para el profesional seleccionado."
                );

                return;
            }

            /* ==============================================
            VALIDAR CONFLICTOS ENTRE CITAS ORIGINALES
            ============================================== */

            const conflictoConCitaOriginal = obtenerCitasSimuladas(
                cambios.fecha
            ).some((otraCita) => {

                // No comparar la cita consigo misma
                if (String(otraCita.id) === String(idCita)) {
                    return false;
                }

                // Las citas canceladas no ocupan horarios
                if (otraCita.estado === "Cancelada") {
                    return false;
                }

                // Identificar únicamente citas originales
                const esCitaRegistrada = obtenerCitasGuardadas().some(
                    (registro) =>
                        String(registro.id) === String(otraCita.id)
                );

                if (esCitaRegistrada) {
                    return false;
                }

                // Recuperar el profesional de la cita original
                const cambiosOtraCita = cambiosCitas.get(otraCita.id);

                const responsableOtraCita =
                    cambiosOtraCita?.responsableId ??
                    otraCita.responsableId ??
                    null;

                // Comparar fecha, hora y profesional
                return (
                    otraCita.hora === cambios.hora &&
                    responsableOtraCita !== null &&
                    String(responsableOtraCita) ===
                    String(cambios.responsableId)
                );
            });

            if (conflictoConCitaOriginal) {

                window.alert(
                    "Ya existe otra cita de Agenda en este horario " +
                    "para el profesional seleccionado."
                );

                return;
            }

            /* ==============================================
            CITA SIMULADA ORIGINAL DE AGENDA
            ============================================== */

            /* ==============================================
            VALIDAR FECHA Y HORA DE CITA ORIGINAL
            ============================================== */

            const fechaCitaOriginal = cambios.fecha;
            const horaCitaOriginal = cambios.hora;

            const fechaConstruida = new Date(
                `${fechaCitaOriginal}T00:00:00`
            );

            const fechaValida =
                /^\d{4}-\d{2}-\d{2}$/.test(fechaCitaOriginal) &&
                !Number.isNaN(fechaConstruida.getTime()) &&
                [
                    fechaConstruida.getFullYear(),
                    String(fechaConstruida.getMonth() + 1).padStart(2, "0"),
                    String(fechaConstruida.getDate()).padStart(2, "0")
                ].join("-") === fechaCitaOriginal;

            if (!fechaValida) {
                window.alert("Selecciona una fecha válida.");
                return;
            }

            const horaValida = /^\d{2}:\d{2}$/.test(horaCitaOriginal);

            if (!horaValida) {
                window.alert("Selecciona un horario válido.");
                return;
            }

            const fechaHoraCita = new Date(
                `${fechaCitaOriginal}T${horaCitaOriginal}:00`
            );

            if (
                Number.isNaN(fechaHoraCita.getTime()) ||
                fechaHoraCita < new Date()
            ) {
                window.alert(
                    "No puedes guardar una cita en una fecha u horario que ya pasó."
                );

                return;
            }

            /* ==============================================
            VALIDAR DISPONIBILIDAD SIMULADA
            DE CITAS ORIGINALES
            ============================================== */

            const disponibilidadOriginal = obtenerDisponibilidadSimulada(
                cambios.fecha,
                cambios.responsableId
            );

            const horarioDisponibleOriginal = disponibilidadOriginal.find(
                (horario) => horario.hora === cambios.hora
            );

            if (!horarioDisponibleOriginal) {
                window.alert(
                    "El horario seleccionado no pertenece a los horarios disponibles."
                );

                return;
            }

            if (!horarioDisponibleOriginal.disponible) {
                window.alert(
                    "Este horario no está disponible para el profesional seleccionado."
                );

                return;
            }

            cambiosCitas.set(idCita, cambios);


            const guardado = guardarCambiosAgenda();

            if (!guardado) {

                window.alert(
                    "No fue posible conservar los cambios de la cita."
                );

                return;
            }

        }

        /* ======================================================
        CERRAR MODAL Y ACTUALIZAR CALENDARIO
        ====================================================== */

        appointmentModal.close();

        irAFecha(nuevaFecha);
    });

    /* ==========================================================
    Clase CSS según estado
    ========================================================== */

    function obtenerClaseEstado(estado) {
        const estadoNormalizado = estado
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const clases = {
            confirmada: "agenda-appointment__status--confirmed",

            pendiente: "agenda-appointment__status--pending",

            "en espera": "agenda-appointment__status--waiting",

            cancelada: "agenda-appointment__status--cancelled",

            atendida: "agenda-appointment__status--completed",

            reagendada: "agenda-appointment__status--rescheduled",
        };

        return clases[estadoNormalizado] ?? "agenda-appointment__status--default";
    }

    /* ==========================================================
    Capitalizar texto
    ========================================================== */

    function capitalizarTexto(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    /* ==========================================================
    Crear fecha local
    ========================================================== */

    function crearFechaLocal(anio, mes, dia) {
        const mesFormateado = String(mes + 1).padStart(2, "0");

        const diaFormateado = String(dia).padStart(2, "0");

        return `${anio}-${mesFormateado}-${diaFormateado}`;
    }

    /* ==========================================================
    Mes anterior
    ========================================================== */

    botonAnterior.addEventListener("click", () => {
        mesActual--;

        if (mesActual < 0) {
            mesActual = 11;
            anioActual--;
        }

        renderizarCalendario();
    });

    /* ==========================================================
    Mes siguiente
    ========================================================== */

    botonSiguiente.addEventListener("click", () => {
        mesActual++;

        if (mesActual > 11) {
            mesActual = 0;
            anioActual++;
        }

        renderizarCalendario();
    });

    /* ==========================================================
    Hoy
    ========================================================== */

    botonHoy.addEventListener("click", () => {
        mesActual = hoy.getMonth();

        anioActual = hoy.getFullYear();

        renderizarCalendario();

        const fechaHoy = crearFechaLocal(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate(),
        );

        const diaHoy = grid.querySelector(`[data-date="${fechaHoy}"]`);

        if (diaHoy) {
            seleccionarDia(diaHoy);
        }
    });

    /* ==========================================================
    NAVEGACIÓN A NUEVA CITA
    
    Envía la fecha seleccionada en Agenda.
    Si no hay fecha seleccionada, conserva
    la navegación normal.
    ========================================================== */

    const enlacesNuevaCita = document.querySelectorAll(
        "[data-agenda-nueva-cita]",
    );

    enlacesNuevaCita.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const diaSeleccionado = grid.querySelector(".agenda-day--selected");

            if (!diaSeleccionado) {
                return;
            }

            const fechaSeleccionada = diaSeleccionado.dataset.date;

            if (!fechaSeleccionada) {
                return;
            }

            const url = new URL(enlace.href);

            url.searchParams.set("fecha", fechaSeleccionada);

            enlace.href = url.toString();
        });
    });

    /* ==========================================================
    Inicializar
    ========================================================== */

    renderizarCalendario();
});
