window.onload = function() {
    const ataqueResultadosJSON = localStorage.getItem('ataqueDados');
    const defensaResultadosJSON = localStorage.getItem('defensaDados');

    if (!ataqueResultadosJSON || !defensaResultadosJSON) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de los dados.';
        return;
    }

    const dadosAtaque = JSON.parse(ataqueResultadosJSON);
    const dadosDefensa = JSON.parse(defensaResultadosJSON);

    // CRÍTICO: Ordenar los dados de mayor a menor para la comparación (Regla de ORDEN)
    dadosAtaque.sort((a, b) => b - a);
    dadosDefensa.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    let duelos = Math.min(dadosAtaque.length, dadosDefensa.length);

    // Lógica: La defensa gana si dadoAtaque <= dadoDefensa
    for (let i = 0; i < duelos; i++) {
        if (dadosAtaque[i] > dadosDefensa[i]) {
            victoriasAtaque++; // Defensa pierde 1 ficha
        } else {
            victoriasDefensa++; // Ataque pierde 1 ficha
        }
    }

    // El ganador de la batalla es el que obtiene al menos 2 victorias.
    let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';
    } else {
        ganador = 'Defensa';
    }

    // Guardar los resultados en localStorage para que Mapa5.js pueda leerlos
    const resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa, // Fichas que pierde el J2 (atacante)
        fichasPerdidasDefensa: victoriasAtaque // Fichas que pierde el J1 (defensor)
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));
    localStorage.setItem('ganadorBatalla', ganador);
    
    document.getElementById('nombre-ganador').textContent = ganador;
};