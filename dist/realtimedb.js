// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJuEuDo9UGowUco3f6DqJD3zd_tYisqYU",
    authDomain: "testcase-190aa.firebaseapp.com",
    databaseURL: "https://testcase-190aa-default-rtdb.asia-southeast1.firebasedatabase.app", // Update this line
    projectId: "testcase-190aa",
    storageBucket: "testcase-190aa.appspot.com",
    messagingSenderId: "506854141828",
    appId: "1:506854141828:web:25c7af13baaaaa389237d1",
    measurementId: "G-T2TEST4KR8"
  };
  

/// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
var temperatureElement = document.getElementById("Temperature");
var humidityElement = document.getElementById("humidity");
var CO2element = document.getElementById("co2");
var airdescriptElement = document.getElementById("airdesc")

// Read data from Firebase
onValue(ref(db, "/DHT11"), (snapshot) => {
  var data = snapshot.val();

//   store data from database
const temp = data.Temperature;
const hum = data.Humidity;
  // Display data on the web app
  temperatureElement.innerText = temp + "°C";
  humidityElement.innerText =  hum + "%";
});

// Read data from Firebase
onValue(ref(db, "/MQ135"), (snapshot) => {
    var data = snapshot.val();
  
  //   store data from database
  const co2 = data.CO2;
  const airdesc = data.AirQuality;
    // Display data on the web app
    CO2element.innerText = co2;
    airdescriptElement.innerText =  airdesc;
  });

// Emit a custom event when temperature is updated
function emitTemperatureUpdate(timestamp, temperature) {
    const event = new CustomEvent('temperatureUpdate', { detail: { timestamp, temperature } });
    window.dispatchEvent(event);
  }
  
  // Listen to temperature data updates from Firebase
//   onValue(ref(db, "/DHT11"), (snapshot) => {
//     var data = snapshot.val();
  
//     // Get the timestamp and temperature
//     const timestamp = (new Date()).getTime();
//     const temperature = parseFloat(data.Temperature);
  
//     // Emit a custom event with the updated temperature
//     emitTemperatureUpdate(timestamp, temperature);
//   });

  
  
  