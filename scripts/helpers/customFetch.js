const customFetchGetAll = async (url) =>{
    let response = await fetch(url)
    return response.json();
}

export { customFetchGetAll }