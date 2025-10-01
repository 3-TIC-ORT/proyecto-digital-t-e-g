document.addEventListener('DOMContentLoaded', () => {

    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];


    let fichas = JSON.parse(localStorage.getItem('fichas')) || {};


    let fichasDisponibles = parseInt(localStorage.getItem('fichasDisponiblesJugador1'));


    if (isNaN(fichasDisponibles) || fichasDisponibles <= 0) {
        fichasDisponibles = 8;
        localStorage.setItem('fichasDisponiblesJugador1', fichasDisponibles);
    }
    

    function actualizarDisplay() {
     
        const encabezado = document.querySelector('.encabezado h1');
        if (encabezado) {
            encabezado.textContent = `JUGADOR 1, TENES ${fichasDisponibles} FICHAS PARA DISTRIBUIR ENTRE TUS PAISES`;
        }
        
        const botones = document.querySelectorAll(".rectangulo-gris button");
        
        botones.forEach(boton => {
            const pais = boton.id;
            
          
            const cantidadFichas = fichas[pais] !== undefined ? fichas[pais] : 1;
            boton.textContent = `${pais} (${cantidadFichas})`; 

            if (paisesJugador2.includes(pais)) {
                boton.disabled = true;
            } 
      
            else if (paisesJugador1.includes(pais)) {

                boton.disabled = (fichasDisponibles === 0);
            }
        });
    }


    function manejarClickPais(event) {
        const pais = event.target.id;
        
        if (paisesJugador1.includes(pais) && fichasDisponibles > 0) {
            

            if (fichas[pais] === undefined) {
                fichas[pais] = 1; 
            }
            
            fichas[pais]++;
            fichasDisponibles--;
        
            localStorage.setItem('fichas', JSON.stringify(fichas));
            localStorage.setItem('fichasDisponiblesJugador1', fichasDisponibles);
            
       
            actualizarDisplay();
        } else if (paisesJugador1.includes(pais) && fichasDisponibles === 0) {
            alert('Ya no te quedan fichas de refuerzo disponibles. Presiona Siguiente.');
        }
    }

    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener("click", manejarClickPais);
    });

 
    actualizarDisplay();
});