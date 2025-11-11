document.addEventListener('DOMContentLoaded', () => {

    let paisesJugador1 =  ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    let paisesJugador2 =  ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];


    let fichas = JSON.parse(localStorage.getItem('fichas')) || {};


    let fichasDisponibles = parseInt(localStorage.getItem('fichasDisponiblesJugador1'));


    if (isNaN(fichasDisponibles) || fichasDisponibles <= 0) {
        fichasDisponibles = 8;
        localStorage.setItem('fichasDisponiblesJugador1', fichasDisponibles);
    }
    

    function actualizarDisplay() {
     
        let encabezado = document.querySelector('.encabezado h1');
        if (encabezado) {
            encabezado.textContent = `JUGADOR 1, TENES ${fichasDisponibles} FICHAS PARA DISTRIBUIR ENTRE TUS PAISES`;
        }
        
        let botones = document.querySelectorAll(".rectangulo-gris button");
        
        botones.forEach(boton => {
            let pais = boton.id;
            
          
            let cantidadFichas = fichas[pais] !== undefined ? fichas[pais] : 1;
            boton.textContent = `${pais} (${cantidadFichas})`; 

            // Sólo permitir agregar fichas si el país pertenece a jugador 1
            if (paisesJugador1.includes(pais)) {
                boton.disabled = (fichasDisponibles === 0);
            } else {
                // Si no es tu país (pertenece al jugador 2 u otro), no podés modificarlo
                boton.disabled = true;
            }
        });
    }


    function manejarClickPais(event) {
        let pais = event.target.id;
        
        if (paisesJugador1.includes(pais) && fichasDisponibles > 0) {
            

            if (fichas[pais] === undefined) {
                fichas[pais] = 1; 
            }
            
            fichas[pais]++;
            fichasDisponibles--;
        
            localStorage.setItem('fichas', JSON.stringify(fichas));
            localStorage.setItem('fichasDisponiblesJugador1', fichasDisponibles);
            // Guardar listas de países por si cambiaron en otra parte
            localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1));
            localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2));
            
       
            actualizarDisplay();
        } 
    }

    let botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", manejarClickPais);
    });

 
    actualizarDisplay();
        // Verificar objetivos al cargar
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