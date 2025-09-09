let fichas = {
    USA: 1,
    Rusia: 1,
    Egipto: 1,
    Etiopía: 1,
    Uruguay: 1,
    Argentina: 1,
    España: 1,
    Francia: 1,
    Granbretaña: 1,
    Canadá: 1,
    Alemania: 1,
    Sudáfrica: 1,
    China: 1,
    Japón: 1,
    Armenia: 1,
    India: 1,
    Australia: 1,
    México: 1,
    Brasil: 1,
    Italia: 1
};

let fichasDisponibles = 8;
const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

function actualizarDisplay() {
    let fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
    if (fichasGuardadas) {
        fichas = fichasGuardadas;
    }

    let fichasDisponiblesGuardadas = localStorage.getItem('fichasDisponiblesJugador1');
    if (fichasDisponiblesGuardadas) {
        fichasDisponibles = parseInt(fichasDisponiblesGuardadas);
    }
    document.querySelector('.encabezado h1').textContent = `JUGADOR 1, TENES ${fichasDisponibles} FICHAS PARA DISTRIBUIR ENTRE TODOS TUS PAISES`;

    for (let pais in fichas) {
        let boton = document.getElementById(pais);
        if (boton) {
            boton.textContent = `${pais} (${fichas[pais]})`;
            if (paisesJugador2.includes(pais)) {
                boton.disabled = true;
            } else {
                boton.disabled = (fichasDisponibles === 0);
            }
        }
    }
}

function manejarClickPais(event) {
    let pais = event.target.id;
    if (paisesJugador1.includes(pais) && fichasDisponibles > 0) {
        fichas[pais]++;
        fichasDisponibles--;
        localStorage.setItem('fichas', JSON.stringify(fichas));
        localStorage.setItem('fichasDisponiblesJugador1', fichasDisponibles);
        actualizarDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    for (let pais in fichas) {
        let boton = document.getElementById(pais);
        if (boton) {
            boton.addEventListener('click', manejarClickPais);
        }
    }
    actualizarDisplay();
});