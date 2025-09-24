document.addEventListener('DOMContentLoaded', () => {
    const ataqueDados = JSON.parse(localStorage.getItem('ataqueDados')) || [];
    const defensaDados = JSON.parse(localStorage.getItem('defensaDados')) || [];
    
    if (ataqueDados.length === 0 || defensaDados.length === 0) {
        document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos de los dados.';
        return;
    }

    // ¡CRÍTICO!: Ordenar los dados de mayor a menor para la comparación por duelos.
    ataqueDados.sort((a, b) => b - a);
    defensaDados.sort((a, b) => b - a);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
    
    const duelos = Math.min(ataqueDados.length, defensaDados.length);

    // Lógica de duelos: Ataque pierde la ficha si el dado es menor o igual (Defensa gana el empate)
    for (let i = 0; i < duelos; i++) {
        if (ataqueDados[i] > defensaDados[i]) {
            victoriasAtaque++; // Defensa pierde 1 ficha
        } else {
            victoriasDefensa++; // Ataque pierde 1 ficha (por empate o ser menor)
        }
    }

    // Determinar el ganador final de la Batalla: Mínimo 2 duelos ganados.
    let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';
    } else {
        ganador = 'Defensa'; // Si el ataque no gana 2, gana la defensa.
    }

    // Guardar los resultados para la resta de fichas en Mapa3.js.
    const resultadosBatalla = {
        fichasPerdidasAtaque: victoriasDefensa, // Fichas que pierde el atacante (igual a duelos ganados por la defensa)
        fichasPerdidasDefensa: victoriasAtaque // Fichas que pierde el defensor (igual a duelos ganados por el ataque)
    };
    localStorage.setItem('resultadosBatalla', JSON.stringify(resultadosBatalla));
    localStorage.setItem('ganadorBatalla', ganador);
    
    document.getElementById('nombre-ganador').textContent = ganador;
});