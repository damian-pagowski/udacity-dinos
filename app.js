
const grid = document.getElementById("grid");
const header = document.getElementById("header");
const form = document.getElementById("dino-compare");
const SORT_WEIGHT = "weight";
const SORT_HEIGHT = "height";
const SORT_ALPHABETIC = "alphabetic";
const SORT_DEFAULT = "default";

let store = {
  showGrid: false,
  creatures: [],
  sorting: SORT_DEFAULT,
  sorted: []
};

const handleCompare = () => {
    const select = document.getElementById("compare");
    const selectValue = select.value;
    const storeCp = {}
    if(selectValue == SORT_HEIGHT){
        sortByHeight()
    }
    else if(selectValue == SORT_WEIGHT){
        sortByWeight()
    }
    else if(selectValue == SORT_ALPHABETIC){
        sortByName()
    }    
    else if(selectValue == SORT_DEFAULT){
        storeCp.sorted = [];
    }
    storeCp.sorting = selectValue;
    updateStore(store, storeCp);
}

const sortBy = (cb) => {
    let sorted = [...store.creatures];
    sorted = sorted.sort(cb)
    updateStore(store, {sorted: sorted});
}

const sortByHeight = () => {
    sortBy((c1, c2) => parseInt(c1.height) - parseInt(c2.height))
}

const sortByWeight = () => {
    sortBy((c1, c2) => parseInt(c1.weight) - parseInt(c2.weight))
}

const sortByName = () => {
    sortBy((a, b) => {
        const nameA = a.species.toUpperCase();
        const nameB = b.species.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
}

const Card = data => {
  return `<div class="grid-item">
    <h3>${data.species}</h3>
    <img src="${data.img_src}">
    ${data.fact ? `<p class="card-text">${data.fact}</p>` : ""}
  </div>`;
};

const Grid = ({ creatures ,  showGrid, sorted}) => {
  return showGrid ? `${(sorted.length > 0 ? sorted : creatures).map(creature => Card(creature)).join("")}` : "";
};

const Header = ({ showGrid, sorting }) => {
  return showGrid
    ? `<h3 onclick="hideGrid()" class="backArrow"><i class="arrow left"></i> Back</h3>
    <select id="compare" class="select-compare" name="compare" onchange="handleCompare()">
    <option value="${SORT_DEFAULT}" ${sorting == SORT_DEFAULT ? " selected ": ""}>Compare...</option>
    <option value="${SORT_HEIGHT}" ${sorting == SORT_HEIGHT ? " selected ": ""}>Height</option>
    <option value="${SORT_WEIGHT}" ${sorting == SORT_WEIGHT ? " selected ": ""}>Weight</option>
    <option value="${SORT_ALPHABETIC}" ${sorting == SORT_ALPHABETIC ? " selected ": ""}">Alphabetic</option>
</select>
    `
    : `<h2>Natural History Museum</h2> 
<h1>Dinosaurs</h1>
<h3>How do you compare?</h3>`;
};

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
  let creaturesCp = [...store.creatures];
  if (creaturesCp[4].ishuman) {
    creaturesCp[4] = human;
  } else {
    creaturesCp.splice(4, 0, human);
  }
  newState.creatures = creaturesCp;
  newState.showGrid = true;
  updateStore(store, newState);
}

function hideGrid() {
  const newState = { ...store };
  newState.showGrid = false;
  updateStore(store, newState);

}

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
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
  updateStore(store, { creatures: dinos.Dinos });
});
