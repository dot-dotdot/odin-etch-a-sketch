"use strict";

let sideLength = 16;

const gridContainer = document.querySelector(".grid-container");

fillGrid(sideLength);

function fillGrid(sideLength) {
    let cellsTotal = sideLength * sideLength
    for (let i = 1; i <= cellsTotal; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-cell");
        setCellDimensions(div);
        gridContainer.appendChild(div);
    }
}

function setCellDimensions(cell) {
    cell.style.width = gridContainer.clientWidth / sideLength + "px";
    cell.style.height = cell.style.width;
}