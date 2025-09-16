document.addEventListener('DOMContentLoaded', () => {
    // Definir los países de cada jugador
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    // Obtener las referencias a los elementos del DOM
    const encabezado = document.querySelector('.encabezado h1');
    const botonesContainer = document.querySelector('.rectangulo-gris');

    // Obtener el estado del juego desde localStorage
    let fichas = JSON.parse(localStorage.getItem('fichas'));
    let paisAtacante = localStorage.getItem('paisAtacante');

    // Definir el mensaje estático
    const mensajeEncabezado = "Jugador 2, es tu turno de atacar. Haz clic sobre uno de tus países para iniciar el ataque.";

    // Función para actualizar la visualización de los botones y el encabezado
    function actualizarEstadoPantalla() {
        // Cargar las fichas guardadas
        fichas = JSON.parse(localStorage.getItem('fichas'));
        if (!fichas) {
            console.error("No se encontraron las fichas en localStorage.");
            return;
        }

        const botones = document.querySelectorAll(".rectangulo-gris button");

        // Mantener el mensaje del encabezado estático
        encabezado.textContent = mensajeEncabezado;
        
        if (!paisAtacante) {
            // Fase de ataque: Jugador 2 elige país para atacar
            botones.forEach(boton => {
                boton.textContent = `${boton.id} (${fichas[boton.id]})`;
                boton.disabled = !paisesJugador2.includes(boton.id);
            });
        } else {
            // Fase de defensa: Jugador 1 elige país para defender
            botones.forEach(boton => {
                const esPaisDefensa = paisesJugador1.includes(boton.id);
                const esPaisAtacante = boton.id === paisAtacante;
                boton.disabled = !esPaisDefensa || esPaisAtacante;
                boton.textContent = `${boton.id} (${fichas[boton.id]})`;
            });
        }
    }

    // Agregar un solo event listener al contenedor de botones
    botonesContainer.addEventListener("click", (event) => {
        const botonClickeado = event.target;
        if (botonClickeado.tagName === 'BUTTON' && !botonClickeado.disabled) {
            if (!paisAtacante) {
                // Primer clic: Jugador 2 selecciona el país atacante
                paisAtacante = botonClickeado.id;
                localStorage.setItem('paisAtacante', paisAtacante);
                actualizarEstadoPantalla();
            } else {
                // Segundo clic: Jugador 1 selecciona el país defensor
                const paisDefensor = botonClickeado.id;
                localStorage.setItem('paisDefensor', paisDefensor);

                // Redirigir a la página de los dados
                window.location.href = "Dado2.html";
            }
        }
    });

    // Llamar a la función para inicializar la pantalla
    actualizarEstadoPantalla();
});