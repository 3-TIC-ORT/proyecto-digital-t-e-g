document.addEventListener('DOMContentLoaded', () => {
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    function calcularResultadosBatalla() {
        const paisAtacante = localStorage.getItem('paisAtacante');
        const paisDefensor = localStorage.getItem('paisDefensor');
        const resultadoBatalla = JSON.parse(localStorage.getItem('resultadoBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));

        if (!paisAtacante || !paisDefensor || !resultadoBatalla || !fichas) {
            console.error("No se encontraron los datos de la batalla en localStorage.");
            return;
        }

        // Restar las fichas al país perdedor
        if (fichas[paisAtacante] !== undefined) {
            fichas[paisAtacante] -= resultadoBatalla.fichasPerdidasAtaque;
        }
        if (fichas[paisDefensor] !== undefined) {
            fichas[paisDefensor] -= resultadoBatalla.fichasPerdidasDefensa;
        }

        // Sumar las fichas al país ganador
        if (resultadoBatalla.fichasPerdidasAtaque > 0) {
            // La defensa ganó, el atacante perdió fichas.
            if (fichas[paisDefensor] !== undefined) {
                fichas[paisDefensor] += resultadoBatalla.fichasPerdidasAtaque;
            }
        } else if (resultadoBatalla.fichasPerdidasDefensa > 0) {
            // El ataque ganó, el defensor perdió fichas.
            if (fichas[paisAtacante] !== undefined) {
                fichas[paisAtacante] += resultadoBatalla.fichasPerdidasDefensa;
            }
        }

        localStorage.setItem('fichas', JSON.stringify(fichas));
        
        localStorage.removeItem('paisAtacante');
        localStorage.removeItem('paisDefensor');
        localStorage.removeItem('dadosAtacante');
        localStorage.removeItem('dadosDefensa');
        localStorage.removeItem('resultadoBatalla');
    }

    function actualizarDisplay() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            if (paisesJugador1.includes(boton.id)) {
                boton.disabled = false;
            } else if (paisesJugador2.includes(boton.id)) {
                boton.disabled = true;
            }
        });
    }

    calcularResultadosBatalla();
    actualizarDisplay();
});