!function(n,t,e){function u(n){var t=this,e=function(){var s=4022871197;return function(n){n=String(n);for(var t=0;t<n.length;t++){var e=.02519603282416938*(s+=n.charCodeAt(t));e-=s=e>>>0,s=(e*=s)>>>0,s+=4294967296*(e-=s)}return 2.3283064365386963e-10*(s>>>0)}}();t.next=function(){var n=2091639*t.s0+2.3283064365386963e-10*t.c;return t.s0=t.s1,t.s1=t.s2,t.s2=n-(t.c=0|n)},t.c=1,t.s0=e(" "),t.s1=e(" "),t.s2=e(" "),t.s0-=e(n),t.s0<0&&(t.s0+=1),t.s1-=e(n),t.s1<0&&(t.s1+=1),t.s2-=e(n),t.s2<0&&(t.s2+=1),e=null}function o(n,t){return t.c=n.c,t.s0=n.s0,t.s1=n.s1,t.s2=n.s2,t}function s(n,t){var e=new u(n),s=t&&t.state,r=e.next;return r.int32=function(){return 4294967296*e.next()|0},r.double=function(){return r()+11102230246251565e-32*(2097152*r()|0)},r.quick=r,s&&("object"==typeof s&&o(s,e),r.state=function(){return o(e,{})}),r}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.alea=s}(0,"object"==typeof module&&module,"function"==typeof define&&define);
var currRow = 1;
var currLetter = 1;
var gameWin = false;
var guessLog = [];
var summary = "";
var shortUrl = "";
var word = "";
var animationSpeed = 300;
var wordLength = 5;
var fours = [];
var fives = [];
var sixes = [];
var sevens = [];
for (let i=0; i < words.length; i++){ if(words[i].length == 4){ fours.push(words[i]); } else if (words[i].length == 5){ fives.push(words[i]); } else if (words[i].length == 6){ sixes.push(words[i]); } else if (words[i].length == 7){ sevens.push(words[i]); } }
var words = fours.concat(fives, sixes, sevens);
var today = new Date();
let fullDate = today.getDate() + today.getMonth() + 1 + today.getFullYear();
var arng = new alea(fullDate);
var word = words[Math.round(arng()*words.length)];
var validate = validate.concat(words);
validate = validate.map(word => word.toLowerCase());
var numGuesses = word.length+1;
/*if(wordLength == 4){
    var word = fours[Math.round(arng()*fours.length)];
} else if (wordLength == 5){
    var word = fives[Math.round(arng()*fives.length)];
} else if (wordLength == 6){
    var word = sixes[Math.round(arng()*sixes.length)];
} else if (wordLength == 7){
    var word = sevens[Math.round(arng()*sevens.length)];
}*/
/*const randomLength = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
if (randomLength == 4){
    const random = Math.floor(Math.random() * fours.length);
    var word = fours[random];    
} else if (randomLength == 5){
    const random = Math.floor(Math.random() * fives.length);
    var word = fives[random];    
} else if (randomLength == 6){
    const random = Math.floor(Math.random() * sixes.length);
    var word = sixes[random];    
} else if (randomLength == 7){
    const random = Math.floor(Math.random() * sevens.length);
    var word = sevens[random];    
}
*/
function newGame(){
    var letters = word.length; 
    let numRows = 1;
    for (let i = 0; i < numGuesses; i++){
        let node = document.createElement("div");
        node.className = "btn-group";
        node.setAttribute("rownumber", numRows);
        node.setAttribute("id", "row" + numRows);
        node.setAttribute("letters", "");
        document.getElementById("display").appendChild(node)
        for (let j = 1; j < letters + 1; j++) {
            let newLetter = document.createElement("button"); 
            newLetter.className = "btn btn-secondary btn-upper";
            newLetter.setAttribute("letterNumber", j);
            newLetter.setAttribute("id", "letter" + numRows + j);
            newLetter.setAttribute("letter", "");
            node.appendChild(newLetter);
        }
        numRows++;
    }
    //update first color
    letter = document.getElementById("letter"+currRow+currLetter);
    letter.classList.add("active");
}

