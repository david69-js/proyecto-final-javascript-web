// Define the URL for the GET request
import { customFetchGetAll } from "./helpers/customFetch.js";
const url = 'http://localhost:8080/getUsuarios';

const renderUsers = async () =>{
  let users = new Array;
  try {
    users = await customFetchGetAll(url);
  } catch(e){
    console.log(e);
  }
  users.map(users => RenderTemplate(users));
}

const RenderTemplate = async (user) =>{
  const { nombreAlumno, email, contrasenia, id } = user;

  const containerEl = document.querySelector('.insertUsers');

  const userElement = document.createElement('div');
  userElement.className = `user-${id}`;
  userElement.textContent = nombreAlumno;

  containerEl.appendChild(userElement);
}



renderUsers();