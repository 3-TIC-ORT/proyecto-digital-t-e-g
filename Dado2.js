function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  function lanzarDados() {
    const dadosAtaque = document.querySelectorAll('.dadoataque');
    dadosAtaque.forEach(dado => {
      dado.textContent = generarNumeroAleatorio();
    });
  
    const dadosDefensa = document.querySelectorAll('.dadodefensa');
    dadosDefensa.forEach(dado => {
      dado.textContent = generarNumeroAleatorio();
    });
  }
  
  window.onload = lanzarDados;