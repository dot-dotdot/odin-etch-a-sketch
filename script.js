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
drawButton.classList.add("mode-on"); 

gridContainer.addEventListener("mouseover", processEvent);
clearButton.addEventListener("click", () => resetGrid(gridContainer));
drawButton.addEventListener("click", () => setMode(DEFAULT));
eraseButton.addEventListener("click", () => setMode(ERASE));
randomButton.addEventListener("click", () => setMode(RANDOM));

gridSizeSlider.addEventListener("input", () => {
    sideLength = gridSizeSlider.value;
    cellsTotal = sideLength * sideLength;
    resetGrid(gridContainer);
})

function processEvent(event) {
    if (currentMode === DEFAULT) {
        handleMouseoverDraw(event);
    } else if (currentMode === ERASE) {
        handleMouseoverErase(event);
    } else if (currentMode === RANDOM) {
        handleMouseoverRandom(event);
    }
}

function handleMouseoverDraw(event) {
    if (event.target.dataset.cellcolor !== undefined) {
        setColor(event.target, currentColor);
        changeOpacity(event.target);
    }
}

function handleMouseoverErase(event) {
    if (event.target.dataset.cellcolor !== undefined) {
        event.target.style.opacity = 0;
    }
}

function handleMouseoverRandom(event) {
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

function setActiveButton() {
    const modeButtons = document.querySelectorAll(".mode-buttons > button");

    for (let i = 0; i < modeButtons.length; i++) {
        const node = modeButtons[i];

        if (i + 1 === currentMode) {
            if (!node.classList.contains("mode-on")) {
                node.classList.add("mode-on");
            } else {
                continue;
            }
        } else {
            node.classList.remove("mode-on");   
        }
    }
}

function setMode(mode) {
    currentMode = mode;
    setActiveButton();
}

function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function setColor(element, color) {
    element.style.backgroundColor = color;
}
