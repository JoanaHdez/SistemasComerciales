import {
    crearFechaLocal,
    crearIndicadoresCitas,
    meses
} from "./utilidades.js";


export function crearCalendario(contexto) {

    function renderizarCalendario() {
        contexto.titulo.textContent =
            `${meses[contexto.mesActual]} ${contexto.anioActual}`;

        contexto.grid.innerHTML = "";

        const primerDiaMes = new Date(
            contexto.anioActual,
            contexto.mesActual,
            1
        );

        const ultimoDiaMes = new Date(
            contexto.anioActual,
            contexto.mesActual + 1,
            0
        );

        let posicionInicial = primerDiaMes.getDay();

        posicionInicial = posicionInicial === 0 ? 6 : posicionInicial - 1;

        const ultimoDiaMesAnterior = new Date(
            contexto.anioActual,
            contexto.mesActual,
            0
        ).getDate();

        for (let posicion = posicionInicial - 1; posicion >= 0; posicion--) {
            const dia = document.createElement("button");

            dia.type = "button";

            dia.className = "agenda-day agenda-day--other";

            dia.textContent = ultimoDiaMesAnterior - posicion;

            dia.disabled = true;

            contexto.grid.appendChild(dia);
        }

        for (
            let numeroDia = 1;
            numeroDia <= ultimoDiaMes.getDate();
            numeroDia++
        ) {
            const dia = document.createElement("button");

            dia.type = "button";

            dia.className = "agenda-day";

            const fechaDia = crearFechaLocal(
                contexto.anioActual,
                contexto.mesActual,
                numeroDia
            );

            dia.dataset.date = fechaDia;

            const cantidadCitas =
                contexto.citas.obtenerCitasSimuladas(fechaDia).length;

            dia.innerHTML = `
                <span class="agenda-day__number">
                    ${numeroDia}
                </span>

                ${cantidadCitas > 0 ? crearIndicadoresCitas(cantidadCitas) : ""}
            `;

            const esHoy =
                numeroDia === contexto.hoy.getDate() &&
                contexto.mesActual === contexto.hoy.getMonth() &&
                contexto.anioActual === contexto.hoy.getFullYear();

            if (esHoy) {
                dia.classList.add("agenda-day--today");
            }

            dia.addEventListener("click", () => {
                seleccionarDia(dia);
            });

            contexto.grid.appendChild(dia);
        }

        const cantidadActual = contexto.grid.children.length;

        const diasSiguientes = 42 - cantidadActual;

        for (let numeroDia = 1; numeroDia <= diasSiguientes; numeroDia++) {
            const dia = document.createElement("button");

            dia.type = "button";

            dia.className = "agenda-day agenda-day--other";

            dia.textContent = numeroDia;

            dia.disabled = true;

            contexto.grid.appendChild(dia);
        }
    }


    function seleccionarDia(diaSeleccionado) {
        const diaAnterior = contexto.grid.querySelector(
            ".agenda-day--selected"
        );

        if (diaAnterior) {
            diaAnterior.classList.remove("agenda-day--selected");
        }

        diaSeleccionado.classList.add("agenda-day--selected");

        const fechaSeleccionada = diaSeleccionado.dataset.date;

        contexto.citas.mostrarCitasDelDia(fechaSeleccionada);
    }


    function irAFecha(fecha) {
        const [anio, mes] = fecha.split("-").map(Number);

        contexto.anioActual = anio;
        contexto.mesActual = mes - 1;

        renderizarCalendario();

        const dia = contexto.grid.querySelector(`[data-date="${fecha}"]`);

        if (dia) {
            seleccionarDia(dia);
        }
    }


    function inicializarCalendario() {
        contexto.botonAnterior.addEventListener("click", () => {
            contexto.mesActual--;

            if (contexto.mesActual < 0) {
                contexto.mesActual = 11;
                contexto.anioActual--;
            }

            renderizarCalendario();
        });

        contexto.botonSiguiente.addEventListener("click", () => {
            contexto.mesActual++;

            if (contexto.mesActual > 11) {
                contexto.mesActual = 0;
                contexto.anioActual++;
            }

            renderizarCalendario();
        });

        contexto.botonHoy.addEventListener("click", () => {
            contexto.mesActual = contexto.hoy.getMonth();

            contexto.anioActual = contexto.hoy.getFullYear();

            renderizarCalendario();

            const fechaHoy = crearFechaLocal(
                contexto.hoy.getFullYear(),
                contexto.hoy.getMonth(),
                contexto.hoy.getDate(),
            );

            const diaHoy = contexto.grid.querySelector(
                `[data-date="${fechaHoy}"]`
            );

            if (diaHoy) {
                seleccionarDia(diaHoy);
            }
        });

        const enlacesNuevaCita = document.querySelectorAll(
            "[data-agenda-nueva-cita]",
        );

        enlacesNuevaCita.forEach((enlace) => {
            enlace.addEventListener("click", () => {
                const diaSeleccionado = contexto.grid.querySelector(
                    ".agenda-day--selected"
                );

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

        renderizarCalendario();
    }


    return {
        inicializarCalendario,
        irAFecha,
        renderizarCalendario,
        seleccionarDia
    };
}
