import { customFetchGetById, customFetchGetAll } from "../helpers/customFetch.js";

const getUsuarioId = async () => {
    let usuarioId = null;
    if (location.search.includes('?userId')) {
        usuarioId = location.search.split('?userId=')[1];
        localStorage.setItem('userId', usuarioId);
        return usuarioId;
    } else {
        let usuarioId = localStorage.getItem('userId');
        return usuarioId;
    }
}

const renderUser = async () => {
    let user = {};
    let usuarioId = await getUsuarioId();

    const url = `http://localhost:8080/getUsuario/${usuarioId}`;
    try {
        user = await customFetchGetById(url);
    } catch (e) {
        console.log(e);
    }
    userTemplate(user);
    asignacionesPerProfile();
}

const userTemplate = (user) => {
    const { nombreAlumno } = user;
    const userName = document.getElementById('userName');
    userName.innerHTML = nombreAlumno;
}

const asignacionesPerProfile = async () => {
    let asignaciones = [];
    let usuarioId = await getUsuarioId();

    const url = `http://localhost:8080/getAsignacionesByUsuario/${usuarioId}`;

    try {
        asignaciones = await customFetchGetAll(url);
    } catch (e) {
        console.log(e);
    }

    const asignacionesDiv = document.getElementById('mis-cursos');
    // Itera sobre la lista de cursos y agrega un elemento para cada uno

    asignaciones.forEach( async (asignacion) => {
        const url = `http://localhost:8080/getCurso/${asignacion.cursoId}`;
        let curso = await customFetchGetById(url);
        asignacionesDiv.appendChild(asignacionTemplate(curso));
    });
    
}

const asignacionTemplate = (curso) => {
    const divElem = document.createElement('div');
    divElem.dataset.id = curso.id;
    divElem.classList.add('dropdown-content');
    const button = document.createElement('button');
        button.classList.add('dropdown-button');
        button.textContent = curso.nombreCurso;
    const informacion = document.createElement('p');
        informacion.textContent = curso.descripcion;
        informacion.classList.add('dropdown-panel');
        divElem.append(button)
        divElem.append(informacion);

    return divElem;
}
const renderAdmin = () => {
    const userName = document.getElementById('userName');
    userName.innerHTML = "Admin";
}

let usuarioTemplate = await getUsuarioId();
if (usuarioTemplate == "admin") {
    renderAdmin();
}else{
    renderUser();
}