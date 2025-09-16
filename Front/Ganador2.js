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
    let fichasPerdidasAtaque = 0;
    let fichasPerdidasDefensa = 0;

    // Asumimos que la comparación es del dado más alto al más bajo
    dadosAtaque.sort((a, b) => b - a);
    dadosDefensa.sort((a, b) => b - a);

    const duelos = Math.min(dadosAtaque.length, dadosDefensa.length);

    for (let i = 0; i < duelos; i++) {
        const dadoAtaque = dadosAtaque[i];
        const dadoDefensa = dadosDefensa[i];
        
        if (dadoAtaque > dadoDefensa) {
            victoriasAtaque++;
            fichasPerdidasDefensa++;
        } else {
            victoriasDefensa++;
            fichasPerdidasAtaque++;
        }
    }

    let ganador;
    if (victoriasAtaque > victoriasDefensa) {
        ganador = 'Ataque';
    } else if (victoriasDefensa > victoriasAtaque) {
        ganador = 'Defensa';
    } else {
        ganador = 'Empate';
    }

    document.getElementById('nombre-ganador').textContent = ganador;

    const paisAtacante = localStorage.getItem('paisAtacante');
    const paisDefensor = localStorage.getItem('paisDefensor');
    let fichas = JSON.parse(localStorage.getItem('fichas'));
    let paisesJugador1 = JSON.parse(localStorage.getItem('paisesJugador1'));
    let paisesJugador2 = JSON.parse(localStorage.getItem('paisesJugador2'));
    let jugador1ConquistoPais = false;
    let jugador2ConquistoPais = false;

    if (ganador === 'Ataque' || ganador === 'Empate') {
        fichas[paisDefensor] -= fichasPerdidasDefensa;
        fichas[paisAtacante] -= fichasPerdidasAtaque;

        if (fichas[paisDefensor] <= 0) {
            delete fichas[paisDefensor];
            paisesJugador2 = paisesJugador2.filter(pais => pais !== paisDefensor);
            paisesJugador1.push(paisDefensor);
            fichas[paisDefensor] = 1;
            fichas[paisAtacante]--;
            jugador1ConquistoPais = true;
        }

    } else if (ganador === 'Defensa') {
        fichas[paisAtacante] -= fichasPerdidasAtaque;
        fichas[paisDefensor] -= fichasPerdidasDefensa;

        if (fichas[paisAtacante] <= 0) {
            delete fichas[paisAtacante];
            paisesJugador1 = paisesJugador1.filter(pais => pais !== paisAtacante);
            paisesJugador2.push(paisAtacante);
            fichas[paisAtacante] = 1;
            fichas[paisDefensor]--;
            jugador2ConquistoPais = true;
        }
    }
    
    localStorage.setItem('fichas', JSON.stringify(fichas));
    localStorage.setItem('paisesJugador1', JSON.stringify(paisesJugador1));
    localStorage.setItem('paisesJugador2', JSON.stringify(paisesJugador2));
    localStorage.setItem('turno', 'Jugador2');

    // Redirección a la siguiente pantalla sin cambiar el título
    setTimeout(() => {
        window.location.href = 'Mapa5.html';
    }, 3000);
};