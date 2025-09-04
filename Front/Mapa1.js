let USA = document.getElementById("USA")
let Canadá = document.getElementById("Canadá")
let México = document.getElementById("México")
let Brasil = document.getElementById("Brasil")
let Argentina = document.getElementById("Argentina")
let Uruguay = document.getElementById("Uruguay")
let Granbretaña = document.getElementById("Granbretaña")
let Francia = document.getElementById("Francia")
let España = document.getElementById("España")
let Italia = document.getElementById("Italia")
let Alemania = document.getElementById("Alemania")
let Rusia = document.getElementById("Rusia")
let Egipto = document.getElementById("Egipto")
let Etiopía = document.getElementById("Etiopía")
let Sudáfrica = document.getElementById("Sudáfrica")
let China = document.getElementById("China")
let Japón = document.getElementById("Japón")
let Armenia = document.getElementById("Armenia")
let India = document.getElementById("India")
let Australia = document.getElementById("Australia")

let fichas = {
    USA: 0,
    Canadá: 0,
    México: 0,
    Brasil: 0,
    Argentina: 0,
    Uruguay: 0,
    Granbretaña: 0,
    Francia: 0,
    España: 0,
    Italia: 0,
    Alemania: 0,
    Rusia: 0,
    Egipto: 0,
    Etiopía: 0,
    Sudáfrica: 0,
    China: 0,
    Japón: 0,
    Armenia: 0,
    India: 0,
    Australia: 0
};

// Función genérica para añadir ficha
function añadirFicha(pais) {
    fichas[pais]++; // suma 1
    alert(`${pais}: ${fichas[pais]}`); // muestra cuántas tiene
}

// Asignar eventos automáticamente a cada país
for (let pais in fichas) {
    let elemento = document.getElementById(pais);
    if (elemento) {
        elemento.addEventListener("click", () => añadirFicha(pais));
    }
}