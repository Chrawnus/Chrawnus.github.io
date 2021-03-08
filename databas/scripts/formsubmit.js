const image = document.getElementById('output');

const resultsList = document.getElementById('results')
new URLSearchParams(window.location.search).forEach((value,
    name) => {
    resultsList.append(`${name}: ${value}`)
    resultsList.append(document.createElement('br'))
})


image.src = window.localStorage.getItem("imgData");




