"use strict";

let sideLength = 16;

const gridContainer = document.querySelector(".grid-container");

fillGrid(sideLength);

function fillGrid(sideLength) {
    let cellsTotal = sideLength * sideLength
    for (let i = 1; i <= cellsTotal; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-cell");
        div.style.cssText = `width: calc(100% / ${sideLength});
                            height: calc(100% / ${sideLength})`;
        gridContainer.appendChild(div);
    }
}

