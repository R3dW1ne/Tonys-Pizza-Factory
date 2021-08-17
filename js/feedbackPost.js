/*
#############################
|                           |
|      feedbackPost.js      |
|                           |
#############################
*/




// ---------------------------------
// ------------Variablen------------
// ---------------------------------

var comments = document.getElementById("comments");
var data;
var ii;




// ---------------------------------
// -----------Funktionen------------
// ---------------------------------




// Abfrage des Online Feedback Contents
function getItems() {
    var url = 'https://tonyspizzafactory.herokuapp.com/api/feedback';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = statusGetItem;
    xhr.ontimeout = timeout;
    xhr.onerror = error;
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4');
    xhr.send(null);
}

// Statusabfrage um erst nach finaler Initialisierung den abgerufenen Textinhalt zu parsen und den Comment Button anzuschreiben
function statusGetItem() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            data = JSON.parse(this.responseText);
            writeButton(data.length);

        } else {
            alert("Fehler: status " + this.status);
        }
    }
}

// Funktion wird beim Laden der Seite abgefragt um den Button zu beschriften
getItems();


// anschreiben des Comment Buttons
function writeButton(i) {
    document.getElementById('showCommentsBtn').textContent = "Show Comments (" + i + ")";
}


function getItemsAndRating() {
    var url = 'https://tonyspizzafactory.herokuapp.com/api/feedback';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = statusGetItemAndRating;
    xhr.ontimeout = timeout;
    xhr.onerror = error;
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4');
    xhr.send(null);
}


// Statusabfrage um erst nach finaler Initialisierung den abgerufenen Textinhalt zu parsen und den Comment Button anzuschreiben
function statusGetItemAndRating() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            data = JSON.parse(this.responseText);
            writeButton(data.length);
            getRating();
        } else {
            alert("Fehler: status " + this.status);
        }
    }
}


function getRating() {
    let v = document.getElementById("pizzaRating");
    if (v === null) {

        var rating = document.getElementById("rating");
        var div = document.createElement("div");
        div.id = "pizzaRating";


        let pizzasAwesome = 0;
        let pizzasGood = 0;
        let pizzasOkay = 0;
        let pizzasPoor = 0;

        if (data !== null) {
            for (let i = 0; i < data.length; i++) {

                if (data[i].pizzaRating == "awesome") {
                    pizzasAwesome++;
                }
                if (data[i].pizzaRating == "good") {
                    pizzasGood++;
                }
                if (data[i].pizzaRating == "okay") {
                    pizzasOkay++;
                }
                if (data[i].pizzaRating == "poor") {
                    pizzasPoor++;
                }
            }
        }

        pizzasAwesome = pizzasAwesome / data.length * 100;
        pizzasGood = pizzasGood / data.length * 100;
        pizzasOkay = pizzasOkay / data.length * 100;
        pizzasPoor = pizzasPoor / data.length * 100;

        

        var pizzaRatingNumber = [pizzasAwesome, pizzasGood, pizzasOkay, pizzasPoor];
        var pizzaRatingString = ['Awesome', 'Good', 'Okay', 'Poor'];
        for (let i = 0; i < 4; i++) {
            var p = document.createElement("p");
            var num = pizzaRatingNumber[i];
            console.log("Pizzas are " + pizzaRatingString[i] + " " + num);
            p.textContent = Math.round(num * 100) / 100 + "% of our customers rated our pizzas as " + pizzaRatingString[i];
            div.appendChild(p);
        }

        rating.appendChild(div);
    }
    else {
        var div = document.getElementById("pizzaRating");
        var child = div.lastElementChild;
        while (child) {
            div.removeChild(child);
            child = div.lastElementChild;
        }
        let pizzasAwesome = 0;
        let pizzasGood = 0;
        let pizzasOkay = 0;
        let pizzasPoor = 0;

        if (data !== null) {
            for (let i = 0; i < data.length; i++) {

                if (data[i].pizzaRating == "awesome") {
                    pizzasAwesome++;
                }
                if (data[i].pizzaRating == "good") {
                    pizzasGood++;
                }
                if (data[i].pizzaRating == "okay") {
                    pizzasOkay++;
                }
                if (data[i].pizzaRating == "poor") {
                    pizzasPoor++;
                }
            }
        }

        pizzasAwesome = pizzasAwesome / data.length * 100;
        pizzasGood = pizzasGood / data.length * 100;
        pizzasOkay = pizzasOkay / data.length * 100;
        pizzasPoor = pizzasPoor / data.length * 100;

        

        var pizzaRatingNumber = [pizzasAwesome, pizzasGood, pizzasOkay, pizzasPoor];
        var pizzaRatingString = ['Awesome', 'Good', 'Okay', 'Poor'];
        for (let i = 0; i < 4; i++) {
            var p = document.createElement("p");
            var num = pizzaRatingNumber[i];
            console.log("Pizzas are " + pizzaRatingString[i] + " " + num);
            p.textContent = Math.round(num * 100) / 100 + "% of our customers rated our pizzas as " + pizzaRatingString[i];
            div.appendChild(p);
        }

        rating.appendChild(div);
    }


}



