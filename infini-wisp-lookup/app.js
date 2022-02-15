const paragraph = document.querySelector("#info");
const lifetimeInputField = document.querySelector("#lifetime");
const limitInputField = document.querySelector("#limit");
const varianceInputField = document.querySelector("#variance");
const lookupButton = document.querySelector("#lookup");

const names = ["Reduce Lifetime", "Chain Spell", "Ping-pong Path/Orbiting Arc", "Spiral Arc", "Phasing"];

const defaultInputValues = {
    "lifetime": 40,
    "variance": 7,
    "limit": 5
}

var xhttp = new XMLHttpRequest();
lookupButton.addEventListener("click", () => {
    const JSONFile = "reqModPermutations.json";


    let lifetime = Number.parseInt(lifetimeInputField.value);
    let variance = Number.parseInt(varianceInputField.value);
    let limit = Number.parseInt(limitInputField.value);

    // compare variables with themselves to check for NaN, and replace with default input values if true;

    if (lifetime !== lifetime)
    
        lifetime = defaultInputValues.lifetime;
        
    if (variance !== variance) {
        variance = defaultInputValues.variance;
    }

    if (limit !== limit) {
        limit = defaultInputValues.limit;
    }



    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            myFunction(this, lifetime, variance, limit);
        }
    };
    xhttp.open("GET", JSONFile, true);
    xhttp.send();
})





function myFunction(xml, lifetimeInput, varianceInput, limitInput) {

    paragraph.innerHTML = "";

    const lifetime = lifetimeInput;
    const totalModifiers = limitInput;
    const variance = varianceInput;
    let target_lifetime_add;

    checkIfVariance();


    const reqModPermutations = JSON.parse(xml.response);

    let acceptablePermutations;
    getValidPermutations();

    printPermutations();

    function getValidPermutations() {
        let validPermutations = [];
        if (target_lifetime_add.length > 1) {
            
            for (let i = 0; i < target_lifetime_add.length; i++) {
                const lifetime_add = target_lifetime_add[i];

                validPermutations.push(...reqModPermutations.filter(permutation => (permutation[0]["lifetime_add"] === lifetime_add)).flat());

            }
            validPermutations.sort(function (a, b) {
                return a["Total"] - b["Total"];
            })
            acceptablePermutations = validPermutations.slice(0, totalModifiers);
        } else {
            validPermutations = reqModPermutations.filter(permutation => (permutation[0]["lifetime_add"] === target_lifetime_add)).flat();
            acceptablePermutations = validPermutations.slice(0, totalModifiers);
        }
        return validPermutations;
    }

    function checkIfVariance() {
        if (variance <= 0) {
            target_lifetime_add = ((-1) * lifetime - 1);
        } else {
            target_lifetime_add = [];
            for (let i = -variance; i < variance; i++) {
                const newLifetime = lifetime + i
                target_lifetime_add.push(((-1) * newLifetime));
            }
        }
    }

    function printPermutations() {
        const asyncPrint = p =>
            new Promise(resolve =>
                setTimeout(
                    () => resolve(printArray(p)), 500
                )
            );
        
        for (let i = 0; i < acceptablePermutations.length; i++) {
            const p = acceptablePermutations[i];
            asyncPrint(p)

        }


        function printArray(p) {
            paragraph.innerHTML = paragraph.innerHTML + `Lifetime: ${(-1) * p["lifetime_add"] - 1}, <img src="./img/Spell_lifetime_down.png" alt="${names[0]}"> x ${p["Reduce Lifetime"]}, <img src="./img/Spell_chain_shot.png" alt="${names[1]}"> x ${p["Chain Spell"]}, <img src="./img/Spell_orbit_shot.png" alt="${names[2]}"> x ${p["Pingpong Path"]}, <img src="./img/Spell_lifetime.png" alt="${names[3]}"> x ${p["Increase Lifetime"]}, <img src="./img/Spell_phasing_arc.png" alt="${names[4]}"> x ${p["Phasing"]}, total: ${p["Total"]} <br>`;
        }
    }
}





/* const reqMods = [0, 0, 0, 0, 0];
const maxCount = 31;
const maxPpCount = 3;
const maxIncreaseCount = 16;
const maxPhasingCount = 16;
const mods = [-42, -30, 25, 75, 80];
const reqModPermutations = [];

console.log("building initial array of objects");
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
                    const lifetime_add = i * mods[0] + j * mods[1] + k * mods[2] + l * mods[3] + m * mods[4];
                    const total = i + j + k + l + m;
                    reqModPermutations.push({
                        "Reduce Lifetime": i,
                        "Chain Spell": j,
                        "Pingpong Path": k,
                        "Increase Lifetime": l,
                        "Phasing": m,
                        "Total": total,
                        "lifetime_add": lifetime_add,
                    });
                }
            }
        }
    }
}

console.log("Removing positive lifetime_add");
for (let i = 0; i < reqModPermutations.length; i++) {
    const element = reqModPermutations[i];
    if (element["lifetime_add"] >= 0) {
        reqModPermutations.splice(i, 1);
        i--;
    }

}

console.log("Sorting permutations by lifetime_add");
let sortedReqModPermutations = reqModPermutations.sort(function (a, b) {
    return b["lifetime_add"] - a["lifetime_add"];
});


console.log("chunking array");
let chunkedSortedPermutations = []
let i = 0;
while (sortedReqModPermutations.length > 0) {
    chunkedSortedPermutations.push(sortedReqModPermutations.filter(p => p["lifetime_add"] === sortedReqModPermutations[0]["lifetime_add"]).sort(function (a, b) {
        return a["Total"] - b["Total"];
    }));
    sortedReqModPermutations.splice(0, chunkedSortedPermutations[chunkedSortedPermutations.length-1].length);
    i++;

}

console.log(chunkedSortedPermutations); */



