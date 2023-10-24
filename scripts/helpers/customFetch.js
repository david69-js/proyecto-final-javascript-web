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


export { customFetchGetAll, customFetchGetById, customFetchPost };