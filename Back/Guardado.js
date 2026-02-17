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

const PUNTOS_POR_CONQUISTA = 10;

subscribePOSTEvent("conquistarPais", (data) => {
  const datos = leerDatos();
  const atacanteId = datos.turnoActual;
  const atacante = buscarJugador(datos, atacanteId);
  if (!atacante) {
    return { mensaje: "Jugador no encontrado" };
  }
  let duenioActual = null;
  let paisEncontrado = null;
  for (let jugador of datos.jugadores) {
    for (let pais of jugador.paises) {
      const nombre = typeof pais === "string" ? pais : pais.nombre;
      if (nombre === data.pais) {
        duenioActual = jugador;
        paisEncontrado = pais;
        break;
      }
    }
    if (paisEncontrado) break;
  }
  if (!paisEncontrado) {
    atacante.paises.push({ nombre: data.pais, fichas: 1 });
  } else {
    if (duenioActual.id !== atacanteId) {
      duenioActual.paises = duenioActual.paises.filter(p => {
        const nombre = typeof p === "string" ? p : p.nombre;
        return nombre !== data.pais;
      });
      atacante.paises.push(typeof paisEncontrado === "string" ? { nombre: paisEncontrado, fichas: 1 } : { nombre: paisEncontrado.nombre, fichas: paisEncontrado.fichas || 1 });
    } else {
      const existe = atacante.paises.find(p => (typeof p === "string" ? p : p.nombre) === data.pais);
      if (!existe) {
        atacante.paises.push({ nombre: data.pais, fichas: 1 });
      } else {
        if (typeof existe === "object") existe.fichas = (existe.fichas || 0) + 1;
      }
    }
  }
  atacante.puntos = (atacante.puntos || 0) + PUNTOS_POR_CONQUISTA;
  guardarDatos(datos);
  return { ok: true, puntosActuales: atacante.puntos, turnoActual: datos.turnoActual };
});

subscribePOSTEvent("finalizarTurno", () => {
  const datos = leerDatos();
  const jugadorId = datos.turnoActual;
  const jugador = buscarJugador(datos, jugadorId);
  if (!jugador) {
    return { mensaje: "Jugador no encontrado" };
  }
  const cantidadPaises = jugador.paises.length;
  let refuerzos = Math.floor(cantidadPaises / 3);
  if (refuerzos < 3) refuerzos = 3;
  jugador.fichasDisponibles = (jugador.fichasDisponibles || 0) + refuerzos;
  const indiceActual = datos.jugadores.findIndex(j => j.id === jugadorId);
  if (indiceActual === -1) {
    datos.turnoActual = datos.jugadores.length > 0 ? datos.jugadores[0].id : jugadorId;
  } else {
    if (indiceActual === datos.jugadores.length - 1) datos.turnoActual = datos.jugadores[0].id;
    else datos.turnoActual = datos.jugadores[indiceActual + 1].id;
  }
  guardarDatos(datos);
  return { fichasTotales: jugador.fichasDisponibles, refuerzosEntregados: refuerzos, turnoSiguiente: datos.turnoActual };
});

subscribeGETEvent("puntosJugador", (query) => {
  const datos = leerDatos();
  const jugador = buscarJugador(datos, parseInt(query.jugadorId));
  if (!jugador) return { mensaje: "Jugador no encontrado" };
  return { puntos: jugador.puntos || 0 };
});

subscribeGETEvent("fichasJugador", (query) => {
  const datos = leerDatos();
  const jugador = buscarJugador(datos, parseInt(query.jugadorId));
  if (!jugador) return { mensaje: "Jugador no encontrado" };
  return { fichas: jugador.fichasDisponibles || 0 };
});

subscribePOSTEvent("reiniciarPartida", () => {
  const datos = leerDatos();
  for (let j of datos.jugadores) {
    j.paises = [];
    j.fichasDisponibles = 0;
    j.puntos = 0;
  }
  datos.turnoActual = datos.jugadores.length > 0 ? datos.jugadores[0].id : 1;
  guardarDatos(datos);
  return { ok: true, turnoActual: datos.turnoActual };
});

startServer(3000);
console.log("Servidor iniciado en puerto 3000");
