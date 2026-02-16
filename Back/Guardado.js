import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";

function leerDatos() {
  return JSON.parse(fs.readFileSync("./datos.json", "utf-8"));
}

function guardarDatos(datos) {
  fs.writeFileSync("./datos.json", JSON.stringify(datos, null, 2));
}

function buscarJugador(datos, id) {
  return datos.jugadores.find(j => j.id === id);
}

subscribePOSTEvent("conquistarPais", (data) => {
  const datos = leerDatos();

  const atacante = buscarJugador(datos, data.atacanteId);
  const defensor = buscarJugador(datos, data.defensorId);

  if (atacante === undefined || defensor === undefined) {
    return { mensaje: "Jugador no encontrado" };
  }

  defensor.paises = defensor.paises.filter(p => p !== data.pais);
  atacante.paises.push(data.pais);

  atacante.puntos += 100;

  guardarDatos(datos);

  return { ok: true, puntosActuales: atacante.puntos };
});

subscribePOSTEvent("finalizarTurno", (data) => {
  const datos = leerDatos();
  const jugador = buscarJugador(datos, data.jugadorId);

  if (jugador === undefined) {
    return { mensaje: "Jugador no encontrado" };
  }

  let cantidadPaises = jugador.paises.length;

  let refuerzos = Math.floor(cantidadPaises / 3);
  if (refuerzos < 3) {
    refuerzos = 3;
  }

  jugador.fichasDisponibles += refuerzos;

  guardarDatos(datos);

  return {
    fichasTotales: jugador.fichasDisponibles,
    refuerzosEntregados: refuerzos
  };
});

subscribeGETEvent("puntosActuales", (query) => {
  const datos = leerDatos();
  const jugador = buscarJugador(datos, parseInt(query.jugadorId));

  if (jugador === undefined) {
    return { mensaje: "Jugador no encontrado" };
  }

  return { puntos: jugador.puntos };
});

subscribeGETEvent("estadoJuego", () => {
  return leerDatos();
});

startServer(3000);
console.log("Servidor iniciado en puerto 3000");
