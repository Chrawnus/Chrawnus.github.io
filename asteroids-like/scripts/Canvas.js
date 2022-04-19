export class CanvasClass {
    static canvas = document.querySelector('canvas');
    
    static resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
// Initial resizing of canvas. 
CanvasClass.resizeCanvas();

window.addEventListener('resize', () => {
      CanvasClass.resizeCanvas()
})

// Prevent context menu from appearing when right clicking canvas.
CanvasClass.canvas.oncontextmenu = function (e) {
    e.preventDefault();
};






