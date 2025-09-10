function determinarGanador() {
  const urlParams = new URLSearchParams(window.location.search);
  const ataqueStr = urlParams.get('ataque');
  const defensaStr = urlParams.get('defensa');

  if (!ataqueStr || !defensaStr) {
    document.getElementById('nombre-ganador').textContent = 'Error: Faltan datos.';
    return;
  }

  const dadosAtaque = ataqueStr.split(',').map(Number);
  const dadosDefensa = defensaStr.split(',').map(Number);

  dadosAtaque.sort((a, b) => b - a);
  dadosDefensa.sort((a, b) => b - a);

  let victoriasAtacante = 0;
  let victoriasDefensa = 0;
  const duelos = Math.min(dadosAtaque.length, dadosDefensa.length);

  for (let i = 0; i < duelos; i++) {
      if (dadosAtaque[i] > dadosDefensa[i]) {
          victoriasAtacante++;
      } else {
          victoriasDefensa++;
      }
  }
  
  const resultadoElement = document.getElementById('nombre-ganador');
  let resultadoBatalla = {
      fichasPerdidasAtaque: 0,
      fichasPerdidasDefensa: 0
  };

  if (victoriasAtacante >= 2) {
      resultadoElement.textContent = 'Ataque';
      resultadoBatalla.fichasPerdidasDefensa = victoriasAtacante;
  } else {
      resultadoElement.textContent = 'Defensa';
      resultadoBatalla.fichasPerdidasAtaque = victoriasDefensa;
  }

  localStorage.setItem('resultadoBatalla', JSON.stringify(resultadoBatalla));
}

window.onload = determinarGanador;