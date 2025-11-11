document.addEventListener('DOMContentLoaded', () => {
  let paisesJugador1 =  ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
  let paisesJugador2 =  ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];
  let todosLosPaises = [...paisesJugador1, ...paisesJugador2];
  
  let paisAtacante = localStorage.getItem('paisAtacante');

  // Si hay un paisAtacante guardado pero ya no pertenece a ninguna lista, limpiarlo (estado inconsistente)
  if (paisAtacante && !(paisesJugador1.includes(paisAtacante) || paisesJugador2.includes(paisAtacante))) {
    localStorage.removeItem('paisAtacante');
    paisAtacante = null;
  }

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

      // 🔹 MODIFICADO: ahora también conquista si el defensor tiene 1 ficha y el atacante más
      const fichasAtacante = fichas[paisAtacante] || 1;
      const fichasDefensor = fichas[paisDefensor] || 1;
      if (fichas[paisDefensor] <= 0 || (fichasDefensor === 1 && fichasAtacante > fichasDefensor)) {
        conquistarPais(paisDefensor, paisAtacante, fichas);
      }

      if (fichas[paisAtacante] <= 1) {
        alert(`${paisAtacante} se ha quedado con 1 ficha y ya no puede seguir atacando.`);
        localStorage.removeItem('paisAtacante');
        paisAtacante = null;
      }

      localStorage.setItem('fichas', JSON.stringify(fichas));

      // 🔹 Mover aquí la limpieza para que se haga después de actualizar correctamente
      localStorage.removeItem('paisDefensor');
      localStorage.removeItem('resultadosBatalla');
      localStorage.removeItem('ganadorBatalla');
      localStorage.removeItem('paisAtacante');
      paisAtacante = null;
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
    // Verificar objetivos después de la conquista
    checkObjectives();
  }

  function checkObjectives() {
    const continentMap = {
      'USA': 'America', 'Uruguay': 'America', 'Argentina': 'America', 'Canadá': 'America', 'México': 'America', 'Brasil': 'America',
      'España': 'Europa', 'Francia': 'Europa', 'Granbretaña': 'Europa', 'Italia': 'Europa', 'Alemania': 'Europa', 'Rusia': 'Europa',
      'China': 'Asia', 'Japón': 'Asia', 'India': 'Asia', 'Armenia': 'Asia',
      'Egipto': 'Africa', 'Etiopía': 'Africa', 'Sudáfrica': 'Africa',
      'Australia': 'Oceania'
    };

    const p1 = JSON.parse(localStorage.getItem('paisesJugador1')) || paisesJugador1;
    const p2 = JSON.parse(localStorage.getItem('paisesJugador2')) || paisesJugador2;

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

      // Si no hay pais atacante seleccionado, permitir seleccionar países propios con >1 ficha
      if (!paisAtacante) {
        boton.disabled = !(paisesJugador1.includes(boton.id) && cantidadFichas > 1);
      } else {
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

    localStorage.setItem('fichas', JSON.stringify(fichasGuardadas));

    const anyEnabled = Array.from(botones).some(b => !b.disabled);
    if (!anyEnabled && paisAtacante) {
      localStorage.removeItem('paisAtacante');
      paisAtacante = null;
      actualizarBotones();
    }
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
