import { customFetchGetAll, customFetchPut, customFetchDelete } from "../helpers/customFetch.js";

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

const renderCursos = async () => {
    let cursos= {};

    const url = `http://localhost:8080/getCursos`;
    try {
        cursos = await customFetchGetAll(url);
    } catch (e) {
        console.log(e);
    }

    const asignacionesDiv = document.getElementById('cursos-disponibles');
    cursosTemplate(cursos);
    cursos.forEach((curso) => {
        asignacionesDiv.appendChild(cursosTemplate(curso));
    });
}

const cursosTemplate = (curso) => {
    const divElem = document.createElement('div');
    divElem.dataset.id = curso.id;
    divElem.classList.add('dropdown-content');

    const button = document.createElement('button');
        button.classList.add('dropdown-button');
        button.textContent = curso.nombreCurso;

    const panel = document.createElement('div');
        panel.classList.add('dropdown-panel');

    const informacion = document.createElement('p');
        informacion.textContent = curso.descripcion;

    const eliminarButton = document.createElement('button');
          eliminarButton.textContent = "Eliminar Curso";
          eliminarButton.dataset.id = curso.id;

    const actualizarButton = document.createElement('button');
          actualizarButton.textContent = "Actualizar Curso";
          actualizarButton.dataset.id = curso.id;
          actualizarButton.onclick = () => actualizarRecurso(curso.id, curso.descripcion, curso.nombreCurso);

    const buttonContainer = document.createElement('div');

        divElem.append(button);
        divElem.append(panel);
        panel.append(informacion);
        panel.append(buttonContainer);
        buttonContainer.append(eliminarButton);
        buttonContainer.append(actualizarButton);

    return divElem;
}

const actualizarRecurso = async (id, descripcion, nombre ) => {
    let contenedor = document.querySelector('.actualizarcursos');
    let nombreValor = document.querySelector('#nombreCurso');
    let descripcionValor = document.querySelector('#nombreDescripcion');
    let inputHidden = document.querySelector('#input-id-curso');

    nombreValor.value = nombre;
    descripcionValor.value = descripcion;
    inputHidden.value = id;

    contenedor.classList.remove('dn-i')
}

const actualizarInformacion = async () => {
    let nombreValor = document.querySelector('#nombreCurso').value;
    let descripcionValor = document.querySelector('#nombreDescripcion').value;
    let inputHidden = document.querySelector('#input-id-curso').value;

    const url = `http://localhost:8080/updateCurso/${inputHidden}`; 
    const dataToUpdate = {
        nombreCurso: nombreValor,
        descripcion: descripcionValor
     };

    try {
        const updatedData = await customFetchPut(url, dataToUpdate);
        console.log('Recurso actualizado con éxito:', updatedData);
        location.reload()
       
    } catch (error) {
        console.error('Error al actualizar el recurso:', error);
        location.reload()
    }
}
document.querySelector('#actualizar-informacion').addEventListener('click', actualizarInformacion);

const renderAdmin = () => {
    const userName = document.getElementById('userName');
    userName.innerHTML = "Admin";
}

let usuarioTemplate = await getUsuarioId();
if (usuarioTemplate == "admin") {
    renderAdmin();
    renderCursos();
}