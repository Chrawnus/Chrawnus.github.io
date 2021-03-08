const image = document.getElementById('output');

let imgData = window.localStorage.getItem("imgData")

let base64str = imgData.split('base64,')[1];
let decoded = atob(base64str);

console.log("FileSize: " + decoded.length);


const resultsList = document.getElementById('results')
new URLSearchParams(window.location.search).forEach((value,
    name) => {
    resultsList.append(`${name}: ${value}`)
    resultsList.append(document.createElement('br'))
})


image.src = imgData;




