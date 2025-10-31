import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";

function guardarFichas(datos) {
  JSON.stringify(fs.writeFileSync("datos.json", datos));
}

subscribePOSTEvent("guardar", (datos) => guardarFichas(datos));

function cargarFichas(archivo = "fichas.json") {
    let data = JSON.parse(fs.readFileSync("datos.json", "utf-8"));
    return (data);
}

subscribeGETEvent("cargar", cargarFichas);

startServer();