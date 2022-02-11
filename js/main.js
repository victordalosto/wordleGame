document.addEventListener("DOMContentLoaded", () => {

    var gameEnded = false;
    var currentTry = 0;
    var guessedWord = [];

    const optionsColor = ["rgb(59, 153, 50)", "rgb(211, 178, 32)", "rgb(122, 122, 131)"] // correctBox, semiCorrectBox, wrongBox

    const possibleLetters = ['q' ,'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'à', 'á', 'â', 'â', 'í', 'é', 'ê', 'ó', 'ô', 'õ', 'ú', 'ç', 'ñ'];
    const dayWord = getNewWord();
    const numTrys = 6;
    createSquares(dayWord.length, numTrys);
    startAnimations();
   

    // Function that get a new World
    function getNewWord() {
        // RABETAO;
        // const dayWord = "MALANDRAMENTE";
        // TCHELEKA;
        // TCHUTCHUKA;
        const dayWord = "TCHUTCHUKA";
        return dayWord;
    }
    

    // Add listener to document for typing on screen
    const keys = document.querySelectorAll(".game__keyboard-row button");
    document.addEventListener('keydown', event => {keyPressed(event.key);})
    for (var i = 0; i < keys.length; i++) { // Add listener to keys typed on browser
        keys[i].onclick = ({ target }) => {keyPressed(target.getAttribute("data-key"));}
    }


    // Trasnform input value and dayWorld in a valid comparaBle expression
    function fixWord (word){
        return (word.toLocaleLowerCase()).replace(/[àáâã]/, 'a').replace(/[í]/, 'i').replace(/[éê]/, 'e').replace(/[óôõ]/,'o').replace(/[ú]/, 'u').replace('ç', 'c').replace('ñ', 'n');
    }


    // update the UI squares with the array digited
    function updateArray(animeType) {
        var boxes = document.querySelectorAll(".square") 
        for (var i=0; i<dayWord.length; i++){
            if (i < guessedWord.length){
                boxes[i+currentTry].textContent = guessedWord[i];
            } else {
                boxes[i+currentTry].textContent = "";
            }
        }
        if (guessedWord.length > 0 && guessedWord.length < dayWord.length && animeType == "animationPop"){
            const iterable = guessedWord.length + currentTry -1;
            boxes[iterable].classList.add(animeType);
            window.setTimeout(()=>{boxes[iterable].classList.remove(animeType)}, 150);
        }
    }

    
    function checkYellowBox(word, fixedDayWord, j){
        var nDayWord = 0;
        var ncurrentN = 0
        totalCorrect = 0;
        
        for (n=0; n<word.length; n++){
            if(fixedDayWord[n] == word[j]){
                nDayWord++;
            }

            if(n<j && word[n] == word[j] && word[j] != fixedDayWord[n]){
                ncurrentN++;
            }

            if(word[n] == word[j] && word[n] == fixedDayWord[n]){
                totalCorrect++;
            }
        }
        const NtoTagYellow = nDayWord - totalCorrect; 
        if (ncurrentN < NtoTagYellow){
            return "semiCorrectBox";
        } else {
            return "wrongBox";
        }
    }


    function updateAfterEnter(word, fixedDayWord) {
        var boxes = document.querySelectorAll(".square")
        const lista = [];
        const CT = currentTry;
        letter_loop:
        for (var j=0; j<word.length; j++){
            if(word[j] == fixedDayWord[j]){
                lista.push("correctBox");
            } else {
                lista.push("wrongBox");
                for (k=0; k<dayWord.length; k++){
                    // check possible yellow value
                    if(word[j] == fixedDayWord[k]){
                        lista[j] = checkYellowBox(word, fixedDayWord, j);
                        continue letter_loop;
                    } 
                } 
            }

        }
        time = 0;
        const keyboard = document.querySelectorAll('[data-key]');
        for (var j=0; j<word.length; j++){
            const iterable = j+currentTry;
            const value = lista[j];
            window.setTimeout(()=>{boxes[iterable].classList.add("animationFlip"); }, time);
            window.setTimeout(()=>{boxes[iterable].classList.add(value); }, time+300);
            
            keyboard.forEach(botao => {
                if (botao.textContent == word[j]) {
                    const currentColor = botao.style.backgroundColor;
                    if (lista[j] == "correctBox" && currentColor != "correctBox"){
                        botao.style.backgroundColor = optionsColor[0];
                        botao.style.color = "white";
                        botao.classList.add("animationPop");
                        window.setTimeout(()=>{botao.classList.remove("animationPop")}, 150);
                    } else 
                    if (lista[j] == "semiCorrectBox" && currentColor != "correctBox" && currentColor != "semiCorrectBox"){
                        botao.style.backgroundColor = optionsColor[1];
                        botao.style.color = "white";
                        botao.classList.add("animationPop");
                        window.setTimeout(()=>{botao.classList.remove("animationPop")}, 150);
                    } else {
                        botao.style.backgroundColor = optionsColor[2];
                        botao.style.color = "white";
                        botao.classList.add("animationPop");
                        window.setTimeout(()=>{botao.classList.remove("animationPop")}, 150);
                    }
                    }
            })

            time = time + 150;
        }
        
        if (fixWord(word) == fixWord(dayWord)){
            credits();
            return;
        } 

        if (CT + dayWord.length >= numTrys * dayWord.length){
            credits();
        } else {
            currentTry += dayWord.length
            guessedWord = [];
        }
    }



    function credits(){
        gameEnded = true;
        document.getElementById("game__keyboard").remove();
    }


    // Function that handle keyPressed
    function keyPressed (letter){
        if (gameEnded == true) {
            return;
        }
        
        if (fixWord(letter) == "enter"){
            if (guessedWord.length == dayWord.length){
                var word = "";
                for (var j=0 ; j<guessedWord.length; j++){
                    word += guessedWord[j];
                }
                updateAfterEnter(fixWord(word), fixWord(dayWord));
            } else {
                var boxes = document.querySelectorAll(".square") 
                for (let j=0; j< dayWord.length; j++) {
                    const iterable = j+currentTry;
                    boxes[iterable].classList.add("animationNope");
                    window.setTimeout(()=>{boxes[iterable].classList.remove("animationNope")}, 850);
                }
            }
        } else if (fixWord(letter) == "backspace" || fixWord(letter) == "del" || fixWord(letter) == "delete"){
            guessedword = guessedWord.pop();
            updateArray();

        } else if (possibleLetters.indexOf(fixWord(letter)) != -1){ // Check if digited letter is valid
            if (guessedWord.length < dayWord.length) {
            guessedWord.push(letter);
            updateArray("animationPop");
            const keyboard = document.querySelectorAll('[data-key]');
            keyboard.forEach(botao => {
                if (botao.textContent == fixWord(letter)) {
                    botao.classList.add("animationPop");
                    window.setTimeout(()=>{botao.classList.remove("animationPop")}, 150);
                }
            });}
        }
    }
  });


function createSquares(num, numTrys) {
    const gameBoard = document.getElementById("board"); // get board Element
    const clientHeight = document.getElementById('game__board').clientHeight;
    const clientWidth = document.getElementById('game__board').clientWidth;
    
    const spaceX = clientWidth/(6*num+3);
    const spaceY = Math.min(clientHeight/(6*numTrys+3), 1.5*spaceX);
    const squareX = spaceX*5;
    const squareY = Math.min(spaceY*5, squareX);


    gameBoard.style.gridTemplateColumns = "1fr ".repeat(num) // Set Number of elements in a rows
    // draw rows
    for (var index = 0; index < num*numTrys; index++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
        square.style.width = `${0.95*squareX}px`;
        square.style.height = `${0.95*squareY}px`;
        square.style.fontSize = `${0.70*squareX}px`;
    }
    gameBoard.style.gap = `${spaceY}px ${spaceX}px`;
    gameBoard.style.marginLeft = `${2*spaceX}px`;
    gameBoard.style.marginRight = `${2*spaceX}px`;
}

function startAnimations(){
    document.querySelectorAll(".square").forEach(box => {box.classList.add("animationBegin"); window.setTimeout(()=>{box.classList.remove("animationBegin")}, 400);}); // Play Fade in box Animation
    document.querySelectorAll("[data-key]").forEach(keey => {{keey.classList.add("animationKeyboardBegin"); window.setTimeout(()=>{keey.classList.remove("animationKeyboardBegin");}, 1500);}}); // Play Fade in keyboard Animation
}
  