import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";

function guardarFichas() {
  JSON.stringify(fs.writeFileSync("datos.json", ));
}

subscribePOSTEvent("guardar", () => guardarFichas());

function cargarFichas(archivo = "fichas.json") {
    let data = JSON.parse(fs.readFileSync("datos.json", "utf8"));
    return (data);
}

subscribeGETEvent("cargar", () => cargarFichas());

startServer();