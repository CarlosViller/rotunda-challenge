import { Lion, Pig, Dog, Snake } from "./classes.js";

const defaultBgColor = "#e9e9ed";
const zoo = [
  { emoji: "🦁", animal: new Lion(), color: "#f3b436" },
  { emoji: "🐷", animal: new Pig(), color: "#d2877a" },
  { emoji: "🐶", animal: new Dog(), color: "#a5815c" },
  { emoji: "🐍", animal: new Snake(), color: "#a4be0b" },
];

// Pick the first animal of the zoo by default
let selected = zoo[0];

renderAnimalPicker();
handleAnimalPhraseRender();
handleCopyToClipboard();

// ============================================================

/**
 * Toggle the background of a button with a custom color when it has been clicked
 * @param { HTMLElement } element
 * @param { string } color
 */
function toggleButton(element, color) {
  const isActive = element.classList.toggle("active");
  element.style.background = isActive ? color : defaultBgColor;
}

/**
 * Create buttons for each animal in the zoo for the user to pick
 */
function renderAnimalPicker() {
  const animalPicker = document.getElementById("animalPicker");

  zoo.forEach((current, index) => {
    const { emoji, color } = current;
    const animalBtn = document.createElement("button");

    animalBtn.textContent = emoji;

    // Active the first button by default
    if (index === 0) toggleButton(animalBtn, color);

    animalBtn.addEventListener("click", () => {
      if (selected) {
        const prevItem = document.getElementsByClassName("active")[0];
        toggleButton(prevItem);
      }

      toggleButton(animalBtn, color);
      selected = current;
    });

    animalPicker.appendChild(animalBtn);
  });
}

/**
 * Event handler for translating input text into an animal-specific phrase.
 * Renders the result in the DOM with alternating word colors matching the selected animal.
 */
function handleAnimalPhraseRender() {
  const translateBtn = document.getElementById("speak-btn");
  const result = document.getElementById("result");

  translateBtn.addEventListener("click", () => {
    const inputText = document.getElementById("input-text").value;
    const animalPhrase = selected.animal.speak(inputText).split(" ");

    // Clear result box
    result.innerHTML = "";

    animalPhrase.forEach((word, index) => {
      if (index % 2 !== 0) {
        const wordElement = document.createElement("span");
        wordElement.textContent = word;
        wordElement.style.color = selected.color;

        result.appendChild(wordElement);
      } else {
        result.innerHTML += word;
      }

      result.innerHTML += " ";
    });
  });
}

/** Event handler to copy result phrase into the clipboard */
function handleCopyToClipboard() {
  const copyBtn = document.getElementById("copy-btn");

  copyBtn.addEventListener("click", () => {
    const copyText = document.getElementById("result").innerText;
    navigator.clipboard.writeText(copyText);

    copyBtn.animate([{ transform: "scale(0.9)" }, { transform: "scale(1)" }], {
      duration: 300,
    });
  });
}
