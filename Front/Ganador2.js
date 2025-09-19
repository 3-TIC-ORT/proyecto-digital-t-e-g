window.onload = function() {
    const ataqueResultadosJSON = localStorage.getItem('ataqueDados');
    const defensaResultadosJSON = localStorage.getItem('defensaDados');

    if (!ataqueResultadosJSON || !defensaResultadosJSON) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de los dados.';
        return;
    }

    const dadosAtaque = JSON.parse(ataqueResultadosJSON);
    const dadosDefensa = JSON.parse(defensaResultadosJSON);

    // Se ha eliminado la línea de ordenamiento de dados para cumplir con la regla de comparación de orden.
    // dadosAtaque.sort((a, b) => b - a);
    // dadosDefensa.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    let duelos = Math.min(dadosAtaque.length, dadosDefensa.length);

    // Lógica: Si el dado de ataque es mayor, gana ataque. Si no, gana defensa (incluyendo empates).
    for (let i = 0; i < duelos; i++) {
        if (dadosAtaque[i] > dadosDefensa[i]) {
            victoriasAtaque++;
        } else {
            victoriasDefensa++;
        }
    }

    let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';
    } else {
        ganador = 'Defensa';
    }

    // Guardar los resultados en localStorage para que Mapa5.js pueda leerlos
    const resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa,
        fichasPerdidasDefensa: victoriasAtaque
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));
    localStorage.setItem('ganadorBatalla', ganador);
    
    document.getElementById('nombre-ganador').textContent = ganador;
};