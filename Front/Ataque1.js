document.addEventListener("DOMContentLoaded", () => {
  let fichasGuardadas = JSON.parse(localStorage.getItem('fichas')) || {};
  let botones = document.querySelectorAll(".rectangulo-gris button");

  let paisesJugador1 =  ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
  let paisesJugador2 =  ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

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
  checkObjectives();
  }

  function verificarConquista(paisDefensor) {
    const fichasDefensor = fichasGuardadas[paisDefensor] || 1;
    const fichasAtacante = fichasGuardadas[paisAtacante] || 1;

    if (fichasDefensor <= 0 || (fichasDefensor === 1 && fichasAtacante > 1)) {
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
  checkObjectives();
});

function checkObjectives() {
  const continentMap = {
    'USA': 'America', 'Uruguay': 'America', 'Argentina': 'America', 'Canadá': 'America', 'México': 'America', 'Brasil': 'America',
    'España': 'Europa', 'Francia': 'Europa', 'Granbretaña': 'Europa', 'Italia': 'Europa', 'Alemania': 'Europa', 'Rusia': 'Europa',
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
