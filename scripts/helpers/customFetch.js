const customFetchGetAll = async (url) =>{
    let response = await fetch(url)
    return response.json();
}
const customFetchGetById = async (url) =>{
    let response = await fetch(url)
    return response.json();
}

const customFetchPost = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ajusta el tipo de contenido según tus necesidades
            },
            body: JSON.stringify(data), // Convierte los datos en una cadena JSON
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const customFetchDelete = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Si la eliminación fue exitosa, puedes devolver un mensaje o cualquier otra información necesaria.
            return 'Eliminación exitosa';
        } else {
            throw new Error(`Error en la solicitud DELETE: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const customFetchPut = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error(`Error en la solicitud PUT: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { customFetchGetAll, customFetchGetById, customFetchPost, customFetchDelete, customFetchPut };