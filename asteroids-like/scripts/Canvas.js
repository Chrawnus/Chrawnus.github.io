export class CanvasClass {
    static canvas = document.querySelector('canvas');
    
    static resizeCanvas() {
        this.canvas.width = window.innerWidth / 1.2;
        this.canvas.height = window.innerHeight / 1.3;
    }
}
// Initial resizing of canvas. 
CanvasClass.resizeCanvas();

// Resize canvas when the browser window is resized.
window.addEventListener('resize', () => {
    CanvasClass.resizeCanvas()
})

// Prevent context menu from appearing when right clicking canvas.
CanvasClass.canvas.oncontextmenu = function (e) {
    e.preventDefault();
};






