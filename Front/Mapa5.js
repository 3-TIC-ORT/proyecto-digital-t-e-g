document.addEventListener('DOMContentLoaded', () => {
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
    
    let paisAtacante = null;

    function calcularResultadosBatalla() {
        const paisAtacante = localStorage.getItem('paisAtacante');
        const paisDefensor = localStorage.getItem('paisDefensor');
        const resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));
    
        if (paisAtacante && paisDefensor && resultadosBatalla && fichas) {
            
            // Resta las fichas perdidas según la información guardada en resultadosBatalla
            if (fichas[paisAtacante] !== undefined) {
                fichas[paisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
            }
            if (fichas[paisDefensor] !== undefined) {
                fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
            }
    
            localStorage.setItem('fichas', JSON.stringify(fichas));
            
            // Limpia los datos de la batalla para el siguiente turno
            localStorage.removeItem('paisAtacante');
            localStorage.removeItem('paisDefensor');
            localStorage.removeItem('ataqueDados');
            localStorage.removeItem('defensaDados');
            localStorage.removeItem('resultadosBatalla');
            localStorage.removeItem('ganadorBatalla');
        }
    }

    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            if (!paisAtacante) {
                // Habilita solo los países del Jugador 2 que tengan más de 1 ficha para atacar
                boton.disabled = !paisesJugador2.includes(boton.id) || fichasGuardadas[boton.id] <= 1;
            } else {
                // Una vez seleccionado el atacante, habilita solo los países del Jugador 1
                boton.disabled = !paisesJugador1.includes(boton.id);
            }
        });
    }

    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));

            if (!paisAtacante) {
                if (paisesJugador2.includes(boton.id) && fichasGuardadas[boton.id] > 1) {
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

    calcularResultadosBatalla();
    actualizarBotones();
});