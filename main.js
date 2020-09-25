const API_KEY = "cee4d8f2967818ead1e098e8d5ca145d";
const url_popularMovie =
  "https://api.themoviedb.org/3/movie/popular?api_key=cee4d8f2967818ead1e098e8d5ca145d";
const url_popularTV =
  "https://api.themoviedb.org/3/tv/popular?api_key=cee4d8f2967818ead1e098e8d5ca145d";
const Url_Poster = "https://image.tmdb.org/t/p/w342";

//--------------------------------- FUnction to create the movies table ---------------------

// HELP for ********* function itemsGrid(listUrl, flw_cat, flw_type) ***********************
// here
// listurl: a url which returns a full list of information about movies/tv show example- popularmovie url
// flw_cat: here you have to input the id of div of the section where you want to place all the items.
//         for example if you want to put it in popular movies section whose id in html code is "#flw-popular-mov-wrap" So
//         you will need to enter this parameter as "#flw-popular-mov-wrap".
// flw_type: here you have to input(TV/Movie) wether it is a tv show or a movie.
//           for example if its a movie then you have to enter "Movie"
//           if its a tv show then pass "TV"

// EXAMPLE: itemsGrid(url_popularMovie, "#flw-popular-mov-wrap", "Movie");
// where url_"popularMovie" contains the url of popular movies.
// and "#flw-popular-mov-wrap" is the division where we are gonna put all our movie/tv cards.
// and 'Movie' is the type of media wether a tvshow or a movie.

function itemsGrid(listUrl, flw_cat, flw_type) {
  const flw_wrap = document.querySelector(flw_cat); // Seclecting Division under which we have to append the list

  if (flw_type == "Movie") {
    fetch(listUrl)
      .then((res) => res.json())
      .then((data) => {
        //data.results []
        const popularMovies = data.results;
        const movieBlock = createItemContainer(popularMovies, flw_type);
        flw_wrap.appendChild(movieBlock);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  if (flw_type == "TV") {
    fetch(listUrl)
      .then((res) => res.json())
      .then((data) => {
        //data.results []
        const popularTV = data.results;
        const tvBlock = createItemContainer(popularTV, flw_type);
        flw_wrap.appendChild(tvBlock);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
}

function createItemContainer(items, flw_type) {
  if (flw_type == "Movie") {
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "filmlist-wrap");
    const movieTemplate = moviePoster(items);
    movieElement.innerHTML = movieTemplate;
    return movieElement;
  }

  if (flw_type == "TV") {
    const tvElement = document.createElement("div");
    tvElement.setAttribute("class", "filmlist-wrap");
    const tvTemplate = tvPoster(items);
    tvElement.innerHTML = tvTemplate;
    return tvElement;
  }
}

function moviePoster(movies) {
  return movies.map((movie) => {
    return `<div class="flw-item">
                  <div class="film-poster">
                      <a class="modalBtn">
                      <img src="${
                        Url_Poster + movie.poster_path
                      }" data-movie-id=${
      movie.id
    } class="film-poster-img" title="Movie Name" 
                      alt="Movie Name"/>
                      </a>
                  </div>
                  <div class="mr-film-detail">
                      <h3 class="film-name">
                        <a class="modalBtn">
                        ${movie.title}
                        </a>
                        </h3>
                      <div class="ex-film-info">
                        <span class="film-year">${movie.release_date.substr(
                          0,
                          4
                        )}</span>
                      </div>
                  </div>
                </div>`;
  });
}

function tvPoster(tvItems) {
  return tvItems.map((tv) => {
    return `
                <div class="flw-item">
                  <div class="film-poster">
                      <a class="modalBtn">
                      <img src="${Url_Poster + tv.poster_path}" data-movie-id=${
      tv.id
    } class="film-poster-img" title="Movie Name" 
                      alt="Movie Name"/>
                      </a>
                  </div>
                  <div class="mr-film-detail">
                      <h3 class="film-name">
                        <a class="modalBtn">
                        ${tv.name}
                        </a>
                        </h3>
                      <div class="ex-film-info">
                        <span class="film-year">${tv.first_air_date.substr(
                          0,
                          4
                        )}</span>
                      </div>
                  </div>
                </div>
              `;
  });
}

// ------------------------ Creating Movie Table --------------------------

itemsGrid(url_popularMovie, "#flw-popular-mov-wrap", "Movie");
itemsGrid(url_popularTV, "#flw-popular-tv-wrap", "TV");

// ----------------------------------- POPUP Modal ----------------------------------------------------------

window.onload = function () {
  //get modal element
  var modal = document.getElementById("simpleModal");
  //get open modal button
  var modalBtn = document.querySelectorAll(".flw-item");
  //get close button
  var closeBtn = document.getElementById("closeBtn");

  //listen for open click
  for (const modalBtns of modalBtn) {
    modalBtns.addEventListener("click", openModal);
  }
  //listen for close click
  closeBtn.addEventListener("click", closeModal);
  //listen for outside click
  window.addEventListener("click", clickOutside);

  //function to open modal
  function openModal() {
    modal.style.display = "block";
  }

  //function to close modal
  function closeModal() {
    modal.style.display = "none";
  }

  //function to close modal if clicked outside
  function clickOutside(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }
};

// ------------------------------------------- POPUP modal end -------------------------------------------------

//-------------------- SIDE BAR OPENING SCRIPT -----------------------
$(document).ready(function () {
  $(".sidebar-btn").click(function () {
    $(".header-wrapper").toggleClass("collapse");
  });
});
//-------------------- SIDE BAR CLOSING SCRIPT -----------------------
$(document).ready(function () {
  $(".sidebar-close-btn").click(function () {
    $(".header-wrapper").toggleClass("collapse");
  });
});
