
window.onload = function() {

    const ataqueResultadosJSON = localStorage.getItem('ataqueDados');
    const defensaResultadosJSON = localStorage.getItem('defensaDados');

  
    if (!ataqueResultadosJSON || !defensaResultadosJSON) {
        console.error('No se encontraron los datos de los dados.');
        document.getElementById('nombre-ganador').textContent = 'Error';
        return;
    }


    const dadosAtaque = JSON.parse(ataqueResultadosJSON);
    const dadosDefensa = JSON.parse(defensaResultadosJSON);

    let victoriasAtaque = 0;
    let victoriasDefensa = 0;


    for (let i = 0; i < 3; i++) {
        const dadoAtaque = dadosAtaque[i];
        const dadoDefensa = dadosDefensa[i];

   
        if (dadoAtaque > dadoDefensa) {
            victoriasAtaque++;
        } else {
            victoriasDefensa++;
        }
    }

    // 5. Determinar el ganador final del juego.
    // El ganador es la persona que obtiene al menos 2 victorias.
    let ganador;
    if (victoriasAtaque >= 2) {
        ganador = 'Ataque';
    } else {
        ganador = 'Defensa';
    }

    // 6. Actualizar el contenido en el HTML para mostrar el ganador.
    const nombreGanadorSpan = document.getElementById('nombre-ganador');
    if (nombreGanadorSpan) {
        nombreGanadorSpan.textContent = ganador;
    } else {
        console.error('El elemento con id "nombre-ganador" no se encuentra en el HTML.');
    }
};