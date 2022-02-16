const paragraph = document.querySelector("#info");
const lifetimeInputField = document.querySelector("#lifetime_input");
const limitInputField = document.querySelector("#limit_input");
const varianceInputField = document.querySelector("#variance_input");
const lookupButton = document.querySelector("#lookup");

const lifetimeP = document.querySelector("#lifetime");
const reduceLifetimeP = document.querySelector("#reduce_lifetime");
const chainSpellP = document.querySelector("#chain_spell");
const orbitingArcP = document.querySelector("#orbiting_arc");
const increaseLifetimeP = document.querySelector("#increase_lifetime");
const phasingArcP = document.querySelector("#phasing_arc");
const totalP = document.querySelector("#total");

const names = ["Reduce Lifetime", "Chain Spell", "Ping-pong Path/Orbiting Arc", "Spiral Arc", "Phasing"];

const defaultInputValues = {
    "lifetime": 40,
    "variance": 0,
    "limit": 5
}


lookupButton.addEventListener("click", () => {

    let lifetime = Number.parseInt(lifetimeInputField.value);
    let variance = Number.parseInt(varianceInputField.value);
    let limit = Number.parseInt(limitInputField.value);


    // compare variables with themselves to check for NaN, and replace with default input values if true;
    checkInputforNaN();

    const jsonArray = [];
    const permutationArray = []

    if (variance <= 0) {
        const JSONFile = `lifetime${lifetime}.json`;
        jsonArray.push(JSONFile);
    } else {
        if (lifetime - variance <= 0) {
            for (let i = 1; i < lifetime + variance + 1; i++) {
                const JSONFile = `lifetime${i}.json`;
                jsonArray.push(JSONFile);
            }
        } else {
            for (let i = lifetime - variance; i < lifetime + variance + 1; i++) {
                const JSONFile = `lifetime${i}.json`;
                jsonArray.push(JSONFile);
            }
        }

    }


    for (let i = 0; i < jsonArray.length; i++) {
        const e = jsonArray[i];
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `./json/${e}`, true);
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    permutationArray.push(JSON.parse(xhr.response));
                    if (i === jsonArray.length - 1) {
                        myFunction(permutationArray, lifetime, variance, limit);
                    }
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);

    }




    /*     var xhttp = new XMLHttpRequest();
        const JSONFile = "reqModPermutations.json";
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
    
                myFunction(this, lifetime, variance, limit);
            }
        };
        xhttp.open("GET", JSONFile, true);
        xhttp.send(); */

    function checkInputforNaN() {
        if (lifetime !== lifetime)
            lifetime = defaultInputValues.lifetime;

        if (variance !== variance) {
            variance = defaultInputValues.variance;
        }

        if (limit !== limit) {
            limit = defaultInputValues.limit;
        }
    }
})




function myFunction(lifetimeArray, lifetimeInput, varianceInput, limitInput) {

    lifetimeP.innerHTML = "";
    reduceLifetimeP.innerHTML = "";
    chainSpellP.innerHTML = "";
    orbitingArcP.innerHTML = "";
    increaseLifetimeP.innerHTML = "";
    phasingArcP.innerHTML = "";
    totalP.innerHTML = "";

    const lifetime = lifetimeInput;
    const totalModifiers = limitInput;
    const variance = varianceInput;
    let target_lifetime_add;

    checkIfVariance();


    const reqModPermutations = lifetimeArray;
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
            lifetimeP.innerHTML = lifetimeP.innerHTML + `${p["Lifetime"]} <br>`;
            reduceLifetimeP.innerHTML = reduceLifetimeP.innerHTML + `${p["Reduce Lifetime"]} <br>`;
            chainSpellP.innerHTML = chainSpellP.innerHTML + `${p["Chain Spell"]} <br>`;
            orbitingArcP.innerHTML = orbitingArcP.innerHTML + `${p["Pingpong Path"]} <br>`;
            increaseLifetimeP.innerHTML = increaseLifetimeP.innerHTML + `${p["Increase Lifetime"]} <br>`;
            phasingArcP.innerHTML = phasingArcP.innerHTML + `${p["Phasing"]} <br>`;
            totalP.innerHTML = totalP.innerHTML + `${p["Total"]} <br>`;
        }
    }
}


