
/*
*
* Wordle game that uses Brazilian funk words
*
* Created by Victor Dalosto on 22/02/2022
*
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    *
    *  Var Declarations
    *
    */
   
    let gameEnded = false;
    let currentTry = 0;
    let currentGuessWord = [];
    const optionsColor = ["rgb(59, 153, 50)", "rgb(211, 178, 32)", "rgb(80, 80, 100)"]; // Possible colors to change the buttons [ correctBox, semiCorrectBox, wrongBox ]
    const possibleLetters = ['q' ,'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'à', 'á', 'â', 'â', 'í', 'é', 'ê', 'ó', 'ô', 'õ', 'ú', 'ç', 'ñ'];
    const dayWord = todaysWord();
    const numTrys = 6;
    const gameDiv = document.getElementById("board");
    const gameBoard = document.getElementById('game__board');
    const keyboard = document.querySelectorAll('[data-key]');
    const notifications = document.getElementById("game__notification");
    const shareButton = document.querySelectorAll(".shareButton");
    const containerHowToPlay = document.getElementById("howToPlay");
    const containerCredits = document.getElementById("credits");
    const title = document.querySelectorAll(".title");
    // const containerRaking = document.getElementById("ranking");
    startLayout();
    const boxes = document.querySelectorAll(".playableSquare");
    playAnimations();


    /*
    *
    *  Functions
    *
    */


    // A function that gets today's Date in format dd/mm/yyyy
    function todaysDate() {
        const today = new Date();
        const dateDay = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();
        const dateMonth = (today.getMonth()+1 < 10) ? "0" + (today.getMonth()+1) : today.getMonth()+1;
        const dateYear = today.getFullYear();
        return dateDay+"/"+dateMonth+"/"+dateYear;
    }


    // A function that gets today's Word in the data.json file based on today's date
    function todaysWord() {
        const request = new XMLHttpRequest();
        request.open("GET", '../data.json', false);
        request.send(null);
        const fullDate = todaysDate();
        const dataBase = ["RABETAO", "MALANDRAMENTE", "TCHELEKA", "TCHUTCHUCA", "MALDIVAS", "ARRASTA", "SOCA", "CATUCADAO", "MARTELA", "GAIOLA", "GANJA", "SENTADAO", "NOVINHA", "RECALCADA", "MILGRAU", "RECALCADA", "CORINGA", "CACHORRO", "POPOZUDA", "PUTARIA", "COCOTA", "VULGAR", "PLAYSON", "SARRADA", "BONDE", "FLUXO", "LEPOLEPO", "MALOKA", "BOLETE", "GLAMUROSA", "VADIAO", "PROIBIDAO", "EMBRAZAR", "XANAINA", "SURUBINHA", "XAVONELLY", "TROTEIRA", "VIBE", "GRELINHO", "DINDINDIN", "RODADA", "OUDRI", "PROBLEMINHA", "CHEFE", "CATUCAR", "BISCOITEIRA", "QUADRADINHO", "COIOTE", "PORPURINADA", "VENENO", "XERECARD", "BANDIDA", "SAPECA", "FULERA", "RECALQUE", "POTRANCA", "MANDRAKE", "BIFAO", "BONDE"]
        let word = dataBase[Math.floor(Math.random()*dataBase.length)];
        let wordsList = JSON.parse(request.responseText);
        wordsList = wordsList.FUNKWORDS;
        wordsList.forEach((funkdodia)=>{
            if (funkdodia.DATA == fullDate) {
                word = funkdodia.WORD;
        }});
        return word;
    }


    // This function creates the main elements on the screen
    function startLayout() {
        const gameBoardWidth =  gameBoard.clientWidth;
        const gameBoardHeight = gameBoard.clientHeight;
        resizeLayout(gameBoardWidth, gameBoardHeight);
        createSquares(dayWord.length, numTrys, gameBoardWidth, gameBoardHeight);
        divHowToPlay(gameBoardWidth, gameBoardHeight);
        divCredits();
        howToPlaySquares();
    }


    // This function resizes some Elements for different screens
    function resizeLayout(gameBoardWidth, gameBoardHeight) {
        const headerSize = Math.min((10*gameBoardWidth-655)/77, 0.1*gameBoardHeight);
        title[0].style.fontSize = `${headerSize}px`;
        if (keyboard[2].offsetHeight > 0.09*gameBoardHeight) {
            keyboard.forEach(key => {key.style.height = `${0.09*gameBoardHeight}px`});
            shareButton[0].style.height = `${13/9*0.09*gameBoardHeight}px`;
        } else {
            shareButton[0].style.height = `${45}px`;
    }}


    // Function that creates playable squares on the screen
    function createSquares(num, numTrys, gameBoardWidth, gameBoardHeight) {
        const spaceX = gameBoardWidth/(9*num+3);
        const spaceY = Math.min(gameBoardHeight/(9*numTrys+3), 1.5*spaceX);
        const squareX = Math.min(spaceY*8, spaceX*8);
        const squareY = Math.min(spaceY*8, spaceX*8);
        gameDiv.style.gridTemplateColumns = "1fr ".repeat(num) // Set Number of elements in a rows
        for (let index = 0; index < num*numTrys; index++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("playableSquare");
            square.setAttribute("id", index + 1);
            gameDiv.appendChild(square);
            square.style.width = `${0.90*squareX}px`;
            square.style.height = `${0.90*squareY}px`;
            square.style.fontSize = `${0.6*squareX}px`;
        }
        gameDiv.style.gap = `${spaceY}px ${spaceX}px`;
        gameDiv.style.marginLeft = `${2*spaceX}px`;
        gameDiv.style.marginRight = `${2*spaceX}px`;
    }


    // Function that handles the HowToPlay container [?]
    function divHowToPlay(gameBoardWidth, gameBoardHeight) {
        const altura = (23/24 - gameBoardHeight/2300)*100;
        containerHowToPlay.style.height = `${altura}%`;
        containerHowToPlay.style.width = `${gameBoardWidth*0.88}px`;
        const fonte = gameBoardHeight/120 + 77/6;
        document.querySelectorAll("p").forEach(text => {text.style.fontSize = `${fonte}px`});
        if (altura/100*gameBoardHeight < 420) {
            containerHowToPlay.style.overflowY = "scroll";
    }}


    // Function that handles the Credits container [C]
    function divCredits() {
        containerCredits.style.width = `${350}px`;
    }


    // Create squares in the HowToPlay container
    function howToPlaySquares() {
        const arrayTuto = ['E', 'V', 'O', 'L', 'U', 'I', 'U'];
        const arrayTutoColors = [optionsColor[2], optionsColor[0], optionsColor[2], optionsColor[2], optionsColor[2], optionsColor[1], optionsColor[2]];
        const num = arrayTuto.length;
        const gameDiv = document.getElementById("howToSquare");
        gameDiv.style.display = "grid";
        const spaceX = containerHowToPlay.clientWidth/(6*num+9);
        const squareX = spaceX*5;
        gameDiv.style.gridTemplateColumns = "1fr ".repeat(num);
        // draw rows
        for (let index = 0; index < num; index++) {
            const square = document.createElement("div");
            square.classList.add("square");
            gameDiv.appendChild(square);
            square.textContent = arrayTuto[index];
            square.style.backgroundColor = arrayTutoColors[index];
            square.style.width = `${0.80*squareX}px`;
            square.style.height = `${0.80*squareX}px`;
            square.style.fontSize = `${0.6*squareX}px`;
        }
        gameDiv.style.gap = `${spaceX}px`;
        gameDiv.style.marginLeft = `${5*spaceX}px`;
        gameDiv.style.marginRight = `${5*spaceX}px`;
        const tutosLetters = ['V', 'I', '⠀'];
        const tutos = [document.getElementById("howToSquare1"), document.getElementById("howToSquare2"), document.getElementById("howToSquare3")];
        const tutosColors = [optionsColor[0], optionsColor[1], optionsColor[2]];
        for (let index = 0; index < 3 ; index++) {
            const square = document.createElement("div");
            square.classList.add("square");
            tutos[index].appendChild(square);
            square.textContent = tutosLetters[index];
            square.style.backgroundColor = tutosColors[index];
            square.style.width = `${0.80*squareX}px`;
            square.style.height = `${0.80*squareX}px`;
            square.style.fontSize = `${0.6*squareX}px`;
            tutos[index].style.marginLeft = `15px`;
            tutos[index].style.marginRight = `${spaceX}px`;
    }}


    // A function that plays animations of appearing title, square Boards, buttons and keyboard on the screen
    function playAnimations() {
        title[0].classList.add("animationTitle");
        boxes.forEach(box => {box.classList.add("animationBegin"); window.setTimeout(()=>{box.classList.remove("animationBegin")}, 400);});
        keyboard.forEach(key => {{key.classList.add("animationKeyboardBegin"); window.setTimeout(()=>{key.style.opacity = "1"; key.tabIndex = -1; key.classList.remove("animationKeyboardBegin");}, 1500);}}); // Play Fade in keyboard Animation
        window.setTimeout(()=>{document.querySelectorAll(".buttonHeader").forEach(button => {button.classList.add("animationTitle"); button.tabIndex = -1;})}, 500);
    }


    // Add a listener to document for typing on the screen or clicking the buttons
    document.addEventListener('keydown', event => {keyPressed(event.key);});
    for (let i = 0; i < keyboard.length; i++) { // Add listener to keys typed on browser
        keyboard[i].onclick = ({ target }) => {keyPressed(target.getAttribute("data-key"));};
    }


    // This function transforms the input value into a valid comparable expression
    function fixWord (word) {
        return (word.toLocaleLowerCase()).replace(/[àáâã]/, 'a').replace(/[í]/, 'i').replace(/[éê]/, 'e').replace(/[óôõ]/,'o').replace(/[ú]/, 'u').replace('ç', 'c').replace('ñ', 'n');
    }


    // Update the squares with the digited array
    function updateSquares(animeType) {
        for (let i=0; i<dayWord.length; i++) {
            if (i < currentGuessWord.length) {
                boxes[i+currentTry].textContent = currentGuessWord[i];
            } else {
                boxes[i+currentTry].textContent = "";
        }}
        if (currentGuessWord.length > 0 && currentGuessWord.length <= dayWord.length && animeType == "animationPop") {
            const iterable = currentGuessWord.length + currentTry -1;
            boxes[iterable].classList.add(animeType); // Animation pop on squares boxes
            window.setTimeout(()=>{boxes[iterable].classList.remove(animeType)}, 150);
    }}


    // Function that checks the number of boxes to tag as yellow (semiCorrect)
    function checkYellowBox(word, fixedDayWord, j) {
        let nDayWord = 0;
        let ncurrentN = 0;
        let totalCorrect = 0;
        for (n=0; n<word.length; n++) {
            if (fixedDayWord[n] == word[j]) {
                nDayWord++;}
            if (n<j && word[n] == word[j] && word[j] != fixedDayWord[n]) {
                ncurrentN++;}
            if (word[n] == word[j] && word[n] == fixedDayWord[n]) {
                totalCorrect++;
        }}
        const NtoTagYellow = nDayWord - totalCorrect;
        if (ncurrentN < NtoTagYellow) {
            return "semiCorrectBox";
        } else {
            return "wrongBox";
    }}


    // Function that handles the web after Enter is pressed
    function handleAfterEnter(word, fixedDayWord) {
        const lista = [];
        letter_loop:
        for (let j=0; j<word.length; j++) {
            if (word[j] == fixedDayWord[j]) {
                lista.push("correctBox");
            } else {
                lista.push("wrongBox");
                for (k=0; k<dayWord.length; k++) {
                    // check possible yellow value
                    if (word[j] == fixedDayWord[k]) {
                        lista[j] = checkYellowBox(word, fixedDayWord, j);
                        continue letter_loop;
        }}}}
        // Loop that updates the squares and the keyBoard buttons color
        let time = 0; 
        for (let j=0; j<word.length; j++) {
            const iterable = j+currentTry;
            const value = lista[j];
            window.setTimeout(()=>{boxes[iterable].classList.add("animationFlip")}, time);
            window.setTimeout(()=>{boxes[iterable].classList.add(value)}, time+300);
            time = time + 150;
            keyboard.forEach(botao => {
                if (botao.textContent == word[j]) {
                    const currentColor = botao.style.backgroundColor;
                    if (lista[j] == "correctBox" && currentColor != "correctBox") {
                        botao.style.backgroundColor = optionsColor[0];
                        botao.classList.add("animationKBDPop");
                        window.setTimeout(()=>{botao.classList.remove("animationKBDPop")}, 200);
                    } else 
                    if (lista[j] == "semiCorrectBox" && currentColor != "correctBox" && currentColor != "semiCorrectBox") {
                        botao.style.backgroundColor = optionsColor[1];
                        botao.classList.add("animationKBDPop");
                        window.setTimeout(()=>{botao.classList.remove("animationKBDPop")}, 200);
                    } else {
                        botao.style.backgroundColor = optionsColor[2];
                        botao.classList.add("animationKBDPop");
                        window.setTimeout(()=>{botao.classList.remove("animationKBDPop")}, 200);
        }}})}
        // Check if the game has ended
        if (word == fixedDayWord || currentTry + dayWord.length >= numTrys * dayWord.length) {
            window.setTimeout(()=>{endGame(word, fixedDayWord);}, time+1000);
            gameEnded = true;
        }  else {
            currentTry += dayWord.length;
            currentGuessWord = [];
    }}


    // Function that plays when the game has ended
    function endGame(word, fixedDayWord) {
        let time = 0;
        if (word == fixedDayWord) {
            for (j=0; j<dayWord.length; j++) {
                const value = currentTry + j;
                window.setTimeout(()=>{boxes[value].classList.add("animationEndGameWin")}, time);
                time += 45;
            }
        } else {
            time = 700;
            for (j=0; j<dayWord.length; j++) {
                const value = currentTry + j;
                boxes[value].classList.add("animationEndGameLose");
        }}
        // Remove the keyboard and reveals the share button
        window.setTimeout(() => {
            keyboard.forEach(keey => {keey.classList.add("animationKeyboardGone")});
            window.setTimeout(()=>{shareButton[0].style.visibility = "visible";}, 400);
            share(dayWord.length);
        }, time + 600);
    }


    // Function that handles the key pressed
    function keyPressed (letter) {
        if (gameEnded == true) {
            return;
        }
        if (fixWord(letter) == "enter") {
            if (currentGuessWord.length == dayWord.length) {
                let word = "";
                for (let j=0 ; j<currentGuessWord.length; j++) {
                    word += currentGuessWord[j];
                }
                handleAfterEnter(fixWord(word), fixWord(dayWord));
            } else { 
                // plays notification on screen
                if (!notifications.classList.contains("animationNotification")) {
                    const possibleAlerts = ["CALMA PAPAI", "CALMA NA SENTADA", "CALMA NA SARRADA", "PALAVRA INCOMPLETA", "SEGURA AÍ", "CALMA"];
                    notifications.classList.add("animationNotification");
                    notifications.textContent = possibleAlerts[Math.floor(Math.random()*possibleAlerts.length)];
                    window.setTimeout(()=>{notifications.classList.remove("animationNotification")}, 2100);
                }
                // plays nope animation on squares
                for (let j=0; j< dayWord.length; j++) {
                    const iterable = j+currentTry;
                    boxes[iterable].classList.add("animationNope");
                    window.setTimeout(()=>{boxes[iterable].classList.remove("animationNope")}, 850);
                }
            }
        } else if (fixWord(letter) == "backspace" || fixWord(letter) == "del" || fixWord(letter) == "delete") {
            currentGuessWord.pop();
            updateSquares(null);

        // Check if digited letter is valid
        } else if (possibleLetters.indexOf(fixWord(letter)) != -1) { 
            if (currentGuessWord.length < dayWord.length) {
                currentGuessWord.push(letter);
                updateSquares("animationPop");
                keyboard.forEach(botao => {
                    if (botao.textContent == fixWord(letter)) {
                        botao.classList.add("animationPop");
                        window.setTimeout(()=>{botao.classList.remove("animationPop")}, 150);
    }})}}}


    // Function that handle events when the share button is pressed
    function share(num) {
        const boxCorrect = "🟩";
        const boxSemiCorrect = "🟨";
        const boxWrong = "⬛";
        const possibleTitles = ["So baixaria no", "Joguei o", "Arrasei no", "Deitei no", "Sarrei no", "Martelei no"];
        const title = possibleTitles[Math.floor(Math.random()*possibleTitles.length)];
        const matrixBoxes = [];
        boxes.forEach(box =>{
            if (box.classList.contains("correctBox")) {
                matrixBoxes.push(boxCorrect);
            } else 
            if (box.classList.contains("semiCorrectBox")) {
                matrixBoxes.push(boxSemiCorrect);
            } else
            if (box.classList.contains("wrongBox")) {
                matrixBoxes.push(boxWrong);
        }});
        const numeroTentativas = matrixBoxes.length/num;
        let fullmsg = `${title}: mcaurelio.com (${numeroTentativas}/6) \n`;
        for (let i = 0; i<matrixBoxes.length; i++) {
            if (i > 0 && i< matrixBoxes.length && i%num==0) {
                fullmsg += "\n";}
            fullmsg += matrixBoxes[i];
        }
        shareButton[0].addEventListener('click', () => {
            navigator.clipboard.writeText(fullmsg);
            notifications.classList.add("animationNotification");
            notifications.textContent = "Copiado para ctrl+V";
            window.setTimeout(()=>{notifications.classList.remove("animationNotification")}, 2500);
    })}


    // Function that hides or makes visible the overlayers containers
    document.addEventListener('click', (event) => {
        if (event.target.id != containerHowToPlay.id && event.target.id != "buttonHowToPlay") {
            containerHowToPlay.style.visibility = "hidden";
        }

        if (event.target.id != containerCredits.id && event.target.id != "buttonCredits") {
            containerCredits.style.visibility = "hidden";
        }

        // Add Popup layout effect on HowToPlay Container
        if (event.target.id == "buttonHowToPlay") {
            if (containerHowToPlay.style.visibility == "visible") {
                containerHowToPlay.style.visibility = "hidden"
            } else {
                containerHowToPlay.style.visibility = "visible";
                containerHowToPlay.classList.add("animationPopDiv");
                window.setTimeout(()=>{containerHowToPlay.classList.remove("animationPopDiv");}, 500);
            }
        }
        
        // Add Popup layout effect on Credits Container
        if (event.target.id == "buttonCredits") {
            if (containerCredits.style.visibility == "visible") {
                containerCredits.style.visibility = "hidden";
            } else {
                containerCredits.style.visibility = "visible";
                containerCredits.classList.add("animationPopDiv");
                window.setTimeout(()=>{containerCredits.classList.remove("animationPopDiv");}, 500);
            }
        }
    })

})