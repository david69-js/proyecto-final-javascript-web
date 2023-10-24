function agregarClaseDnI() {
    let usuarioId = esAdmin(); // Llamamos a la función esAdmin para obtener el valor de usuarioId
    let userLinks = document.querySelectorAll('.user');
    let adminLinks = document.querySelectorAll('.admin');

    if (usuarioId === 'admin') {
        for (let i = 0; i < userLinks.length; i++) {
            userLinks[i].classList.add('dn-i');
        }
    } else if (usuarioId !== 'admin') {
        for (let i = 0; i < adminLinks.length; i++) {
            adminLinks[i].classList.add('dn-i');
        }
    }
}

function esAdmin() {
    let usuarioId = null;

    if (location.search.includes('?userId')) {
        usuarioId = location.search.split('?userId=')[1];
        localStorage.setItem('userId', usuarioId);
        return usuarioId;
    } else {
        usuarioId = localStorage.getItem('userId');
        return usuarioId;
    }
}

agregarClaseDnI();