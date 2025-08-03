"use strict";

const DEFAULT = 1;
const ERASE= 2;
const RANDOM= 3;

let sideLength = 16;
let cellsTotal = sideLength * sideLength
let currentMode = DEFAULT;
let colors = [
    "#000000", "#0000AA", "#00AA00", "#00AAAA", 
    "#AA0000", "#AA00AA", "#AA5500", "#98183c", 
    "#6a5fa0", "#edb329", "#f7e26c", "#e98472",
    "#55FF55", "#e76d14", "#7cdbcf", "#b2a283",
];
let currentColor = colors[0];

const gridContainer = document.querySelector(".grid-container");
const palette = document.querySelector(".palette");
const clearButton = document.querySelector(".clear-button");
const drawButton = document.querySelector(".draw-button");
const eraseButton = document.querySelector(".erase-button");
const randomButton = document.querySelector(".random-button");
const gridSizeSlider = document.querySelector(".slider");
const paletteButton = document.querySelector(".palette-button");

fillGrid(sideLength);
drawButton.classList.add("mode-on"); 
fillPalette();

gridContainer.addEventListener("mouseover", processEvent);
clearButton.addEventListener("click", () => resetGrid(gridContainer));
drawButton.addEventListener("click", () => setMode(DEFAULT));
eraseButton.addEventListener("click", () => setMode(ERASE));
randomButton.addEventListener("click", () => setMode(RANDOM));
paletteButton.addEventListener("click", () => palette.toggleAttribute("hidden"));

gridSizeSlider.addEventListener("input", () => {
    sideLength = gridSizeSlider.value;
    cellsTotal = sideLength * sideLength;
    resetGrid(gridContainer);
});

palette.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        currentColor = colors[event.target.getAttribute("data-color-index")];
    }
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

// TODO: color picker for default draw mode - a popup panel with 16 colors,
// accessible via a pallette button (on the panel, after the slider).
function fillPalette() {
    for (let i = 0; i < colors.length; i++) {
        const colorButton = document.createElement("button");
        colorButton.style.backgroundColor = colors[i];
        colorButton.setAttribute("data-color-index", i);
        colorButton.classList.add("color-button");
        palette.appendChild(colorButton);
    }
}