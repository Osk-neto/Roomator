/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// variables created to store the current latitude and logitude
var lat = 0.0;
var long = 0.0;

//method that retrieves the current geographic location of the device
navigator.geolocation.getCurrentPosition(geoCallback, onError);




//function in charge of save the current latitude and longitude in the variables
function geoCallback(position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;




}
//function to print in the console an error message
function onError(message) {

    console.log(message);
}
//fuction in charge to send the user current position to the server
function setCurrentPosition(position) {

    // Creating a XHR object 
    let xhr = new XMLHttpRequest();
    //variaboe created to retrieve the email from the user imput
    var email = document.getElementById("email").value;
    //saving the URL to with the postmapping and their corresponding parameters
    let url = 'http://192.168.0.73:8080/setPosition?email=' + email + '&latitude=' + lat + '&longitude=' + long;



    // open a connection 
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server 
            result.innerHTML = this.responseText;

        }
    };

    // Converting JSON data to string 
    var data = JSON.stringify({ "latitude": lat, "longitude": long });

    // Sending data with the request 
    xhr.send(data);


}
//function in chage of user verification and authentication
function login() {
    // Creating a XHR object 
    var http = new XMLHttpRequest();
    //variable created to retrieve the email from the user imput
    var email = document.getElementById("email").value;
    //retrieving email and save it in a sessionStorage
    sessionStorage.setItem("email2", email);
    //variable created to retrieve the password from the user imput
    var password = document.getElementById("password").value;
    //saving the URL to with the getmapping and their corresponding parameters
    const url = 'http://192.168.0.73:8080/login?email=' + email + '&password=' + password;

    // Create a state change callback 
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        //retrieving the data from de user
        var em = responseJSON.email;
        var pa = responseJSON.password;
        var smoke = responseJSON.smoker;
        var lat = responseJSON.latitude;
        var long = responseJSON.longitude;
        var age = responseJSON.age;
        //saving the user data retrieved in a sessions storage
        sessionStorage.setItem("smoke", smoke);
        sessionStorage.setItem("lat", lat);
        sessionStorage.setItem("long", long);
        sessionStorage.setItem("age", age);


        //if statment to check if the email and password match, if match go to another page
        //if not alert a error message
        if (em == email && pa == password) {


            location = "index2.html";


        } else {

            alert("Email or Password Invalid");
        }

    }
    // open a connection 
    http.open("GET", url, true);
    http.send();





}

function userList() {

    //retrieving the data from the sessionstorage and saving in a variable
    var userEmail = sessionStorage.getItem("email2");
    var userSmoke = sessionStorage.getItem("smoke");
    var userLat = sessionStorage.getItem("lat");
    var userLonge = sessionStorage.getItem("long");
    var userAge = sessionStorage.getItem("age");

    // Creating a XHR object
    var http = new XMLHttpRequest();
    //saving the URL to with the getmapping and their corresponding parameters
    const url = 'http://192.168.0.73:8080/list?smoker=' + userSmoke + '&latitude=' + userLat + '&longitude=' + userLonge + '&age=' + userAge + '&email=' + userEmail;

    //responseJSON.results[0].components.country;
    http.open("GET", url, true);
    http.send();
    // Create a state change callback
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        var i;
        //for looping to populate the divs was created 
        //all these divs are hiden and the dive need to be populated is used style.diplay = table-row 
        //to make the dive appear again
        for (i = 0; i < responseJSON.length; i++) {

            document.getElementById("div-" + i).style.display = "table-row";
            document.getElementById("name-" + i).innerHTML = "Name: " + responseJSON[i].name;
            document.getElementById("age-" + i).innerHTML = "Age: " + responseJSON[i].age;
            document.getElementById("smoker-" + i).innerHTML = "Smoker: " + responseJSON[i].smoker;
            document.getElementById("hobbie1-" + i).innerHTML = "Hobbie 1: " + responseJSON[i].hobbies.hobbie1;
            document.getElementById("hobbie2-" + i).innerHTML = "Hobbie 2: " + responseJSON[i].hobbies.hobbie2;
            document.getElementById("hobbie3-" + i).innerHTML = "Hobbie 3: " + responseJSON[i].hobbies.hobbie3;

        }




    }

}
function signUp() {



    // Creating a XHR object 

    let xhr = new XMLHttpRequest();
    //saving the URL to with the getmapping and their corresponding parameters  
    let url = "http://192.168.0.73:8080/setPerson?person1=";
    //variables created to retrieve the data from user imput
    var name = document.getElementById("name1").value;
    var email = document.getElementById("email1").value;
    var smoker = document.getElementById("smoker1").value;
    var age = document.getElementById("age1").value;
    var hobbie1 = document.getElementById("hobbie1").value;
    var hobbie2 = document.getElementById("hobbie2").value;
    var hobbie3 = document.getElementById("hobbie3").value;
    var password = document.getElementById("password1").value;
    //if statment to dont let the user submit with a empity field
    if (name == "" || email == "" || smoker == "" || age == "" ||
        password == "" || hobbie1 == "") {

        alert("Please fill in required fields");
        throw "Please fill in required fields";
    }
   
    //if statment to change string for boolean
    if (smoker == "yes") {
        smoker = true;
    } else if (smoker == "no") {
        smoker = false;
    } else {

        alert("Please insert yes or no with lower case");
        throw "Please insert yes or no with lower case";

    }
    // open a connection 
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server 
            result.innerHTML = this.responseText;

        }
    };

    // Converting JSON data to string 
    var data = JSON.stringify({ "name": name, "email": email, "password": password, "smoker": smoker, "age": age, "hobbies": { hobbie1, hobbie2, hobbie3 } });

    // Sending data with the request 
    xhr.send(data);
    alert("User created!");
    



}
//function in charge to tell the user that he chose the flatmate successfully
function choseMe() {
    alert("Congratuations, you have a new FlatMate!, now you can log out" );

}

