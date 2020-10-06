import {words} from "/speed-typer/scripts/words_dictionary.js";

const wordDisplayElem = document.getElementById("word-display");
const wordInputElem = document.getElementById("word-input");
const startButtonElem = document.getElementById("submit-word");

let score = 0;
let charIndex = 0;
let scoreArr = [];
let wordArr = Array(10).fill(" ");
let currWord = 0;

const startButtonStr = "Click this button or press ENTER to start!";
const disabledButtonStr = "Waiting for player to finish current session..."
const newWordsButtonStr = "Click here or press ENTER for a set of new words!";

wordInputElem.value = "";
wordInputElem.focus();

scoreArr = [];
charIndex = 0;

window.addEventListener("keypress", clickStartButton);

wordInputElem.addEventListener("keyup", keyUpEventsHandler);
wordInputElem.addEventListener("keydown", keyDownEventsHandler);

startButtonElem.addEventListener("click", programLogic);


function clickStartButton(e) {


    if (e.key === "Enter") {
        if (startButtonElem.textContent === startButtonStr) {
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

function programLogic() {

    const addSpan = word => word = word.split("").map((letter, i) => letter = `<span class="letters" id="${i}">${letter}</span>`).join("");

    wordArr = wordArr.map(() => addSpan(Object.keys(words)[getRandomInt(0, 370100)]));
    
    wordDisplayElem.innerHTML = wordArr[currWord];


    setInterval(() => {
        if (wordInputElem.disabled === true && charIndex !== wordDisplayElem.textContent.length) {
            wordInputElem.disabled = false;
            wordInputElem.focus();
        }
    }, 16);
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function keyUpEventsHandler(e) {
    const targ = e.target
    const letter = document.getElementById(`${charIndex}`);



    let text = wordDisplayElem.textContent;




    if (charIndex < text.length) {
        console.log(e.key)
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
        console.log(scoreArr);
        score = score + scoreArr.reduce((acc, letterScore) => acc + letterScore, 0);
        
        console.log(score);

        scoreArr = [];
        currWord++;

        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];
    } else if (currWord === wordArr.length - 1) {
        console.log("done");
        console.log(wordArr.length);

        score = score + scoreArr.reduce((acc, letterScore) => acc + letterScore, 0);

        console.log(score);

        //wordArr = wordArr.map(() => addSpan(Object.keys(words)[getRandomInt(0, 370100)]));

        charIndex = 0;
        currWord = 0;
        scoreArr = [];
        wordInputElem.value = "";
        wordDisplayElem.innerHTML = wordArr[currWord];

        startButtonElem.disabled = false;
        startButtonElem.textContent = newWordsButtonStr;
    }
}