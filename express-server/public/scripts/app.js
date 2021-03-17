if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        const { latElem, lonElem } = getDomElements();
        const { lat, lon } = getPositionVariables(position);
        displayPositionInDOM(latElem, lat, lonElem, lon);
        console.log(position); 

        await fetchLocationData(lat, lon);
    });
} else {
    console.log('geolocation not available');
}

function getDomElements() {
    const latElem = document.querySelector('#latitude');
    const lonElem = document.querySelector('#longitude');
    return { latElem, lonElem };
}

function getPositionVariables(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    return { lat, lon };
}

function displayPositionInDOM(latElem, lat, lonElem, lon) {
    latElem.textContent = lat;
    lonElem.textContent = lon;
}

async function fetchLocationData(lat, lon) {
    const data = { lat, lon };
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('api', options);
    const jsonData = await response.json();
    console.log(jsonData);
}