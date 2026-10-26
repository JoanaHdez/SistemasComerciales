import {
    obtenerCitasBase
} from "./datos_simulados.js";

import {
    capitalizarTexto,
    obtenerClaseEstado
} from "./utilidades.js";


export function crearGestorCitas(contexto) {

    function aplicarCambiosSimulados(citas, fecha) {
        return citas
            .map((cita) => {
                const cambios = contexto.cambiosCitas.get(cita.id);

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


    function obtenerCitasMovidas(fecha) {
        const citasMovidas = [];

        contexto.cambiosCitas.forEach((cambios, id) => {

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
                    responsableId: cambios.responsableId ?? null,
                    fecha: cambios.fecha
                });
            }

        });

        return citasMovidas;
    }


    function obtenerCitasRegistradas(fecha) {

        const citasGuardadas = contexto.obtenerCitasGuardadas();

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


    function mostrarCitasDelDia(fecha) {
        const fechaObjeto = new Date(`${fecha}T12:00:00`);

        const fechaFormateada = new Intl.DateTimeFormat("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(fechaObjeto);

        contexto.tituloFechaSeleccionada.textContent =
            capitalizarTexto(fechaFormateada);

        const citasSimuladas = obtenerCitasSimuladas(fecha);

        if (citasSimuladas.length === 0) {
            contexto.resumenFechaSeleccionada.textContent =
                "No hay citas programadas para este día.";

            contexto.listaCitas.innerHTML = `
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

        contexto.resumenFechaSeleccionada.textContent = `${citasSimuladas.length} ${citasSimuladas.length === 1 ? "cita programada" : "citas programadas"
            }`;

        contexto.listaCitas.innerHTML = citasSimuladas
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


    function activarAccionesCitas(citas) {
        const botonesAccion = contexto.listaCitas.querySelectorAll(
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

                contexto.modal.ejecutarAccionCita(accion, cita);
            });
        });
    }


    return {
        mostrarCitasDelDia,
        obtenerCitasSimuladas
    };
}
