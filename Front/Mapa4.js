document.addEventListener('DOMContentLoaded', () => {
    // Jugador 1 (Defensa)
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    // Jugador 2 (Ataque)
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    // En Mapa4, siempre se empieza sin atacante seleccionado (a menos que se vuelva a cargar con uno)
    let paisAtacante = localStorage.getItem('paisAtacante');

    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            // Mostrar fichas
            if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            if (!paisAtacante) {
                // Seleccionar Atacante: Desbloquear todos los países del JUGADOR 2
                boton.disabled = !paisesJugador2.includes(boton.id);
            } else {
                // Seleccionar Defensor: Habilita JUGADOR 1
                boton.disabled = !paisesJugador1.includes(boton.id);
            }
        });
    }

    // Manejador de clics
    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));

            if (!paisAtacante) {
                // Paso 1: Selecciona País ATACANTE (Jugador 2)
                if (paisesJugador2.includes(boton.id)) {
                    // Verificar que el país seleccionado tenga más de 1 ficha
                    if (fichasGuardadas[boton.id] > 1) {
                        paisAtacante = boton.id;
                        localStorage.setItem('paisAtacante', paisAtacante);
                        actualizarBotones();
                    } else {
                        alert('Debes seleccionar un país con al menos 2 fichas para atacar.');
                    }
                }
            } else {
                // Paso 2: Selecciona País DEFENSOR (Jugador 1)
                if (paisesJugador1.includes(boton.id)) {
                    localStorage.setItem('paisDefensor', boton.id);
                    // Navegar al lanzador de dados del Jugador 2
                    window.location.href = "Dado2.html"; 
                }
            }
        });
    });

    actualizarBotones();
});