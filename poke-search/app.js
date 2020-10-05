const searchBarElem = document.getElementById('autoComplete');
const searchButtonElem = document.getElementById('search-button');

const wrapper = document.getElementById('wrapper');
const nameElem = document.getElementById('name');
const weightElem = document.getElementById('weight');
const heightElem = document.getElementById('height');
const typeElem = document.getElementById('type');
const abilityElem = document.getElementById('abilities');
const frontImgElem = document.getElementById('front-sprite');
const backImgElem = document.getElementById('back-sprite');

let nameList = [];

searchButtonElem.addEventListener('click', getInfo);
searchBarElem.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButtonElem.click();
  }
});

getAutoCompleteList();

new autoComplete({
  data: {                              // Data src [Array, Function, Async] | (REQUIRED)
    src: nameList
  },

  sort: (a, b) => {                    // Sort rendered results ascendingly | (Optional)
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
  },
  placeHolder: "Input Pokémon name...",     // Place Holder text                 | (Optional)
  selector: "#autoComplete",           // Input field selector              | (Optional)
  threshold: 0,                        // Min. Chars length to start Engine | (Optional)
  debounce: 300,                       // Post duration for engine to start | (Optional)
  searchEngine: "strict",              // Search Engine type/mode           | (Optional)
  resultsList: {                       // Rendered results list object      | (Optional)
    render: true,
    /* if set to false, add an eventListener to the selector for event type
       "autoComplete" to handle the result */
    container: source => {
      source.setAttribute("id", "pokemon_list");
    },
    destination: document.querySelector("#autoComplete"),
    position: "afterend",
    element: "ul"
  },
  maxResults: 5,                         // Max. number of rendered results | (Optional)
  highlight: true,                       // Highlight matching results      | (Optional)
  resultItem: {                          // Rendered result item            | (Optional)
    content: (data, source) => {
      source.innerHTML = data.match;
    },
    element: "li"
  },
  noResults: () => {                     // Action script on noResults      | (Optional)
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_list").appendChild(result);
  },
  onSelection: feedback => {             // Action script onSelection event | (Optional)
    searchBarElem.value = feedback.selection.value;
  }
});



function onLoad(pokeInfo) {

  const sprites = pokeInfo.sprites;

  let typeCount = pokeInfo.types.flat(Infinity).map(x => x = x["type"]["name"]);
  let types = pokeInfo.types.flat(Infinity).map(x => x = x["type"]["name"]).join("/");
  
  let abilityCount = pokeInfo.types.flat(Infinity).map(x => x = x["type"]["name"]).length
  let abilities = pokeInfo.abilities.flat(Infinity).map(x => x = x["ability"]["name"]).join(", ");

  nameElem.textContent = `Name: ${pokeInfo.name.slice(0, 1).toUpperCase() + pokeInfo.name.slice(1, pokeInfo.name.length)}`;
  heightElem.textContent = `Height: ${pokeInfo.height} dm`;
  weightElem.textContent = `Weight: ${pokeInfo.weight} hg`;

  if (typeCount <= 1) {
    typeElem.textContent = `Type: ${types}`;
  } else {
    typeElem.textContent = `Types: ${types}`;
  }
  
  if (abilityCount <= 1) {
    abilityElem.textContent = `Ability: ${abilities}`;
  } else {
    abilityElem.textContent = `Abilities: ${abilities}`;
  }


  frontImgElem.setAttribute('src', sprites.front_default);
  backImgElem.setAttribute('src', sprites.back_default);
  
  console.log(pokeInfo);

}

function getInfo() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchBarElem.value.toLowerCase()}`)
    .then(response => response.json())
    .then(onLoad)
    .catch(() => alert('Please enter valid pokémon name!'));
}

function getAutoCompleteList() {
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1050`)
    .then(response => response.json())
    .then(createArray)
    .catch(() => alert('Please enter valid pokémon name!'));
}

function createArray(pokemon) {
  for (let i = 0; i < pokemon.results.length; i++) {
    nameList.push(pokemon.results[i].name);
  }
  return nameList;
}

