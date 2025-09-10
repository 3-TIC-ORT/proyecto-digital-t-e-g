document.addEventListener("DOMContentLoaded", () => {
  // Obtener los datos de fichas desde localStorage
  const fichasGuardadas = JSON.parse(localStorage.getItem('fichas'));
  
  const botones = document.querySelectorAll(".rectangulo-gris button");

  botones.forEach(boton => {
    // Actualizar el texto del botón si existen datos de fichas
    if (fichasGuardadas && fichasGuardadas[boton.id] !== undefined) {
      boton.textContent = `${boton.id} (${fichasGuardadas[boton.id]})`;
    }

    boton.addEventListener("click", () => {
      if (!boton.disabled) { 
        // Solo funciona si el botón estaba habilitado
        botones.forEach(b => b.disabled = !b.disabled); 
      }
    });
  });
});