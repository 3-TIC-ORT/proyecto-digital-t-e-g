import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";

function guardarFichas(estadoPartida) {
  try {
    const dataAString = JSON.stringify(estadoPartida, null, 2);
    fs.writeFileSync("datos.json", dataAString);
    return { message: "Datos guardados correctamente", count: estadoPartida.length };
  } catch (error) {
    console.error("Error al intentar guardar el archivo:", error);
    throw new Error("Fallo en la operación de guardado en el servidor.");
  }
}

subscribePOSTEvent("guardar", guardarFichas);

function cargarFichas() {
  try {
    let data = JSON.parse(fs.readFileSync("datos.json", "utf-8"));
    return data;
  } catch (e) {
    console.error("Error al cargar el archivo:", e.message);
    return [];
  }
}

subscribeGETEvent("cargar", cargarFichas);

startServer(3001, true);