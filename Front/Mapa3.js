document.addEventListener('DOMContentLoaded', () => {
    // Países del Jugador 1 (Atacante)
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    // Países del Jugador 2 (Defensor)
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    let paisAtacante = localStorage.getItem('paisAtacante');

    // --- 1. APLICAR RESULTADOS DE BATALLA (AL CARGAR) ---
    function calcularResultadosBatalla() {
        const paisDefensor = localStorage.getItem('paisDefensor');
        const resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));
    
        if (paisAtacante && paisDefensor && resultadosBatalla && fichas) {
            
            // Resta las fichas del atacante (J1)
            if (fichas[paisAtacante] !== undefined) {
                fichas[paisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
            }
            // Resta las fichas del defensor (J2)
            if (fichas[paisDefensor] !== undefined) {
                fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
            }
    
            localStorage.setItem('fichas', JSON.stringify(fichas));
            
            // Limpia los datos de la batalla
            localStorage.removeItem('paisAtacante');
            localStorage.removeItem('paisDefensor');
            localStorage.removeItem('resultadosBatalla');
            localStorage.removeItem('ganadorBatalla');
            
            // Reestablecer paisAtacante a null para la siguiente selección de ataque
            paisAtacante = null; 
        }
    }

    // --- 2. ACTUALIZAR BOTONES ---
    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            // Mostrar fichas actualizadas
            if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            if (!paisAtacante) {
                // Seleccionar Atacante: Habilita CUALQUIER país del JUGADOR 1
                // (La verificación de fichas > 1 se hace en el evento click, no en la deshabilitación visual inicial)
                boton.disabled = !paisesJugador1.includes(boton.id);
            } else {
                // Seleccionar Defensor: Habilita JUGADOR 2
                boton.disabled = !paisesJugador2.includes(boton.id);
            }
        });
    }

    // --- 3. MANEJADOR DE CLICS ---
    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));

            if (!paisAtacante) {
                // Paso 1: Selecciona País ATACANTE (Jugador 1)
                // Se verifica en este punto que el país seleccionado tenga más de 1 ficha
                if (paisesJugador1.includes(boton.id) && fichasGuardadas[boton.id] > 1) {
                    paisAtacante = boton.id;
                    localStorage.setItem('paisAtacante', paisAtacante);
                    actualizarBotones();
                } else if (paisesJugador1.includes(boton.id) && fichasGuardadas[boton.id] <= 1) {
                    alert('Debes seleccionar un país con al menos 2 fichas para atacar.');
                }
            } else {
                // Paso 2: Selecciona País DEFENSOR (Jugador 2)
                if (paisesJugador2.includes(boton.id)) {
                    localStorage.setItem('paisDefensor', boton.id);
                    // Navegar al lanzador de dados del Jugador 1
                    window.location.href = "Dado1.html"; 
                }
            }
        });
    });

    // Ejecutar al cargar la página
    calcularResultadosBatalla();
    actualizarBotones();
});