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
        const dayWord = "VAPO";
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
        
        if (guessedWord.length > 0 && animeType == "animationPop"){
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
        for (var j=0; j<word.length; j++){
            const iterable = j+currentTry;
            const value = lista[j];
            window.setTimeout(()=>{boxes[iterable].classList.add("animationFlip"); }, time);
            window.setTimeout(()=>{boxes[iterable].classList.add(value); }, time+300);
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
        if (letter == "enter"){
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
        } else if (letter == "backspace" || letter == "del" || letter == "delete"){
            guessedword = guessedWord.pop();
            updateArray();

        } else if (possibleLetters.indexOf(letter) != -1){ // Check if digited letter is valid
            if (guessedWord.length < dayWord.length) {
            guessedWord.push(letter);
            updateArray("animationPop");
            }
        }
    }

    


  });
  