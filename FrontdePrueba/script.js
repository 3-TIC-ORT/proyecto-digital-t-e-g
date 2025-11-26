const btnGuardar = document.getElementById("btn_guardar");
const btnCargar = document.getElementById("btn_cargar");

let argentina = {
  fichas: 1,
  color: "Rojo"
}

let rusia = {
    fichas: 2,
    color: "Azul"
}

connect2Server(3001);

let partida = [argentina, rusia];

function guardar() {
    postEvent("guardar", partida, (respuestaBackend) => {
        console.log("Guardado exitoso:", respuestaBackend);
    });
}

function cargar() {
    getEvent("cargar", (dataRecibida) => {
        argentina = dataRecibida[0];
        rusia = dataRecibida[1];

        console.log("Datos cargados exitosamente:");
        console.log("Argentina:", argentina);
        console.log("Rusia:", rusia);
    });
}

btnGuardar.addEventListener("click", ()=> guardar());
btnCargar.addEventListener("click", ()=> cargar());