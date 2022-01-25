for (let i = 0; i < 6; i++){
    var node = document.createElement("div");
    node.className = "btn-group";
    node.setAttribute("letters", "");
    document.getElementById("display").appendChild(node);
    for (let j = 0; j < 6; j++) {
        let newLetter = document.createElement("button"); 
        newLetter.className = "btn btn-secondary btn-upper";
        newLetter.setAttribute("letterNumber", j);
        newLetter.setAttribute("letter", "");
        node.appendChild(newLetter);
    }
}
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const word = urlParams.get('word');