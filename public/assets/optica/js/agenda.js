document.addEventListener("DOMContentLoaded", () => {
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

    const titulo = document.getElementById("calendar-title");
    const grid = document.getElementById("calendar-grid");

    const botonAnterior = document.getElementById("calendar-prev");
    const botonHoy = document.getElementById("calendar-today");
    const botonSiguiente = document.getElementById("calendar-next");

    const tituloFechaSeleccionada = document.getElementById("selected-date-title",);

    const resumenFechaSeleccionada = document.getElementById("selected-date-summary",);

    const appointmentModal = new Modal("appointment-modal");

    const listaCitas = document.getElementById("appointments-list");

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

    const botonNuevaCita = document.getElementById(
        "open-appointment-modal",
    );

    const botonNuevaCitaSidebar = document.getElementById(
        "sidebar-new-appointment",
    );

    const botonCancelarCita = document.getElementById(
        "appointment-cancel",
    );

    botonNuevaCita?.addEventListener("click", () => {
        appointmentModal.open();
    });

    botonNuevaCitaSidebar?.addEventListener("click", () => {
        appointmentModal.open();
    });

    botonCancelarCita?.addEventListener("click", () => {
        appointmentModal.close();
    });

    const hoy = new Date();

    let mesActual = hoy.getMonth();
    let anioActual = hoy.getFullYear();

    /*
     * Crea los indicadores que aparecen dentro de cada día.
     */
    function crearIndicadoresCitas(cantidad) {
        const cantidadVisible = Math.min(cantidad, 3);

        const puntos = Array.from(
            { length: cantidadVisible },
            () => '<span class="agenda-day__dot"></span>',
        ).join("");

        const adicionales =
            cantidad > 3
                ? `<span class="agenda-day__more">+${cantidad - 3}</span>`
                : "";

        return `
            <span class="agenda-day__indicators">
                ${puntos}
                ${adicionales}
            </span>
        `;
    }

    /*
     * Cantidad simulada de citas por día.
     */
    function obtenerCantidadCitasSimuladas(fecha) {
        const numeroDia = Number(fecha.split("-")[2]);

        if (numeroDia % 5 === 0) {
            return 5;
        }

        if (numeroDia % 3 === 0) {
            return 3;
        }

        if (numeroDia % 2 === 0) {
            return 2;
        }

        return 0;
    }

    /*
     * Genera el calendario mensual.
     */
    function renderizarCalendario() {
        titulo.textContent = `${meses[mesActual]} ${anioActual}`;

        grid.innerHTML = "";

        const primerDiaMes = new Date(anioActual, mesActual, 1);

        const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);

        let posicionInicial = primerDiaMes.getDay();

        posicionInicial = posicionInicial === 0 ? 6 : posicionInicial - 1;

        const ultimoDiaMesAnterior = new Date(anioActual, mesActual, 0).getDate();

        /*
         * Días visibles del mes anterior.
         */
        for (let posicion = posicionInicial - 1; posicion >= 0; posicion--) {
            const dia = document.createElement("button");

            dia.type = "button";
            dia.className = "agenda-day agenda-day--other";

            dia.textContent = ultimoDiaMesAnterior - posicion;

            dia.disabled = true;

            grid.appendChild(dia);
        }

        /*
         * Días del mes actual.
         */
        for (let numeroDia = 1; numeroDia <= ultimoDiaMes.getDate(); numeroDia++) {
            const dia = document.createElement("button");

            dia.type = "button";
            dia.className = "agenda-day";

            const fechaDia = crearFechaLocal(anioActual, mesActual, numeroDia);

            dia.dataset.date = fechaDia;

            const cantidadCitas = obtenerCantidadCitasSimuladas(fechaDia);

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

        /*
         * Completa el calendario hasta tener 42 espacios.
         */
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

    /*
     * Selecciona un día del calendario.
     */
    function seleccionarDia(diaSeleccionado) {
        const diaAnterior = grid.querySelector(".agenda-day--selected");

        if (diaAnterior) {
            diaAnterior.classList.remove("agenda-day--selected");
        }

        diaSeleccionado.classList.add("agenda-day--selected");

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        mostrarCitasDelDia(fechaSeleccionada);
    }

    /*
     * Muestra las citas simuladas del día seleccionado.
     */
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
                        No existen citas registradas para esta fecha.
                    </p>

                </div>
            `;

            return;
        }

        resumenFechaSeleccionada.textContent = `${citasSimuladas.length} citas programadas`;

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

                    <span class="agenda-appointment__status ${obtenerClaseEstado(cita.estado)}">
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
                        class="agenda-appointment__action agenda-appointment__action--danger"
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

    /*
     * Datos temporales para diseñar la interfaz.
     */
    function obtenerCitasSimuladas(fecha) {
        const numeroDia = Number(fecha.split("-")[2]);

        if (numeroDia % 5 === 0) {
            return [
                {
                    id: 1,
                    hora: "09:00",
                    cliente: "María Hernández",
                    motivo: "Examen visual",
                    estado: "Confirmada",
                },
                {
                    id: 2,
                    hora: "10:30",
                    cliente: "Daniel Ortega",
                    motivo: "Consulta inicial",
                    estado: "En espera",
                },
                {
                    id: 3,
                    hora: "12:00",
                    cliente: "José Ramírez",
                    motivo: "Ajuste de graduación",
                    estado: "Pendiente",
                },
                {
                    id: 4,
                    hora: "14:30",
                    cliente: "Fernanda Cruz",
                    motivo: "Revisión de armazón",
                    estado: "Confirmada",
                },
                {
                    id: 5,
                    hora: "16:00",
                    cliente: "Ana López",
                    motivo: "Entrega de lentes",
                    estado: "Confirmada",
                },
            ];
        }

        if (numeroDia % 3 === 0) {
            return [
                {
                    id: 6,
                    hora: "09:00",
                    cliente: "María Hernández",
                    motivo: "Examen visual",
                    estado: "Confirmada",
                },
                {
                    id: 7,
                    hora: "11:30",
                    cliente: "José Ramírez",
                    motivo: "Ajuste de graduación",
                    estado: "Pendiente",
                },
                {
                    id: 8,
                    hora: "16:00",
                    cliente: "Ana López",
                    motivo: "Entrega de lentes",
                    estado: "Confirmada",
                },
            ];
        }

        if (numeroDia % 2 === 0) {
            return [
                {
                    id: 9,
                    hora: "10:00",
                    cliente: "Carlos Martínez",
                    motivo: "Consulta de seguimiento",
                    estado: "Confirmada",
                },
                {
                    id: 10,
                    hora: "13:30",
                    cliente: "Fernanda Cruz",
                    motivo: "Revisión de armazón",
                    estado: "Pendiente",
                },
            ];
        }

        return [];
    }

    function activarAccionesCitas(citas) {
        const botonesAccion = listaCitas.querySelectorAll(
            ".agenda-appointment__action",
        );

        botonesAccion.forEach((boton) => {
            boton.addEventListener("click", (evento) => {
                evento.stopPropagation();

                const tarjeta = boton.closest(
                    ".agenda-appointment",
                );

                if (!tarjeta) {
                    return;
                }

                const idCita = Number(
                    tarjeta.dataset.appointmentId,
                );

                const cita = citas.find(
                    (elemento) => elemento.id === idCita,
                );

                if (!cita) {
                    console.error(
                        "No se encontró la cita seleccionada.",
                    );

                    return;
                }

                const accion = boton.dataset.action;

                ejecutarAccionCita(accion, cita);
            });
        });
    }

    function ejecutarAccionCita(accion, cita) {
        switch (accion) {
            case "view":
                console.log("Ver detalles de la cita:", cita);
                break;

            case "edit":
                appointmentModal.open();
                console.log("Editar cita:", cita);
                break;

            case "reschedule":
                console.log("Reagendar cita:", cita);
                break;

            case "cancel":
                console.log("Cancelar cita:", cita);
                break;

            default:
                console.warn(
                    "La acción seleccionada no existe.",
                );
        }
    }

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

    function capitalizarTexto(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    function crearFechaLocal(anio, mes, dia) {
        const mesFormateado = String(mes + 1).padStart(2, "0");

        const diaFormateado = String(dia).padStart(2, "0");

        return `${anio}-${mesFormateado}-${diaFormateado}`;
    }

    botonAnterior.addEventListener("click", () => {
        mesActual--;

        if (mesActual < 0) {
            mesActual = 11;
            anioActual--;
        }

        renderizarCalendario();
    });

    botonSiguiente.addEventListener("click", () => {
        mesActual++;

        if (mesActual > 11) {
            mesActual = 0;
            anioActual++;
        }

        renderizarCalendario();
    });

    botonHoy.addEventListener("click", () => {
        mesActual = hoy.getMonth();
        anioActual = hoy.getFullYear();

        renderizarCalendario();
    });

    renderizarCalendario();
});
