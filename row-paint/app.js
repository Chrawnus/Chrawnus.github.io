let rows = document.getElementsByClassName('row');
const container = document.getElementById('container');
const colorInput = document.getElementById('color-input');
const numberDisplay = document.getElementById('number-display');
const gridInput = document.getElementById('grid-input');



setInterval(() => {
    numberDisplay.textContent = `${gridInput.value}`;
}, 50);

createEventListenerFunction();

gridInput.addEventListener('change', rowsConstructor);

function changeColorFunction(e) {
    const color = colorInput.value;
    const target = e.target.style;
    target.backgroundColor = target.backgroundColor != 'rgb(255, 255, 255)' ? 'rgb(255, 255, 255)' : `${color}`;
    console.log(target.backgroundColor);
}


function rowsConstructor() {

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < Number(gridInput.value**2); i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "row");
        div.style.border = '1px solid #0e0e0e';
        div.style.margin = '0';




        container.appendChild(div);


    }

    container.style.gridTemplateColumns = "auto ".repeat(gridInput.value);
    container.style.gridGap = '0';







    createEventListenerFunction();


}

function createEventListenerFunction() {
    rows = document.getElementsByClassName('row');

    Array.from(rows).forEach(element => {
        element.style.backgroundColor = '#ffffff';
        element.addEventListener('click', changeColorFunction);
    });


}