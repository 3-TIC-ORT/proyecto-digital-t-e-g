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
  
    let victoriasAtaque = 0;
    let victoriasDefensa = 0;
  
    for (let i = 0; i < dadosAtaque.length; i++) {
      if (dadosAtaque[i] > dadosDefensa[i]) {
        victoriasAtaque++;
      } else if (dadosDefensa[i] > dadosAtaque[i]) {
        victoriasDefensa++;
      }
    }
  
    const resultadoElement = document.getElementById('nombre-ganador');
    if (victoriasAtaque >= 2) {
      resultadoElement.textContent = 'Ataque';
    } else if (victoriasDefensa >= 2) {
      resultadoElement.textContent = 'Defensa';
    } else {
      resultadoElement.textContent = 'Defensa';
    }
  }
  
  window.onload = determinarGanador;