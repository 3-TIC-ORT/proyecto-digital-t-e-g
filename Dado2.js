function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 6) + 1;
}

function lanzarDados() {
  const dadosAtaque = document.querySelectorAll('.dadoataque');
  const dadosDefensa = document.querySelectorAll('.dadodefensa');
  
  let ataqueResultados = [];
  let defensaResultados = [];

  dadosAtaque.forEach(dado => {
    const resultado = generarNumeroAleatorio();
    dado.textContent = resultado;
    ataqueResultados.push(resultado);
  });

  dadosDefensa.forEach(dado => {
    const resultado = generarNumeroAleatorio();
    dado.textContent = resultado;
    defensaResultados.push(resultado);
  });

  const enlaceGanador = document.querySelector('.rectangulo-rojo a');
  if (enlaceGanador) {
    const resultadosAtaque = ataqueResultados.join(',');
    const resultadosDefensa = defensaResultados.join(',');
    
    enlaceGanador.href = `Ganador2.html?ataque=${resultadosAtaque}&defensa=${resultadosDefensa}`;
  }
}

window.onload = lanzarDados;