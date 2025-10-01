window.onload = function() {
    const ataqueResultadosJSON = localStorage.getItem('ataqueDados');
    const defensaResultadosJSON = localStorage.getItem('defensaDados');

    if (!ataqueResultadosJSON || !defensaResultadosJSON) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de los dados.';
        return;
    }

    const dadosAtaque = JSON.parse(ataqueResultadosJSON);
    const dadosDefensa = JSON.parse(defensaResultadosJSON);


    dadosAtaque.sort((a, b) => b - a);
    dadosDefensa.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    let duelos = Math.min(dadosAtaque.length, dadosDefensa.length);


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

    const resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa, 
        fichasPerdidasDefensa: victoriasAtaque 
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));
    localStorage.setItem('ganadorBatalla', ganador);
    
    document.getElementById('nombre-ganador').textContent = ganador;
};