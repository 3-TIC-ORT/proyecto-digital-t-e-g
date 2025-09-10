document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".rectangulo-gris button");
  
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        if (!boton.disabled) { 
          // Solo funciona si el botón estaba habilitado
          botones.forEach(b => b.disabled = !b.disabled); 
        }
      });
    });
  });