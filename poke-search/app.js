const wrapper = document.getElementById('wrapper');
const name = document.getElementById('name');


fetch('https://pokeapi.co/api/v2/pokemon/ditto')
.then(response => response.json())
.then(onLoad);


function onLoad(pokeInfo) {
    console.log(pokeInfo);

    name.textContent += pokeInfo.name;
    
}