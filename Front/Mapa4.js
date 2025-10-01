document.addEventListener('DOMContentLoaded', () => {
    let paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Gran Bretaña", "Canadá"];
    let paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
    let todosLosPaises = [...paisesJugador1, ...paisesJugador2];

    let paisAtacante = localStorage.getItem('paisAtacante');


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


    function actualizarBotones() {
        let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
        let botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
            let cantidadFichas = fichasGuardadas.hasOwnProperty(boton.id)
                ? fichasGuardadas[boton.id]
                : 1;

            boton.textContent = `${boton.id} (${cantidadFichas})`;

            if (!paisAtacante) {
         
                boton.disabled = !paisesJugador2.includes(boton.id);
            } else {
             
                boton.disabled = !paisesJugador1.includes(boton.id);
            }
        });
    }

    let botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};

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