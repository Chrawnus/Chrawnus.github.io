locationElem = document.getElementById('location');
tempElem = document.getElementById('temperature');

fetch('http://api.openweathermap.org/data/2.5/weather?id=656131&units=metric&appid=03fc3ba8312533c3fa33db4b9b18c5f1')
  .then(response => response.json())
  .then(onLoad);

function onLoad(myWeatherObj) {
    locationElem.textContent = `Vädret för: ${myWeatherObj.name}`;
    tempElem.innerHTML = `Temperatur: ${myWeatherObj.main.temp}&#8451;`
    console.log(myWeatherObj);
}


 
