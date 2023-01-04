import { createPost, subscribe, logOut, updateLikes } from "../lib/firebase.js";

export const wall = () => {

  const muroPrinc = document.createElement("div");
  muroPrinc.className = "container-muroPrinc";
  //muroPrinc.setAttribute("id", "muro");
  // logearse.textContent = "este es el mainWall!";
  //console.log(logearse);

  const logoPrincipal = document.createElement("img");
  logoPrincipal.setAttribute("width", "200px");
  logoPrincipal.setAttribute("src", "./component/logoNuevo.png");
  muroPrinc.appendChild(logoPrincipal);

  muroPrinc.appendChild(document.createElement("br"));
  muroPrinc.appendChild(document.createElement("br"));


  const posteo = document.createElement("textarea");
  posteo.setAttribute("placeholder", "publica tu estado");
  posteo.setAttribute("maxLength", "200");
  posteo.setAttribute("required", "");
  posteo.setAttribute("id", "text-description");

  const botonPublicar = document.createElement("button");
  botonPublicar.className = "btnpost";
  botonPublicar.textContent = "Publicar";
  botonPublicar.addEventListener("click", function () {
    document.getElementsByClassName = "btnpost";
    divPosteo.innerHTML = "";
    createPost(posteo.value);
  });
  muroPrinc.appendChild(botonPublicar);
  muroPrinc.appendChild(posteo);

  // botón cerrar sesión
  const btnLogOut = document.createElement("button");
  btnLogOut.className = "btnLogOut";
  btnLogOut.textContent = "Cerrar Sesión";
  btnLogOut.addEventListener("click", logOut);
  muroPrinc.appendChild(btnLogOut);

  muroPrinc.appendChild(document.createElement("br"));
  muroPrinc.appendChild(document.createElement("br"));

  const divPosteo = document.createElement("div");
  divPosteo.className = "divPosteo";
  muroPrinc.appendChild(divPosteo);

  subscribe((post) => {
    console.log("yo estoy en wall", post);
    const postCard = document.createElement("div");
    // postCard.setAttribute("readonly", "");
    postCard.setAttribute("id", "posteo");
    postCard.className = "post";
    postCard.innerText = post.content;
    divPosteo.appendChild(postCard);

    const likeCat = document.createElement("img");
    likeCat.className = "likeCat";
    likeCat.setAttribute("width", "30px");
    likeCat.src = "./component/like.png";
    likeCat.addEventListener("click", () => {
      updateLikes(post); // likes actuales y currentUser(auth.currentUsuser)
    });
    postCard.appendChild(likeCat);
  });

  
  muroPrinc.appendChild(document.createElement("br"));
  muroPrinc.appendChild(document.createElement("br"));

  return muroPrinc;
};
