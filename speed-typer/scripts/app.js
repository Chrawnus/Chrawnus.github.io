const wordDisplay = document.getElementById('word-display');

let wordArr = Array(10).fill(" ");



requirejs(['words_dictionary'],
function   (words_dictionary) {
    wordArr = wordArr.map(x => x = `<span style="color: red;">${Object.keys(words)[getRandomInt(0,370100)]}</span>`);
    
    wordDisplay.innerHTML = wordArr[0];

    console.log(wordArr);
});







function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }