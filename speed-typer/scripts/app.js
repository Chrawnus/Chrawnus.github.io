import { getRandomInt, getStylizedNumber } from "./number_handlers.js";
import { words } from "/speed-typer/scripts/words_dictionary.js";

const nextWordElem = document.getElementById("next-word");
const wordDisplayElem = document.getElementById("word-display");
const totalLettersElem = document.getElementById("key-amount");
const correctLettersElem = document.getElementById("correct-keys");
const incorrectLettersElem = document.getElementById("incorrect-keys");
const wpmElem = document.getElementById("wpm");

const wordInputElem = document.getElementById("word-input");
const startButtonElem = document.getElementById("submit-word");
const timerElem = document.getElementById("timer");

const startButtonStr = "Start typing or press ENTER to start!";
const disabledButtonStr = "Waiting for player to finish current session..."
const newWordsButtonStr = "Start typing or press ENTER to start a new session!";

let corrKeyStr = "Correct keypresses: ";
let incorrKeyStr = "Incorrect keypresses: ";
let nextWordStr = "Next word: ";
let wpmStr = "WPM: ";


let keyAmount = 0;
let correctKeysAmount = 0;
let incorrectKeysAmount = 0;

let ms = 0;
let sec = 0;
let min = 0;

let totalMs = 0;

let msStr;
let secStr;
let minStr;

let resetTimerStr = "00:00:000";

let charIndex = 0;
let wordArr = Array(10).fill(" ");
let noSpanWordArr = Array(10).fill(" ");
let currWord = 0;

let isRunning = false;



wordInputElem.value = "";
wordInputElem.focus();




window.addEventListener("keypress", clickStartButton);
window.addEventListener("keyup", enableInput);


wordInputElem.addEventListener("keyup", keyUpEventsHandler);
wordInputElem.addEventListener("keydown", keyDownEventsHandler);
startButtonElem.addEventListener("click", startSession);




getNewWords()
    .then(resolve => resolve())
    .then(wordInputElem.focus())
    .catch(err => console.log(err));







function getNewWords() {
    function addSpan(word) {
        return word = word.split("").map((letter, i) => letter = `<span class="letters" id="${i}">${letter}</span>`).join("");
    }

    noSpanWordArr = noSpanWordArr.map(() => Object.keys(words)[getRandomInt(0, 370100)]);
    wordArr = wordArr.map((_, i) => addSpan(noSpanWordArr[i]));
    wordDisplayElem.innerHTML = wordArr[currWord];
    nextWordElem.textContent = nextWordStr + noSpanWordArr[currWord + 1];

    return new Promise((resolve, reject) => {
        wordInputElem.disabled = false;
    });
}

function startSession() {
    ms = 0;
    sec = 0;
    min = 0;

    keyAmount = 0;
    correctKeysAmount = 0;
    incorrectKeysAmount = 0;

    timerElem.textContent = resetTimerStr;


    wordInputElem.focus();

    correctLettersElem.textContent = corrKeyStr + correctKeysAmount;
    incorrectLettersElem.textContent = incorrKeyStr + incorrectKeysAmount;

    isRunning = true;


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
        if (!(e.ctrlKey && e.key === "z")) {
            if (targ.value.substring(charIndex, charIndex + 1) === text.substring(charIndex, charIndex + 1)) {

                charIndex++;
                letter.style.color = `green`;
                keyAmount++;

                correctKeysAmount++;
                correctLettersElem.textContent = corrKeyStr + correctKeysAmount;
            } else {
                charIndex++;
                letter.style.color = `red`;
                keyAmount++;

                incorrectKeysAmount++;
                incorrectLettersElem.textContent = incorrKeyStr + incorrectKeysAmount;
            }
            totalLettersElem.textContent = keyAmount;
            letter.style.backgroundColor = "";
        }
    }
    if (charIndex === text.length) {
        clearInput();
    }
}

function keyDownEventsHandler(e) {
    const prevLetter = document.getElementById(`${charIndex - 1}`);
    const letter = document.getElementById(`${charIndex}`);
    if (currWord === wordArr.length) {
        wordInputElem.disabled = true;
    }
    if (e.repeat && e.key !== "Backspace") {
        wordInputElem.disabled = true;
    }
    if (e.key === "Backspace" && !(charIndex - 1 < 0)) {
        prevLetter.style.color = "black";
        letter.style.backgroundColor = "";
        if (charIndex > 0) {
            charIndex--;
        }
    }
}

function clearInput() {
    if (currWord < wordArr.length - 1) {
        charIndex = 0;
        currWord++;
        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];
        if (!(noSpanWordArr[currWord + 1])) {
            nextWordElem.textContent = "Last word reached!";
        } else {
            nextWordElem.textContent = nextWordStr + noSpanWordArr[currWord + 1]
        }


    } else if (currWord === wordArr.length - 1) {
        isRunning = false;

        let words = (keyAmount / 5) // average word length = 5;
        let wpm = (words / totalMs) * 60000;

        wpmElem.textContent = wpmStr + wpm.toFixed(2);

        console.log(totalMs)

        totalMs = 0;
        charIndex = 0;
        currWord = 0;
        wordInputElem.value = "";
        wordInputElem.disabled = true;
        startButtonElem.disabled = false;
        startButtonElem.textContent = newWordsButtonStr;

        getNewWords()
            .then(resolve => resolve())
            .then(wordInputElem.focus())
            .catch(err => console.log(err));


    }
}

setInterval(() => {
    if (isRunning) {

        const letter = document.getElementById(`${charIndex}`);
        letter.style.backgroundColor = "yellow";

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
        totalMs += 10;
    }
}, 10);

function clickStartButton(e) {
    if (e.key === "Enter" && isRunning === false) {
        if (startButtonElem.textContent === startButtonStr || startButtonElem.textContent === newWordsButtonStr) {
            startButtonElem.textContent = disabledButtonStr;
        }
        charIndex = 0;
        currWord = 0;
        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];
        startButtonElem.click();
        startButtonElem.disabled = true;
    } else if (wordInputElem === document.activeElement && e.key.length === 1 && isRunning === false) {
        if (startButtonElem.textContent === startButtonStr || startButtonElem.textContent === newWordsButtonStr) {
            startButtonElem.textContent = disabledButtonStr;
        }
        charIndex = 0;
        currWord = 0;
        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];
        startButtonElem.click();
        startButtonElem.disabled = true;
    }
}

function enableInput() {
    if (isRunning === true && wordInputElem.disabled) {
        //wordInputElem.disabled = false;
        wordInputElem.focus();
    }
}