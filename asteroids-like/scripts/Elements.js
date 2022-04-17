
// Various UI elements
export const canvas = document.querySelector('canvas');
canvas.oncontextmenu = function (e) {
    e.preventDefault();
};
resizeCanvas();

// resizes canvas when the browser window is resized.
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth/1.2;
    canvas.height = window.innerHeight/1.3;
})



// Initial resizing of canvas. 
function resizeCanvas() {
    canvas.width = window.innerWidth / 1.2;
    canvas.height = window.innerHeight / 1.3;
}
