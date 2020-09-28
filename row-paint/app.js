const toolbarElement = document.getElementById("toolbar");
const containerElement = document.getElementById("container");
const colors = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
let rowCount = 20;

let selectedColorElement;

colors.map( color => {
 let colorElement = document.createElement('a');
 colorElement.href = '#';
 colorElement.classList.add('color');
 colorElement.style.backgroundColor = color;
 colorElement.addEventListener('click', onSelectColor);

 toolbarElement.appendChild(colorElement);

});

while (rowCount) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.addEventListener('click', onPaint);
    containerElement.appendChild(row);
    rowCount--;
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
    e.target.style.backgroundColor = selectedColorElement.style.backgroundColor;
}
