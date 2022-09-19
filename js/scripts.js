let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=575";
  //add display modal
  function showModal(pokemon) {
    //select modal parts
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitle.empty();
    modalBody.empty();
    //Adding name and height
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let heightElement = $("<h2> Height:" + pokemon.height + "</h2>");

    //Display Picture
    let pokePic = $("<img class = 'modal-img' style = 'width:50%'>");
    pokePic.attr("src", pokemon.imageUrl);
    //Append all
    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(pokePic);
  }
  //add function
  function add(pokemon) {
    //check that pokemon data is valid and push to list
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("invalid pokemon data");
    }
  }
  //creating loading message above the list with new element in div
  function showLoadingMessage() {
    let loadPlacement = document.querySelector(".loading");
    let loadingMsg = document.createElement("h1");
    loadingMsg.innerText = "Loading...";
    loadPlacement.appendChild(loadingMsg);
  }
  //using removeChild not working, setting value to null
  function hideLoadingMessage() {
    document.querySelector(".loading").innerText = null;
  }

  //load name and details to array
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
  //load details
  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
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
    button.on("click", function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let list = $(".list-group");
    let listEntry = $("<li class = 'group-list-item'></li>");
    let button = $(
      "<button class='btn btn-primary' data-toggle='modal' data-target='#pokedex'></button>"
    );
    let srButton = $(
      "<button class='btn btn-primary sr-only' data-toggle='modal' data-target='#pokedex'></button>"
    );
    button.text(pokemon.name);
    srButton.text(pokemon.name);
    listEntry.append(button, srButton);
    list.append(listEntry);
    //allow button to display details
    addClickEvent(button, pokemon);
    addClickEvent(srButton, pokemon);
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
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
