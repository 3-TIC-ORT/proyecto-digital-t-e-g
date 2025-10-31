document.addEventListener('DOMContentLoaded', () => {

    let paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    let paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    // ✅ Un solo objeto que contiene todo
    let datos = {
        fichas: {},
        fichasDisponibles: 8
    };

    // ✅ Cargar datos desde el backend
    function cargarDatos() {
        fetch("http://localhost:3000/cargar")
            .then(res => res.json())
            .then(data => {
                // Si el archivo tiene datos, se actualiza el objeto
                datos = data || { fichas: {}, fichasDisponibles: 8 };
                actualizarDisplay();
            })
            .catch(() => {
                console.log("No se pudieron cargar los datos del servidor");
            });
    }


    function guardarDatos() {
        fetch("http://localhost:3000/guardar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
        .catch(() => {
            console.log("Error al guardar los datos");
        });
    }

    function actualizarDisplay() {
        let encabezado = document.querySelector('.encabezado h1');
        if (encabezado) {
            encabezado.textContent = `JUGADOR 1, TENÉS ${datos.fichasDisponibles} FICHAS PARA DISTRIBUIR ENTRE TUS PAISES`;
        }

        let botones = document.querySelectorAll(".rectangulo-gris button");
        botones.forEach(boton => {
            let pais = boton.id;
            let cantidadFichas = datos.fichas[pais] !== undefined ? datos.fichas[pais] : 1;
            boton.textContent = `${pais} (${cantidadFichas})`;

            if (paisesJugador2.includes(pais)) {
                boton.disabled = true;
            } else if (paisesJugador1.includes(pais)) {
                boton.disabled = (datos.fichasDisponibles === 0);
            }
        });
    }

    function manejarClickPais(event) {
        let pais = event.target.id;

        if (paisesJugador1.includes(pais) && datos.fichasDisponibles > 0) {
            if (datos.fichas[pais] === undefined) {
                datos.fichas[pais] = 1;
            }

            datos.fichas[pais]++;
            datos.fichasDisponibles--;

            actualizarDisplay();

            // ✅ Guardar los cambios en el backend
            guardarDatos();
        }
    }

    let botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", manejarClickPais);
    });

    // ✅ Cargar datos al iniciar
    cargarDatos();
});

window.onload = function(cargarDatos) {
    cargarDatos();
}