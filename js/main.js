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

const STORAGE_KEY = "gestorAlumnos";

let alumnosIniciales = [
    new Alumnos(1, "Avila", "JS", 9),
    new Alumnos(2, "Luna", "JS", 8.5),
    new Alumnos(3, "Campos", "JS", 4),
    new Alumnos(4, "Fernandez", "HTML", 9),
    new Alumnos(5, "Rojas", "HTML", 8.5),
    new Alumnos(6, "Perez", "HTML", 9),

];

function modificarPromedio(id, nuevoPromedio) {

    const alumno = alumnos.find(a => a.id === id);

    if (!alumno) return;

    alumno.actualizacionPromedio(nuevoPromedio);

    guardarAlumnos();
    aplicarFiltros();
    actualizarEstadisticas();

}

function guardarAlumnos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos, null, 2));
}

function obtenerAlumnosStorage() {

    const datos = JSON.parse(localStorage.getItem(STORAGE_KEY));

    const listaRecuperada = datos ?? alumnosIniciales;

    return listaRecuperada.map(a => new Alumnos(a.id, a.nombre, a.materia, a.promedio));

}

let alumnos = obtenerAlumnosStorage();

function aplicarFiltros() {
    const textoBuscado = busqueda.value.toLowerCase().trim();
    const cursoBuscado = filtroCurso.value.toLowerCase();

    const alumnosFiltrados = alumnos.filter((alumno) => {
        const coincideNombre = alumno.nombre.includes(textoBuscado);
        const coincideCurso = cursoBuscado === "" || alumno.materia === cursoBuscado;

        return coincideCurso && coincideNombre;
    });

    renderizarAlumnos(alumnosFiltrados);
}

function renderizarAlumnos(lista) {
    contenedorAlumnos.innerHTML = "";

    lista.forEach(({ id, nombre, materia, promedio, aprobado }) => {
        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
    <h3 class="tarjeta-titulo">${nombre.toUpperCase()}</h3>   

    <div class="tarjeta-info">
        <p><strong>Materia:</strong>
        ${materia.toUpperCase()}</p>
        <p><strong>Promedio:</strong> 
        ${promedio}</p>
        <p><strong>Estado:</strong>
        ${aprobado ? "Aprobado" : "Desaprobado"}</p>
        <button class="btn-eliminar" data-id="${id}">Eliminar</button>
        <button class="btn-modificar" data-id="${id}">Modificar Promedio</button>     
    </div>
        `;

        contenedorAlumnos.appendChild(tarjeta);
    });
}

contenedorAlumnos.addEventListener("click", (e) => {
    const botonModificar = e.target?.closest(".btn-modificar");

    if (botonModificar) {

        const id = Number(botonModificar.dataset.id);

        const nuevoPromedio = parseFloat(prompt("Ingresa el nuevo promedio:")
        );

        if (!Number.isFinite(nuevoPromedio) ||
            nuevoPromedio < 0 ||
            nuevoPromedio > 10) {
            mensaje.textContent = "Ingresa un promedio valido entre 0 y 10."
            mensaje.className = "mensaje-error";
            return;
        }

        modificarPromedio(id, nuevoPromedio);

        mensaje.textContent = "Promedio actualizado.";
        mensaje.className = "mensaje-exito";

    }

    const boton = e.target?.closest(".btn-eliminar");

    if (!boton) return;

    const idAEliminar = Number(boton.dataset.id);

    alumnos = alumnos.filter((alumno) => alumno.id !== idAEliminar);

    guardarAlumnos();
    aplicarFiltros();
    actualizarEstadisticas();

    mensaje.textContent = "Alumno eliminado.";
    mensaje.className = "mensaje-error";
});


busqueda.addEventListener("input", aplicarFiltros);

filtroCurso.addEventListener("change", aplicarFiltros);


formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const nombre = inputNombre.value.trim();
    if (nombre === "" || !isNaN(nombre)) {
        mensaje.textContent = "El nombre no puede ser numeros.";
        mensaje.className = "mensaje-error";
        return;
    }

    const curso = inputCurso.value;

    const nota = parseFloat(inputNota.value);
    if (
        !Number.isFinite(nota)
        || nota < 0
        || nota > 10
    ) {
        mensaje.textContent = "Ingresá una nota válida entre 0 y 10.";
        mensaje.className = "mensaje-error";
        return
    }

    let siguienteId = Number(localStorage.getItem("siguienteId"
    )) || Math.max(0, ...alumnos.map(alumno => alumno.id)) + 1;

    const nuevoAlumno = new Alumnos(
        siguienteId,
        nombre,
        curso,
        nota
    );

    alumnos.push(nuevoAlumno);

    siguienteId++;

    localStorage.setItem("siguienteId", siguienteId);

    guardarAlumnos();
    aplicarFiltros();
    actualizarEstadisticas();


    mensaje.textContent = `Alumno ${nombre.toUpperCase()} agregado con exito!`;
    mensaje.className = "mensaje-exito";

    formulario.reset();
})

function actualizarEstadisticas() {
    totalAlumnos.textContent = alumnos.length;

    const aprobados = alumnos.filter(a => a.aprobado);
    totalAprobados.textContent = aprobados.length;


    const suma = alumnos.reduce((acc, a) => acc + a.promedio, 0);
    promedioGeneral.textContent =
        alumnos.length > 0 ? (suma / alumnos.length).toFixed(2) : "-";
}

renderizarAlumnos(alumnos);
actualizarEstadisticas()