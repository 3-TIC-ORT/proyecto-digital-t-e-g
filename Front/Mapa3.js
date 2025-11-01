document.addEventListener('DOMContentLoaded', () => {
  let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
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

    function calcularResultadosBatalla() {
      let paisDefensor = localStorage.getItem('paisDefensor');
      let resultadosBatalla = JSON.parse(localStorage.getItem('resultadosBatalla'));
      let fichas = JSON.parse(localStorage.getItem('fichas'));
  
      if (paisAtacante && paisDefensor && resultadosBatalla && fichas) {

        if (fichas[paisAtacante] !== undefined) {
          fichas[paisAtacante] -= resultadosBatalla.fichasPerdidasAtaque;
        }
        if (fichas[paisDefensor] !== undefined) {
          fichas[paisDefensor] -= resultadosBatalla.fichasPerdidasDefensa;
        }
  
        if (fichas[paisAtacante] < 1) fichas[paisAtacante] = 1;
  
        if (fichas[paisDefensor] <= 0) {
          conquistarPais(paisDefensor, paisAtacante, fichas);
        }
  
        if (fichas[paisAtacante] <= 1) {
          alert(`${paisAtacante} se ha quedado con 1 ficha y ya no puede seguir atacando.`);
          localStorage.removeItem('paisAtacante');
          paisAtacante = null;
        }
  
        localStorage.setItem('fichas', JSON.stringify(fichas));
  
        localStorage.removeItem('paisDefensor');
        localStorage.removeItem('resultadosBatalla');
        localStorage.removeItem('ganadorBatalla');
      }
    }
  
    function conquistarPais(paisPerdedor, paisGanador, fichas) {
      if (paisesJugador1.includes(paisPerdedor)) {
        paisesJugador1 = paisesJugador1.filter(p => p !== paisPerdedor);
        paisesJugador2.push(paisPerdedor);
      } else if (paisesJugador2.includes(paisPerdedor)) {
        paisesJugador2 = paisesJugador2.filter(p => p !== paisPerdedor);
        paisesJugador1.push(paisPerdedor);
      }
  
      fichas[paisPerdedor] = 1;
  
      localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1));
      localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2));
      localStorage.setItem('fichas', JSON.stringify(fichas));
  
      alert(`${paisGanador} ha conquistado ${paisPerdedor}!`);
  
      localStorage.removeItem('paisAtacante');
      paisAtacante = null;
    }
  
    function actualizarBotones() {
      let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
      let botones = document.querySelectorAll(".rectangulo-gris button");
  
      botones.forEach(boton => {
        let cantidadFichas = fichasGuardadas[boton.id] ?? 1;
  
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
  
    let botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
  
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
  
    inicializarFichas();
    calcularResultadosBatalla();
    actualizarBotones();
  });
  