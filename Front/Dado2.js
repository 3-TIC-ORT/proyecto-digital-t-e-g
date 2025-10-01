function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 6) + 1;
}

function lanzarDados() {
  let dadosAtaque = document.querySelectorAll('.dadoataque');
  let dadosDefensa = document.querySelectorAll('.dadodefensa');
  
  let ataqueResultados = [];
  let defensaResultados = [];


  dadosAtaque.forEach(dado => {
      let resultado = generarNumeroAleatorio();
      dado.textContent = resultado;
      ataqueResultados.push(resultado);
  });


  dadosDefensa.forEach(dado => {
      let resultado = generarNumeroAleatorio();
      dado.textContent = resultado;
      defensaResultados.push(resultado);
  });

  localStorage.setItem('ataqueDados', JSON.stringify(ataqueResultados));
  localStorage.setItem('defensaDados', JSON.stringify(defensaResultados));
}


function irAGanador() {
  window.location.href = 'Ganador2.html';
}

window.onload = lanzarDados;