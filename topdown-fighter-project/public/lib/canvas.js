export const canvas = document.querySelector('canvas');
canvas.width = 720;
canvas.height = 720;

export const ctx = canvas.getContext('2d');

export const canvasMiddle = {
    x: canvas.width / 2,
    y: canvas.height / 2
};