const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var guessLog = urlParams.get('arr');
guessLog = JSON.parse(guessLog);
for (let i = 0; i < guessLog.length; i++){
    var node = document.createElement("div");
    node.className = "btn-group";
    document.getElementById("display").appendChild(node);
    for (let j = 0; j < guessLog[i][0].length; j++) {
        let newLetter = document.createElement("button"); 
        if (guessLog[i][0][j] == 1){
            newLetter.className = "btn btn-success btn-upper";
        } else if (guessLog[i][0][j] == 2){
            newLetter.className = "btn btn-warning btn-upper";
        } else if (guessLog[i][0][j] == 3){
            newLetter.className = "btn btn-dark btn-upper";
        }
        newLetter.textContent = guessLog[i][1][j];
        node.appendChild(newLetter);
    }
}