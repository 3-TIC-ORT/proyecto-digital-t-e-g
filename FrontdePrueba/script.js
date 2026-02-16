connect2Server();

function conquistar() {
  postEvent("conquistarPais", {
    atacanteId: 1,
    defensorId: 2,
    pais: "Chile"
  }, (respuesta) => {
    document.getElementById("resultado").innerText =
      "Conquista hecha. Puntos: " + respuesta.puntosActuales;
  });
}

function finalizar() {
  postEvent("finalizarTurno", {
    jugadorId: 1
  }, (respuesta) => {
    document.getElementById("resultado").innerText =
      "Refuerzos: " + respuesta.refuerzosEntregados +
      " | Total fichas: " + respuesta.fichasTotales;
  });
}

function verPuntos() {
  getEvent("puntosActuales?jugadorId=1", (respuesta) => {
    document.getElementById("resultado").innerText =
      "Puntos actuales: " + respuesta.puntos;
  });
}