// Funktion für den Comment Button um die Kommentare abzufragen
function getComments() {
    if (typeof (ii) === 'undefined') {
        ii = new Number();
    }

    for (let i = ii; i < data.length; i++) {

        let div = document.createElement("div");
        div.classList = "comment-item";
        div.id = "commentItem" + i;
        comments.appendChild(div);

        let h3 = document.createElement("h3");
        h3.textContent = data[i].name;
        div.appendChild(h3);

        let textarea = document.createElement("textarea");
        textarea.textContent = data[i].feedback;
        textarea.setAttribute("readonly", "true");
        div.appendChild(textarea);

        ii++;

    }
}


// Funktion um das Feedback Formular abzufragen und den Inhalt der Funktion postItem weiterzugeben
function sendFeedback() {
    var urlFeedback = 'https://tonyspizzafactory.herokuapp.com/api/feedback';

    var pizzaRating = document.getElementsByName('pizzalike');
    var prizeRating = document.getElementsByName('pricelike');
    var nameText = document.getElementById('name');
    var emailText = document.getElementById('email');
    var feedbackText = document.getElementById('improvement');
    var pizzaRatingvalue = '';
    var prizeRatingvalue = '';

    for (let i = 0, length = pizzaRating.length; i < length; i++) {
        if (pizzaRating[i].checked) {
            pizzaRatingvalue = pizzaRating[i].value;
            break;
        }
    }

    for (let i = 0, length = prizeRating.length; i < length; i++) {
        if (prizeRating[i].checked) {
            prizeRatingvalue = prizeRating[i].value;
            break;
        }
    }

    var sendData = JSON.stringify({
        name: nameText.value,
        email: emailText.value,
        prizeRating: prizeRatingvalue,
        feedback: feedbackText.value,
        pizzaRating: pizzaRatingvalue,
    });
    postItems(urlFeedback, sendData);
}


// Funktion zur Sendung des Feedback Inhaltes
function postItems(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = statusPostItems;
    xhr.ontimeout = timeout;
    xhr.onerror = error;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.bYceSpllpyYQixgNzDt7dpCkEojdv3NKD-85XLXfdI4');
    xhr.send(data);
}


// Statusabfrage des Sendenprozesses für Fehlerausgabe bei error
function statusPostItems() {
    if (this.readyState == 4) {
        if (this.status == 201) {
            alert("successful post");
            getItemsAndRating();
            // getRating();
        } else {
            alert("Fehler: status " + this.status);
        }
    }
}


// Funktion für Errorhandling bei Timeout
function timeout() {
    alert("Fehler: timeout");
}


// Funktion für Errorhandling bei Error
function error() {
    alert("Fehler: error");
}