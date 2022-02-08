document.addEventListener("DOMContentLoaded", () => {

    var gameEnded = false;
    var currentTry = 0;
    const numTrys = 6;
    guessedWord = [];
    const possibleLetters = ['q' ,'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'à', 'á', 'â', 'â', 'í', 'é', 'ê', 'ó', 'ô', 'õ', 'ú', 'ç', 'ñ'];
    const dayWord = getNewWord();

    // Function that get a new World
    function getNewWord() {
        const dayWord = "RABETAO";
        createSquares(dayWord, numTrys);
        changeBackground("#FC466B", "#3F5EFB")  //changeBackground("#0eec3ea6", "#5445fca6")//changeBackground("#5445fca6", "#fb9e41a6");
        return dayWord;
    }
  

    const keys = document.querySelectorAll(".keyboard-row button");

    // Add listener to document for typing on screen
    document.addEventListener('keydown', event => {keyPressed(event.key);})
    
    // Add listener to the keys displayed on web
    for (var i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {keyPressed(target.getAttribute("data-key"));}
    }


    // Trasnform input value and Day world in a valid expression to be compared
    function fixWord (word){
        return (word.toLocaleLowerCase()).replace(/[àáâã]/, 'a').replace(/[í]/, 'i').replace(/[éê]/, 'e').replace(/[óôõ]/,'o').replace(/[ú]/, 'u').replace('ç', 'c').replace('ñ', 'n');
    }

    // update the UI squares with the array digited
    function updateArray() { 
        var boxes = document.querySelectorAll(".square")   
        for (var i=0; i<dayWord.length; i++){
            if (i < guessedWord.length){
                text = guessedWord[i];
            } else {
                text = "";
            }
            boxes[i+currentTry].textContent = text;
        }
    }

    function updateAfterEnter(newWord) {
        var boxes = document.querySelectorAll(".square") 
        for (var j=0; j<newWord.length; j++){
            if(fixWord(newWord[j]) == fixWord(dayWord[j])){
                boxes[j+currentTry].classList.add("correctBox")
            } 
            var checkSemiCorrect = false;
            for (k=0; k<dayWord.length; k++){
                if(fixWord(newWord[j]) == fixWord(dayWord[k])){
                    checkSemiCorrect = true;
                } 
            }
            if (!boxes[j+currentTry].classList.contains("correctBox")){
                if (checkSemiCorrect == true){
                    boxes[j+currentTry].classList.add("semiCorrectBox")
                } else {
                    boxes[j+currentTry].classList.add("wrongBox")
                }
            }
        }
        
        if (fixWord(newWord) == fixWord(dayWord)){
            alert("ACERTOU MIZERAVI");
            credits();
            return;
        } 
        if (currentTry + dayWord.length >= numTrys * dayWord.length){
            credits();
            alert("GAME OVER")
        } else {
            currentTry += dayWord.length
            guessedWord = [];
        }
    }



    function credits(){
        gameEnded = true;
        document.getElementById("keyboard-container").remove();
        document.querySelector(".credits").style.visibility = "visible";
        document.querySelector("iframe").height = "auto";
        document.querySelector(".rodape").style.visibility = "visible";

    }

    // Function that handle keyPressed
    function keyPressed (letter){
        if (gameEnded == true) {
            return;
        }
        var letter = letter.toLowerCase();
        var numLetterGuessed = guessedWord.length;

        if (letter == "enter"){
            if (numLetterGuessed == dayWord.length){
                var newWord = "";
                for (var j=0 ; j<guessedWord.length; j++){
                    newWord += guessedWord[j];
                }
                updateAfterEnter(newWord);
            }

        } else if (letter == "backspace" || letter == "del" || letter == "delete"){
            guessedword = guessedWord.pop();
            updateArray();


        } else if (possibleLetters.indexOf(letter) != -1){ // Check if digited letter is valid
            if (numLetterGuessed < dayWord.length) {
            guessedWord.push(letter);
            updateArray();
            }
        }
    }

    


  });
  