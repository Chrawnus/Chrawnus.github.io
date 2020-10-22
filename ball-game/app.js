
const canvas = document.getElementById('canvas');

window.requestAnimationFrame(draw);
window.addEventListener("keydown", )


let objBall = {
    x: 300,
    y: 240,
}



function draw() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(objBall.x, objBall.y, 15, 0, Math.PI * 2, true)
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();

        
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function moveFunction(e) {

  }