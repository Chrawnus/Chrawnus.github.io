//const reader = new FileReader();

/* const loadFile = function(e) {	
    console.log(e.target.files)
    image.src = URL.createObjectURL(e.target.files[0]);
}; */


function getDomElements() {
    const nameElem = document.querySelector('#name');
    const sourceElem = document.querySelector('#source');
    const descriptionElem = document.querySelector('#description');
    return { nameElem, sourceElem, descriptionElem };
}

function getData() {
    const name = nameElem.textContent;
    const source = sourceElem.textContent;
    const description = descriptionElem.textContent;
}



const options = {
    method: 'POST'
};
fetch('api', options);

