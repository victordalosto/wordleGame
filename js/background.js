
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
    document.body.style.background = `linear-gradient(135deg, ${primary}, ${secondary})`;
}
