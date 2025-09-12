document.addEventListener('DOMContentLoaded', () => {
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
    
    let paisAtacante = null;

    // Función que se ejecuta al cargar la página para actualizar las fichas
    function calcularResultadosBatalla() {
        const paisAtacante = localStorage.getItem('paisAtacante');
        const paisDefensor = localStorage.getItem('paisDefensor');
        const resultadoBatalla = JSON.parse(localStorage.getItem('resultadoBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));

        if (!paisAtacante || !paisDefensor || !resultadoBatalla || !fichas) {
            console.error("No se encontraron los datos de la batalla en localStorage.");
            return;
        }

        // Restar las fichas al país perdedor. No se suman fichas al ganador en esta primera carga.
        if (fichas[paisAtacante] !== undefined) {
            fichas[paisAtacante] -= resultadoBatalla.fichasPerdidasAtaque;
        }
        if (fichas[paisDefensor] !== undefined) {
            fichas[paisDefensor] -= resultadoBatalla.fichasPerdidasDefensa;
        }

        localStorage.setItem('fichas', JSON.stringify(fichas));
        
        // Limpiar los datos temporales del duelo para el siguiente ataque
        localStorage.removeItem('paisAtacante');
        localStorage.removeItem('paisDefensor');
        localStorage.removeItem('dadosAtacante');
        localStorage.removeItem('dadosDefensa');
        localStorage.removeItem('resultadoBatalla');
    }

    // Función para actualizar el texto de los botones y su estado (habilitado/deshabilitado)
    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            // Habilitar los botones del Jugador 1 para el primer ataque
            if (!paisAtacante) {
                // Se ha quitado la condición que deshabilita los países con 1 ficha
                boton.disabled = !paisesJugador1.includes(boton.id);
            } else {
                // Después de seleccionar el atacante, habilitar los países del Jugador 2
                boton.disabled = !paisesJugador2.includes(boton.id);
            }
        });
    }

    // Agregar eventos de click a todos los botones
    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            if (!paisAtacante) {
                // Lógica para seleccionar el país atacante (Jugador 1)
                if (paisesJugador1.includes(boton.id)) {
                    paisAtacante = boton.id;
                    localStorage.setItem('paisAtacante', paisAtacante);
                    actualizarBotones();
                }
            } else {
                // Lógica para seleccionar el país defensor (Jugador 2)
                if (paisesJugador2.includes(boton.id)) {
                    localStorage.setItem('paisDefensor', boton.id);
                    window.location.href = "Dado1.html";
                }
            }
        });
    });

    // Ejecutar las funciones al cargar la página
    calcularResultadosBatalla();
    actualizarBotones();
});