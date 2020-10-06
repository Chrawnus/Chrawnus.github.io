

requirejs(['words_dictionary'],
    function getWords(words_dictionary) {

        const wordDisplayElem = document.getElementById('word-display');
        const wordInputElem = document.getElementById('word-input');
        const submitWordElem = document.getElementById('submit-word');

        let charIndex = 0;
        let scoreArr = [];
        wordInputElem.focus();
        let wordArr = Array(10).fill(" ");

        wordInputElem.addEventListener('keyup', gameLogic);
        wordInputElem.addEventListener('keydown', repeatCheck);

        submitWordElem.addEventListener('click', clearInput);

        const addSpan = x => x = x.split("").map((x, i) => x = `<span class="letters" id="${i}">${x}</span>`).join("");
        wordArr = wordArr.map(() => addSpan(Object.keys(words)[getRandomInt(0, 370100)]));
        currWord = 0;


        wordDisplayElem.innerHTML = wordArr[currWord];





        setInterval(() => {
            if (wordInputElem.disabled === true && charIndex !== wordDisplayElem.textContent.length) {
                wordInputElem.disabled = false;
                wordInputElem.focus();
            }
            /*              else if (charIndex === wordDisplayElem.textContent.length) {
                            wordInputElem.disabled = true;
                            submitWordElem.focus();
                        } */
        }, 16);

        function gameLogic(e) {

            const targ = e.target
            const letter = document.getElementById(`${charIndex}`);

            let text = wordDisplayElem.textContent;
            console.log(charIndex === text.length - 1)

            if (charIndex < text.length) {

                if (e.code === 'Enter') {
                    return
                }

                letterValidation();

            }


            function letterValidation() {
                if (targ.value.substring(charIndex, charIndex + 1) === text.substring(charIndex, charIndex + 1)) {
                    charIndex++;
                    letter.style.color = `green`;
                    scoreArr.push(1);
                    
                    if (charIndex === text.length) {
                        clearInput();
                    }

                } else {
                    charIndex++;
                    letter.style.color = `red`;
                    scoreArr.push(-1);

                    if (charIndex === text.length) {
                        clearInput();
                    }
                }
            }

        }


        function clearInput() {
            wordInputElem.value = "";
            charIndex = 0;
            console.log(scoreArr.reduce((a, b) => a + b, 0))

            if (currWord < wordArr.length - 1) {
                currWord++;
                
                wordDisplayElem.innerHTML = wordArr[currWord];
            } else if (currWord === wordArr.length - 1) {
                getWords();
            }
        }



        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        function repeatCheck(e) {
            if (e.repeat && e.key !== "Backspace") {
                wordInputElem.disabled = true;
            }
        }


    }
);






