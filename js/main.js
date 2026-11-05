// Comandos y constantes
const formulario = document.getElementById("formulario-alumno");
const inputNombre = document.querySelector("#nombre");
const inputCurso = document.querySelector("#curso");
const inputNota = document.querySelector("#nota");
const contenedorAlumnos = document.querySelector("#contenedor-alumnos");
const mensaje = document.querySelector("#mensaje");
const totalAlumnos = document.querySelector("#total-alumnos");
const promedioGeneral = document.querySelector("#promedio-general");
const totalAprobados = document.querySelector("#total-aprobados");
const busqueda = document.querySelector("#busqueda");
const filtroCurso = document.querySelector("#filtro-curso");
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
let alumnos = [
    new Alumnos(1, "Avila", "JS", 9),
    new Alumnos(2, "Luna", "JS", 8.5),
    new Alumnos(3, "Campos", "JS", 4),
    new Alumnos(4, "Fernandez", "HTML", 9),
    new Alumnos(5, "Rojas", "HTML", 8.5),
    new Alumnos(6, "Perez", "HTML", 9),

];

function renderizarAlumnos(lista) {
    contenedorAlumnos.innerHTML = "";

    lista.forEach((alumno) => {
        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
        <h3>${alumno.nombre.toUpperCase()}</h3>
        <p><strong>Materia:</strong>
        ${alumno.materia.toUpperCase()}</p>
        <p><strong>Promedio:</strong>
        ${alumno.promedio}</p>
        <p><strong>Estado:</strong>
        ${alumno.aprobado ? "Aprobado" : "Desaprobado"}</p>
        <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
        `;
        contenedorAlumnos.appendChild(tarjeta);
    });
}

contenedorAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const idAEliminar = parseInt(e.target.dataset.id);
        alumnos = alumnos.filter((alumno) => alumno.id !== idAEliminar);
        renderizarAlumnos(alumnos);
        actualizarEstadisticas();

        mensaje.textContent = "Alumno eliminado.";
        mensaje.className = "mensaje-error";
    }
})

busqueda.addEventListener("input", () => {
    const textoBuscado = busqueda.value.toLowerCase().trim();

    const alumnosFiltrados = alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(textoBuscado));

    renderizarAlumnos(alumnosFiltrados);

});

filtroCurso.addEventListener("change", () => {
    const cursoSeleccionado = filtroCurso.value;

    if (cursoSeleccionado === "") {
        renderizarAlumnos(alumnos);
    } else {
        const alumnosFiltrados = alumnos.filter(alumno => alumno.materia.toLowerCase() === cursoSeleccionado.toLowerCase());


        renderizarAlumnos(alumnosFiltrados);
    }
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    if (!isNaN(nombre)) {
        mensaje.textContent = "El nombre no puede ser numeros.";
        mensaje.className = "mensaje-error";
        return;
    }
    const curso = inputCurso.value;
    const nota = parseFloat(inputNota.value);

    const nuevoAlumno = new Alumnos(
        alumnos.length + 1,
        nombre,
        curso,
        nota
    );

    alumnos.push(nuevoAlumno);

    renderizarAlumnos(alumnos);
    actualizarEstadisticas();


    mensaje.textContent = `Alumno ${nombre.toUpperCase()} agregado con exito!`;
    mensaje.className = "mensaje-exito";

    formulario.reset();
})

function actualizarEstadisticas() {
    totalAlumnos.textContent = alumnos.length;

    const aprobados = alumnos.filter(a => a.aprobado);
    totalAprobados.textContent = aprobados.length;

    if (alumnos.length > 0) {
        const suma = alumnos.reduce((acc, a) => acc + a.promedio, 0)
        promedioGeneral.textContent = (suma / alumnos.length).toFixed(2);
    } else {
        promedioGeneral.textContent = "-";
    }
}

renderizarAlumnos(alumnos);
actualizarEstadisticas()

// Funciones suma de notas (cantidad de notas) y promedio
function sumarNotas(valorActual, nuevaNota) {
    return valorActual + nuevaNota;
}