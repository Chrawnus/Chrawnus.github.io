const reader = new FileReader();



const imagePreview = document.getElementById('file');




/* const loadFile = function(e) {	
    console.log(e.target.files)
    image.src = URL.createObjectURL(e.target.files[0]);
}; */

imagePreview.addEventListener("change", previewFile)

function previewFile() {
    const image = document.getElementById('preview')
    const reader = new FileReader();
    let imageFile = document.getElementById('file').files[0];
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        image.src = reader.result;
        (function (global) {
                global.localStorage.setItem("imgData", reader.result);
        }(window));
        console.log(window.localStorage.getItem("imgData"))
    }, false);

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
}