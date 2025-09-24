document.addEventListener('DOMContentLoaded', () => {
    // Definición de países por jugador
    const paisesJugador1 = ["USA", "Rusia", "Egipto", "Etiopía", "Uruguay", "Argentina", "España", "Francia", "Granbretaña", "Canadá"];
    const paisesJugador2 = ["Alemania", "Sudáfrica", "China", "Japón", "Armenia", "India", "Australia", "México", "Brasil", "Italia"];

    // 1. Cargar las fichas actuales (Estado del juego)
    let fichas = JSON.parse(localStorage.getItem('fichas')) || {};
    
    // 2. INICIALIZACIÓN CRÍTICA DE LAS 8 FICHAS DE REFUERZO
    // Carga las fichas disponibles para J2.
    let fichasDisponibles = parseInt(localStorage.getItem('fichasDisponiblesJugador2'));
    
    // Si no hay fichas disponibles (NaN, o ya se habían usado todas: <= 0), se otorgan 8.
    if (isNaN(fichasDisponibles) || fichasDisponibles <= 0) {
        fichasDisponibles = 8;
        localStorage.setItem('fichasDisponiblesJugador2', fichasDisponibles);
    }

    // Función para actualizar el texto del encabezado y el estado de los botones
    function actualizarDisplay() {
        // Actualizar el encabezado con las fichas restantes
        document.querySelector('.encabezado h1').textContent = `JUGADOR 2, TENES ${fichasDisponibles} FICHAS PARA DISTRIBUIR ENTRE TODOS TUS PAISES`;

        const botones = document.querySelectorAll(".rectangulo-gris button");
        
        botones.forEach(boton => {
            const pais = boton.id;
            
            // 1. Mostrar el número de fichas actualizadas
            const cantidadFichas = fichas[pais] !== undefined ? fichas[pais] : 1;
            boton.textContent = `${pais} (${cantidadFichas})`;

            // 2. Deshabilitar:
            // Deshabilita países del JUGADOR 1
            if (paisesJugador1.includes(pais)) {
                boton.disabled = true;
            } 
            // Deshabilita países del JUGADOR 2 solo si ya no quedan fichas disponibles (fichasDisponibles === 0)
            else if (paisesJugador2.includes(pais)) {
                boton.disabled = (fichasDisponibles === 0);
            }
        });
    }

    // Manejador de clic para agregar 1 ficha
    function manejarClickPais(event) {
        let pais = event.target.id;
        
        // Solo permite agregar si es un país del J2 y quedan fichas disponibles
        if (paisesJugador2.includes(pais) && fichasDisponibles > 0) {
            
            if (fichas[pais] === undefined) {
                fichas[pais] = 1; 
            }
            
            fichas[pais]++;
            fichasDisponibles--;
            
            // Guardar el estado actualizado en localStorage
            localStorage.setItem('fichas', JSON.stringify(fichas));
            localStorage.setItem('fichasDisponiblesJugador2', fichasDisponibles);
            
            actualizarDisplay();
        } else if (paisesJugador2.includes(pais) && fichasDisponibles === 0) {
            alert('Ya no te quedan fichas de refuerzo disponibles. Presiona Siguiente.');
        }
    }

    // Asignar el evento a todos los botones
    const botones = document.querySelectorAll(".rectangulo-gris button");
    botones.forEach(boton => {
        boton.addEventListener('click', manejarClickPais);
    });

    // Llamada inicial para establecer el estado del mapa
    actualizarDisplay();
});