const searchBarElem = document.getElementById('search-bar');
const searchButtonElem = document.getElementById('search-button');

const wrapper = document.getElementById('wrapper');
const nameElem = document.getElementById('name');
const weightElem = document.getElementById('weight');
const heightElem = document.getElementById('height');
const typeElem = document.getElementById('type');
const frontImgElem = document.getElementById('front-sprite');
const backImgElem = document.getElementById('back-sprite');

searchButtonElem.addEventListener('click', getInfo);
searchBarElem.addEventListener("keyup", function (e) { if (e.key === "Enter") {
    e.preventDefault();
    searchButtonElem.click();
    }
  });


function onLoad(pokeInfo) {
    
    const sprites = pokeInfo.sprites;

    console.log(sprites.back_default);

    let types = pokeInfo.types.flat(Infinity).map( x => x = x["type"]["name"]).join("/");

    
    nameElem.textContent = `Name: ${pokeInfo.name.slice(0,1).toUpperCase() + pokeInfo.name.slice(1, pokeInfo.name.length)}`;
    heightElem.textContent = `Height: ${pokeInfo.height} dm`;
    weightElem.textContent = `Weight: ${pokeInfo.weight} hg`;
    typeElem.textContent = `Type(s): ${types}`;
    frontImgElem.setAttribute('src', sprites.front_default);
    backImgElem.setAttribute('src', sprites.back_default);
}

function getInfo() {

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchBarElem.value.toLowerCase()}`)
        .then( response => response.json())
        .then(onLoad)
        .catch(() => alert('Please enter valid pokémon name!'));
        

}