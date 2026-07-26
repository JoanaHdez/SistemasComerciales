document.addEventListener("DOMContentLoaded", () => {

    const meses = [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const titulo = document.getElementById("calendar-title");
    const grid = document.getElementById("calendar-grid");

    const hoy = new Date();

    let mes = hoy.getMonth();
    let anio = hoy.getFullYear();

    function renderCalendar(){

        titulo.textContent = `${meses[mes]} ${anio}`;

        grid.innerHTML = "";

        const primerDia = new Date(anio, mes, 1);

        const ultimoDia = new Date(anio, mes + 1, 0);

        let inicio = primerDia.getDay();

        inicio = inicio === 0 ? 6 : inicio - 1;

        for(let i = 0; i < inicio; i++){

            const vacio = document.createElement("div");
            vacio.className = "agenda-day agenda-day--other";

            grid.appendChild(vacio);

        }

        for(let dia = 1; dia <= ultimoDia.getDate(); dia++){

            const celda = document.createElement("div");

            celda.className = "agenda-day";

            celda.textContent = dia;

            if(
                dia === hoy.getDate() &&
                mes === hoy.getMonth() &&
                anio === hoy.getFullYear()
            ){

                celda.classList.add("agenda-day--today");

            }

            grid.appendChild(celda);

        }

    }

    renderCalendar();

});