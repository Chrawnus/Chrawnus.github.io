const slotContainer = document.getElementById("slot-container");
const lockContainer = document.getElementById("lock-container");


const spinButton = document.getElementById("spinner")

let slotNumbers = 6;

let lockedArray = new Array(slotNumbers);
lockedArray.fill(0);

console.log(lockedArray);

createSlots();


spinButton.addEventListener("click", () => {
    for (let i = 0; i < slotNumbers; i++) {
        if (lockedArray[i] === 0) {
            document.getElementById(`slot-${i}`).textContent = getRandomInt(0, 10);
        }
    }
});


function createSlots() {
    for (let i = 0; i < slotNumbers; i++) {
        const slot = document.createElement("p");
        slot.className = "slot";
        slot.id = `slot-${i}`;
        slot.textContent = getRandomInt(0, 10);
        slotContainer.appendChild(slot);
        const lock = document.createElement("button")
        lock.className = "lock";
        lock.id = `lock-${i}`;
        lock.textContent = "lock";
        lock.addEventListener("click", () => {
            if (lockedArray[i] === 0) {
                lockedArray[i] = 1;
                lock.textContent = "unlock";
                console.log(lockedArray);
            } else {
                lockedArray[i] = 0;
                lock.textContent = "lock";
                console.log(lockedArray);
            }
        })
        lockContainer.appendChild(lock);
    }
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}