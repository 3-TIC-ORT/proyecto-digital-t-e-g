import fs from "fs";

let fichas = {
  "Argentina": 5,
  "Brasil": 3,
  "Chile": 2
};

function guardarFichas(fichas, archivo = "fichas.json") {
  fs.writeFileSync(archivo, JSON.stringify(fichas, null, 4));
  console.log("Fichas guardadas en", archivo);
}

function cargarFichas(archivo = "fichas.json") {
  try {
    const data = fs.readFileSync(archivo, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log("No hay archivo guardado todavía.");
    return {};
  }
}

guardarFichas(fichas);
let fichasCargadas = cargarFichas();
console.log("Fichas cargadas:", fichasCargadas);