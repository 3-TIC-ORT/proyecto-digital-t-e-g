const datosInput = document.getElementById("datos_input");
const btnGuardar = document.getElementById("btn_guardar");
const resultadoGuardar = document.getElementById("resultado_guardar");
const btnCargar = document.getElementById("btn_cargar");
const resultadoCargar = document.getElementById("resultado_cargar");

connect2Server();
btnGuardar.addEventListener('click', () => {
    const datosAEnviar = datosInput.value;

    resultadoGuardar.innerText = "Enviando datos al backend...";

    postEvent("guardar", datosAEnviar, (data) => {
        resultadoGuardar.innerText = "¡Datos guardados con éxito en datos.json!";
        console.log("Respuesta del servidor al guardar:", data);
    });
});
btnCargar.addEventListener('click', () => {
    resultadoCargar.innerText = "Solicitando datos al backend...";

    getEvent("cargar", cargarFichasResponseHandler);
});