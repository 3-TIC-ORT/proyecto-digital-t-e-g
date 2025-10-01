document.addEventListener('DOMContentLoaded', () => {

    let paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];

    let paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    let paisAtacante = localStorage.getItem('paisAtacante'); 

    function calcularResultadosBatalla() {
        let paisDefensor = localStorage.getItem('paisDefensor');
        let resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
        let fichas = JSON.parse(localStorage.getItem('fichas'));
        let localPaisAtacante = localStorage.getItem('paisAtacante'); 
    
        if (localPaisAtacante && paisDefensor && resultadosBatalla && fichas) {
            
    
            if (fichas[localPaisAtacante] !== undefined) {
                fichas[localPaisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
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
});