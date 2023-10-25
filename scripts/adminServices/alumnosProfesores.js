import { customFetchGetAll } from "../helpers/customFetch.js";

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

let usuarioTemplate = await getUsuarioId();
const renderAdmin = () => {
    const userName = document.getElementById('userName');
    userName.innerHTML = "Admin";
}
const renderUsuarios = async () => {
    let users= {};

    const url = `http://localhost:8080/getUsuarios`;
    try {
        users = await customFetchGetAll(url);
    } catch (e) {
        console.log(e);
    }

    const alumnosContainer = document.getElementById('alumnos-container');
    const profesoresContainer = document.getElementById('profesores-container');

    users.forEach((user) => {
        if (user.esAdmin) {
            profesoresContainer.appendChild(usersTemplate(user));
        } else {
            alumnosContainer.appendChild(usersTemplate(user));
        }
    });
}

const usersTemplate = (user) => {
    const divElem = document.createElement('div');
    divElem.dataset.id = user.id;

    const div = document.createElement('div');

    const panel = document.createElement('div');

    const informacion = document.createElement('p');
        informacion.textContent = user.nombreAlumno;

        divElem.append(div);
        divElem.append(panel);
        panel.append(informacion);

    return divElem;
}

document.addEventListener("DOMContentLoaded", function () {
    // Agregar event listeners a los botones de pestaña
    var tabButtons = document.querySelectorAll(".tablinks");
    tabButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            openTab(event.target.getAttribute("data-tab"));
        });
    });

    // Función para abrir una pestaña
    function openTab(tabName) {
        var i, tabcontent, tablinks;

        // Ocultar todos los elementos con la clase "tabcontent"
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Desactivar la clase "active" de todos los botones de pestañas
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }

        // Mostrar el contenido de la pestaña actual y activar la pestaña
        document.getElementById(tabName).style.display = "block";
        document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
    }

    // Mostrar la primera pestaña por defecto
    openTab("tab1");
});



if (usuarioTemplate == "admin") {
    renderAdmin();
    renderUsuarios();
}