const accElem = document.getElementById('score');
const avgAccElem = document.getElementById('average-score');
const instructionsElem = document.getElementById('instructions');
const playButtonElem = document.getElementById('start-stop');
const resultElem = document.getElementById('result');

let guesserArr = [0,0];
let result;
let accuracy;
let accArr = [];
let avgAccuracy;

playButtonElem.addEventListener('click', gameLogic);


function gameLogic() {
    if(playButtonElem.textContent==='START') {
        
        const startVal = new Date;
        
        guesserArr[0] = startVal;

        resultElem.textContent = '';
        
        accElem.textContent = 'Exakthet:';
        
        instructionsElem.textContent = 'Tryck på STOPP när du tror 10 sekunder har passerat!'
        
        playButtonElem.textContent = 'STOPP';
        
        playButtonElem.style.backgroundColor = 'rgb(255, 0, 0)';
        
    } else {
        const endVal = new Date;
        
        guesserArr[1] = endVal;

        result = guesserArr.reduceRight((acc, curr) => acc-curr);

        instructionsElem.textContent = 'Tryck på START!'
        
        resultElem.textContent = `Ditt resultat är: ${result/1000}s`;
        
        accuracy = result < 10000 ? result/10000 : 10000/result;
        
        accArr.push(accuracy);

        avgAccuracy = accArr.reduce((acc, curr) => acc + curr)/accArr.length;

        accElem.textContent = `Exakthet: ${(accuracy*100).toFixed(1)}%`;
        
        avgAccElem.textContent = `Genomsnittlig Exakthet: ${(avgAccuracy*100).toFixed(1)}%`;

        accElem.style.color = accuracy < 0.8 ? 'rgb(255, 0, 0)' : accuracy < 0.9 ? 'rgb(255,165,0)' : 'rgb(0, 255, 0)';
        
        avgAccElem.style.color = avgAccuracy < 0.8 ? 'rgb(255, 0, 0)' : avgAccuracy < 0.9 ? 'rgb(255,165,0)' : 'rgb(0, 255, 0)';

        playButtonElem.textContent = 'START';

        playButtonElem.style.backgroundColor = 'rgb(0, 255, 0)';
        
    }
}