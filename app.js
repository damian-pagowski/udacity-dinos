
    // Create Dino Constructor


    // Create Dino Objects


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
    return `<div class="card">
              <img src="${data.img_src}" class="card-img-top img-fluid">
              <div class="card-body">
              <ul class="list-group list-group-flush">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
              </div>
          </div>`;
  };
  
  // create content
  const App = state => {
    return `
          ${Navbar()}
          <header></header>
          <main>
             
              <section>
                  <h1 class="display-4 text-center my-4">Astronomy Picture of the Day</h1>
                  <p class="mb-4">
                      One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                      the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                      This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                      applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                      explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                      but generally help with discoverability of relevant imagery.
                  </p>
                  ${ImageOfTheDay(state)}
              </section>
              <section id="images">
              ${Jumbotron(roverSelect(state), RoverDetails(state))}
              ${Photos(state)}
              </section>
  
          </main>
          <footer></footer>
      `;
  };
        // Add tiles to DOM
        const updateStore = (store, newState) => {
            store = Object.assign(store, newState);
            render(root, store);
          };
          
          const render = async (root, state) => {
            root.innerHTML = App(state);
          };
    // Remove form from screen


// On button click, prepare and display infographic

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
    getPhotoDataFromRover(store);
  });
