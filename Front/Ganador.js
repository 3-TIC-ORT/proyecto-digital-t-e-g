document.addEventListener('DOMContentLoaded', () => {
    const ataqueDadosJSON = localStorage.getItem('ataqueDados');
    const defensaDadosJSON = localStorage.getItem('defensaDados');

    if (!ataqueDadosJSON || !defensaDadosJSON) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de la batalla.';
        return;
    }

    const dadosAtaque = JSON.parse(ataqueDadosJSON);
    const dadosDefensa = JSON.parse(defensaDadosJSON);

    dadosAtaque.sort((a, b) => b - a);
    dadosDefensa.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    let duelos = Math.min(dadosAtaque.length, dadosDefensa.length);

    // Lógica corregida: Si el dado de ataque es mayor, gana ataque. Si no, gana defensa (incluyendo empates).
    for (let i = 0; i < duelos; i++) {
        if (dadosAtaque[i] > dadosDefensa[i]) {
            victoriasAtaque++;
        } else {
            victoriasDefensa++;
        }
    }

    // Determinar el ganador final según tus reglas
    let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';
    } else if (victoriasDefensa >= 2) {
        ganador = 'Defensa';
    } else {
        // En caso de que nadie haya ganado al menos 2 duelos, la defensa gana.
        ganador = 'Defensa';
    }

    const resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa,
        fichasPerdidasDefensa: victoriasAtaque
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));

    document.getElementById('nombre-ganador').textContent = ganador;
});