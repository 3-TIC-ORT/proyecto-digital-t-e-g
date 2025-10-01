document.addEventListener('DOMContentLoaded', () => {
    const ataqueDados = JSON.parse(localStorage.getItem('ataqueDados')) || [];
    const defensaDados = JSON.parse(localStorage.getItem('defensaDados')) || [];
    
    if (ataqueDados.length === 0 || defensaDados.length === 0) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de los dados.';
        return;
    }


    ataqueDados.sort((a, b) => b - a);
    defensaDados.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    
    const duelos = Math.min(ataqueDados.length, defensaDados.length);

    for (let i = 0; i < duelos; i++) {
        if (ataqueDados[i] > defensaDados[i]) {
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
});