export const canvas = document.querySelector('canvas');

export const incHealthButton = document.querySelector('#health');
export const incHealingButton = document.querySelector('#healing-power');
export const incSpeedButton = document.querySelector('#speed');
export const incAttackButton = document.querySelector('#attack');
export const incAttackSpeedButton = document.querySelector('#attack-speed');

export const killStats = document.querySelector('#kills');
export const deathStat = document.querySelector('#deaths');
export const statPoints = document.querySelector('#stat-points');

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