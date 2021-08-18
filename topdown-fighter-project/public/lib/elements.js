export const canvas = document.querySelector('canvas');
export const killStats = document.querySelector('#kills');
export const deathStat = document.querySelector('#deaths');

canvas.width = window.innerWidth/1.2;
canvas.height = window.innerHeight/1.2;


export const ctx = canvas.getContext('2d');

export const canvasMiddle = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth/1.2;
    canvas.height = window.innerHeight/1.2;
})