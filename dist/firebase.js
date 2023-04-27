// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword,signInWithRedirect,getRedirectResult} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJuEuDo9UGowUco3f6DqJD3zd_tYisqYU",
  authDomain: "testcase-190aa.firebaseapp.com",
  projectId: "testcase-190aa",
  storageBucket: "testcase-190aa.appspot.com",
  messagingSenderId: "506854141828",
  appId: "1:506854141828:web:25c7af13baaaaa389237d1",
  measurementId: "G-T2TEST4KR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);

// buttons
const googleSignInBtn = document.querySelector('.google-sign-in');
const gSignInBtn = document.querySelector('.google-signin');
const fbSignInBtn = document.querySelector('.fb-sign-in');
const fSignInBtn = document.querySelector('.fb-signin');
const twitterSignInBtn = document.querySelector('.twitter-sign-in');
const tSignInBtn = document.querySelector('.twitter-signin');


const regBtn = document.querySelector('.reg_btn');
const loginBtn = document.querySelector('.login_btn');

// providers
// const gs_provider = new GoogleAuthProvider();
const g_provider = new GoogleAuthProvider();
const f_provider = new FacebookAuthProvider();
const t_provider = new TwitterAuthProvider();

const auth = getAuth(app);

// Export the auth object for use in other files
export default auth;

// google regstart
googleSignInBtn.addEventListener('click', () => {
  signInWithPopup(auth, g_provider).then((result) => {
    const user = result.user;
    alert(`Hello ${user.displayName}!`);

  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});
// google reg end

// google signin start
gSignInBtn.addEventListener('click', () => {
  signInWithPopup(auth, g_provider).then((result) => {
    const user = result.user;
    console.log(user);
    // alert(`Hello ${user.displayName}!`);
    window.location.href = "homepage.html";
  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});

// fb reg start
fbSignInBtn.addEventListener('click', () => {
  signInWithPopup(auth, f_provider).then((result) => {
    const user = result.user;
    console.log(user);
    alert(`Hello ${user.displayName}!`);
  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});
// fb reg end

// fb signin start
fSignInBtn.addEventListener('click', () => {
  signInWithPopup(auth, f_provider).then((result) => {
    const user = result.user;
    console.log(user);
    window.location.href = "homepage.html";
    // alert(`Hello ${user.displayName}!`);
  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});
// fb sign in end



// twitter reg start
twitterSignInBtn.addEventListener('click', () => {
  signInWithPopup(auth, t_provider).then((result) => {
    const user = result.user;
    alert(`Hello ${user.displayName}!`);

  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});
// twitter reg end

// twitter signin start
tSignInBtn.addEventListener('click', () => {
  signInWithPopup(auth, t_provider).then((result) => {
    const user = result.user;
    console.log(user)
    // alert(`Hello ${user.displayName}!`);
    window.location.href = "homepage.html";
  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});
// twitter sign in end

// Twitter OAuth
tSignInBtn.addEventListener('click', (e) => {
  signInWithRedirect(auth, t_provider);

  getRedirectResult(auth)
      .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      window.location.href = "homepage.html";
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
  });

})

//----- Login code start	  
  loginBtn.addEventListener("click", () =>{
  var email =  document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    console.log("User signed in successfully!");
    // document.getElementById('logout').style.display = 'block';
    // ...
    window.location.href = "homepage.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });		  		  
});
//----- End

//----- New Registration code start	  
regBtn.addEventListener("click", () =>{
  var nemail =  document.getElementById("newEmail").value;
  var npassword = document.getElementById("newPassword").value;
  
  //For new registration
  createUserWithEmailAndPassword(auth, nemail, npassword).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		  
});
//----- End

