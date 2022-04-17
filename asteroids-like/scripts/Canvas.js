export class canvasClass {
    static canvas = document.querySelector('canvas');

    static resizeCanvas() {
        this.canvas.width = window.innerWidth / 1.2;
        this.canvas.height = window.innerHeight / 1.3;
    }
}
// Initial resizing of canvas. 
canvasClass.resizeCanvas();

// Resize canvas when the browser window is resized.
window.addEventListener('resize', () => {
    canvasClass.resizeCanvas()
})

// Prevent context menu from appearing when right clicking canvas.
canvasClass.canvas.oncontextmenu = function (e) {
    e.preventDefault();
};






