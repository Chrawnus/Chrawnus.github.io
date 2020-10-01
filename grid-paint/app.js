let rows = document.getElementsByClassName('row');
const container = document.getElementById('container');
const colorInput = document.getElementById('color-input');
const numberDisplay = document.getElementById('number-display');
const gridInput = document.getElementById('grid-input');

let color = 'rgb(0, 0, 0)';

setInterval(() => {
    numberDisplay.textContent = `${gridInput.value}`;
    container.style.width = `${container.getBoundingClientRect().height}px`;
}, 50);

createEventListenerFunction();
gridConstructor();

gridInput.addEventListener('change', gridConstructor);


colorInput.addEventListener("change", hexToRgbConverter);


function hexToRgbConverter()  {
    colorArr = colorInput.value.split(/(\w\w)/).filter(x => /\w\w/.test(x)).map(x => parseInt(x, 16));
    return color = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
}


function changeColorFunction(e) {
    (e.buttons === 1 && e.ctrlKey) ?
        e.target.style.backgroundColor = "rgb(255, 255, 255)" : (e.buttons === 1) ? 
            e.target.style.backgroundColor = color :  null;
}

function gridConstructor() {

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < Number(gridInput.value ** 2); i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "row");

        div.style.border = '1px solid #aaaaaa';
        div.style.margin = '0';

        container.appendChild(div);
    }

    container.style.gridTemplateColumns = `repeat(${gridInput.value}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridInput.value}, 1fr)`;
    container.style.gridAutoRows = `1fr`;
    container.style.gridColumnGap = "0px";
    container.style.gridRowGap = "0px";

    createEventListenerFunction();
}

function createEventListenerFunction() {
    rows = document.getElementsByClassName('row');

    Array.from(rows).forEach(element => {
        element.style.backgroundColor = '#ffffff';
        element.addEventListener('mousemove', changeColorFunction);
    });

}
