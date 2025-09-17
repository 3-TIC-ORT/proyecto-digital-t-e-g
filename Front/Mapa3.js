document.addEventListener('DOMContentLoaded', () => {
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
    
    let paisAtacante = null;

    // Función que se ejecuta al cargar la página para actualizar las fichas
    function calcularResultadosBatalla() {
        const paisAtacante = localStorage.getItem('paisAtacante');
        const paisDefensor = localStorage.getItem('paisDefensor');
        const resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));
        let paisesJugador1Actualizado = JSON.parse(localStorage.getItem('paisesJugador1')) || paisesJugador1;
        let paisesJugador2Actualizado = JSON.parse(localStorage.getItem('paisesJugador2')) || paisesJugador2;

        if (!paisAtacante || !paisDefensor || !resultadosBatalla || !fichas) {
            return;
        }

        if (fichas[paisAtacante] !== undefined) {
            fichas[paisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
        }
        if (fichas[paisDefensor] !== undefined) {
            fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
        }

        if (fichas[paisDefensor] <= 0) {
            paisesJugador2Actualizado = paisesJugador2Actualizado.filter(pais => pais !== paisDefensor);
            paisesJugador1Actualizado.push(paisDefensor);

            fichas[paisDefensor] = fichas[paisAtacante] - 1;
            fichas[paisAtacante] = 1;
        }

        localStorage.setItem('fichas', JSON.stringify(fichas));
        localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1Actualizado));
        localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2Actualizado));

        localStorage.removeItem('paisAtacante');
        localStorage.removeItem('paisDefensor');
        localStorage.removeItem('ataqueDados');
        localStorage.removeItem('defensaDados');
        localStorage.removeItem('resultadosBatalla');
    }

    function actualizarBotones() {
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
        const paisesJugador1Actualizado = JSON.parse(localStorage.getItem('paisesJugador1')) || paisesJugador1;
        const paisesJugador2Actualizado = JSON.parse(localStorage.getItem('paisesJugador2')) || paisesJugador2;
        const botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
                boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
            }

            if (!paisAtacante) {
                boton.disabled = !paisesJugador1Actualizado.includes(boton.id) || fichasGuardadas[boton.id] <= 1;
            } else {
                boton.disabled = !paisesJugador2Actualizado.includes(boton.id);
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