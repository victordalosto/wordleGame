
function createSquares(num, numTrys) {
    const gameBoard = document.getElementById("board"); // get board Element
    gameBoard.style.gridTemplateColumns = "1fr ".repeat(num.length) // Set Number of elements in a rows

    // draw rows
    for (var index = 0; index < num.length*numTrys; index++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
    }
}

// Change background
function changeBackground(primary, secondary){
    document.body.style.background = `linear-gradient(135deg, ${primary}, ${secondary}) no-repeat`;
}


function startAnimations(){
    changeBackground("#FC466B", "#3F5EFB")  //changeBackground("#0eec3ea6", "#5445fca6")//changeBackground("#5445fca6", "#fb9e41a6");
    document.querySelectorAll(".square").forEach(box => {box.classList.add("animationBegin"); window.setTimeout(()=>{box.classList.remove("animationBegin")}, 400);}); // Play Fade in box Animation
    document.querySelectorAll("[data-key]").forEach(keey => {{keey.classList.add("animationKeyboardBegin"); window.setTimeout(()=>{keey.classList.remove("animationKeyboardBegin");}, 2500);}}); // Play Fade in keyboard Animation
}
