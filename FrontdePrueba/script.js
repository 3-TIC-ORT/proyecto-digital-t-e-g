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
    estadoPartida = partida;
    postEvent("guardar", estadoPartida);
    console.log(estadoPartida)
}

function cargar() {
    getEvent("cargar", (estadoPartida) => {
        argentina = estadoPartida.argentina;
        rusia = estadoPartida.rusia;
    });
    console.log(estadoPartida)
}

btnGuardar.addEventListener("click", ()=> guardar());
btnCargar.addEventListener("click", ()=> cargar());