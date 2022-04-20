export class CanvasClass {
    static canvas = document.querySelector('#canvas-game');
    static menu = document.querySelector('#canvas-menu');

}


// Prevent context menu from appearing when right clicking canvas.
CanvasClass.canvas.oncontextmenu = function (e) {
    e.preventDefault();
};

CanvasClass.menu.oncontextmenu = function (e) {
    e.preventDefault();
};









