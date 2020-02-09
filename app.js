// Create Dino Constructor

// Create Dino Objects
const grid = document.getElementById("grid");
const header = document.getElementById("header");
const form = document.getElementById("dino-compare");

let store = {
  showGrid: false,
  dinos: []
};

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
const Card = data => {
  return `<div class="grid-item">
    <h3>${data.species}</h3>
    <img src="${data.img_src}">
      <p class="card-text">${data.fact}</p>
  </div>`;
};

const Grid = ({ dinos ,  showGrid}) => {
  return showGrid ? `${dinos.map(dino => Card(dino)).join("")}` : "";
};

const Header = ({ showGrid }) => {
  return showGrid
    ? `<h3 onclick="hideGrid()" class="backArrow"><i class="arrow left"></i> Back</h3>`
    : `<h2>Natural History Museum</h2> 
<h1>Dinosaurs</h1>
<h3>How do you compare?</h3>`;
};

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
function formSubmitHandler() {
  const form = document.getElementById("dino-compare");
  const human = {
    ishuman: true,
    species: form.elements["name"].value,
    weight: form.elements["weight"].value,
    height:
      parseInt(form.elements["inches"].value) +
      parseInt(form.elements["feet"].value) * 12,
    diet: form.elements["diet"].value,
    img_src: "images/human.png"
  };

  const newState = { ...store };

  let dinosCp = [...store.dinos];
  if (dinosCp[4].ishuman) {
    dinosCp[4] = human;
  } else {
    dinosCp.splice(4, 0, human);
  }
  newState.dinos = dinosCp;
  newState.showGrid = true;
  updateStore(store, newState);
}

function hideGrid() {
  console.log("hide grid");

  const newState = { ...store };
  newState.showGrid = false;
  updateStore(store, newState);

}

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  console.log("updated store: " + JSON.stringify(store));
  render(store);
};

const render = async state => {
  grid.innerHTML = Grid(state);
  form.style.display = state.showGrid ? "none" : "block";
  header.innerHTML = Header(state);
};

// listening for load event
window.addEventListener("load", async function run() {
  dinos = await this.fetch("/dino.json").then(res => res.json());
  updateStore(store, { dinos: dinos.Dinos });
});
