//const reader = new FileReader();


/* const loadFile = function(e) {	
    console.log(e.target.files)
    image.src = URL.createObjectURL(e.target.files[0]);
}; */

const { nameElem, sourceElem, descriptionElem, submitElem, imageFormElem } = getDomElements(); 

imageFormElem.addEventListener('submit', () => {
    const name = nameElem.value; 
    const source = sourceElem.value; 
    const description = descriptionElem.value;
    
    const data = { name, source, description }



    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(data);
    fetch('/', options);
    
})

function getDomElements() {
    const nameElem = document.querySelector('#name');
    const sourceElem = document.querySelector('#source');
    const descriptionElem = document.querySelector('#description');
    const imageFormElem = document.querySelector('#image-form');
    const submitElem = document.querySelector('#submit-button')
    return { nameElem, sourceElem, descriptionElem, submitElem, imageFormElem };
}





