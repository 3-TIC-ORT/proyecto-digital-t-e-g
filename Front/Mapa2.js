document.addEventListener('DOMContentLoaded', () => {

    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

 
    let fichas = JSON.parse(localStorage.getItem('fichas')) || {};
    
 
    let fichasDisponibles = parseInt(localStorage.getItem('fichasDisponiblesJugador2'));

    if (isNaN(fichasDisponibles) || fichasDisponibles <= 0) {
        fichasDisponibles = 8;
        localStorage.setItem('fichasDisponiblesJugador2', fichasDisponibles);
    }

    function actualizarDisplay() {
     
        document.querySelector('.encabezado h1').textContent = `JUGADOR 2, TENES ${fichasDisponibles} FICHAS PARA DISTRIBUIR ENTRE TODOS TUS PAISES`;
       let botones = document.querySelectorAll(".rectangulo-gris button");
       const ultimoConquistado = localStorage.getItem('ultimoConquistado');
       const ultimoConquistador = localStorage.getItem('ultimoConquistador');
        
        botones.forEach(boton => {
           let pais = boton.id;
            
  
           let cantidadFichas = fichas[pais] !== undefined ? fichas[pais] : 1;
            boton.textContent = `${pais} (${cantidadFichas})`;

             // Permitir que el Jugador 2 agregue fichas a sus países.
             // Además permitir asignar fichas al último país conquistado por el Jugador 2 (resalta temporalmente).
             if (paisesJugador2.includes(pais) || (ultimoConquistador === '2' && ultimoConquistado === pais)) {
                 boton.disabled = (fichasDisponibles === 0);
             } else {
                 boton.disabled = true;
             }

             // Resaltar el país recién conquistado por el Jugador 2
             if (ultimoConquistador === '2' && ultimoConquistado === pais) {
                 boton.classList.add('nuevo-conquistado');
             } else {
                 boton.classList.remove('nuevo-conquistado');
             }
        });
    }

   
    function manejarClickPais(event) {
        let pais = event.target.id;
        const ultimoConquistado = localStorage.getItem('ultimoConquistado');
        const ultimoConquistador = localStorage.getItem('ultimoConquistador');
        

        if (paisesJugador2.includes(pais) && fichasDisponibles > 0) {
            
            if (fichas[pais] === undefined) {
                fichas[pais] = 1; 
            }
            
            fichas[pais]++;
            fichasDisponibles--;
            
 
            localStorage.setItem('fichas', JSON.stringify(fichas));
            localStorage.setItem('fichasDisponiblesJugador2', fichasDisponibles);
            localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1));
            localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2));

            actualizarDisplay();

                // Si le agregamos ficha al último país conquistado por el Jugador 2, limpiamos la marca
                if (ultimoConquistador === '2' && ultimoConquistado === pais) {
                    localStorage.removeItem('ultimoConquistado');
                    localStorage.removeItem('ultimoConquistador');
                }
        } 
    }

   let botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener('click', manejarClickPais);
    });

    actualizarDisplay();
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