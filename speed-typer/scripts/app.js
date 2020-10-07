import { getRandomInt, getStylizedNumber } from "./number_handlers.js";
import {words} from "/speed-typer/scripts/words_dictionary.js";

const wordDisplayElem = document.getElementById("word-display");
const wordInputElem = document.getElementById("word-input");
const startButtonElem = document.getElementById("submit-word");
const timerElem = document.getElementById("timer");

let ms = 0;
let sec = 0;
let min = 0;

let msStr;
let secStr;
let minStr;

let resetTimerStr = "00:00:000";

let score = 0;
let scoreArr = [];

let charIndex = 0;
let wordArr = Array(10).fill(" ");
let currWord = 0;

let isRunning = false;

const startButtonStr = "Click this button or press ENTER to start!";
const disabledButtonStr = "Waiting for player to finish current session..."
const newWordsButtonStr = "Click here or press ENTER for a set of new words!";

wordInputElem.value = "";
wordInputElem.disabled = true;
wordInputElem.focus();

scoreArr = [];
charIndex = 0;

window.addEventListener("keypress", clickStartButton);

wordInputElem.addEventListener("keyup", keyUpEventsHandler);
wordInputElem.addEventListener("keydown", keyDownEventsHandler);

startButtonElem.addEventListener("click", startSession);




function startSession() {

    ms = 0;
    sec = 0;
    min = 0;

    timerElem.textContent = resetTimerStr;


    wordInputElem.disabled = false;
    wordInputElem.focus();
    
    isRunning = true;

    function addSpan(word) {
        return word = word.split("").map((letter, i) => letter = `<span class="letters" id="${i}">${letter}</span>`).join("");
    }

    wordArr = wordArr.map(() => addSpan(Object.keys(words)[getRandomInt(0, 370100)]));
    
    wordDisplayElem.innerHTML = wordArr[currWord];

}


function keyUpEventsHandler(e) {
    const targ = e.target
    const letter = document.getElementById(`${charIndex}`);

    let text = wordDisplayElem.textContent;

    if (charIndex < text.length) {
        if (e.key.length > 1 || wordInputElem.value === "") {
            if (wordInputElem.value === "") {
                charIndex = 0;
                wordDisplayElem.innerHTML = wordArr[currWord];
            }
            return
        }
        letterValidation();
    }

    function letterValidation() {
        if (targ.value.substring(charIndex, charIndex + 1) === text.substring(charIndex, charIndex + 1)) {
            charIndex++;
            letter.style.color = `green`;
            scoreArr.push(1);
        } else {
            charIndex++;
            letter.style.color = `red`;
            scoreArr.push(-1);
        }
    }
    if (charIndex === text.length) {
        clearInput();
    }
}

function keyDownEventsHandler(e) {
    const letter = document.getElementById(`${charIndex - 1}`);

    if (currWord === wordArr.length) {
        wordInputElem.disabled = true;
    }
    if (e.repeat && e.key !== "Backspace") {
        wordInputElem.disabled = true;
    }
    if (e.key === "Backspace" && !(charIndex - 1 < 0)) {
        letter.style.color = "black";
        if (charIndex > 0) {
            charIndex--;
        }
    }
}

function clearInput() {
    if (currWord < wordArr.length - 1) {
        
        charIndex = 0;
        score = score + scoreArr.reduce((acc, letterScore) => acc + letterScore, 0);
        scoreArr = [];
        currWord++;
        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];

    } else if (currWord === wordArr.length - 1) {
        
        score = score + scoreArr.reduce((acc, letterScore) => acc + letterScore, 0);
        isRunning = false;
        charIndex = 0;
        currWord = 0;
        scoreArr = [];
        wordInputElem.value = "";
        wordInputElem.disabled = true;
        startButtonElem.disabled = false;
        startButtonElem.textContent = newWordsButtonStr;

    }
}

setInterval(() => {
    if (isRunning) {
        
        msStr = getStylizedNumber(ms);
        secStr = getStylizedNumber(sec);
        minStr = getStylizedNumber(min);

        timerElem.textContent = `${minStr}:${secStr}:${msStr}0`
        ms += 1;
        if (ms >= 100) {
            sec += 1;
            ms = 0;
        }
        if (sec >= 60) {
            min += 1;
            sec = 0;
        }
    }
}, 10);

function clickStartButton(e) {
    if (e.key === "Enter") {
        if (startButtonElem.textContent === startButtonStr || startButtonElem.textContent === newWordsButtonStr) {
            startButtonElem.textContent = disabledButtonStr;
        }
        charIndex = 0;
        currWord = 0;
        scoreArr = [];
        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];
        startButtonElem.click();
        startButtonElem.disabled = true;
    }
}