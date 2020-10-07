export function getStylizedNumber(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num.toString();
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
