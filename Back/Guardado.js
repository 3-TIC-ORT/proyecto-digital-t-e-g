import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
function calcularPuntaje(estadoPartida, usuario) {
  let totalFichas = 0;
  for (let i = 0; i < estadoPartida.length; i++) {
    let pais = estadoPartida[i];
    if (pais.usuario === usuario) {
      totalFichas = totalFichas + pais.fichas;
    }
  }
  return totalFichas;
}
function guardarFichas(estadoPartida) {
  try {
    let dataAString = JSON.stringify(estadoPartida, null, 2);
    fs.writeFileSync("datos.json", dataAString);
    return { message: "Datos guardados correctamente", count: estadoPartida.length };
  } catch (error) {
    console.error("Error al guardar:", error);
    throw new Error("Fallo al guardar.");
  }
}
function cargarFichas() {
  try {
    let data = JSON.parse(fs.readFileSync("datos.json", "utf-8"));
    return data;
  } catch (e) {
    console.error("Error al cargar:", e.message);
    return [];
  }
}
function actualizarPuntaje(datos) {}
  try {
    let estadoActual = cargarFichas();
    let usuario = datos.usuario;
    let evento = datos.evento;
    let pais = datos.pais;
    let fichasNuevas = datos.fichasNuevas || 0;
   } catch (error) {
        console.error("Error al actualizar puntaje:", error);
    }