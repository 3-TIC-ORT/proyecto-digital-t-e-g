document.addEventListener('DOMContentLoaded', () => {
    // Jugador 1 (Defensor)
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    // Jugador 2 (Atacante - puede seguir atacando)
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    let paisAtacante = localStorage.getItem('paisAtacante'); // Se usará después de calcular resultados para la selección

    // --- 1. APLICAR RESULTADOS DE BATALLA (AL CARGAR) ---
    function calcularResultadosBatalla() {
        const paisDefensor = localStorage.getItem('paisDefensor');
        const resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));
        const localPaisAtacante = localStorage.getItem('paisAtacante'); // País atacante que viene de la batalla
    
        if (localPaisAtacante && paisDefensor && resultadosBatalla && fichas) {
            
            // Resta las fichas del atacante (J2)
            if (fichas[localPaisAtacante] !== undefined) {
                fichas[localPaisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
            }
            // Resta las fichas del defensor (J1)
            if (fichas[paisDefensor] !== undefined) {
                fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
            }
    
            localStorage.setItem('fichas', JSON.stringify(fichas));
            
            // Limpia los datos de la batalla para el siguiente ataque o turno
            localStorage.removeItem('paisAtacante');
            localStorage.removeItem('paisDefensor');
            localStorage.removeItem('ataqueDados');
            localStorage.removeItem('defensaDados');
            localStorage.removeItem('resultadosBatalla');
            localStorage.removeItem('ganadorBatalla');
            
            // Reiniciar el estado de selección: el Jugador 2 debe elegir un nuevo atacante.
            paisAtacante = null; 
        }
    }

    // --- 2. ACTUALIZAR BOTONES ---
    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas')); 
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            // CORRECCIÓN: Si el valor no está en localStorage, asume 1 ficha.
            const cantidadFichas = (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) 
                                   ? fichasGuardadas[boton.id] 
                                   : 1;

            boton.textContent = `${boton.id} (${cantidadFichas})`;
            // FIN DE LA CORRECCIÓN.

            if (!paisAtacante) {
                // Seguir atacando: Habilita CUALQUIER país del JUGADOR 2
                boton.disabled = !paisesJugador2.includes(boton.id);
            } else {
                // Seleccionar Defensor: Habilita JUGADOR 1
                boton.disabled = !paisesJugador1.includes(boton.id);
            }
        });
    }

    // --- 3. MANEJADOR DE CLICS ---
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
                    // Navegar al lanzador de dados del Jugador 2 (para el siguiente ataque)
                    window.location.href = "Dado2.html"; 
                }
            }
        });
    });

    // Ejecutar al cargar la página
    calcularResultadosBatalla();
    actualizarBotones();
});