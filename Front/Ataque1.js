document.addEventListener("DOMContentLoaded", () => {
  let fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
  let botones = document.querySelectorAll(".rectangulo-gris button");

  let paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
  let paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

  let paisAtacante = null;

  function actualizarBotones() {
      botones.forEach(boton => {
  
          let cantidadFichas = (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) 
                               ? fichasGuardadas[boton.id] 
                               : 1;

          boton.textContent = `${boton.id} (${cantidadFichas})`;

    
          if (!paisAtacante) {
          
              boton.disabled = !paisesJugador1.includes(boton.id);
          } else {
           
              boton.disabled = !paisesJugador2.includes(boton.id);
          }
      });
  }

 
  botones.forEach(boton => {
      boton.addEventListener("click", () => {
          if (!paisAtacante) {
            
              if (paisesJugador1.includes(boton.id)) {
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

 
  actualizarBotones();
});