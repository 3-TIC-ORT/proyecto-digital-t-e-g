document.addEventListener('DOMContentLoaded', () => {
    const ataqueDados = JSON.parse(localStorage.getItem('ataqueDados')) || [];
    const defensaDados = JSON.parse(localStorage.getItem('defensaDados')) || [];
    
    // Si no hay datos, muestra un error
    if (ataqueDados.length === 0 || defensaDados.length === 0) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de los dados.';
        return;
    }

    // Ordenar los dados de mayor a menor para la comparación
    ataqueDados.sort((a, b) => b - a);
    defensaDados.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    
    // Compara los dados uno a uno
    for (let i = 0; i < Math.min(ataqueDados.length, defensaDados.length); i++) {
        // La defensa gana los empates
        if (ataqueDados[i] > defensaDados[i]) {
            victoriasAtaque++;
        } else {
            victoriasDefensa++;
        }
    }

    // Determina el ganador final
    let ganador;
    if (victoriasAtaque > victoriasDefensa) {
        ganador = 'Ataque';
    } else {
        ganador = 'Defensa';
    }
    
    // Guarda el resultado de la batalla en localStorage para que Mapa3.js lo use
    localStorage.setItem('resultadosBatalla', JSON.stringify({
        fichasPerdidasAtaque: victoriasDefensa,
        fichasPerdidasDefensa: victoriasAtaque,
        ganador: ganador
    }));

    document.getElementById('nombre-ganador').textContent = ganador;
});