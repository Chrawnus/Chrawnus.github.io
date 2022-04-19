export class CanvasClass {
    static canvas = document.querySelector('canvas');
    
    static resizeCanvas() { 
        this.canvas.width = window.innerWidth;
        this.canvas.style.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.height = window.innerHeight;

        const tempWidth = this.currWidth;
        const tempHeight = this.currHeight;

        this.currWidth = window.innerWidth;
        this.currHeight = window.innerHeight;

        this.prevWidth = tempWidth;
        this.prevHeight = tempHeight;

        console.log(this.scaleX, this.scaleY)
    }

    static currWidth = window.innerWidth;
    static currHeight = window.innerHeight;
    static prevWidth = window.innerWidth;
    static prevHeight = window.innerHeight;
    static scaleX = 1;
    static scaleY = 1;

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






