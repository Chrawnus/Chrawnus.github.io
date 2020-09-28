const toolbarElement = document.getElementById("toolbar");
const containerElement = document.getElementById("container");
const colors = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
let rowCount = 32;
let gridCount = rowCount**2;

let selectedColorElement;


containerElement.style.width = `${containerElement.getBoundingClientRect().height}px`;

colors.map( color => {
 let colorElement = document.createElement('a');
 colorElement.href = '#';
 colorElement.classList.add('color');
 colorElement.style.backgroundColor = color;
 colorElement.style.flexBasis = 100;
 colorElement.addEventListener('click', onSelectColor);

 toolbarElement.appendChild(colorElement);

});


while (gridCount) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', onPaint);
    containerElement.appendChild(cell);

    containerElement.style.gridTemplateColumns = `repeat(${rowCount}, 1fr)`;
    containerElement.style.gridTemplateRows = `repeat(${rowCount}, 1fr)`;
    gridCount--;
}



function onSelectColor(e) {
    e.preventDefault();

    if (selectedColorElement) {
        selectedColorElement.classList.remove('--selected');
    }

    selectedColorElement = e.target;
    selectedColorElement.classList.add('--selected');
}

function onPaint(e) {
    if (selectedColorElement) {
        e.target.style.backgroundColor = e.target.style.backgroundColor === selectedColorElement.style.backgroundColor ? 
        'rgb(0, 0, 0)' : selectedColorElement.style.backgroundColor;
        
    }
}
