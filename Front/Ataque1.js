document.addEventListener("DOMContentLoaded", () => {
  const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
  const botones = document.querySelectorAll(".rectangulo-gris button");

  const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
  const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

  let paisAtacante = null;

  // Función para actualizar la visualización de los botones
  function actualizarBotones() {
      botones.forEach(boton => {
          // Actualizar el texto del botón con el número de fichas
          if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
              boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
          }

          // Habilitar o deshabilitar según la lógica de ataque/defensa
          if (!paisAtacante) {
              // Fase de selección de atacante (Jugador 1)
              boton.disabled = !paisesJugador1.includes(boton.id);
          } else {
              // Fase de selección de defensor (Jugador 2)
              boton.disabled = !paisesJugador2.includes(boton.id);
          }
      });
  }

  // Agregar event listeners a los botones
  botones.forEach(boton => {
      boton.addEventListener("click", () => {
          if (!paisAtacante) {
              // Se selecciona el país atacante
              if (paisesJugador1.includes(boton.id)) {
                  paisAtacante = boton.id;
                  localStorage.setItem('paisAtacante', paisAtacante);
                  actualizarBotones();
              }
          } else {
              // Se selecciona el país defensor
              if (paisesJugador2.includes(boton.id)) {
                  localStorage.setItem('paisDefensor', boton.id);
                  window.location.href = "Dado1.html";
              }
          }
      });
  });

  // Inicializar el estado de los botones
  actualizarBotones();
});