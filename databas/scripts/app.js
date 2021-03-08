const reader = new FileReader();



const imagePreview = document.getElementById('file');




/* const loadFile = function(e) {	
    console.log(e.target.files)
    image.src = URL.createObjectURL(e.target.files[0]);
}; */

imagePreview.addEventListener("change", previewFile)

function previewFile() {
    if (fileValidation()) {
        return;
    } else {
        const image = document.getElementById('preview')
        const reader = new FileReader();
        let imageFile = document.getElementById('file').files[0];
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            image.src = reader.result;
            (function (global) {
                global.sessionStorage.setItem("imgData", reader.result);
            }(window));
            console.log(window.sessionStorage.getItem("imgData"))
        }, false);

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    }
}

function fileValidation() {
    const filePath = imagePreview.value;

    // Allowing file type 
    const allowedExtensions =
        /(\.jpg|\.jpeg|\.svg|\.WebP|\.png)$/i;

    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        imagePreview.value = '';
        return;
    }
}

