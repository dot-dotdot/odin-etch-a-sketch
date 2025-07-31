"use strict";

let sideLength = 16;

const gridContainer = document.querySelector(".grid-container");
const clearButton = document.querySelector(".clear-button");

fillGrid(sideLength);

function fillGrid(sideLength) {
    let cellsTotal = sideLength * sideLength

    for (let i = 1; i <= cellsTotal; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-cell");
        div.setAttribute("data-color", "");
        div.style.cssText = `width: calc(100% / ${sideLength});
                            height: calc(100% / ${sideLength})`;
        gridContainer.appendChild(div);
    }
}

gridContainer.addEventListener("mouseover", (event) => {
    if (event.target.dataset.color !== undefined) {
        changeOpacity(event.target);
    }
});

clearButton.addEventListener("click", () => resetGrid(gridContainer));

function changeOpacity(element) {
    const step = 0.1;

    let currentOpacity = +element.style.opacity;
    let newOpacity = currentOpacity + step;

    if (newOpacity > 1) {
        newOpacity = 1;
    }

    element.style.opacity = newOpacity;
}

function resetGrid(grid) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    
    fillGrid(sideLength);
}

function random(max) {
    return Math.floor(Math.random() * (max + 1));
}
