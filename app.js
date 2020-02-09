const grid = document.getElementById("grid");
const header = document.getElementById("header");
const form = document.getElementById("dino-compare");
const SORT_WEIGHT = "weight";
const SORT_HEIGHT = "height";
const SORT_ALPHABETIC = "alphabetic";
const SORT_DEFAULT = "default";

// store
let store = {
  showGrid: false,
  creatures: [],
  sorting: SORT_DEFAULT,
  sorted: []
};

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(store);
};

//  Data Models
class Creature {
  constructor({
    species = "",
    weight = "",
    height = "",
    diet = "",
    img_src = ""
  }) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.img_src = img_src;
  }

  compareHeight = creature => parseInt(this.height) - parseInt(creature.height);

  compareWeight = creature => parseInt(this.weight) - parseInt(creature.weight);

  compareName = creature => {
    const nameA = this.species.toUpperCase();
    const nameB = creature.species.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
}

class Dino extends Creature {
  constructor({
    species = "",
    weight = "",
    height = "",
    diet = "",
    where = "",
    when = "",
    fact = "",
    img_src = ""
  }) {
    super({
      species,
      weight,
      height,
      diet,
      img_src
    });
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

class Human extends Creature {
  constructor({
    species = "",
    weight = "",
    height = "",
    diet = "",
    img_src = "images/human.png",
    ishuman = true
  }) {
    super({
      species,
      weight,
      height,
      diet,
      img_src
    });

    this.ishuman = ishuman;
  }
}

// event handlers
const handleCompare = () => {
  const select = document.getElementById("compare");
  const selectValue = select.value;
  const storeCp = {};
  let sorted = [...store.creatures];

  if (selectValue == SORT_HEIGHT) {
    sorted.sort((a, b) => a.compareHeight(b));
  } else if (selectValue == SORT_WEIGHT) {
    sorted.sort((a, b) => a.compareWeight(b));
  } else if (selectValue == SORT_ALPHABETIC) {
    sorted.sort((a, b) => a.compareName(b));
  }
  storeCp.sorting = selectValue;
  storeCp.sorted = sorted;
  updateStore(store, storeCp);
};

function formSubmitHandler() {
  const form = document.getElementById("dino-compare");
  const formData = {
    species: form.elements["name"].value,
    weight: form.elements["weight"].value,
    height:
      parseInt(form.elements["inches"].value) +
      parseInt(form.elements["feet"].value) * 12,
    diet: form.elements["diet"].value
  };
  const human = new Human(formData);
  const newState = { ...store };
  let creaturesCp = [...store.creatures];
  if (creaturesCp[4].ishuman) {
    creaturesCp[4] = human;
  } else {
    creaturesCp.splice(4, 0, human);
  }
  newState.creatures = creaturesCp;
  newState.sorted = creaturesCp;
  newState.showGrid = true;
  updateStore(store, newState);
}

function hideGrid() {
  const newState = { ...store };
  newState.showGrid = false;
  updateStore(store, newState);
}

// UI components
const Card = data => {
  return `<div class="grid-item">
    <h3>${data.species}</h3>
    <img src="${data.img_src}">
    ${data.fact ? `<p class="card-text">${data.fact}</p>` : ""}
  </div>`;
};

const Grid = ({ showGrid, sorted }) => {
  return showGrid ? `${sorted.map(creature => Card(creature)).join("")}` : "";
};

const Header = ({ showGrid, sorting }) => {
  return showGrid
    ? `<h3 onclick="hideGrid()" class="backArrow"><i class="arrow left"></i> Back</h3>
    <select id="compare" class="select-compare" name="compare" onchange="handleCompare()">
    <option value="${SORT_DEFAULT}" ${
        sorting == SORT_DEFAULT ? " selected " : ""
      }>Compare...</option>
    <option value="${SORT_HEIGHT}" ${
        sorting == SORT_HEIGHT ? " selected " : ""
      }>Height</option>
    <option value="${SORT_WEIGHT}" ${
        sorting == SORT_WEIGHT ? " selected " : ""
      }>Weight</option>
    <option value="${SORT_ALPHABETIC}" ${
        sorting == SORT_ALPHABETIC ? " selected " : ""
      }">Alphabetic</option>
</select>
    `
    : `<h2>Natural History Museum</h2> 
<h1>Dinosaurs</h1>
<h3>How do you compare?</h3>`;
};

// render cmponents

const render = async state => {
  grid.innerHTML = Grid(state);
  form.style.display = state.showGrid ? "none" : "block";
  header.innerHTML = Header(state);
};

// listening for load event
window.addEventListener("load", async function run() {
  dinos = await this.fetch("/dino.json").then(res => res.json());
  const dinosObjects = dinos.Dinos.map(d => new Dino(d));
  updateStore(store, { creatures: dinosObjects });
});
