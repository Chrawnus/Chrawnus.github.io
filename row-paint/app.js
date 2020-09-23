const rows = document.getElementsByClassName('row');



Array.from(rows).forEach(element => {
    element.style.backgroundColor = '#ffffff';
    element.addEventListener('click', changeColorFunction);
});


function changeColorFunction(e) {
    const target = e.target.style;
    target.backgroundColor = target.backgroundColor == "rgb(0, 0, 0)" ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
    console.log(target.backgroundColor);
}
