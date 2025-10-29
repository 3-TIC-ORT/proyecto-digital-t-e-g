document.addEventListener("DOMContentLoaded", () => {
    let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
    let botones = document.querySelectorAll(".rectangulo-gris button");
  
    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
  
    let paisAtacante = localStorage.getItem('paisAtacante') || null;
  
    function actualizarBotones() {
      botones.forEach(boton => {
        let cantidadFichas = fichasGuardadas[boton.id] !== undefined
          ? fichasGuardadas[boton.id]
          : 1;
  
        if (cantidadFichas < 1) {
          cantidadFichas = 1;
          fichasGuardadas[boton.id] = 1;
        }
  
        boton.textContent = `${boton.id} (${cantidadFichas})`;
  
        if (!paisAtacante) {
          boton.disabled = !(paisesJugador1.includes(boton.id) && cantidadFichas > 1);
        } else {
          boton.disabled = !paisesJugador2.includes(boton.id);
        }
      });
  
      localStorage.setItem('fichas', JSON.stringify(fichasGuardadas));
    }
  
    function conquistarPais(paisPerdedor, paisGanador) {
      if (paisesJugador1.includes(paisPerdedor)) {
        paisesJugador1 = paisesJugador1.filter(p => p !== paisPerdedor);
        paisesJugador2.push(paisPerdedor);
      } else if (paisesJugador2.includes(paisPerdedor)) {
        paisesJugador2 = paisesJugador2.filter(p => p !== paisPerdedor);
        paisesJugador1.push(paisPerdedor);
      }
  
      fichasGuardadas[paisPerdedor] = 1;
  
      localStorage.setItem('fichas', JSON.stringify(fichasGuardadas));
      localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1));
      localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2));
  
      alert(`${paisGanador} ha conquistado ${paisPerdedor}!`);
  
      localStorage.removeItem('paisAtacante');
      paisAtacante = null;
      actualizarBotones();
    }
  
    function verificarConquista(paisDefensor) {
      if (fichasGuardadas[paisDefensor] <= 0) {
        conquistarPais(paisDefensor, paisAtacante);
      }
    }
  
    function verificarAtacante() {
      if (paisAtacante && fichasGuardadas[paisAtacante] <= 1) {
        alert(`${paisAtacante} se ha quedado con 1 ficha y ya no puede seguir atacando.`);
        localStorage.removeItem('paisAtacante');
        paisAtacante = null;
        actualizarBotones();
      }
    }
  
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        if (!paisAtacante) {
          if (paisesJugador1.includes(boton.id)) {
            let fichasAtacante = fichasGuardadas[boton.id] || 1;
  
            if (fichasAtacante > 1) {
              paisAtacante = boton.id;
              localStorage.setItem('paisAtacante', paisAtacante);
              actualizarBotones();
            } else {
              alert("No puedes atacar con un país que tiene solo 1 ficha.");
            }
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
  
    let paisDefensor = localStorage.getItem('paisDefensor');
    if (paisDefensor && paisAtacante) {
      verificarConquista(paisDefensor);
      verificarAtacante();
      localStorage.removeItem('paisDefensor');
    }
  });
  