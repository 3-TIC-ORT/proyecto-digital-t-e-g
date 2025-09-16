document.addEventListener('DOMContentLoaded', () => {
    // Definir los países de cada jugador
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    // Obtener los datos de fichas y el turno actual desde localStorage
    const fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
    let turnoJugador = localStorage.getItem('turnoJugador') || 'jugador2';

    // Función para actualizar el estado de los botones y el encabezado
    function actualizarDisplay() {
        // Actualizar el texto del encabezado según el turno del jugador
        const encabezado = document.querySelector('.encabezado h1');
        if (encabezado) {
            if (turnoJugador === 'jugador2') {
                encabezado.textContent = 'JUGADOR 2, SELECCIONA TU PAÍS ATACANTE';
            } else {
                encabezado.textContent = 'JUGADOR 1, SELECCIONA TU PAÍS DEFENSOR';
            }
        }
        
        // Actualizar el texto y el estado de cada botón de país
        const botones = document.querySelectorAll(".rectangulo-gris button");
        botones.forEach(boton => {
            // Mostrar la cantidad de fichas de cada país
            if (fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            // Deshabilitar los botones del jugador que no está en turno
            if (turnoJugador === 'jugador2') {
                boton.disabled = !paisesJugador2.includes(boton.id);
            } else {
                boton.disabled = !paisesJugador1.includes(boton.id);
            }
        });
    }

    // Manejar el evento de clic en los botones
    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            if (turnoJugador === 'jugador2') {
                if (paisesJugador2.includes(boton.id)) {
                    localStorage.setItem('paisAtacante', boton.id);
                    turnoJugador = 'jugador1';
                    localStorage.setItem('turnoJugador', turnoJugador);
                    actualizarDisplay();
                }
            } else {
                if (paisesJugador1.includes(boton.id)) {
                    localStorage.setItem('paisDefensor', boton.id);
                    localStorage.setItem('turnoJugador', 'jugador2');
                    window.location.href = "Dado2.html";
                }
            }
        });
    });

    // Llamar a la función al cargar la página para mostrar los datos actualizados
    actualizarDisplay();
});