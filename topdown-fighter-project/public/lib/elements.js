export const canvas = document.querySelector('canvas');

export const incHealthButton = document.querySelector('#health');
export const incHealingButton = document.querySelector('#healing-power');
export const incSpeedButton = document.querySelector('#speed');
export const incAttackButton = document.querySelector('#attack');
export const incAttackSpeedButton = document.querySelector('#attack-speed');

export const killStats = document.querySelector('#kills');
export const deathStat = document.querySelector('#deaths');
export const statPoints = document.querySelector('#stat-points');

export const resumeButton = document.querySelector('#resume');
export const saveButton = document.querySelector('#save');
export const loadButton = document.querySelector('#load');


resizeCanvas();

export const ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth/1.2;
    canvas.height = window.innerHeight/1.3;
})

function resizeCanvas() {
    canvas.width = window.innerWidth / 1.2;
    canvas.height = window.innerHeight / 1.3;
}
