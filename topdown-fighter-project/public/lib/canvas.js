export const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth/1.2;
canvas.height = window.innerHeight/1.2;


export const ctx = canvas.getContext('2d');

export const canvasMiddle = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener('resize', () => {
    console.log("hi")
    canvas.width = window.innerWidth/1.2;
    canvas.height = window.innerHeight/1.2;
})