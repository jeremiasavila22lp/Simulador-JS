const comandoSalir = "salir";
const comandoCalcular = "promediar";
const comandoVolver = "volver";
const promedioNotas = (sumaNotas, cantidadNotas) => (sumaNotas / cantidadNotas);

class Alumnos {
    constructor(id, nombre, materia, promedio) {
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.materia = materia.toLowerCase();
        this.promedio = promedio;
        this.aprobado = this.evaluarAprobacion();
    }

    evaluarAprobacion() {
        return this.promedio >= 6;
    }

    actualizacionPromedio(newPromedio) {
        this.promedio = newPromedio;
        this.aprobado = this.evaluarAprobacion();
    }

    obtenerInformacion() {
        const estado = this.aprobado ? "Aprobado" : "Desaprobado";
        return `ID: ${this.id},
        Nombre: ${this.nombre},
        Materia: ${this.materia},
        Promedio: ${this.promedio},
        Estado: ${estado}`;
    }

}

const alumno = [
    new Alumnos(1, "Avila", "JS", 9),
    new Alumnos(2, "Luna", "JS", 8.5),
    new Alumnos(3, "Campos", "JS", 4),
];

function sumarNotas(valorActual, nuevaNota) {
    return valorActual + nuevaNota;
}

function pedirDato(mensaje) {
    return prompt(mensaje);
}

function mostrarAlumnos(lista) {
    console.log("---Lista de Alumnos---");
    for (let Alumnos of lista) {
        console.log("Alumno: " + Alumnos.obtenerInformacion());
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
            let nuevoNombre = prompt("Ingrese el nombre del alumno: ");
            if (nuevoNombre != null && nuevoNombre.trim() != "" && isNaN(nuevoNombre)) {
                let materia = prompt("Ingrese la materia del alumno: ") || "JS";
                let notaInicial = parseFloat(prompt("Ingrese la nota inicial del alumno (1 al 10): "));

                if (!isNaN(notaInicial) && notaInicial >= 1 && notaInicial <= 10) {
                    let nuevoId = alumno.length + 1;
                    let nuevoAlumno = new Alumnos(nuevoId, nuevoNombre.trim(), materia, notaInicial);
                    alumno.push(nuevoAlumno);


                    alert("Alumno agregado correctamente\n" +
                        "Nombre: " + nuevoNombre + "\n" +
                        "Materia: " + materia + "\n" +
                        "Nota Inicial: " + notaInicial + "\n" +
                        "ID: " + nuevoId
                    )
                };
            } else if (notaInicial < 1 && notaInicial > 10) {
                alert("Error: Debes ingresar un numero entre 1 y 10")
            } else {
                alert("Error: Debes ingresar un nombre válido")
            }
            break;
        }
        case "3": {
            if (alumno.length > 0) {
                let eliminado = alumno.pop();
                alert("Alumno eliminado correctamente: " + eliminado.nombre.toUpperCase());
                console.log("Alumno eliminado correctamente: ", eliminado);
            } else {
                alert("No hay alumnos para eliminar");
            }
            break;
        }
        case "4": {
            let alumnoACorregir = prompt("Ingrese el nombre del alumno a corregir");

            if (alumnoACorregir != null && alumnoACorregir.trim() !== "") {
                let alumnoEncontrado = null;
                for (let unAlumno of alumno) {
                    if (unAlumno.nombre === alumnoACorregir.toLowerCase().trim()) {
                        alumnoEncontrado = unAlumno;
                        break;
                    }
                }

                if (alumnoEncontrado !== null) {
                    let nuevoNombre = prompt("Ingrese el nuevo nombre del alumno");
                    if (nuevoNombre != null && nuevoNombre.trim() !== "" && isNaN(nuevoNombre)) {
                        let nombreAnterior = alumnoEncontrado.nombre;
                        alumnoEncontrado.nombre = nuevoNombre.toLowerCase().trim();

                        alert(`Nombre anterior: ${nombreAnterior} || Nombre nuevo: ${alumnoEncontrado.nombre}`);
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
            let alumnoEncontrado = null;

            for (let unAlumno of alumno) {
                if (unAlumno.nombre === alumnoABuscar.toLowerCase().trim()) {
                    alumnoEncontrado = unAlumno;
                    break;
                }
            }

            if (alumnoEncontrado !== null) {

                alert("Alumno encontrado: " + alumnoEncontrado.nombre + " (ID: " + alumnoEncontrado.id + ")");

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
                        if (!isNaN(notaConvertida) && notaConvertida >= 1 && notaConvertida <= 10) {
                            sumaNotas = sumarNotas(sumaNotas, notaConvertida);
                            cantidadNotas++;
                        } else {
                            alert("Error: Debes ingresar un número válido, entre 1 y 10");
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

                        alumnoEncontrado.actualizacionPromedio(promedio);

                        alert("Estado del alumno actualizado \n" +
                            alumnoEncontrado.obtenerInformacion());
                        console.log("Ficha completa actualizada", alumnoEncontrado);
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
            alert(" Error: Debes ingresar una opción válida");
            break;
        }

    }
}