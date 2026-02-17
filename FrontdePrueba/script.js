connect2Server();

function conquistar() {
  postEvent("conquistarPais", {
    atacanteId: 1,
    defensorId: 2,
    pais: "Chile"
  }, (respuesta) => {

    if (respuesta.mensaje) {
      document.getElementById("resultado").innerText = respuesta.mensaje;
      return;
    }

    document.getElementById("resultado").innerText =
      "Conquista hecha. Puntos actuales: " + respuesta.puntosActuales;
  });
}

function finalizar() {
  postEvent("finalizarTurno", {
    jugadorId: 1
  }, (respuesta) => {

    if (respuesta.mensaje) {
      document.getElementById("resultado").innerText = respuesta.mensaje;
      return;
    }

    document.getElementById("resultado").innerText =
      "Refuerzos recibidos: " + respuesta.refuerzosEntregados +
      " | Fichas totales: " + respuesta.fichasTotales;
  });
}

function verPuntos() {
  getEvent("puntosActuales?jugadorId=1", (respuesta) => {

    if (respuesta.mensaje) {
      document.getElementById("resultado").innerText = respuesta.mensaje;
      return;
    }

    document.getElementById("resultado").innerText =
      "Puntos actuales: " + respuesta.puntos;
  });
}
