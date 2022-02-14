const paragraph = document.querySelector("#info");


const JSONFile = "reqModPermutations.json";
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", JSONFile, true);
xhttp.send();

function myFunction(xml) {
    const names = ["Reduce Lifetime", "Chain Spell", "Ping-pong Path/Orbiting Arc", "Spiral Arc", "Phasing"];
    const mods = [-42, -30, 25, 75, 80];
    const reqModPermutations = JSON.parse(xml.response);

    const lifetime = Number.parseInt(window.prompt("Enter lifetime of projectile"));
    const target_lifetime_add = ((-1) * lifetime - 1);

    const validPermutations = reqModPermutations.filter(permutation => (permutation[0] * mods[0] + permutation[1] * mods[1] + permutation[2] * mods[2] + permutation[3] * mods[3] + permutation[4] * mods[4] === target_lifetime_add));

    const totalModifiers = Number.parseInt(window.prompt(`${validPermutations.length} valid permutations found, please enter a desired max amount of total modifiers`));

    const acceptablePermutations = validPermutations.filter(p => (p[0] + p[1] + p[2] + p[3] + p[4] <= totalModifiers));

    const sortedAcceptablePermutations = acceptablePermutations.sort(function (a, b) {
        return (b[0] * mods[0] + b[1] * mods[1] + b[2] * mods[2] + b[3] * mods[3] + b[4] * mods[4]) - (a[0] * mods[0] + a[1] * mods[1] + a[2] * mods[2] + a[3] * mods[3] + a[4] * mods[4]);
    });

    printPermutations();

    function printPermutations() {
        const asyncPrint = p =>
            new Promise(resolve =>
                setTimeout(
                    () => resolve(printArray(p)),
                    Math.floor(Math.random() * 500)
                )
            );
        for (let i = 0; i < sortedAcceptablePermutations.length; i++) {
            const p = sortedAcceptablePermutations[i];
            asyncPrint(p)
            
        }


        function printArray(p) {
            paragraph.innerHTML = paragraph.innerHTML + `<img src="./img/Spell_lifetime_down.png" alt="${names[0]}"> x ${p[0]}, <img src="./img/Spell_chain_shot.png" alt="${names[1]}"> x ${p[1]}, <img src="./img/Spell_orbit_shot.png" alt="${names[2]}"> x ${p[2]}, <img src="./img/Spell_lifetime.png" alt="${names[3]}"> x ${p[3]}, <img src="./img/Spell_phasing_arc.png" alt="${names[4]}"> x ${p[4]}, total: ${p[0] + p[1] + p[2] + p[3] + p[4]} <br>`;
        }
    }
}




/* 
let reqMods = [0, 0, 0, 0, 0];
let maxCount = 31;
let maxPpCount = 3;
let maxIncreaseCount = 16;
let maxPhasingCount = 16;


for (let i = 0; i < maxCount; i++) {
    reqMods[0] = i;
    for (let j = 0; j < maxCount; j++) {
        reqMods[1] = j;
        for (let k = 0; k < maxPpCount; k++) {
            reqMods[2] = k;
            for (let l = 0; l < maxIncreaseCount; l++) {
                reqMods[3] = l;
                for (let m = 0; m < maxPhasingCount; m++) {
                    reqMods[4] = m;
                    reqModPermutations.push([i, j, k, l, m]);
                }
            }
        }
    }
}

for (let i = 0; i < reqModPermutations.length; i++) {
    const element = reqModPermutations[i];
    if (element[0] * mods[0] + element[1] * mods[1] + element[2] * mods[2] + element[3] * mods[3] + element[4] * mods[4] >= 0) {
        reqModPermutations.splice(i, 1);
        i--;
    }

}


let sortedReqModPermutations = reqModPermutations.sort(function (a, b) {
    return (b[0] * mods[0] + b[1] * mods[1] + b[2] * mods[2] + b[3] * mods[3] + b[4] + mods[4]) - (a[0] * mods[0] + a[1] * mods[1] + a[2] * mods[2] + a[3] * mods[3] + a[4] + mods[4]);
});


console.log(sortedReqModPermutations); */



