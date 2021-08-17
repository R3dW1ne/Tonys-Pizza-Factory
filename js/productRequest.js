/*
#############################
|                           |
|     productRequest.js     |
|                           |
#############################
*/




// ---------------------------------
// -----------Funktionen------------
// ---------------------------------

// Funktion zur Verbindung mit dem RestAPI Server der FFHS
function apiRequest(url, callback, selectArray) {
    let xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = status;
    xhr.ontimeout = timeout;
    xhr.onerror = error;
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4');
    xhr.send(null);

    function error() {
        alert("Error!");
    }

    function timeout() {
        alert("Error: Timeout!");
    }

    function status() {

        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                callback(data, selectArray);
            }
            else {
                alert("Error: Status " + this.status);
            }
        }
    }
}


// Funktion um den erhaltenen Content entsprechend der HTML Seite hinzuzufügen
function contentAllocation(remoteContent, selectArray) {
    for (let i = 0; i < remoteContent.length; i++) {
        var gridContainer = document.getElementById("gridContainer");   // Bereits erstelltes "div" der HTML Seite via DOM einer Variable hinzufügen

        picture(remoteContent, i, gridContainer);   // Aufruf der picture() Funktion um das Content Bild hinzuzufügen

        var p = document.createElement("p");    // Paragraph für den Content Name erstellen                            
        p.textContent = remoteContent[i]["name"];   // Text der Paragraphen mit dem Text aus der API Abfrage deklarieren
        p.classList = "name";   // Klassennamen für das Design via CSS setzen 

        let div = document.getElementById("gridItem" + i);   // "div" Variable aus der picture() Funktion für das weitere hinzufügen der Inhalte deklarieren

        div.appendChild(p);     // Paragraph dem div hinzufügen
        div.classList = "grid-item";    // Klassenname für das design via CSS hinzufügen

        if ("ingredients" in remoteContent[i]) {        // Falls der Key "ingredients" im remoteContent existiert wird...
            ingredientsList(remoteContent, i, div);     // die ingredientsList() Funktion ausgeführt!
        }

        // sauceList(div, salads);

        var section = document.createElement("section");    // Erstellen eines neuen Sektors um die Folgenden Elemente in einer Reihe anzuzeigen
        div.appendChild(section);   // Sektor dem gridItem div Hinzufügen
        section.classList = "flex-container flex-justify-space_between";     //Klassenname des Sektors für das Design via CSS hinzufügen
        section.style.width = "250px";

        var label = document.createElement("label");    // Label für den select Button erstellen (Abstände werden dadurch schöner)
        section.appendChild(label);     // Label dem Sektor hinzufügen

        var select = document.createElement("select");      // Select Button erstellen
        select.style.fontSize = "15px";     // Schriftgrösse des Select Buttons anpassen
        select.style.fontWeight = "bold";   // Schrift des Select Buttons auf "Fett" setzen
        label.appendChild(select);      // Select Button dem Label hinzufügen

        for (var s = 0; s < selectArray.length; s++)     // For Schlaufe um den mitgegebenen Select Button Inhalt durchzugehen
        {
            var option = document.createElement("option");  // Option generieren
            select.appendChild(option);     // Option dem Select Button hinzufügen
            option.textContent = selectArray[s];    //Option Text hinzufügen
        }

        var p2 = document.createElement("p");   // Zweiter Paragraph für den Preis generieren

        p2.textContent = remoteContent[i]["prize"] + " ";   // Preis aus der API Abfrage dem Paragraph hinzufügen
        p2.style.fontSize = "20px";     // Schriftgrösse des Paragraphen anpassen
        p2.style.fontWeight = "bold";   // Schrift des Paragraphen auf "Fett" setzen


        var bild2 = document.createElement("img");
        bild2.src = "../pictures/Einkaufswagen.png";
        bild2.height = 25;
        bild2.width = 25;
        bild2.alt = "shopping cart item from Tony's Pizza Factory";
        bild2.addEventListener("click", () => {
            apiPost("salad", remoteContent[i]["name"], i);
        });
        bild2.classList = "shopping-cert";
        p2.appendChild(bild2);
        section.appendChild(p2);

    }
}

// Funktion um die Bilder einzufügen
function picture(item, i, section) {
    let div = document.createElement("div");
    div.id = "gridItem" + i;
    div.style.padding = "10px";

    section.appendChild(div);

    let bild = document.createElement("div");

    bild.style.height = "250px";
    bild.style.width = "250px";
    bild.style.backgroundImage = "url(" + item[i]["imageUrl"] + ")";
    bild.style.backgroundSize = "cover";
    bild.style.backgroundPosition = "center";
    div.appendChild(bild);
}

// Funktion um die Auswahlmöglichkeiten der Produkte abzufüllen
function ingredientsList(item, i, parentNode) {
    var p = document.createElement("p");
    var zutaten = "";
    for (var k = 0; k < item[i]["ingredients"].length; k++) {
        if (item[i]["ingredients"].length - 1 === k) {
            zutaten += ", " + item[i]["ingredients"][k];
        }
        else if (k === 0) {
            zutaten = item[i]["ingredients"][k];
        }
        else {
            zutaten += ", " + item[i]["ingredients"][k];
        }
    }
    p.textContent = zutaten;
    p.classList = "beschreibung";
    p.style.width = "250px";
    parentNode.appendChild(p);

}


// Funktion um die Bestellung abzusetzen
function apiPost(type, name, id) {
    let xhr = new XMLHttpRequest();
    let url = "https://tonyspizzafactory.herokuapp.com/api/orders";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.ontimeout = timeout;
    xhr.onerror = error;

    function error() {
        alert("Error!");
    }

    function timeout() {
        alert("Error: Timeout!");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
            alert("successful order");
        }
    };
    xhr.setRequestHeader("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4");
    xhr.send(JSON.stringify({ "id": id, "name": name, "type": type }));
}


// Eine kleine Begrüssung für die Entwickler unter euch :)
console.log("%cHello Dude!", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;");
console.log("%cYou opened the console! Know some code, do you?", "color: red; font-family: sans-serif; font-size: 2em; font-weight: bolder; text-shadow: #000 1px 1px;");
