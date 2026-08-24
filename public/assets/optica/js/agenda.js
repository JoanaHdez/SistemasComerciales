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

    const listaCitas = document.getElementById(
        "appointments-list",
    );


    /* ==========================================================
       Elementos del modal
    ========================================================== */

    const appointmentForm = document.getElementById(
        "appointment-form",
    );

    const appointmentModalTitle = document.getElementById(
        "appointment-modal-title",
    );

    const appointmentId = document.getElementById(
        "appointment-id",
    );

    const appointmentMode = document.getElementById(
        "appointment-mode",
    );

    const appointmentClient = document.getElementById(
        "appointment-client",
    );

    const appointmentDate = document.getElementById(
        "appointment-date",
    );

    const appointmentTime = document.getElementById(
        "appointment-time",
    );

    const appointmentStatus = document.getElementById(
        "appointment-status",
    );

    const appointmentReason = document.getElementById(
        "appointment-reason",
    );

    const appointmentSave = document.getElementById(
        "appointment-save",
    );

    const appointmentModal = new Modal(
        "appointment-modal",
    );


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
        console.error(
            "No se encontraron los elementos de la agenda.",
        );

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

    const cambiosCitas = new Map();


    /* ==========================================================
       Indicadores del calendario
    ========================================================== */

    function crearIndicadoresCitas(cantidad) {

        const cantidadVisible = Math.min(
            cantidad,
            3,
        );

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
    ) {
        return {
            id: `${fecha}-${numero}`,
            hora,
            cliente,
            motivo,
            estado,
        };
    }


    /* ==========================================================
       Datos simulados originales
    ========================================================== */

    function obtenerCitasBase(fecha) {

        const numeroDia = Number(
            fecha.split("-")[2],
        );


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

    function aplicarCambiosSimulados(
        citas,
        fecha,
    ) {

        return citas
            .map((cita) => {

                const cambios = cambiosCitas.get(
                    cita.id,
                );

                if (!cambios) {
                    return cita;
                }


                if (
                    cambios.fecha &&
                    cambios.fecha !== fecha
                ) {
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

        cambiosCitas.forEach(
            (cambios, id) => {

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
                    });
                }
            },
        );

        return citasMovidas;
    }


    /* ==========================================================
       Obtener citas finales
    ========================================================== */

    function obtenerCitasSimuladas(fecha) {

        const citasBase = obtenerCitasBase(
            fecha,
        );

        const citasActualizadas =
            aplicarCambiosSimulados(
                citasBase,
                fecha,
            );

        const citasMovidas =
            obtenerCitasMovidas(
                fecha,
            );


        return [
            ...citasActualizadas,
            ...citasMovidas,
        ].sort((a, b) => {

            return a.hora.localeCompare(
                b.hora,
            );
        });
    }


    /* ==========================================================
       Renderizar calendario
    ========================================================== */

    function renderizarCalendario() {

        titulo.textContent =
            `${meses[mesActual]} ${anioActual}`;

        grid.innerHTML = "";


        const primerDiaMes = new Date(
            anioActual,
            mesActual,
            1,
        );

        const ultimoDiaMes = new Date(
            anioActual,
            mesActual + 1,
            0,
        );


        let posicionInicial =
            primerDiaMes.getDay();

        posicionInicial =
            posicionInicial === 0
                ? 6
                : posicionInicial - 1;


        const ultimoDiaMesAnterior =
            new Date(
                anioActual,
                mesActual,
                0,
            ).getDate();


        for (
            let posicion = posicionInicial - 1;
            posicion >= 0;
            posicion--
        ) {

            const dia =
                document.createElement(
                    "button",
                );

            dia.type = "button";

            dia.className =
                "agenda-day agenda-day--other";

            dia.textContent =
                ultimoDiaMesAnterior -
                posicion;

            dia.disabled = true;

            grid.appendChild(dia);
        }


        for (
            let numeroDia = 1;
            numeroDia <= ultimoDiaMes.getDate();
            numeroDia++
        ) {

            const dia =
                document.createElement(
                    "button",
                );

            dia.type = "button";

            dia.className =
                "agenda-day";


            const fechaDia =
                crearFechaLocal(
                    anioActual,
                    mesActual,
                    numeroDia,
                );

            dia.dataset.date =
                fechaDia;


            const cantidadCitas =
                obtenerCitasSimuladas(
                    fechaDia,
                ).length;


            dia.innerHTML = `
                <span class="agenda-day__number">
                    ${numeroDia}
                </span>

                ${
                    cantidadCitas > 0
                        ? crearIndicadoresCitas(
                            cantidadCitas,
                        )
                        : ""
                }
            `;


            const esHoy =
                numeroDia === hoy.getDate() &&
                mesActual === hoy.getMonth() &&
                anioActual === hoy.getFullYear();


            if (esHoy) {
                dia.classList.add(
                    "agenda-day--today",
                );
            }


            dia.addEventListener(
                "click",
                () => {

                    seleccionarDia(dia);
                },
            );


            grid.appendChild(dia);
        }


        const cantidadActual =
            grid.children.length;

        const diasSiguientes =
            42 - cantidadActual;


        for (
            let numeroDia = 1;
            numeroDia <= diasSiguientes;
            numeroDia++
        ) {

            const dia =
                document.createElement(
                    "button",
                );

            dia.type = "button";

            dia.className =
                "agenda-day agenda-day--other";

            dia.textContent =
                numeroDia;

            dia.disabled = true;

            grid.appendChild(dia);
        }
    }


    /* ==========================================================
       Seleccionar día
    ========================================================== */

    function seleccionarDia(
        diaSeleccionado,
    ) {

        const diaAnterior =
            grid.querySelector(
                ".agenda-day--selected",
            );


        if (diaAnterior) {

            diaAnterior.classList.remove(
                "agenda-day--selected",
            );
        }


        diaSeleccionado.classList.add(
            "agenda-day--selected",
        );


        const fechaSeleccionada =
            diaSeleccionado.dataset.date;


        mostrarCitasDelDia(
            fechaSeleccionada,
        );
    }


    /* ==========================================================
       Ir a una fecha
    ========================================================== */

    function irAFecha(fecha) {

        const [
            anio,
            mes,
        ] = fecha
            .split("-")
            .map(Number);


        anioActual = anio;
        mesActual = mes - 1;


        renderizarCalendario();


        const dia =
            grid.querySelector(
                `[data-date="${fecha}"]`,
            );


        if (dia) {
            seleccionarDia(dia);
        }
    }


    /* ==========================================================
       Mostrar citas del día
    ========================================================== */

    function mostrarCitasDelDia(fecha) {

        const fechaObjeto =
            new Date(
                `${fecha}T12:00:00`,
            );


        const fechaFormateada =
            new Intl.DateTimeFormat(
                "es-MX",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                },
            ).format(
                fechaObjeto,
            );


        tituloFechaSeleccionada.textContent =
            capitalizarTexto(
                fechaFormateada,
            );


        const citasSimuladas =
            obtenerCitasSimuladas(
                fecha,
            );


        if (
            citasSimuladas.length === 0
        ) {

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


        resumenFechaSeleccionada.textContent =
            `${citasSimuladas.length} ${
                citasSimuladas.length === 1
                    ? "cita programada"
                    : "citas programadas"
            }`;


        listaCitas.innerHTML =
            citasSimuladas
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


        activarAccionesCitas(
            citasSimuladas,
        );
    }


    /* ==========================================================
       Activar botones de cada cita
    ========================================================== */

    function activarAccionesCitas(citas) {

        const botonesAccion =
            listaCitas.querySelectorAll(
                ".agenda-appointment__action",
            );


        botonesAccion.forEach(
            (boton) => {

                boton.addEventListener(
                    "click",
                    (evento) => {

                        evento.stopPropagation();


                        const tarjeta =
                            boton.closest(
                                ".agenda-appointment",
                            );


                        if (!tarjeta) {
                            return;
                        }


                        const idCita =
                            tarjeta.dataset
                                .appointmentId;


                        const cita =
                            citas.find(
                                (elemento) =>
                                    elemento.id ===
                                    idCita,
                            );


                        if (!cita) {

                            console.error(
                                "No se encontró la cita seleccionada.",
                            );

                            return;
                        }


                        const accion =
                            boton.dataset.action;


                        ejecutarAccionCita(
                            accion,
                            cita,
                        );
                    },
                );
            },
        );
    }


    /* ==========================================================
       Preparar modal
    ========================================================== */

    function prepararModalCita(
        cita,
        modo,
    ) {

        if (
            !appointmentModalTitle ||
            !appointmentId ||
            !appointmentMode ||
            !appointmentClient ||
            !appointmentDate ||
            !appointmentTime ||
            !appointmentStatus ||
            !appointmentReason ||
            !appointmentSave
        ) {

            console.error(
                "No se encontraron los campos del modal de cita.",
            );

            return;
        }


        appointmentId.value =
            cita.id;

        appointmentMode.value =
            modo;

        appointmentClient.value =
            cita.cliente;

        appointmentTime.value =
            cita.hora;

        appointmentStatus.value =
            cita.estado;

        appointmentReason.value =
            cita.motivo;


        const diaSeleccionado =
            grid.querySelector(
                ".agenda-day--selected",
            );


        appointmentDate.value =
            diaSeleccionado?.dataset
                .date ?? "";


        appointmentClient.disabled =
            false;

        appointmentDate.disabled =
            false;

        appointmentTime.disabled =
            false;

        appointmentStatus.disabled =
            false;

        appointmentReason.disabled =
            false;

        appointmentSave.hidden =
            false;


        if (modo === "view") {

            appointmentModalTitle.textContent =
                "Detalles de la cita";

            appointmentClient.disabled =
                true;

            appointmentDate.disabled =
                true;

            appointmentTime.disabled =
                true;

            appointmentStatus.disabled =
                true;

            appointmentReason.disabled =
                true;

            appointmentSave.hidden =
                true;
        }


        if (modo === "edit") {

            appointmentModalTitle.textContent =
                "Editar cita";

            appointmentSave.textContent =
                "Guardar cambios";
        }


        if (modo === "reschedule") {

            appointmentModalTitle.textContent =
                "Reagendar cita";

            appointmentClient.disabled =
                true;

            appointmentStatus.disabled =
                true;

            appointmentReason.disabled =
                true;

            appointmentSave.textContent =
                "Reagendar cita";
        }


        appointmentModal.open();
    }


    /* ==========================================================
       Cancelar cita
    ========================================================== */

    function cancelarCita(cita) {

        const confirmar =
            window.confirm(
                `¿Deseas cancelar la cita de ${cita.cliente}?`,
            );


        if (!confirmar) {
            return;
        }


        const diaSeleccionado =
            grid.querySelector(
                ".agenda-day--selected",
            );


        if (!diaSeleccionado) {
            return;
        }


        const fechaSeleccionada =
            diaSeleccionado.dataset.date;


        const cambiosAnteriores =
            cambiosCitas.get(
                cita.id,
            ) ?? {};


        cambiosCitas.set(
            cita.id,
            {
                ...cambiosAnteriores,

                cliente:
                    cambiosAnteriores.cliente ??
                    cita.cliente,

                hora:
                    cambiosAnteriores.hora ??
                    cita.hora,

                motivo:
                    cambiosAnteriores.motivo ??
                    cita.motivo,

                estado:
                    "Cancelada",

                fechaOriginal:
                    cambiosAnteriores.fechaOriginal ??
                    fechaSeleccionada,

                fecha:
                    cambiosAnteriores.fecha ??
                    fechaSeleccionada,
            },
        );


        /*
         * Volvemos a dibujar el calendario.
         */
        renderizarCalendario();


        /*
         * Recuperamos el día después del render.
         */
        const diaActual =
            grid.querySelector(
                `[data-date="${fechaSeleccionada}"]`,
            );


        if (diaActual) {

            seleccionarDia(
                diaActual,
            );
        }
    }


    /* ==========================================================
       Ejecutar acción
    ========================================================== */

    function ejecutarAccionCita(
        accion,
        cita,
    ) {

        switch (accion) {

            case "view":

                prepararModalCita(
                    cita,
                    "view",
                );

                break;


            case "edit":

                prepararModalCita(
                    cita,
                    "edit",
                );

                break;


            case "reschedule":

                prepararModalCita(
                    cita,
                    "reschedule",
                );

                break;


            case "cancel":

                cancelarCita(
                    cita,
                );

                break;


            default:

                console.warn(
                    "La acción seleccionada no existe.",
                );
        }
    }


    /* ==========================================================
       Guardar edición / reagendar
    ========================================================== */

    appointmentForm?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const idCita =
                appointmentId.value;

            const modo =
                appointmentMode.value;


            if (!idCita) {

                console.error(
                    "No se encontró el ID de la cita.",
                );

                return;
            }


            const diaSeleccionado =
                grid.querySelector(
                    ".agenda-day--selected",
                );


            if (!diaSeleccionado) {
                return;
            }


            const fechaOriginal =
                diaSeleccionado.dataset.date;


            const nuevaFecha =
                appointmentDate.value ||
                fechaOriginal;


            const cambios = {
                cliente:
                    appointmentClient.value.trim(),

                hora:
                    appointmentTime.value,

                estado:
                    appointmentStatus.value,

                motivo:
                    appointmentReason.value.trim(),

                fechaOriginal,

                fecha:
                    nuevaFecha,
            };


            if (
                modo === "reschedule"
            ) {

                cambios.estado =
                    "Reagendada";
            }


            cambiosCitas.set(
                idCita,
                cambios,
            );


            appointmentModal.close();


            irAFecha(
                nuevaFecha,
            );
        },
    );


    /* ==========================================================
       Clase CSS según estado
    ========================================================== */

    function obtenerClaseEstado(
        estado,
    ) {

        const estadoNormalizado =
            estado
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    "",
                );


        const clases = {
            confirmada:
                "agenda-appointment__status--confirmed",

            pendiente:
                "agenda-appointment__status--pending",

            "en espera":
                "agenda-appointment__status--waiting",

            cancelada:
                "agenda-appointment__status--cancelled",

            atendida:
                "agenda-appointment__status--completed",

            reagendada:
                "agenda-appointment__status--rescheduled",
        };


        return (
            clases[estadoNormalizado] ??
            "agenda-appointment__status--default"
        );
    }


    /* ==========================================================
       Capitalizar texto
    ========================================================== */

    function capitalizarTexto(texto) {

        return (
            texto.charAt(0).toUpperCase() +
            texto.slice(1)
        );
    }


    /* ==========================================================
       Crear fecha local
    ========================================================== */

    function crearFechaLocal(
        anio,
        mes,
        dia,
    ) {

        const mesFormateado =
            String(mes + 1)
                .padStart(
                    2,
                    "0",
                );


        const diaFormateado =
            String(dia)
                .padStart(
                    2,
                    "0",
                );


        return (
            `${anio}-${mesFormateado}-${diaFormateado}`
        );
    }


    /* ==========================================================
       Mes anterior
    ========================================================== */

    botonAnterior.addEventListener(
        "click",
        () => {

            mesActual--;


            if (mesActual < 0) {

                mesActual = 11;
                anioActual--;
            }


            renderizarCalendario();
        },
    );


    /* ==========================================================
       Mes siguiente
    ========================================================== */

    botonSiguiente.addEventListener(
        "click",
        () => {

            mesActual++;


            if (mesActual > 11) {

                mesActual = 0;
                anioActual++;
            }


            renderizarCalendario();
        },
    );


    /* ==========================================================
       Hoy
    ========================================================== */

    botonHoy.addEventListener(
        "click",
        () => {

            mesActual =
                hoy.getMonth();

            anioActual =
                hoy.getFullYear();


            renderizarCalendario();


            const fechaHoy =
                crearFechaLocal(
                    hoy.getFullYear(),
                    hoy.getMonth(),
                    hoy.getDate(),
                );


            const diaHoy =
                grid.querySelector(
                    `[data-date="${fechaHoy}"]`,
                );


            if (diaHoy) {

                seleccionarDia(
                    diaHoy,
                );
            }
        },
    );


    /* ==========================================================
       Inicializar
    ========================================================== */

    renderizarCalendario();

});