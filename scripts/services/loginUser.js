import { customFetchGetById } from "../helpers/customFetch.js";

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
}

const userTemplate = (user) => {
    const { nombreAlumno, esAdmin } = user;
    const userName = document.getElementById('userName');
    userName.innerHTML = `${ esAdmin ? 'Profesor@' : ' ' }` + nombreAlumno;
}

renderUser();