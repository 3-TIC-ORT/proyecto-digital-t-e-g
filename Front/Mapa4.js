document.addEventListener('DOMContentLoaded', () => {
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Gran Bretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
    const todosLosPaises = [...paisesJugador1, ...paisesJugador2];

    let paisAtacante = localStorage.getItem('paisAtacante');

    // Inicializa las fichas si no existen
    function inicializarFichas() {
        let fichas = JSON.parse(localStorage.getItem('fichas'));
        if (!fichas) {
            fichas = {};
            todosLosPaises.forEach(pais => {
                fichas[pais] = 3;
            });
            localStorage.setItem('fichas', JSON.stringify(fichas));
        }
    }

    // Actualiza los botones con la cantidad de fichas y habilita según el turno
    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            const cantidadFichas = fichasGuardadas.hasOwnProperty(boton.id)
                ? fichasGuardadas[boton.id]
                : 1;

            boton.textContent = `${boton.id} (${cantidadFichas})`;

            if (!paisAtacante) {
                // Selección de atacante: habilita países del Jugador 2
                boton.disabled = !paisesJugador2.includes(boton.id);
            } else {
                // Selección de defensor: habilita países del Jugador 1
                boton.disabled = !paisesJugador1.includes(boton.id);
            }
        });
    }

    // Manejador de clics para seleccionar atacante y defensor
    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};

            if (!paisAtacante) {
                if (paisesJugador2.includes(boton.id)) {
                    paisAtacante = boton.id;
                    localStorage.setItem('paisAtacante', paisAtacante);
                    actualizarBotones();
                }
            } else {
                if (paisesJugador1.includes(boton.id)) {
                    localStorage.setItem('paisDefensor', boton.id);
                    window.location.href = "Dado2.html";
                }
            }
        });
    });

    inicializarFichas();
    actualizarBotones();
});