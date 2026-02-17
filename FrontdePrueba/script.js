connect2Server();

function mostrar(texto) {
  document.getElementById("resultado").innerText = texto;
}

function conquistar() {
  postEvent("conquistarPais", { pais: "Chile" }, (respuesta) => {
    if (respuesta.mensaje) {
      mostrar(respuesta.mensaje);
      return;
    }
    mostrar("Conquista hecha. Puntos actuales: " + (respuesta.puntosActuales || 0) + " | Turno actual: " + (respuesta.turnoActual || "N/A"));
  });
}

function finalizar() {
  postEvent("finalizarTurno", {}, (respuesta) => {
    if (respuesta.mensaje) {
      mostrar(respuesta.mensaje);
      return;
    }
    mostrar("Refuerzos recibidos: " + (respuesta.refuerzosEntregados || 0) + " | Fichas totales: " + (respuesta.fichasTotales || 0) + " | Turno siguiente: " + (respuesta.turnoSiguiente || "N/A"));
  });
}

function verPuntosJugador1() {
  getEvent("puntosJugador?jugadorId=1", (r) => {
    if (r.mensaje) { mostrar(r.mensaje); return; }
    mostrar("Puntos Jugador 1: " + (r.puntos || 0));
  });
}

function verPuntosJugador2() {
  getEvent("puntosJugador?jugadorId=2", (r) => {
    if (r.mensaje) { mostrar(r.mensaje); return; }
    mostrar("Puntos Jugador 2: " + (r.puntos || 0));
  });
}

function verFichasJugador1() {
  getEvent("fichasJugador?jugadorId=1", (r) => {
    if (r.mensaje) { mostrar(r.mensaje); return; }
    mostrar("Fichas Jugador 1: " + (r.fichas || 0));
  });
}

function verFichasJugador2() {
  getEvent("fichasJugador?jugadorId=2", (r) => {
    if (r.mensaje) { mostrar(r.mensaje); return; }
    mostrar("Fichas Jugador 2: " + (r.fichas || 0));
  });
}

function reiniciar() {
  postEvent("reiniciarPartida", {}, (r) => {
    if (r.ok) { mostrar("Partida reiniciada. Turno actual: " + (r.turnoActual || "N/A")); return; }
    mostrar(r.mensaje || "Error al reiniciar");
  });
}
