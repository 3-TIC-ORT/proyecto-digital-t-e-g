document.addEventListener('DOMContentLoaded', () => {
    let ataqueDados = JSON.parse(localStorage.getItem('ataqueDados')) || [];
    let defensaDados = JSON.parse(localStorage.getItem('defensaDados')) || [];

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;

  
    let duelos = Math.min(ataqueDados.length, defensaDados.length);


    for (let i = 0; i < duelos; i++) {
        const a = ataqueDados[i];
        const d = defensaDados[i];

        if (a > d) {
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

    let resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa,
        fichasPerdidasDefensa: victoriasAtaque
    };

    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));
    localStorage.setItem('ganadorBatalla', ganador);

  
    const span = document.getElementById('nombre-ganador');
    if (span) span.textContent = ganador;
});