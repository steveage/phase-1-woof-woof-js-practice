const allPups = [];
const GOOD_DOG = "Good Dog!";
const BAD_DOG = "Bad Dog!";
const DOGS_URL = "http://localhost:3000/pups";
document.addEventListener("DOMContentLoaded", loadPups);

function loadPups() {
    fetch(DOGS_URL)
    .then(response => response.json())
    .then(pups => displayPups(pups));
    addButtonClickListener();
}

function displayPups(pups) {
    Array.prototype.push.apply(allPups, pups);
    let barUI = document.getElementById("dog-bar");
    allPups.forEach(pup => displayPup(pup, barUI));
}

function displayPup(pup, barUI) {
    barUI.appendChild(getPupSpanUI(pup));
}

function getPupSpanUI(pup) {
    const spanUI = document.createElement('span');
    spanUI.innerText = pup.name;
    spanUI.addEventListener('click', handleSpanUiClick)
    return spanUI;
}

function handleSpanUiClick(event) {
    const pup = findPup(event.target.innerText); // allPups.find(pup => pup.name === event.target.innerText);
    displayPupInfo(pup);
}

function findPup(name) {
    return allPups.find(pup => pup.name === name);
}

function displayPupInfo(pup) {
    document.getElementById("pup-name").innerText = pup.name;
    document.getElementById("pup-image").setAttribute('src', pup.image);
    getButtonUI().innerText = pup.isGoodDog? GOOD_DOG : BAD_DOG;
}

function addButtonClickListener() {
    document.getElementById("pup-isGood").addEventListener("click", handleDogButtonClickEvent);
}

function handleDogButtonClickEvent() {
    changeButtonText();
    saveDogData();
}

function changeButtonText() {
    const dogIsGood = getButtonUI().innerText;
    getButtonUI().innerText = dogIsGood === GOOD_DOG? BAD_DOG : GOOD_DOG;
}

function getButtonUI() {
    return document.getElementById("pup-isGood")
}

function saveDogData() {
    const isGood = getButtonUI().innerText === GOOD_DOG;
    const pupName = document.getElementById("pup-name").innerText;
    const pup = findPup(pupName);
    pup.isGoodDog = isGood;
    patchPup(pup);
}

function patchPup(pup) {
    const headers =  {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    const body = JSON.stringify(pup);
    const url = `${DOGS_URL}/${pup.id}`;
    const config = {
        method: "PATCH",
        headers: headers,
        body: body
    }
    fetch(url, config);
}