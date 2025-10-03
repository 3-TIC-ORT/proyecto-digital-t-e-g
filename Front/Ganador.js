document.addEventListener('DOMContentLoaded', () => {
    let ataqueDados = JSON.parse(localStorage.getItem('ataqueDados')) || [];
    let defensaDados = JSON.parse(localStorage.getItem('defensaDados')) || [];
    
   


    ataqueDados.sort((a, b,) => b - a);
    defensaDados.sort((a, b) => b - a);

    let victoriasAtaque
    let victoriasDefensa
    
    let duelos = Math.min(ataqueDados.length, defensaDados.length);

      let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';} 
    else if (victoriasAtaque = victoriasDefensa){ganador = "Defensa";}
    else {ganador = "Defensa"}

    let resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa, 
        fichasPerdidasDefensa: victoriasAtaque 
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));
    localStorage.setItem('ganadorBatalla', ganador);
    
    document.getElementById('nombre-ganador').textContent = ganador;
});