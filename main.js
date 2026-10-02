const comandoSalir = "salir";
const comandoCalcular = "calcular";
const comandoVolver = "volver";
const promedioNotas = (sumaNotas, cantidadNotas) => (sumaNotas / cantidadNotas);

function sumarNotas(valorActual, nuevaNota) {
    return valorActual + nuevaNota;
}

function pedirDato(mensaje) {
    return prompt(mensaje);
}

function evaluarPromedio(promedio) {

    switch (true) {
        case (promedio < 6): {
            alert("Estas desaprobado sacaste: " + promedio);
            break
        }
        case (promedio >= 6 && promedio <= 7): {
            alert("Estas aprobado sacaste: " + promedio);
            break
        }
        case (promedio >= 8 && promedio < 10): {
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

let seguirUsandoPrograma = true;

while (seguirUsandoPrograma === true) {
    let entrada = "";
    let sumaNotas = 0;
    let cantidadNotas = 0;
    let promedio = 0;

    while (entrada !== comandoCalcular && entrada !== comandoSalir) {

        entrada = pedirDato(
            "Ingresa una nota y luego escribe 'calcular' para obtener el promedio." +
            "\n" +
            "Si no ingresaste nada, escribe 'salir'."
        );
        if (entrada !== comandoCalcular && entrada !== comandoSalir) {
            let notaConvertida = parseFloat(entrada);
            if (!isNaN(notaConvertida)) {
                sumaNotas = sumarNotas(sumaNotas, notaConvertida);
                cantidadNotas++;
            } else {
                alert("Error: Debes ingresar un número");
            }
        }
    }

    if (entrada === comandoCalcular) {
        alert(`Has decidido calcular el promedio de ${cantidadNotas} notas`);

        if (cantidadNotas === 0) {
            alert("No ingresaste ninguna nota. Hasta luego!");
        } else {
            promedio = promedioNotas(sumaNotas, cantidadNotas);
            evaluarPromedio(promedio);
        }
    } else if (entrada === comandoSalir) {
        alert("Hasta luego!!");
        break;
    }

    let respuesta = prompt("¿Querés calcular el promedio de otro alumno? (si/no)");
    if (respuesta.toLowerCase() !== "si") {
        seguirUsandoPrograma = false;
        alert("¡Gracias por usar la calculadora!");
    }
}