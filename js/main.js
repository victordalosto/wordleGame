document.addEventListener("DOMContentLoaded", () => {

    var gameEnded = false;
    var currentTry = 0;
    var guessedWord = [];

    const possibleLetters = ['q' ,'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'à', 'á', 'â', 'â', 'í', 'é', 'ê', 'ó', 'ô', 'õ', 'ú', 'ç', 'ñ'];
    const dayWord = getNewWord();
    const numTrys = 6;
    createSquares(dayWord, numTrys);
    startAnimations();
   

    // Function that get a new World
    function getNewWord() {
        const dayWord = "CAMA";
        return dayWord;
    }
    

    // Add listener to document for typing on screen
    const keys = document.querySelectorAll(".keyboard-row button");
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
                boxes[i+currentTry].style.border = '2px solid black';
            } else {
                boxes[i+currentTry].textContent = "";
                boxes[i+currentTry].style.border = '2px solid rgba(76, 76, 78)';
            }
        }
        if (guessedWord.length > 0){
            boxes[guessedWord.length + currentTry-1].classList.add(animeType);
            window.setTimeout(()=>{boxes[guessedWord.length + currentTry-1].classList.remove(animeType)}, 100);
        }
    }


    function checkYellowBox(newWord, dayWorld, j){
        var nInWord = newWord.match(new RegExp(newWord[j], "g") || []).length; // number of Letters J in input Word
        var nDayWord = dayWord.match(new RegExp(dayWord[k], "g") || []).length; // number of Letters J in input Word
        var currentN = newWord.substring(0, j+1);
        var ncurrentN = currentN.match(new RegExp(currentN[k], "g") || []).length; // number of Letters J in current iteration
        correctN = 0;
        totalCorrect = 0;
        for (n=0; n<newWord.length; n++){
            if(newWord[n] == dayWord[n]){
                totalCorrect++;
            }
            if (n<currentN.length && currentN[n] == dayWord[n]){
                correctN++;
            }
        }
    }


    function updateAfterEnter(newWord, FixedDayWord) {
        var boxes = document.querySelectorAll(".square") 
        letter_loop:
        for (var j=0; j<newWord.length; j++){
            if(newWord[j] == FixedDayWord[j]){
                boxes[j+currentTry].classList.add("correctBox");
                continue;
            } 
            
            for (k=0; k<dayWord.length; k++){
                // check possible yellow value
                if(newWord[j] == FixedDayWord[k]){
                    boxes[j+currentTry].classList.add("semiCorrectBox");
                    checkYellowBox(newWord, FixedDayWord, j);
                    continue letter_loop;
                } 
            }
            boxes[j+currentTry].classList.add("wrongBox");
        }
        
        if (fixWord(newWord) == fixWord(dayWord)){
            credits();
            return;
        } 
        if (currentTry + dayWord.length >= numTrys * dayWord.length){
            credits();
        } else {
            currentTry += dayWord.length
            guessedWord = [];
        }
    }

    function credits(){
        gameEnded = true;
        document.getElementById("keyboard-container").remove();
        document.querySelector(".credits").style.visibility = "visible";
        //document.querySelector("iframe").height = "auto";
        document.querySelector(".rodape").style.visibility = "visible";

    }

    // Function that handle keyPressed
    function keyPressed (letter){
        if (gameEnded == true) {
            return;
        }
        
        letter = fixWord(letter);
        var fixedDayWord = fixWord(dayWord);

        if (letter == "enter"){
            if (guessedWord.length == dayWord.length){
                var word = "";
                for (var j=0 ; j<guessedWord.length; j++){
                    word += guessedWord[j];
                }
                updateAfterEnter(fixWord(word), fixedDayWord);
            } else {
                var boxes = document.querySelectorAll(".square") 
                for (let j=0; j< dayWord.length; j++) {
                    boxes[j+currentTry].classList.add("animationNope");
                    window.setTimeout(()=>{boxes[j+currentTry].classList.remove("animationNope")}, 850);
                }
            }

        } else if (letter == "backspace" || letter == "del" || letter == "delete"){
            guessedword = guessedWord.pop();
            updateArray("animationRemPop");


        } else if (possibleLetters.indexOf(letter) != -1){ // Check if digited letter is valid
            if (guessedWord.length < dayWord.length) {
            guessedWord.push(letter);
            updateArray("animationPop");
            }
        }
    }

    


  });
  