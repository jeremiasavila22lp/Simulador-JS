// Comandos y constantes
const comandoSalir = "salir";
const comandoCalcular = "promediar";
const comandoVolver = "volver";
const promedioNotas = (sumaNotas, cantidadNotas) => (sumaNotas / cantidadNotas);

// class de alumnos
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
// Array de alumnos para class Alumnos
const alumno = [
    new Alumnos(1, "Avila", "JS", 9),
    new Alumnos(2, "Luna", "JS", 8.5),
    new Alumnos(3, "Campos", "JS", 4),
    new Alumnos(4, "Fernandez", "HTML", 9),
    new Alumnos(5, "Rojas", "HTML", 8.5),
    new Alumnos(6, "Perez", "HTML", 9),

];

// Funciones suma de notas (cantidad de notas) y promedio
function sumarNotas(valorActual, nuevaNota) {
    return valorActual + nuevaNota;
}

function pedirDato(mensaje) {
    return prompt(mensaje);
}

// Mostrar lista de alumnos
function mostrarAlumnos(lista) {
    console.log("---Lista de Alumnos---");
    lista.forEach(alumno => {
        console.log("Alumno: " + alumno.obtenerInformacion());
    });
}

// Evaluar promedio con switch
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

// Bucle principal del programa (Menu de opciones para recorrer los case del switch)
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
            // Menu de opciones del A al E
            let opcionA = prompt("Elige una opcion: \n" +
                "A. Mostrar todos los alumnos sin filtro \n" +
                "B. Mostrar por materia \n" +
                "C. Mostrar por Estado (Aprobado/Desaprobado) \n" +
                "D. Filtrar por promedio destacado + Promedio general de todos los alumnos \n" +
                "E. Volver al menu principal\n"
            )?.toUpperCase().trim();

            switch (opcionA) {
                case "A": {
                    mostrarAlumnos(alumno);
                    alert("Lista de alumnos registrada en la consola (presiona F12 para ver)");
                    break;
                }
                case "B": {
                    const materiaBuscada = pedirDato("Ingrese la materia que desea buscar: ")?.toLowerCase().trim();
                    if (materiaBuscada) {
                        const alumnosPorMateria = alumno.filter(a => a.materia.toLowerCase() === materiaBuscada);
                        if (alumnosPorMateria.length > 0) {
                            mostrarAlumnos(alumnosPorMateria);
                            alert(`Se encontraron: ${alumnosPorMateria.length} alumno/s en la materia: "${materiaBuscada.toUpperCase()}. Revisa la consola"`);
                        } else {
                            alert(`No se encontraron alumnos con la materia: ${materiaBuscada}.`);
                        }
                    }
                    break;
                }
                case "C": {
                    const estadoBusqueda = pedirDato("Ingresa: \n 1- Para filtrar los aprobados. \n 2- Para filtrar los desaprobados. \n")?.trim();
                    if (estadoBusqueda === "1") {
                        const filtradoAprobados = alumno.filter(a => a.aprobado);
                        mostrarAlumnos(filtradoAprobados);
                        console.log(`Los alumnos aprobado son: ${filtradoAprobados.length}`);
                        alert(`Se encontraron: ${filtradoAprobados.length} alumno/s aprobado/s. Revisa la consola`);

                    }
                    else if (estadoBusqueda === "2") {
                        const filtradoDesaprobados = alumno.filter(a => !a.aprobado);
                        mostrarAlumnos(filtradoDesaprobados);
                        console.log(`Los alumnos desaprobados son: ${filtradoDesaprobados.length}`);
                        alert(`Se encontraron: ${filtradoDesaprobados.length} alumno/s desaprobado/s. Revisa la consola`);
                    } else {
                        alert("Error: Debes ingresar una opcion valida")
                    }
                    break;
                }
                case "D": {
                    const rankingAlumnos = [...alumno].sort((a, b) => b.promedio - a.promedio);
                    console.log(`--El ranking de los alumnos (mayor a menor)--`);
                    console.table(rankingAlumnos);
                    const rankingTexto = rankingAlumnos.map((a, index) => `${index + 1}. Puesto: ${a.nombre.toUpperCase()} - Promedio: ${a.promedio}`).join(`\n`); // Permite saltar lineas en el mensaje 
                    alert(`El ranking de los alumnos es:\n ${rankingTexto} \n`);
                    // Seguir con el rancking y ver que agregar.
                    const sumaTotalPromedios = alumno.reduce((acumulador, a) => acumulador + a.promedio, 0);
                    const promedioGeneral = (sumaTotalPromedios / alumno.length).toFixed(2);
                    console.log(`El promedio general de todos los alumnos es: ${promedioGeneral}`);
                    alert(`El promedio general de todos los alumnos es: \n${promedioGeneral}\n Revisa la consola`);
                    // Seguir con el desarrollo del promedio en general.
                    break;
                }
                case "E": {
                    alert("Volviendo al menu principal");
                    break;
                }
                default: {
                    alert("Error: Debes ingresar una opcion valida");
                    break;
                }
            }
            break;
        }
        case "2": {
            let nuevoNombre = prompt("Ingrese el nombre del alumno: ");

            if (nuevoNombre === null || nuevoNombre.trim() === "" || !isNaN(nuevoNombre)) {
                alert("Error: Debes ingresar un nombre valido")
                break;
            }
            let materia = prompt("Ingrese la materia del alumno: ") || "JS";
            let notaInicial = parseFloat(prompt("Ingrese la nota inicial del alumno (1 al 10): "));

            if (isNaN(notaInicial) || notaInicial < 1 || notaInicial > 10) {
                alert("Error: Debes ingresar una nota valida")
                break;
            }

            let nuevoId = alumno.length + 1;
            let nuevoAlumno = new Alumnos(nuevoId, nuevoNombre.trim(), materia, notaInicial);
            alumno.push(nuevoAlumno);

            alert("Alumno agregado correctamente\n" +
                "Nombre: " + nuevoNombre + "\n" +
                "Materia: " + materia + "\n" +
                "Nota Inicial: " + notaInicial + "\n" +
                "ID: " + nuevoId
            );
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
                // Se puede agregar un filtro para buscar el alumno y obtener su informacion              
                const alumnoEncontrado = alumno.find(a => a.nombre === alumnoACorregir.toLowerCase().trim());

                if (alumnoEncontrado) {
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
            //Otro filter para encontrar el alumno y calcular el promedio
            if (alumnoABuscar != null && alumnoABuscar.trim() !== "") {
                const alumnoEncontrado = alumno.find(a => a.nombre === alumnoABuscar.toLowerCase().trim());

                if (alumnoEncontrado) {
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