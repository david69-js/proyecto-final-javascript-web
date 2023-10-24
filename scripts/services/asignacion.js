import { customFetchGetUserById, customFetchGetAll, customFetchPost } from "../helpers/customFetch.js";

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
        user = await customFetchGetUserById(url);
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

const renderCursos = async () => {
    let cursos = [];

    const url = `http://localhost:8080/getCursos`;

    try {
        cursos = await customFetchGetAll(url);
    } catch (e) {
        console.log(e);
    }

    const asignacionesDiv = document.getElementById('asignaciones');
    // Itera sobre la lista de cursos y agrega un elemento para cada uno
    cursos.forEach((curso) => {
        asignacionesDiv.appendChild(asignacionTemplate(curso));
    });
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

    // Obtener todos los checkboxes en la página
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    asignaciones.forEach((asignacion) => {
        const cursoId = asignacion.cursoId;
        
        // Filtrar los checkboxes que coinciden con el cursoId y usuarioId
        const matchingCheckboxes = Array.from(checkboxes).filter(checkbox => {
            return checkbox.dataset.id === cursoId && checkbox.dataset.name === usuarioId;
        });

        matchingCheckboxes.forEach(checkbox => {
            checkbox.checked = true; // Marcar el checkbox
            checkbox.disabled = true; // Deshabilitar el checkbox
        });
    });
}

const asignacionTemplate = (curso) => {
    const elem = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    let usuarioId = localStorage.getItem('userId');
    checkbox.type = 'checkbox';
    checkbox.dataset.id = curso.id;
    checkbox.dataset.name = usuarioId;
    label.textContent = curso.nombreCurso;
    label.appendChild(checkbox);
    elem.appendChild(label);

    // Agregar un evento de cambio para el checkbox
    checkbox.addEventListener('change', async (event) => {
        const cursoId = event.target.dataset.id;

        let usuarioId = await getUsuarioId();
        // Realizar una solicitud POST para actualizar el estado del checkbox
        const updateData = {
            cursoId: cursoId,
            usuarioId: usuarioId,
        };

        const updateUrl = 'http://localhost:8080/saveAsignacion'; // Ajusta la URL según tu API
        try {
            await customFetchPost(updateUrl, updateData);
            checkbox.disabled = true;
        } catch (e) {
            console.log(e);
        }
    });

    return elem;
}


// Llama a las funciones para renderizar el usuario y las asignaciones
renderCursos();
renderUser();