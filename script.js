"use strict";

const DEFAULT = 1;
const ERASE= 2;
const RANDOM= 3;

let sideLength = 16;
let cellsTotal = sideLength * sideLength
let currentMode = DEFAULT;
let currentColor = "#000000";
let eraseOn = false;
let randomOn = false;

const gridContainer = document.querySelector(".grid-container");
const clearButton = document.querySelector(".clear-button");
const drawButton = document.querySelector(".draw-button");
const eraseButton = document.querySelector(".erase-button");
const randomButton = document.querySelector(".random-button");
const gridSizeSlider = document.querySelector(".slider");

fillGrid(sideLength);

gridContainer.addEventListener("mouseover", processEvent);
clearButton.addEventListener("click", () => resetGrid(gridContainer));
drawButton.addEventListener("click", () => currentMode = DEFAULT);
eraseButton.addEventListener("click", () => currentMode = ERASE);
randomButton.addEventListener("click", () => currentMode = RANDOM);

gridSizeSlider.addEventListener("input", () => {
    sideLength = gridSizeSlider.value;
    cellsTotal = sideLength * sideLength;
    resetGrid(gridContainer);
})

function processEvent(event) {
    if (currentMode === DEFAULT) {
        handleMousoverDraw(event);
    } else if (currentMode === ERASE) {
        handleMousoverErase(event);
    } else if (currentMode === RANDOM) {
        handleMousoverRandom(event);
    }
}

function handleMousoverDraw(event) {
    if (event.target.dataset.cellcolor !== undefined) {
        changeOpacity(event.target);
    }
}

function handleMousoverErase(event) {
    if (event.target.dataset.cellcolor !== undefined) {
        event.target.style.opacity = 0;
    }
}

function handleMousoverRandom(event) {
    if (event.target.dataset.cellcolor !== undefined) {
        let randomColor = `rgb(${random(255)} ${random(255)} ${random(255)})`;
        event.target.style.opacity = random(100) + "%";
        setColor(event.target, randomColor);
    }
}

function fillGrid(sideLength) {
    for (let i = 1; i <= cellsTotal; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.setAttribute("data-cellcolor", "");
        cell.style.cssText = `width: calc(100% / ${sideLength});
                            height: calc(100% / ${sideLength})`;
        setColor(cell, currentColor);
        gridContainer.appendChild(cell);
    }
}

function changeOpacity(element) {
    const step = 0.1;
    let currentOpacity = +element.style.opacity;
    let newOpacity = currentOpacity + step;

    if (newOpacity > 1) {
        newOpacity = 1;
    }

    element.style.opacity = newOpacity;
}

function resetGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    
    fillGrid(sideLength);
}

function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function setColor(element, color) {
    element.style.backgroundColor = color;
}
