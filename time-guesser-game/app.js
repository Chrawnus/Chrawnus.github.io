const scoreElem = document.getElementById('score');
const avgScoreElem = document.getElementById('average-score');

const instructionsElem = document.getElementById('instructions');

const playButtonElem = document.getElementById('start-stop');
const resultElem = document.getElementById('result');

playButtonElem.addEventListener('click', gameLogic);
let guesserArr = [0,0];
let result;
let score;
let scoreArr = [];
let avgScore;

function gameLogic() {
    if(playButtonElem.textContent==='START') {
        const startVal = new Date;
        guesserArr[0] = startVal;

        resultElem.textContent = '';
        scoreElem.textContent = 'Exakthet:';
        instructionsElem.textContent = 'Tryck på STOPP när du tror 10 sekunder har passerat!'
        playButtonElem.textContent = 'STOPP';
        playButtonElem.style.backgroundColor = 'rgb(255, 0, 0)';
        
    } else {
        const endVal = new Date;
        guesserArr[1] = endVal;

        result = guesserArr.reduceRight((acc, curr) => acc-curr);

        instructionsElem.textContent = 'Tryck på START!'
        resultElem.textContent = `Ditt resultat är: ${result/1000}s`;
        
        score = result < 10000 ? result/10000 : 10000/result;
        scoreArr.push(score);

        avgScore = scoreArr.reduce((acc, curr) => acc + curr)/scoreArr.length;

        scoreElem.textContent = `Exakthet: ${(score*100).toFixed(1)}%`;
        avgScoreElem.textContent = `Genomsnittlig Exakthet: ${(avgScore*100).toFixed(1)}%`;

        scoreElem.style.color = score < 0.75 ? 'rgb(255, 0, 0)' : score < 0.875 ? 'rgb(255,165,0)' : 'rgb(0, 255, 0)';
        avgScoreElem.style.color = avgScore < 0.75 ? 'rgb(255, 0, 0)' : avgScore < 0.875 ? 'rgb(255,165,0)' : 'rgb(0, 255, 0)';

        playButtonElem.textContent = 'START';
        playButtonElem.style.backgroundColor = 'rgb(0, 255, 0)';
        
    }
}