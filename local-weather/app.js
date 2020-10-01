wrapperElem = document.getElementById('wrapper');
locationElem = document.getElementById('location');
tempElem = document.getElementById('temperature');
cloudElem = document.getElementById('cloudy');

fetch('http://api.openweathermap.org/data/2.5/weather?id=656131&units=metric&appid=03fc3ba8312533c3fa33db4b9b18c5f1')
  .then(response => response.json())
  .then(onLoad);

function onLoad(myWeatherObj) {
    locationElem.textContent += ` ${myWeatherObj.name}`;
    tempElem.innerHTML = `Temperatur: ${myWeatherObj.main.temp}&#8451;`
    let cloudiness = myWeatherObj.weather[0].description;
    
    let clouds = {
      "overcast clouds" : {text : "Mulet", bg : "img/overcast.jpg"},
      "broken clouds" : {text : "Brutna moln", bg : "img/broken-clouds-large.jpg"},
      "scattered clouds" : {text : "Spridda moln", bg : "img/scattered-clouds.jpg"},
      "few clouds" : {text : "Enstaka moln", bg : "img/few-clouds.jpg"},
      "clear sky" : {text : "Inga moln", bg : "img/clear-sky.jpg"},
      "mist" : {text : "Dimma", bg : "img/mist.jpg"},
      "default" : {text : `${myWeatherObj.weather[0].description}`, bg : "img/scattered-clouds.jpg"},
    };

    if (clouds[cloudiness] === undefined) {
      cloudiness = "default";
    }

    cloudElem.textContent += clouds[cloudiness].text;
    wrapper.style.backgroundImage = `url(${clouds[cloudiness].bg})`;

    console.log(myWeatherObj);
}


 
