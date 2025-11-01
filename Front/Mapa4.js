document.addEventListener('DOMContentLoaded', () => {
    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Gran Bretaña", "Canadá"];
    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
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
        // Verificar objetivos al cargar el mapa
        checkObjectives();
});

function checkObjectives() {
    const continentMap = {
        'USA': 'America', 'Uruguay': 'America', 'Argentina': 'America', 'Canadá': 'America', 'México': 'America', 'Brasil': 'America',
        'España': 'Europa', 'Francia': 'Europa', 'Granbretaña': 'Europa', 'Gran Bretaña': 'Europa', 'Italia': 'Europa', 'Alemania': 'Europa', 'Rusia': 'Europa',
        'China': 'Asia', 'Japón': 'Asia', 'India': 'Asia', 'Armenia': 'Asia',
        'Egipto': 'Africa', 'Etiopía': 'Africa', 'Sudáfrica': 'Africa',
        'Australia': 'Oceania'
    };

    const p1 = JSON.parse(localStorage.getItem('paisesJugador1')) || [];
    const p2 = JSON.parse(localStorage.getItem('paisesJugador2')) || [];

    function contarPorContinente(lista, continente) {
        return lista.filter(p => continentMap[p] === continente).length;
    }

    function poseeContinenteCompleto(lista, continente) {
        const todos = Object.keys(continentMap).filter(p => continentMap[p] === continente);
        return todos.every(p => lista.includes(p));
    }

    const p1TieneAustralia = p1.includes('Australia');
    const p1AsiaCount = contarPorContinente(p1, 'Asia');
    const p1TieneAmerica = poseeContinenteCompleto(p1, 'America');
    const p1TieneEuropa = poseeContinenteCompleto(p1, 'Europa');
    const jugador1Cumple = p1TieneAustralia && p1AsiaCount >= 3 && p1TieneAmerica && p1TieneEuropa;

    const p2TieneAfrica = poseeContinenteCompleto(p2, 'Africa');
    const p2TieneAsia = poseeContinenteCompleto(p2, 'Asia');
    const p2TieneAustralia = p2.includes('Australia');
    const p2EuropaCount = contarPorContinente(p2, 'Europa');
    const p2AmericaCount = contarPorContinente(p2, 'America');
    const jugador2Cumple = p2TieneAfrica && p2TieneAsia && p2TieneAustralia && p2EuropaCount >= 4 && p2AmericaCount >= 4;

    if (jugador1Cumple) {
        localStorage.setItem('ganadorJuego', '1');
        window.location.href = 'ganadordeljuego1.html';
    } else if (jugador2Cumple) {
        localStorage.setItem('ganadorJuego', '2');
        window.location.href = 'ganadordeljuago2.html';
    }
}