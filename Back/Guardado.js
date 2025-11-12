import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";

function guardarFichas(estadoPartida) {
  let estado = estadoPartida;
  JSON.stringify(fs.writeFileSync("datos.json", estado));
}

subscribePOSTEvent("guardar", ()=> guardarFichas());

function cargarFichas() {
    let data = JSON.parse(fs.readFileSync("datos.json", "utf-8"));
    return (data);
}

subscribeGETEvent("cargar", cargarFichas);

startServer(3001, true);