/*
#############################
|                           |
|  feedbackValidation.js    |
|                           |
#############################
*/




// ---------------------------------
// ------------Variablen------------
// ---------------------------------

// Input Felder
var nameInput = document.getElementById('name');      					//Feld mit Namen
var email = document.getElementById('email'); 							//Feld mit Mail Adresse
var improvement = document.getElementById('improvement'); 				//Feld mit Verbesserungstext
// var input = document.querySelectorAll('input');						//Feld mit allen Eingabefeldern (nicht benötigt)


// Error Felder unterhalb der jeweiligen Input Felder
var emailError = document.getElementById('email-error');					//Feld für Mail Error Benachrichtigung
var nameError = document.getElementById('name-error');					//Feld für Namen Error Benachrichtigung
var textfieldError = document.getElementById('textfield-error');			//Feld für Verbesserungstext Error Benachrichtungung


// Submit Button
var submit = document.getElementById('submit');							//Der Senden Knopf




// ---------------------------------
// ----------EventListener----------
// ---------------------------------

//Hier wurde aufgrund der zu hohen Rechenleitung extra nicht onType verwendet!!
document.getElementById('name').addEventListener('change', checkInputFields);			//onChange Namensfeld
document.getElementById('email').addEventListener('change', checkInputFields);			//onChange Emailfeld
document.getElementById('improvement').addEventListener('change', checkInputFields);		//onChange Verbesserungstext




// ---------------------------------
// -----------Funktionen------------
// ---------------------------------

// Hauptfunktion zur Überprüfung aller Eingabefelder um danach den Senden Button zu aktivieren und zu designen
function checkInputFields() {
    clearErrorMessage(emailError);
    clearErrorMessage(nameError);
    clearErrorMessage(textfieldError);
    submit.style.boxShadow = "none";
    if (nameInput.value !== "") {
        nameValid = validateName(nameInput);
    }
    if (email.value !== "") {
        emailValid = validateEmail(email);
    }
    if (improvement.value !== "") {
        improvementValid = validateImprovement(improvement);
    }
    if (nameInput.value !== "" && nameValid === true && email.value !== "" && emailValid === true && improvement.value !== "" && improvementValid === true) {
        submit.disabled = false;
        submit.style.boxShadow = "3px 3px 3px black";
    }
    else {
        submit.disabled = true;
    }
}


//Funktionen für den "onmouseover" EventListener des Submit Buttons nach dem dieser "disable = true" gesetzt wurde
function submitHoverEffectOn() {
    submit.style.transform = "scale(1.2, 1.2)";
    submit.style.fontWeight = "bold";
    console.log("HUHU");
}
//Funktionen für den für den "onmouseout" EventListener des Submit Buttons nach dem dieser "disable = true" gesetzt wurde
function submitHoverEffectOff() {
    submit.style.transform = "scale(1, 1)";
    submit.style.fontWeight = "normal";
    console.log("HOHO");
}


//Funktion zur Validierung des Namensfeldes. Validierung könnte noch erweritert oder verringert werden
//Bei Falscher Eingabe wird eine Fehlermeldung ins Feld nameError geschrieben.
function validateName(x) {
    clearErrorMessage(nameError);
    var re = /^[A-Za-zäÄöÖüÜß]+ [A-Za-zäÄöÖüÜß]+$/;
    if (re.test(x.value)) {
        nameError.innerHTML = "";
        console.log('name is true');
        return (true);
    }
    errorMessage(x, nameError, " is not a valid name. Please enter your full name (first & last name).");
    console.log('name is false');
    return (false);
}


// Email Adresse Validieren. Bei Falscher Eingabe wird eine Fehlermeldung ins Feld emailError geschrieben.
function validateEmail(x) {
    clearErrorMessage(emailError);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(x.value)) {
        emailError.innerHTML = "";
        console.log('email is true');
        return (true);
    }
    errorMessage(email, emailError, " is not a valid e-mail address.");
    // alert("You have entered an invalid email address!")
    // emailError.innerHTML = "This E-Mail Address is invalid"
    console.log('email is false');
    return (false);
}


// Verbesserungsvorschlag Validieren. Bei Falscher Eingabe wird eine Fehlermeldung ins Feld textfieldError geschrieben.
function validateImprovement(x) {
    if (x.value.length < 50) {
        errorMessageImprovement(textfieldError, "The text should have at least 50 characters.");
        return (false);
    }
    return (true);
}


// Allgemeine Funktion zur Beschriftung des jeweiligen Error Feldes
function errorMessage(inputField, errorField, fehlermeldung) {
    errorField.innerHTML = '"' + inputField.value + '"' + fehlermeldung;
}


// Funktion zur Beschriftung des Improvement Error Feldes
function errorMessageImprovement(errorField, fehlermeldung) {
    errorField.innerHTML = fehlermeldung;
}


// Funktion zur Löschung aller Fehlermeldungen
function clearErrorMessage(errorField) {
    errorField.innerHTML = "";
}


// Eine kleine Begrüssung für die Entwickler unter euch :)
console.log("%cHello Dude!", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;");
console.log("%cYou opened the console! Know some code, do you?", "color: red; font-family: sans-serif; font-size: 2em; font-weight: bolder; text-shadow: #000 1px 1px;");
