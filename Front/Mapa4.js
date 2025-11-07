document.addEventListener('DOMContentLoaded', () => {
    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1')) || ["USA","Rusia","Egipto","Etiopía","Uruguay","Argentina","España","Francia","Gran Bretaña","Canadá"];
    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2')) || ["Alemania","Sudáfrica","China","Japón","Armenia","India","Australia","México","Brasil","Italia"];
    let todosLosPaises = [...paisesJugador1, ...paisesJugador2];
  
    let paisAtacante = localStorage.getItem('paisAtacante');
  
    function inicializarFichas() {
      let fichas = JSON.parse(localStorage.getItem('fichas'));
      if (!fichas) {
        fichas = {};
        todosLosPaises.forEach(p => fichas[p] = 3);
        localStorage.setItem('fichas', JSON.stringify(fichas));
      }
    }
  
    // 👇 Procesa INMEDIATAMENTE los resultados de Dado2 al volver al mapa
    function procesarBatallaInmediata() {
      const paisDefensor = localStorage.getItem('paisDefensor');
      const resultados = JSON.parse(localStorage.getItem('resultadosBatalla2'));
      const fichas = JSON.parse(localStorage.getItem('fichas')) || {};
  
      // Solo procesar si hay un ataque pendiente con datos válidos
      if (!paisAtacante || !paisDefensor || !resultados) return;
  
      const perdidasAtaque  = Number(resultados.fichasPerdidasAtaque)  || 0;
      const perdidasDefensa = Number(resultados.fichasPerdidasDefensa) || 0;
  
      // Asegurar defaults
      if (typeof fichas[paisAtacante] === 'undefined') fichas[paisAtacante] = 1;
      if (typeof fichas[paisDefensor]  === 'undefined') fichas[paisDefensor]  = 1;
  
      // Aplicar pérdidas de LA JUGADA ya realizada
      fichas[paisAtacante] = Math.max(1, (fichas[paisAtacante] - perdidasAtaque));
      fichas[paisDefensor]  = (fichas[paisDefensor]  - perdidasDefensa);
  
      // Regla de conquista: defensor <= 0, o defensor == 1 y atacante > 1
      const fAt = fichas[paisAtacante];
      const fDef = fichas[paisDefensor];
  
      if (fDef <= 0 || (fDef === 1 && fAt > 1)) {
        conquistarPais(paisDefensor, paisAtacante, fichas);
        // Nota: conquistarPais ya limpia paisAtacante
      } else {
        // Si no hubo conquista, pero el atacante quedó con 1, termina su ataque
        if (fAt <= 1) {
          alert(`${paisAtacante} se ha quedado con 1 ficha y ya no puede seguir atacando.`);
          localStorage.removeItem('paisAtacante');
          paisAtacante = null;
        }
        localStorage.setItem('fichas', JSON.stringify(fichas));
      }
  
      // Limpiar SIEMPRE los datos de esa tirada (ya se procesó)
      localStorage.removeItem('paisDefensor');
      localStorage.removeItem('resultadosBatalla2');
      localStorage.removeItem('ganadorBatalla2');
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
  
      // Fin del ataque actual
      localStorage.removeItem('paisAtacante');
      paisAtacante = null;
  
      checkObjectives();
    }
  
    function checkObjectives() {
      const continentMap = {
        'USA':'America','Uruguay':'America','Argentina':'America','Canadá':'America','México':'America','Brasil':'America',
        'España':'Europa','Francia':'Europa','Granbretaña':'Europa','Gran Bretaña':'Europa','Italia':'Europa','Alemania':'Europa','Rusia':'Europa',
        'China':'Asia','Japón':'Asia','India':'Asia','Armenia':'Asia',
        'Egipto':'Africa','Etiopía':'Africa','Sudáfrica':'Africa',
        'Australia':'Oceania'
      };
      const p1 = JSON.parse(localStorage.getItem('paisesJugador1')) || paisesJugador1;
      const p2 = JSON.parse(localStorage.getItem('paisesJugador2')) || paisesJugador2;
  
      const contar = (lista,c) => lista.filter(p=>continentMap[p]===c).length;
      const completo = (lista,c) => {
        const todos = Object.keys(continentMap).filter(p=>continentMap[p]===c);
        return todos.every(p=>lista.includes(p));
      };
  
      const j1 = p1.includes('Australia') && contar(p1,'Asia')>=3 && completo(p1,'America') && completo(p1,'Europa');
      const j2 = completo(p2,'Africa') && completo(p2,'Asia') && p2.includes('Australia') && contar(p2,'Europa')>=4 && contar(p2,'America')>=4;
  
      if (j1){ localStorage.setItem('ganadorJuego','1'); window.location.href='ganadordeljuego1.html'; }
      else if (j2){ localStorage.setItem('ganadorJuego','2'); window.location.href='ganadordeljuago2.html'; }
    }
  
    function actualizarBotones() {
      const fichas = JSON.parse(localStorage.getItem('fichas')) || {};
      document.querySelectorAll(".rectangulo-gris button").forEach(boton => {
        let cant = (typeof fichas[boton.id] !== 'undefined') ? fichas[boton.id] : 1;
        if (cant < 1) { cant = 1; fichas[boton.id] = 1; }
        boton.textContent = `${boton.id} (${cant})`;
  
        // Jugador 2 ataca en Mapa4
        if (!paisAtacante) {
          boton.disabled = !(paisesJugador2.includes(boton.id) && cant > 1);
        } else {
          boton.disabled = !paisesJugador1.includes(boton.id);
        }
      });
      localStorage.setItem('fichas', JSON.stringify(fichas));
    }
  
    document.querySelectorAll(".rectangulo-gris button").forEach(boton => {
      boton.addEventListener('click', () => {
        const fichas = JSON.parse(localStorage.getItem('fichas')) || {};
        if (!paisAtacante) {
          if (paisesJugador2.includes(boton.id)) {
            if ((fichas[boton.id] || 1) > 1) {
              paisAtacante = boton.id;
              localStorage.setItem('paisAtacante', paisAtacante);
              actualizarBotones();
            } else {
              alert("No puedes atacar con un país que tiene solo 1 ficha.");
            }
          }
        } else {
          if (paisesJugador1.includes(boton.id)) {
            localStorage.setItem('paisDefensor', boton.id);
            window.location.href = "Dado2.html";
          }
        }
      });
    });
  
    // ORDEN CLAVE PARA QUE SEA "DE UNA"
    inicializarFichas();
    procesarBatallaInmediata(); // ← procesa al entrar
    actualizarBotones();
    checkObjectives();
  });
  