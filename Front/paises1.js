document.addEventListener('DOMContentLoaded', function () {
    // No modificamos los `src` originales: solo añadimos la imagen reverso
    const cards = Array.from(document.querySelectorAll('.card'));

    cards.forEach((card) => {
        const baseImg = card.querySelector('img');
        if (!baseImg) return;
        baseImg.alt = baseImg.alt || 'Carta país';

        // Crear la imagen de reverso que se coloca encima
        const back = document.createElement('img');
        back.className = 'card-back';
        back.src = 'Imágenes/Carta atrás.png';
        back.alt = 'Carta atrás';

        // Si la imagen de reverso falla, removerla para no bloquear la carta
        back.onerror = function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        };

        // Función para remover el reverso con pequeña transición
        function removeBack() {
            if (!this || !this.parentNode) return;
            this.style.pointerEvents = 'none';
            this.style.transition = 'opacity 0.18s ease-in-out';
            this.style.opacity = '0';
            const el = this;
            setTimeout(function () {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 200);
        }

        back.addEventListener('click', removeBack);

        // permitir revelar haciendo click en cualquier parte de la tarjeta
        card.addEventListener('click', function (ev) {
            // evitar que clicks en enlaces u otros elementos interfieran
            removeBack.call(back);
        });

        // Añadir la imagen de reverso al contenedor de la carta
        card.appendChild(back);
    });
});
