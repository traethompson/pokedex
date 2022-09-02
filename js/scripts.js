let pokemonRepository = (function () {
    let pokemonList =[]
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=575';
    //add display modal
    function showModal(pokemon){
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = ' ';
    //create modal in HTML
      let modal = document.createElement('div');
      modal.classList.add('modal');
    //Close button
      let closeButton = document.createElement('button');
      closeButton.classList.add('close-modal');
      closeButton.innerHTML = 'Close';
      closeButton.addEventListener('click', hideModal);
    //Title
      let titleElement = document.createElement('h1');
      titleElement.innerHTML = pokemon.name;
    //Adding height
      let detailElement = document.createElement('p');
      detailElement.innerHTML ='Height: ' + pokemon.height;
    //Types to be added to the display later, stored as array in API

      // let typeDetail = document.createElement('p');
      // typeDetail.innerHTML = 'Type: ' + pokemon.types;

    //Display Picture
      let pokePic = document.createElement('img');
      pokePic.src = pokemon.imageUrl;
    //Append all
      modal.appendChild(closeButton);
      modal.appendChild(titleElement);
      modal.appendChild(detailElement);
      // modal.appendChild(typeDetail);
      modal.appendChild(pokePic);
      modalContainer.appendChild(modal);
    //set visibility class
      modalContainer.classList.add("is-visible");
    //hide on click
      modalContainer.addEventListener('click', (e) =>{
        let target = e.target;
        if (target===modalContainer){
          hideModal();
        }
      });
    }
  //hide modal
    function hideModal(){
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
  //hide with escape key
    window.addEventListener('keydown', (e)=>{
      let modalContainer = document.querySelector('#modal-container');
      if (e.key==='Escape'&& modalContainer.classList.contains('is-visible')){
        hideModal();
      }
    });
  
    function add(pokemon) {
      //check that pokemon data is valid and push to list
      if(typeof pokemon ==="object" && "name" in pokemon){
        pokemonList.push(pokemon);
      }
      else{
        console.log("invalid pokemon data");
      }
    }
      //creating loading message above the list with new element in div
      function showLoadingMessage(){
        let loadPlacement = document.querySelector('.loading');
        let loadingMsg = document.createElement('h1');
        loadingMsg.innerText = 'Loading...';
        loadPlacement.appendChild(loadingMsg);
      }
      //using removeChild not working, setting value to null
      function hideLoadingMessage(){
        document.querySelector('.loading').innerText = null;
      }

      //load name and details to array
      function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          hideLoadingMessage();
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon); 
          });
        }).catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        })
      }
      //load details
      function loadDetails(item) {
        let url = item.detailsUrl;
        showLoadingMessage();
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          hideLoadingMessage();
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
      }


      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }
        
      function addClickEvent(button, pokemon) {
          button.addEventListener('click', function(e) {
          showDetails(pokemon);
          });
          }

    function addListItem(pokemon){
      //Format list with buttons
      let pokedexPrint = document.querySelector('.pokedex');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('entry');
      listItem.appendChild(button);
      pokedexPrint.appendChild(listItem);
      //allow button to display details
      addClickEvent(button, pokemon);
    }

   
    
      function getAll() {
        return pokemonList;
      }
    
      return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails,
      };
  })();

  //load and display data
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });






