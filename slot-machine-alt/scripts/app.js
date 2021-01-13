const slotContainer = document.getElementById("slot-container");
const lockContainer = document.getElementById("lock-container");


const spinButton = document.getElementById("spinner")



let slotNumbers = 6;

let lockedArray = new Array(slotNumbers);
lockedArray.fill(0);

createSlots();

spinButton.addEventListener("click", () => {
    console.clear();
    for (let i = 0; i < slotNumbers; i++) {
        let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const rotations = 10;
        const slot = document.getElementById(`slot-${i}`);


        if (lockedArray[i] === 0) {
            const number = getRandomInt(0, 10);
            for (let j = 0; j < 10; j++) {
                const slotNumber = document.getElementById(`${i}-${j}`);
                let y_pos = -slotNumber.style.top.slice(0, -2);
                y_pos = Number(y_pos);
                for (let k = 0; k < 10; k++) {
                    //y_pos += 0.11;
                    console.log(y_pos);
                    setTimeout(() => {
                        slotNumber.style.top = `${y_pos}px`;
                    }, (getRandomInt(10, 16) + i * 2) * (j * j * 0.05 + 1));
                }
            }
        }
    }
});


function createSlots() {
    for (let i = 0; i < slotNumbers; i++) {
        const slot = document.createElement("ul");
        for (let j = 0; j < 10; j++) {
            const number = document.createElement("li");
            number.textContent = `${j}`
            number.id = `${i}-${j}`;
            number.style.position = `absolute`;
            number.style.margin = "2rem"
            number.style.top = `${(j - 1) * 55}px`
            number.style.left = `${-75 + (i * 14)}px`
            slot.appendChild(number);
        }
        slot.className = "slot";
        slot.id = `slot-${i}`;



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