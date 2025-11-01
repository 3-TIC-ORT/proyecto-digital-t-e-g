document.addEventListener('DOMContentLoaded', () => {

    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];

    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    let paisAtacante = localStorage.getItem('paisAtacante'); 

    // Limpiar paisAtacante si es inválido para evitar bloquear la UI
    if (paisAtacante && !(paisesJugador1.includes(paisAtacante) || paisesJugador2.includes(paisAtacante))) {
        localStorage.removeItem('paisAtacante');
        paisAtacante = null;
    }

    function calcularResultadosBatalla() {
        let paisDefensor = localStorage.getItem('paisDefensor');
        let resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));
        let localPaisAtacante = localStorage.getItem('paisAtacante'); 
        let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
        let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
    
        if (localPaisAtacante && paisDefensor && resultadosBatalla && fichas) {
            
    
            if (fichas[localPaisAtacante] !== undefined) {
                fichas[localPaisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
            }

            if (fichas[paisDefensor] !== undefined) {
                fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
            }

            // El atacante nunca puede quedar con menos de 1 ficha
            if (fichas[localPaisAtacante] < 1) fichas[localPaisAtacante] = 1;

            // Si el defensor quedó en 0 o menos, el atacante conquista el país
            if (fichas[paisDefensor] <= 0) {
                // Transferir propiedad
                if (paisesJugador1.includes(paisDefensor)) {
                    paisesJugador1 = paisesJugador1.filter(p => p !== paisDefensor);
                    paisesJugador2.push(paisDefensor);
                } else if (paisesJugador2.includes(paisDefensor)) {
                    paisesJugador2 = paisesJugador2.filter(p => p !== paisDefensor);
                    paisesJugador1.push(paisDefensor);
                }

                // El nuevo dueño empieza con 1 ficha en ese país
                fichas[paisDefensor] = 1;

                alert(`${localPaisAtacante} ha conquistado ${paisDefensor}!`);
            }

            // Persistir cambios
            localStorage.setItem('fichas', JSON.stringify(fichas));
            localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1));
            localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2));

            // Verificar objetivos tras la batalla
            checkObjectives();

            // Limpiar estado temporal de batalla
            localStorage.removeItem('paisAtacante');
            localStorage.removeItem('paisDefensor');
            localStorage.removeItem('ataqueDados');
            localStorage.removeItem('defensaDados');
            localStorage.removeItem('resultadosBatalla');
            localStorage.removeItem('ganadorBatalla');

            paisAtacante = null; 
        }
    }


    function actualizarBotones() {
        let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')); 
        let botones = document.querySelectorAll(".rectangulo-gris button");

        botones.forEach(boton => {
       
            let cantidadFichas = (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) 
                                   ? fichasGuardadas[boton.id] 
                                   : 1;

            boton.textContent = `${boton.id} (${cantidadFichas})`;
      

            // Si no hay pais atacante seleccionado, habilitar países del jugador que corresponde a este mapa
            if (!paisAtacante) {
                boton.disabled = !paisesJugador2.includes(boton.id);
            } else {
                // Determinar dueño actual del país atacante y permitir elegir países del oponente
                const atacanteEsP1 = paisesJugador1.includes(paisAtacante);
                const atacanteEsP2 = paisesJugador2.includes(paisAtacante);

                if (atacanteEsP1) {
                    boton.disabled = !paisesJugador2.includes(boton.id);
                } else if (atacanteEsP2) {
                    boton.disabled = !paisesJugador1.includes(boton.id);
                } else {
                    boton.disabled = true;
                }
            }
        });
        // Persistir fichas guardadas
        localStorage.setItem('fichas', JSON.stringify(fichasGuardadas));

        // Si todos los botones quedaron deshabilitados y hay un paisAtacante guardado,
        // limpiamos la selección y recalculamos para evitar bloqueo de la UI.
        const anyEnabled = Array.from(botones).some(b => !b.disabled);
        if (!anyEnabled && paisAtacante) {
            localStorage.removeItem('paisAtacante');
            paisAtacante = null;
            // Recalcular una vez
            actualizarBotones();
        }
    }
    let botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            let fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));

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
    calcularResultadosBatalla();
    actualizarBotones();
        // También verificar objetivos al cargar el mapa
        checkObjectives();
});

function checkObjectives() {
    // Mapa de países a continentes (debe coincidir con Mapa3)
    const continentMap = {
        'USA': 'America', 'Uruguay': 'America', 'Argentina': 'America', 'Canadá': 'America', 'México': 'America', 'Brasil': 'America',
        'España': 'Europa', 'Francia': 'Europa', 'Granbretaña': 'Europa', 'Italia': 'Europa', 'Alemania': 'Europa', 'Rusia': 'Europa',
        'China': 'Asia', 'Japón': 'Asia', 'India': 'Asia', 'Armenia': 'Asia',
        'Egipto': 'Africa', 'Etiopía': 'Africa', 'Sudáfrica': 'Africa',
        'Australia': 'Oceania'
    };

    const paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || [];
    const paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || [];

    function contarPorContinente(lista, continente) {
        return lista.filter(p => continentMap[p] === continente).length;
    }

    function poseeContinenteCompleto(lista, continente) {
        const todos = Object.keys(continentMap).filter(p => continentMap[p] === continente);
        return todos.every(p => lista.includes(p));
    }

    const p1TieneAustralia = paisesJugador1.includes('Australia');
    const p1AsiaCount = contarPorContinente(paisesJugador1, 'Asia');
    const p1TieneAmerica = poseeContinenteCompleto(paisesJugador1, 'America');
    const p1TieneEuropa = poseeContinenteCompleto(paisesJugador1, 'Europa');
    const jugador1Cumple = p1TieneAustralia && p1AsiaCount >= 3 && p1TieneAmerica && p1TieneEuropa;

    const p2TieneAfrica = poseeContinenteCompleto(paisesJugador2, 'Africa');
    const p2TieneAsia = poseeContinenteCompleto(paisesJugador2, 'Asia');
    const p2TieneAustralia = paisesJugador2.includes('Australia');
    const p2EuropaCount = contarPorContinente(paisesJugador2, 'Europa');
    const p2AmericaCount = contarPorContinente(paisesJugador2, 'America');
    const jugador2Cumple = p2TieneAfrica && p2TieneAsia && p2TieneAustralia && p2EuropaCount >= 4 && p2AmericaCount >= 4;

    if (jugador1Cumple) {
        localStorage.setItem('ganadorJuego', '1');
        window.location.href = 'ganadordeljuego1.html';
    } else if (jugador2Cumple) {
        localStorage.setItem('ganadorJuego', '2');
        window.location.href = 'ganadordeljuago2.html';
    }
}