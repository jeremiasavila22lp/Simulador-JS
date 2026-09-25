let entrada;
let sumaNotas = 0;
let cantidadNotas = 0;
let promedio = 0;

while (entrada !== "calcular") {
    entrada = prompt("Ingresa una nota y luego escribe 'calcular' para obtener el promedio o si no ingresaste nada 'salir' ");
    if (entrada === "salir") {
        alert("Hasta luego!!");
        break;

    } else if (entrada !== "calcular") {
        sumaNotas += parseFloat(entrada);
        cantidadNotas++;
    }
}

if (entrada === "calcular") {
    alert("Has decidido calcular el promedio");

    promedio = sumaNotas / cantidadNotas;

    if (cantidadNotas === 0) {
        alert("No ingresaste ninguna nota. Hasta luego!");
    } else {
        switch (true) {
            case (promedio < 6): {
                alert("Estas desaprobado sacaste: " + promedio);
                break
            }
            case (promedio >= 6 && promedio <= 7): {
                alert("Estas aprobado sacaste: " + promedio);
                break
            }
            case (promedio >= 8 && promedio <= 9): {
                alert("Muy bueno sacaste: " + promedio);
                break
            }
            case (promedio === 10): {
                alert("Excelente sacaste: " + promedio);
                break
            }
            case (promedio > 10): {
                alert("Error: Debes ingresar un número entre 1 y 10");
                break
            }
            default: {
                alert("Error: Debes ingresar un número");
                break
            }
        }
    }
}
