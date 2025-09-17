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
            
            if (fichas[paisAtacante] !== undefined) {
                fichas[paisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
            }
            if (fichas[paisDefensor] !== undefined) {
                fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
            }

            localStorage.setItem('fichas', JSON.stringify(fichas));
            
            localStorage.removeItem('paisAtacante');
            localStorage.removeItem('paisDefensor');
            localStorage.removeItem('ataqueDados');
            localStorage.removeItem('defensaDados');
            localStorage.removeItem('resultadosBatalla');
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
                boton.disabled = !paisesJugador1.includes(boton.id);
            } else {
                boton.disabled = !paisesJugador2.includes(boton.id);
            }
        });
    }

    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));

            if (!paisAtacante) {
                if (paisesJugador1.includes(boton.id) && fichasGuardadas[boton.id] > 1) {
                    paisAtacante = boton.id;
                    localStorage.setItem('paisAtacante', paisAtacante);
                    actualizarBotones();
                }
            } else {
                if (paisesJugador2.includes(boton.id)) {
                    localStorage.setItem('paisDefensor', boton.id);
                    window.location.href = "Dado1.html";
                }
            }
        });
    });

    calcularResultadosBatalla();
    actualizarBotones();
});