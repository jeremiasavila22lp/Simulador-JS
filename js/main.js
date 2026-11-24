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
const estadoCarga = document.querySelector("#estado-carga");
const estadoInforme = document.querySelector("#estado-informe");
const btnGenerarInforme = document.querySelector("#btn-generar-informe");

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

async function iniciarAplicacion() {

    estadoCarga.hidden = false;

    let datosIniciales;

    try {

        const datosGuardados = obtenerAlumnosStorage();

        if (datosGuardados !== null) {
            datosIniciales = datosGuardados;
        } else {

            const respuesta = await fetch("./data.json")

            if (!respuesta.ok) {

                throw new Error("No se puedo obtener datos JSON");

            }

            datosIniciales = await respuesta.json();

        }

        alumnos = convertirAlumnos(datosIniciales);

        console.log("Datos recibidos correctamente", alumnos);

    } catch (error) {

        console.error("Error al cargar alumnos:", error);

        alumnos = [];

        Swal.fire({
            title: "Error al cargar los datos",
            text: "Intenta de nuevo",
            icon: "error"
        });

    } finally {

        estadoCarga.hidden = true;

    }

    aplicarFiltros();
    actualizarEstadisticas();
}

const STORAGE_KEY = "gestorAlumnos";

function convertirAlumnos(datos) {

    return datos.map(({ id, nombre, materia, promedio }) => {

        return new Alumnos(id, nombre, materia, promedio);

    });

}

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

    const datosGuardados = localStorage.getItem(STORAGE_KEY);

    if (datosGuardados === null) {
        return null;
    }

    try {

        const datos = JSON.parse(datosGuardados);

        if (!Array.isArray(datos)) {
            throw new Error(`Los datos en el storage no son un array:, ${datosGuardados}`);
        }

        return datos;

    } catch (error) {

        console.error("Error al obtener los datos del storage:", error);

        return null;

    }
}

let alumnos = [];

function mostrarNotificacion(texto, tipo = "exito") {

    Toastify({
        text: texto,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        style: {
            background: tipo === "exito" ?
                "green"
                : "red"
        }

    }).showToast();

}

function confirmarModificaciones(nuevoPromedio) {

    return Swal.fire({
        title: "Quieres guardar los cambios?",
        text: `Nuevo promedio: ${nuevoPromedio}`,
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
        cancelButtonText: "Cancelar"
    })

}


async function gestionModificacionPromedio(id, nuevoPromedio) {

    try {

        const resultado = await confirmarModificaciones(nuevoPromedio);

        if (resultado.isConfirmed) {

            modificarPromedio(id, nuevoPromedio);

            Swal.fire(
                "Promedio modificado correctamente.",
                "",
                "success"
            );

        } else if (resultado.isDenied) {

            Swal.fire(
                "Cambios no realizados",
                "El promedio no fue modificado",
                "info"
            );


        }
    } catch (error) {

        console.error("Error al gestionar modificacion del promedio:", error);
        Swal.fire(
            "Error",
            "No se pudo modificar el promedio.",
            "error"
        );
    }

}

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

function limpiarAlumnos() {

    alumnos.length = 0;

    guardarAlumnos();
    aplicarFiltros();
    actualizarEstadisticas();
};

const btnEliminarAlumnos = document.getElementById("btn-limpiar-alumnos");

