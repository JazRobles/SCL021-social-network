import {
  doc,
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc, // collection, query, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
const provider = new GoogleAuthProvider();
import { auth, db } from "./config.js";
import { changeRoute } from "./ruta.js";
// const auth = getAuth();
let myUser;
//import { db } from './config.js';
//import { showPosts } from '../component/wall.js';

//Crea Usuario
export const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in//Registrado
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(userCredential.user);
        resolve(userCredential)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage); 
        reject(error)
      });
  });
};

export const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      changeRoute("#/wall");
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
};

// Add a new document in collection "cities"
async function createPost(texto) {
  console.log(db);
  await addDoc(collection(db, "post"), {
    content: texto,
    likes: [],
    date: new Date(),
    author: myUser.uid, // hacer ID del autor
  });
}

const subscribe = (callback) => {
  onSnapshot(query(collection(db, "post")), (docs) => {
    docs.forEach((doc) => {
      //console.log("Current data: ", doc.data());
      callback({...doc.data(),id:doc.id});
    });
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    myUser = user;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//export const createUser = (email, password) =>
export const ingresarConUsuario = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// // cerrar sesión
// export const logOut = () => {
//   signOut(auth).then(() => {
//     window.location.hash = '#/login';
//   }).catch((error) => {
//     // An error happened.
//   });
// }
// cerrar sesión
export const logOut = () => {
  signOut(auth)
    .then(() => {
      window.location.hash = "#/login";
      console.log(logOut);
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const updateLikes = (post) => {

  const ref = doc(db, "post", post.id);
  updateDoc(ref, { likes: ["hola"] });
};
export { createPost, subscribe };
