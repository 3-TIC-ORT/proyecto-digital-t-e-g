document.addEventListener('DOMContentLoaded', () => {

    const ataqueDadosJSON = localStorage.getItem('ataqueDados');
    const defensaDadosJSON = localStorage.getItem('defensaDados');

    if (!ataqueDadosJSON || !defensaDadosJSON) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de la batalla.';
        return;
    }

    const dadosAtaque = JSON.parse(ataqueDadosJSON);
    const dadosDefensa = JSON.parse(defensaDadosJSON);

    // Ordenar los dados de mayor a menor
    dadosAtaque.sort((a, b) => b - a);
    dadosDefensa.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    let duelos = Math.min(dadosAtaque.length, dadosDefensa.length);

    // Lógica para determinar el ganador de cada duelo
    for (let i = 0; i < duelos; i++) {
        if (dadosAtaque[i] > dadosDefensa[i]) {
            victoriasAtaque++;
        } else {
            victoriasDefensa++;
        }
    }

    // Determinar el ganador de la batalla
    let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';
    } else {
        ganador = 'Defensa';
    }

    // Guardar los resultados en localStorage para que el Mapa pueda usarlos
    const resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa,
        fichasPerdidasDefensa: victoriasAtaque
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));

    // Mostrar el nombre del ganador en la página
    document.getElementById('nombre-ganador').textContent = ganador;
});