document.addEventListener('DOMContentLoaded', () => {

    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];

    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    let paisAtacante = localStorage.getItem('paisAtacante'); 

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