btnEliminarAlumnos.addEventListener("click", () => {

    limpiarAlumnos();

    mensaje.textContent = "Todos los alumnos han sido eliminados con exito.";
    mensaje.className = "mensaje-exito";

});

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

        <form class="form-modificar" data-id="${id}" hidden>
            <input 
                type = "number"
                class = "input-promedio"
                value = "${promedio}"
                min = "0"
                max = "10"
                step = "0.01"
                required
            >
        
        <button class="btn-guardar" type="submit">Guardar</button>

        <button class="btn-cancelar" type="button">
            Cancelar
        </button>        
        </form>    
    </div>
        `;

        contenedorAlumnos.appendChild(tarjeta);
    });
}

function mostrarAvisoDocente() {
    const aviso = document.createElement("div");
    aviso.className = "aviso-docente";

    aviso.innerHTML = `
    <section class="aviso-limite">
    <button id="cerrar-aviso" type=button aria-label="Cerrar aviso">&times;</button>
    <span> <strong>Bienvenido al sistema de gestión escolar</strong> </span>
    <p>Aquí podrás gestionar las calificaciones de los alumnos.</p>
    <span>Recuerda de cargar los datos con total responsabilidad y antes del viernes.</span>
    </section>
    `;

    const main = document.querySelector("main");

    if (!main) return;

    main.prepend(aviso);

    const btnCerrar = aviso.querySelector("#cerrar-aviso");
    btnCerrar.addEventListener("click", () => {
        aviso.remove()
    });

} setTimeout(mostrarAvisoDocente, 3000);



contenedorAlumnos.addEventListener("click", (e) => {

    const botonModificar = e.target?.closest(".btn-modificar");

    if (botonModificar) {

        const tarjeta = botonModificar.closest("article");

        const formulario = tarjeta.querySelector(".form-modificar");

        formulario.hidden = false;

        return;
    }

    const botonCancelar = e.target?.closest(".btn-cancelar");

    if (botonCancelar) {
        const formulario = botonCancelar.closest(".form-modificar");
        formulario.hidden = true;
        return;
    }


    const boton = e.target?.closest(".btn-eliminar");

    if (!boton) return;

    const idAEliminar = Number(boton.dataset.id);

    alumnos = alumnos.filter((alumno) => alumno.id !== idAEliminar);

    guardarAlumnos();
    aplicarFiltros();
    actualizarEstadisticas();

    mostrarNotificacion(
        "Alumno eliminado correctamente", "error"
    );
});

contenedorAlumnos.addEventListener("submit", (e) => {
    e.preventDefault();

    const formulario = e.target;

    const id = Number(formulario.dataset.id);

    const inputPromedio = formulario.querySelector(".input-promedio");

    if (inputPromedio.value.trim() === "") {
        Swal.fire(
            "Sin promedio",
            "Debes ingresar un promedio",
            "error"
        );
        return;
    }

    const nuevoPromedio = Number(inputPromedio.value);

    if (!Number.isFinite(nuevoPromedio) ||
        nuevoPromedio < 0 ||
        nuevoPromedio > 10) {

        mensaje.textContent = "Ingresa un promedio valido entre 0 y 10."
        mensaje.className = "mensaje-error";

        return;
    }

    gestionModificacionPromedio(id, nuevoPromedio);

});

busqueda.addEventListener("input", aplicarFiltros);

filtroCurso.addEventListener("change", aplicarFiltros);

btnGenerarInforme.addEventListener("click", solicitarInformeAcademico);


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
        mostrarNotificacion(
            "Ingresá una nota válida entre 0 y 10.", "error"
        )
        return
    }

    const ultimoId = Math.max(
        0,
        ...alumnos.map(alumno => alumno.id)
    );

    let siguienteId = Math.max(
        Number(localStorage.getItem("siguienteId")) || 1,
        ultimoId + 1
    );

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


    mostrarNotificacion(
        `Alumno ${nombre.toUpperCase()} agregado con exito!`
    );

    formulario.reset();
})

function generarInformeAcademico() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const estadisticas = obtenerEstadisticas();

            if (estadisticas.total === 0) {
                reject(new Error("No hay alumnos para generar el informe."));
                return;
            }

            resolve(estadisticas);
        }, 2000);

    });

}

async function solicitarInformeAcademico() {

    estadoInforme.textContent = "Generando Informe en PDF (simulado)...";
    btnGenerarInforme.disabled = true;

    try {

        const informe = await generarInformeAcademico();

        estadoInforme.textContent = "Generando informe PDF (simulacion).";

        Swal.fire({

            title: "Informe generado",
            html: `
                <p><strong>Total de alumnos:</strong> ${informe.total}</p>
                <p><strong>Promedio general:</strong> ${informe.promedio.toFixed(2)}</p>
                <p><strong>Alumnos aprobados:</strong> ${informe.aprobados}</p>
            `,
            icon: "success"

        });

    } catch (error) {

        console.error("Error al generar informe:", error);

        estadoInforme.textContent =
            "Error: No se pudo generar el informe.";

        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error"
        });

    } finally {

        btnGenerarInforme.disabled = false;

    }

}

function obtenerEstadisticas() {
    const aprobados = alumnos.filter(a => a.aprobado);

    const suma = alumnos.reduce(
        (acumulador, alumno) => acumulador + alumno.promedio,
        0
    );

    return {
        total: alumnos.length,
        aprobados: aprobados.length,
        promedio: alumnos.length > 0
            ? suma / alumnos.length
            : null
    };

}


function actualizarEstadisticas() {
    const estadisticas = obtenerEstadisticas();

    totalAlumnos.textContent = estadisticas.total;

    totalAprobados.textContent = estadisticas.aprobados;

    promedioGeneral.textContent =
        estadisticas.promedio !== null
            ? estadisticas.promedio.toFixed(2)
            : "-";
}

iniciarAplicacion();