async function keyPressed(e){
    var row = document.getElementById("row" + currRow);
    let tiles = row.children;
    //if a letter is pressed
    if ((/[a-zA-Z]/).test(e.key) && e.key.length == 1 && !gameWin) {
        tiles[currLetter-1].textContent = e.key;
        tiles[currLetter-1].setAttribute("letter", e.key);
        if (currLetter < word.length){
            currLetter++;
        }
        updateRow(currRow);
    }
    //if backspace is pressed
    if (e.keyCode == 8 && !gameWin){
        tiles[currLetter-1].textContent = "";
        tiles[currLetter-1].setAttribute("letter", "");
        if (currLetter>1){
            currLetter--;
            tiles[currLetter-1].textContent = "";
            tiles[currLetter-1].setAttribute("letter", "");
        }
        updateRow(currRow);
    }
    //if arrow key is pressed
    if (e.keyCode == 39 && !gameWin){
        if(currLetter < word.length){
            currLetter++;
            updateRow(currRow);
        }
    } else if (e.keyCode == 37 && !gameWin){
        if(currLetter > 1){
            currLetter--;
            updateRow(currRow);
        }
    }
    //if enter is pressed
    if (e.keyCode == 13 && !gameWin){
        if (row.getAttribute("letters").length == word.length){
            if(validate.includes(row.getAttribute("letters").toLowerCase())){
                letter = document.getElementById("letter"+currRow+currLetter);
                letter.classList.remove("active");
                if (currRow < numGuesses){       
                        results = updateGuess(currRow);
                        if (currRow < numGuesses && !gameWin){
                            colorTiles(results);
                            currRow++;
                            currLetter = 1;
                            updateRow(currRow);
                        }
                        if (gameWin){
                            colorTiles(results);
                            /// WIN CODE
                            await sleep(animationSpeed*(word.length+1));
                            gameWinAlert();
                        }
                } else {
                    results = updateGuess(currRow);
                    colorTiles(results);
                    if (gameWin){
                        // WIN CODE
                        await sleep(animationSpeed*(word.length+1));
                        gameWinAlert();
                    } else {
                        // LOSE CODE
                        await sleep(animationSpeed*(word.length+1));
                        alert("Better luck next time. The word was '" + word + "'");
                        gameLoseAlert();
                    }
                }
            } else {
                //THIS WORD IS NOT IN THE DICTIONARY!!!
                redRow();
            }
        }  else {
                //THE WORD IS NOT COMPLETED
                redRow();
        }
    }
}
function updateGuess(currRow){
    let row = document.getElementById("row" + currRow);
    let tiles = row.children;
    var letters = row.getAttribute("letters").toLowerCase();
    nletters = letters.split("");
    var nword = word.split("");
    const countChar = (str) => {
        const counts = {};
        for (const s of str) {
            if (counts[s]) {
            counts[s]++
            } else {
            counts[s] = 1
            }
        }
        return counts;
    }
    var letterHistogram = countChar(letters.toLowerCase());
    var wordHistogram = countChar(word.toLowerCase());
    var results = [];
    // first remove all the classes from the grid button, they will fill up with one of 3 options (green, yellow, dark)
    // also remove classes from the keyboard key, it will also fill up with something else
    for (let i=0; i<nletters.length; i++){    
        if (nletters[i] == nword[i]){
            //correct, right place, take out the letter from both histograms
            results[i] = 1;
            letterHistogram[nletters[i]]--;
            wordHistogram[nletters[i]]--; 
        }
    }
    // now we need to deal with letters that are not in the exact position but there are multiples of
    for (let i=0; i<nletters.length; i++){
        if (nletters[i] != nword[i] && wordHistogram[nletters[i]] != 0){
            //this letter is not an exact match, but is in the word. It will light up yellow as long as there are duplicates of this letter in the word. Decrement the letter count in the word histogram for every word so extraneous letters won't light up.
            results[i] = 2;
            wordHistogram[nletters[i]]--;
        } else if (nletters[i] != nword[i] && wordHistogram[nletters[i]] == 0){
            results[i] = 3;
        }
    }
    // now just darken any guessed letters that are not at all in the actual word!
    for (let i=0; i<nletters.length; i++){
        let key = document.getElementById("kb" + nletters[i]);
        if (!nword.includes(nletters[i])){
            //this letter is not in the word at all, change the colors now!   
            results[i] = 3;
        }
    }
    if (letters == word){
        //game win
        gameWin = true;
    }
    // Push results to the guess log (and also the guessed letters)
    guessLog.push([results, nletters]);
    return results;
}
function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
function updateRow(currRow){
    let row = document.getElementById("row" + currRow);
    let children = row.children;
    //update the row attribute to reflect the guess
    let newLetters = "";
    for (i=0; i<word.length; i++){
        let letter = children[i].getAttribute("letter");
        newLetters += letter;
    }
    row.setAttribute("letters", newLetters);
    //update colors
    letter = document.getElementById("letter"+currRow+currLetter);
    letter.classList.add("active");
    if (currLetter>1){
        prevLetter = document.getElementById("letter"+currRow+(currLetter-1));
        prevLetter.classList.remove("active");    
    }
    if (currLetter < word.length){
        nextLetter = document.getElementById("letter"+currRow+(currLetter+1));
        nextLetter.classList.remove("active");    
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function redRow(){
    let row = document.getElementById("row" + currRow);
    let tiles = row.children;
    async function lightup() {
        for (let i = 0; i < tiles.length; i++){
            tiles[i].classList.add("btn-danger");
        }
        await sleep(500);
        for (let i = 0; i < tiles.length; i++){
            tiles[i].classList.remove("btn-danger");
        }
    }
    lightup();
}

async function colorTiles(results){
    let row = document.getElementById("row" + currRow);
    let tiles = row.children;
    // Now slowly update the tiles to reflect the results (for suspense) 
    for (let i=0; i<nletters.length; i++){
        await sleep(animationSpeed);
        tiles[i].classList.remove("active");
        tiles[i].classList.remove("btn-secondary");
        let key = document.getElementById("kb" + nletters[i]);
        key.classList.remove("btn-secondary");
        if (results[i] == 1){
            //correct letter and place, turn green
            tiles[i].classList.add("btn-success");                            
            key.classList.add("btn-success");
            key.classList.remove("btn-dark");
            tiles[i].classList.remove("btn-secondary");
            key.classList.remove("btn-warning");
        } else if (results[i] == 2){
            //correct letter but wrong place, turn yellow
            tiles[i].classList.add("btn-warning");
            key.classList.add("btn-warning");
            key.classList.remove("btn-dark");
        } else if (results[i] == 3){
            //letter not in word, turn dark
            tiles[i].classList.add("btn-dark");
            if(!key.classList.contains("btn-success") && !key.classList.contains("btn-warning")){
                key.classList.add("btn-dark");
                key.classList.remove("btn-secondary");
            }
        }
    }
}

function gameWinAlert(){
    if(localStorage.getItem('winDay') != fullDate){
        localStorage.setItem('winDay', fullDate);
        summary = "Wurdle " + String(today.getMonth()+1) + "/" + String(today.getDate()) + " -- " + currRow + "/" + numGuesses + "\n" + "Play the game: durgak.com" + "\n";
        // look through the guess log and make a grid with just colors to share
        for (i=0; i<guessLog.length; i++){
            for (j=0; j<guessLog[i][0].length;j++){
                if (guessLog[i][0][j] == 1){
                    //green
                    summary += "🟩";
                } else if (guessLog[i][0][j] == 2){
                    //yellow
                    summary += "🟨";
                } else if (guessLog[i][0][j] == 3){
                    //dark
                    summary += "⬜";
                }
            }
            summary += "\n";
        }
        document.getElementById("gameWon").style.display = "block";
        document.getElementById("gameWon").innerHTML += summary.replace(/(?:\r\n|\r|\n)/g, '<br>');
    } else {
        alert("You already played today!");
    }
}

function gameLoseAlert(){
    if(localStorage.getItem('winDay') != fullDate){
        localStorage.setItem('winDay', fullDate);
        summary = "Wurdle " + String(today.getMonth()+1) + "/" + String(today.getDate()) + " fail :( " + numGuesses + " guesses" + "\n" + "Play the game: durgak.com" + "\n";
        // look through the guess log and make a grid with just colors to share
        for (i=0; i<guessLog.length; i++){
            for (j=0; j<guessLog[i][0].length;j++){
                if (guessLog[i][0][j] == 1){
                    //green
                    summary += "🟩";
                } else if (guessLog[i][0][j] == 2){
                    //yellow
                    summary += "🟨";
                } else if (guessLog[i][0][j] == 3){
                    //dark
                    summary += "⬜";
                }
            }
            summary += "\n";
        }
        document.getElementById("gameWon").style.display = "block";
        document.getElementById("gameWon").innerHTML += summary.replace(/(?:\r\n|\r|\n)/g, '<br>');
    } else {
        alert("You already played today!");
    }
}

async function shareScore(){
    var arrStr = encodeURIComponent(JSON.stringify(guessLog));
    if (shortUrl == ""){
        const options = {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apikey: '06b8b1ea48af44f5ad5a2e59e6dabb1a'
            },
            body: JSON.stringify({destination: 'https://durgak.com/share.html?arr=' + arrStr})
        };   
        fetch('https://api.rebrandly.com/v1/links', options)
            .then(response => response.json())
            .then(async response => {
                shortUrl = response.shortUrl;
                summary += shortUrl;
                try {
                    await navigator.share({ title: "Wurdle Score", text: summary });
                    console.log("Data was shared successfully");
                } catch (err) {
                    console.error("Share failed:", err.message);
                }
            })
            .catch(err => console.error(err));
    } else {
        try {
            await navigator.share({ title: "Wurdle Score", text: summary });
            console.log("Data was shared successfully");
        } catch (err) {
            console.error("Share failed:", err.message);
        }
    }
}