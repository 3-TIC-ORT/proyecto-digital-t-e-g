document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.card'));

  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;

    // Crear imagen reverso y colocar encima de la imagen existente
    const back = document.createElement('img');
    back.className = 'card-back';
    back.src = 'Imágenes/Carta atrás.png';
    back.alt = 'Carta atrás';

    // Si la imagen reverso no carga, eliminarla para no bloquear la carta
    back.onerror = function () {
      if (this.parentNode) this.parentNode.removeChild(this);
    };

    // Al hacer click en la imagen reverso, quitarla para mostrar la carta
    back.addEventListener('click', function (ev) {
      if (this.parentNode) this.parentNode.removeChild(this);
    });

    card.appendChild(back);
  });
});
