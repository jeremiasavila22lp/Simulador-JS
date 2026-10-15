const comandoSalir = "salir";
const comandoCalcular = "promediar";
const comandoVolver = "volver";
const promedioNotas = (sumaNotas, cantidadNotas) => (sumaNotas / cantidadNotas);
const alumno = ["avila", "campos", "luna", "lopez", "perez"];

function sumarNotas(valorActual, nuevaNota) {
    return valorActual + nuevaNota;
}

function pedirDato(mensaje) {
    return prompt(mensaje);
}

function mostrarAlumnos(lista) {
    console.log("---Lista de Alumnos---");
    for (let unAlumno of lista) {
        console.log("Alumno: " + unAlumno);
    }
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

while (seguirUsandoPrograma) {

    let opcion = prompt("Bienvenido al gestor de Notas. Elige una opcion: \n" +
        "1. Ver lista de alumnos \n" +
        "2. Agregar un Alumno \n" +
        "3. Eliminar el ultimo Alumno \n" +
        "4. Corregir nombre de alumno \n" +
        "5. Calcular promedio de un alumno \n" +
        "6. Salir\n"

    );

    switch (opcion) {
        case "1": {
            mostrarAlumnos(alumno);
            alert("Lista de alumnos registrada en la consola (presiona F12 para ver)")
            break;
        }
        case "2": {
            let nuevoAlumno = prompt("Ingrese el nombre del alumno: ");
            if (nuevoAlumno != null && nuevoAlumno.trim() != "" && isNaN(nuevoAlumno)) {
                alumno.push(nuevoAlumno.trim());
                alert("Alumno agregado correctamente")
            } else {
                alert("Error: Debes ingresar un nombre válido")
            }
            break;
        }
        case "3": {
            if (alumno.length > 0) {
                let eliminado = alumno.pop();
                alert("Alumno eliminado correctamente: " + eliminado);
            } else {
                alert("No hay alumnos para eliminar");
            }
            break;
        }
        case "4": {
            let alumnoACorregir = prompt("Ingrese el nombre del alumno a corregir");

            if (alumnoACorregir != null && alumnoACorregir.trim() !== "") {
                let indice = alumno.indexOf(alumnoACorregir);

                if (indice !== -1) {
                    let nuevoNombre = prompt("Ingrese el nuevo nombre del alumno");
                    if (nuevoNombre != null && nuevoNombre.trim() !== "") {
                        alumno.splice(indice, 1, nuevoNombre.trim());
                        alert("Alumno corregido correctamente");
                    } else {
                        alert("El nuevo nombre no es valido");
                    }
                } else {
                    alert("Alumno no encontrado, agregalo primero (Opcion 2) o revisa que el nombre sea correcto");
                }
            }

            break;
        }
        case "5": {
            let alumnoABuscar = prompt("Ingrese el nombre del alumno:");

            if (alumno.includes(alumnoABuscar)) {
                let posicion = alumno.indexOf(alumnoABuscar);
                alert("Alumno encontrado: " + alumnoABuscar + " en la posicion " + posicion);

                let entrada = "";
                let sumaNotas = 0;
                let cantidadNotas = 0;
                let promedio = 0;

                while (entrada !== comandoCalcular && entrada !== comandoSalir) {

                    entrada = pedirDato(
                        "Ingresa una nota y luego escribe 'promediar' para obtener el promedio." +
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
                }

            } else {
                alert("Alumno no encontrado, agregalo primero (Opcion 2)");
            }
            break;
        }
        case "6": {
            seguirUsandoPrograma = false;
            alert("¡Gracias por usar la calculadora!");
            break;
        }
        default: {
            alert("Error: Debes ingresar una opción válida");
            break;
        }
    }
}