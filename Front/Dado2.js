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

  localStorage.setItem('ataqueDados', JSON.stringify(ataqueResultados));
  localStorage.setItem('defensaDados', JSON.stringify(defensaResultados));
}


function irAGanador() {
  window.location.href = 'Ganador2.html';
}

window.onload = lanzarDados;