let promise = fetch('./assets/images/coffee.jpg');


let promise2 = promise.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response.blob();
    }
});

