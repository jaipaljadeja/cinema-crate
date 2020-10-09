const tmdbKey = "cee4d8f2967818ead1e098e8d5ca145d";
const omdbKey = "e3651111";
let imdb;
const Url_Poster = "https://image.tmdb.org/t/p/w342";
let mCurrPage = 1;
let mNextPage;
let mPrevPage;
let tCurrPage = 1;
let tNextPage;
let tPrevPage;



function generateTmdbUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=cee4d8f2967818ead1e098e8d5ca145d`;
    return url;
}


function generateOmdbUrl(imdb_id) {
    const url = `http://www.omdbapi.com/?i=${imdb_id}&apikey=e3651111`;
    return url;
}


//---------------------- SEARCH BUTTON ---------------------------




// function renderSearch(data) {
//     // const flw_wrap = document.querySelector(flw_cat);
//     const item = data.results;
//     console.log("Media type : " + item.media_type);

// }

// function requestSearch(url, onComplete, onError) {
//     fetch(url)
//         .then((res) => res.json())
//         .then(onComplete)
//         .catch(onError);
// }



// function handleError(error) {
//     console.log("Error: ", error);
// }





//--------------------------------- FUnction to create the movies table ------------------------
// HELP for ********* function itemsGrid(listUrl, flw_cat, flw_type) ***********************
// here
// listurl:(URL) a url which returns a full list of information about movies/tv show example- popularmovie url
// flw_cat: (ID OF SECTION DIV) here you have to input the id of div of the section where you want to place all the items.
//         for example if you want to put it in popular movies section whose id in html code is "#flw-popular-mov-wrap" So
//         you will need to enter this parameter as "#flw-popular-mov-wrap".
// flw_type: (TYPE Movie or TV )here you have to input(TV/Movie) wether it is a tv show or a movie.
//           for example if its a movie then you have to enter "Movie"
//           if its a tv show then pass "TV"

// EXAMPLE: itemsGrid(url_popularMovie, "#flw-popular-mov-wrap", "Movie");
// where url_"popularMovie" contains the url of popular movies.
// and "#flw-popular-mov-wrap" is the division where we are gonna put all our movie/tv cards.
// and 'Movie' is the type of media wether a tvshow or a movie.

function fetchImdbId(url, type) {
    // fetching IMDB id for a movie
    if (type == "Movie") {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const imageItem = document.querySelector(
                    `[data-movie-id="${data.id}"]`
                );
                imageItem.setAttribute("imdb-id", `${data.imdb_id}`);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }
    //fetching IMDB for a tv show
    if (type == "TV") {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const imageItem = document.querySelector(`[data-tv-id="${data.id}"]`);
                imageItem.setAttribute("imdb-id", `${data.imdb_id}`);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }
}

function getImdbId_Movie(tmdbId, type) {
    if (type == "Movie") {
        const path = `/movie/${tmdbId}/external_ids`;
        url = generateTmdbUrl(path);
        fetchImdbId(url, type);
    }

    if (type == "TV") {
        const path = `/tv/${tmdbId}/external_ids`;
        url = generateTmdbUrl(path);
        fetchImdbId(url, type);
    }
}

function moviePoster(movies) {
    const movieCard = document.createElement('div');
    movieCard.classList = 'cards';

    movies.map((movie) => {
        if (movie.poster_path) {

            const id = movie.id;
            getImdbId_Movie(id, "Movie");

            const flwItem = document.createElement('div');
            flwItem.classList = 'flw-item';

            const filmPosterDiv = document.createElement('div');
            filmPosterDiv.classList = 'film-poster';
            flwItem.appendChild(filmPosterDiv);


            const posterModalBtnA = document.createElement('a');
            posterModalBtnA.classList = 'modalBtn';
            filmPosterDiv.appendChild(posterModalBtnA);

            const img = document.createElement('img');
            img.src = Url_Poster + movie.poster_path;
            img.classList = "film-poster-img";
            img['title'] = "Movie Name";
            img['alt'] = "Movie Name";
            img.setAttribute("data-movie-id", `${movie.id}`);
            img.setAttribute("type", "Movie");
            posterModalBtnA.appendChild(img);

            const mrFilmDetail = document.createElement('div');
            mrFilmDetail.classList = 'mr-film-detail';
            flwItem.appendChild(mrFilmDetail);

            const titleH3 = document.createElement('h3');
            titleH3.classList = 'film-name';
            mrFilmDetail.appendChild(titleH3);

            const titleModalBtnA = document.createElement('a');
            titleModalBtnA.classList = 'modalBtn';
            titleModalBtnA.innerHTML = movie.title;
            titleH3.appendChild(titleModalBtnA);

            const exFilmInfo = document.createElement('div');
            exFilmInfo.classList = 'ex-film-info';
            mrFilmDetail.appendChild(exFilmInfo);

            const filmYearSpan = document.createElement('span');
            filmYearSpan.classList = 'film-year';
            filmYearSpan.innerHTML = movie.release_date.substr(0, 4);
            exFilmInfo.appendChild(filmYearSpan);

            movieCard.appendChild(flwItem);
        }
    });
    return movieCard;
}


function tvPoster(tvItems) {
    const tvCard = document.createElement('div');
    tvCard.classList = 'cards';

    tvItems.map((tv) => {

        if (tv.poster_path) {
            const id = tv.id;
            getImdbId_Movie(id, "TV");


            const flwItem = document.createElement('div');
            flwItem.classList = 'flw-item';

            const filmPosterDiv = document.createElement('div');
            filmPosterDiv.classList = 'film-poster';
            flwItem.appendChild(filmPosterDiv);


            const posterModalBtnA = document.createElement('a');
            posterModalBtnA.classList = 'modalBtn';
            filmPosterDiv.appendChild(posterModalBtnA);

            const img = document.createElement('img');
            img.src = Url_Poster + tv.poster_path;
            img.classList = "film-poster-img";
            img['title'] = "TV";
            img['alt'] = "TV";
            img.setAttribute("data-tv-id", `${tv.id}`);
            img.setAttribute("type", "TV");
            posterModalBtnA.appendChild(img);

            const mrFilmDetail = document.createElement('div');
            mrFilmDetail.classList = 'mr-film-detail';
            flwItem.appendChild(mrFilmDetail);

            const titleH3 = document.createElement('h3');
            titleH3.classList = 'film-name';
            mrFilmDetail.appendChild(titleH3);

            const titleModalBtnA = document.createElement('a');
            titleModalBtnA.classList = 'modalBtn';
            titleModalBtnA.innerHTML = tv.name;
            titleH3.appendChild(titleModalBtnA);

            const exFilmInfo = document.createElement('div');
            exFilmInfo.classList = 'ex-film-info';
            mrFilmDetail.appendChild(exFilmInfo);

            const filmYearSpan = document.createElement('span');
            filmYearSpan.classList = 'film-year';
            filmYearSpan.innerHTML = tv.first_air_date.substr(0, 4);
            exFilmInfo.appendChild(filmYearSpan);

            tvCard.appendChild(flwItem);

        }
    });
    return tvCard;
}

function createItemContainer(items, flw_type) {
    if (flw_type == "Movie") {
        const movieElement = document.createElement("div");
        movieElement.setAttribute("class", "filmlist-wrap");
        movieElement.appendChild(moviePoster(items));
        return movieElement;
    }

    if (flw_type == "TV") {
        const tvElement = document.createElement("div");
        tvElement.setAttribute("class", "filmlist-wrap");
        tvElement.appendChild(tvPoster(items));;
        return tvElement;
    }
}

function itemsGrid(listUrl, flw_cat, flw_type) {
    const flw_wrap = document.querySelector(flw_cat); // Seclecting Division under which we have to append the list

    if (flw_type == "Movie") {
        fetch(listUrl)
            .then((res) => res.json())
            .then((data) => {
                //data.results []
                const allMovies = data.results;
                const mPagination = document.getElementById('movie-pagination');
                mPagination.setAttribute("movie-total-page", data.total_pages);
                const movieBlock = createItemContainer(allMovies, flw_type);
                flw_wrap.appendChild(movieBlock);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    if (flw_type == "TV") {
        //fetching from tmdb for all info
        fetch(listUrl)
            .then((res) => res.json())
            .then((data) => {
                //data.results []
                const allTV = data.results;
                const tPagination = document.getElementById('tv-pagination');
                tPagination.setAttribute("tv-total-page", data.total_pages);
                const tvBlock = createItemContainer(allTV, flw_type);
                flw_wrap.appendChild(tvBlock);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }
}

// ------------------------ Creating Movie Table --------------------------

const buttonElement = document.querySelector('#search-btn');
const inputElement = document.querySelector('#input-value');


function getSearchQuery() {
    try {
        let url_string = (window.location.href).toLowerCase();
        let url = new URL(url_string);
        let query = url.searchParams.get("query");
        document.querySelector('#searchValueDisplay').innerHTML = `<center><h2>Search: "${query}"</h2></center>`;
        searchKeyword(query);

    } catch (error) {
        console.log("Issues with parsing URL Parameter's - " + error);
    }
}



getSearchQuery();

buttonElement.onclick = function (event) {
    event.preventDefault();

    const value = inputElement.value;
    document.location.href = `search.html?query=${value}`;
    searchKeyword(value);
}


function searchKeyword(value) {
    document.querySelector('#movie-results').innerHTML = "";
    document.querySelector('#tv-results').innerHTML = "";
    const moviePath = "/search/movie";
    const movieSearchUrl = generateTmdbUrl(moviePath) + '&query=' + value + '&page=' + mCurrPage;
    const tvPath = "/search/tv";
    const tvSearchUrl = generateTmdbUrl(tvPath) + '&query=' + value + '&page=' + tCurrPage;
    itemsGrid(movieSearchUrl, "#movie-results", "Movie");
    itemsGrid(tvSearchUrl, "#tv-results", "TV");
}

function getMovieMaxPages() {
    pagination = document.getElementById('movie-pagination');
    const maxPages = pagination.getAttribute('movie-total-page');
    return maxPages;
}

function getTvMaxPages() {
    pagination = document.getElementById('tv-pagination');
    const maxPages = pagination.getAttribute('tv-total-page');
    return maxPages;
}

function prevMoviePage() {
    if (mCurrPage > 1) {
        mCurrPage--;
        changeMoviePage(mCurrPage);
    }
}

function nextMoviePage() {
    if (mCurrPage < getMovieMaxPages()) {
        mCurrPage++;
        changeMoviePage(mCurrPage);
    }
}


function prevTvPage() {
    if (tCurrPage > 1) {
        tCurrPage--;
        changeTvPage(tCurrPage);
    }
}

function nextTvPage() {
    if (tCurrPage < getTvMaxPages()) {
        tCurrPage++;
        changeTvPage(tCurrPage);
    }
}



function changeMoviePage(page) {
    let btn_prev = document.getElementById("m_btn_prev");
    let btn_curr = document.getElementById("m_btn_curr");
    let btn_next = document.getElementById("m_btn_next");
    if (page < 1) page = 1;
    if (page > getMovieMaxPages()) page = getMovieMaxPages();
    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    let query = url.searchParams.get("query");
    // console.log("Query is = " + query);
    btn_curr.innerHTML = page;
    document.querySelector('#movie-results').innerHTML = "";
    const moviePath = "/search/movie";
    const movieSearchUrl = generateTmdbUrl(moviePath) + '&query=' + query + '&page=' + page;
    // console.log(movieSearchUrl);
    itemsGrid(movieSearchUrl, "#movie-results", "Movie");
}

function changeTvPage(page) {
    let btn_prev = document.getElementById("t_btn_prev");
    let btn_next = document.getElementById("t_btn_next");
    let btn_curr = document.getElementById("t_btn_curr");

    if (page < 1) page = 1;
    if (page > getTvMaxPages()) page = getTvMaxPages();

    if (page == 1) {
        btn_prev.style.display = "none";
    } else {
        btn_prev.style.display = "block";
    }

    if (page == getTvMaxPages()) {
        btn_next.style.display = "none";
    } else {
        btn_next.style.display = "block";
    }

    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    let query = url.searchParams.get("query");
    // console.log("Query is = " + query);
    btn_curr.innerHTML = page;
    document.querySelector('#tv-results').innerHTML = "";
    const tvPath = "/search/tv";
    const tvSearchUrl = generateTmdbUrl(tvPath) + '&query=' + query + '&page=' + page;
    // console.log(tvSearchUrl);
    itemsGrid(tvSearchUrl, "#tv-results", "TV");
}




// ----------------------------------- POPUP Modal ----------------------------------------------------------

//get modal element
let modal = document.getElementById("simpleModal");

//Getting all info about movie from tmdb and palcing in popup using cookPopupInfo function
function fetchMovieInfo(url, type) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            //TODO
            //Display movie info
            // console.log("Movie Info ", data);
            cookPopupInfo(data, type);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}

function fetchImdbRating(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            //TODO
            //Display movie info
            // console.log("Omdb Info ", data);
            document.getElementById("mdRating").innerHTML = `${data.imdbRating}`;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}

document.onclick = function (event) {
    const target = event.target;

    if (target.tagName.toLowerCase() === "img") {
        // console.log("Event: ", event);
        if (target.dataset.movieId) {
            const movieId = target.dataset.movieId;
            // console.log("Movie ID: ", movieId);
            modal.style.display = "block";
            const imageItem = document.querySelector(`[data-movie-id="${movieId}"]`);
            const imdbId = imageItem.getAttribute(`imdb-id`);
            // console.log("popup imdb id : " + imdbId);
            const path = `/movie/${movieId}`;
            const url = generateTmdbUrl(path);
            const omdbUrl = generateOmdbUrl(imdbId);
            // fetch movie info to popup
            fetchMovieInfo(url, "Movie");
            // fetch imdb rating to popup
            fetchImdbRating(omdbUrl);
        }

        if (target.dataset.tvId) {
            const tvId = target.dataset.tvId;
            // console.log("Movie ID: ", tvId);
            modal.style.display = "block";
            const imageItem = document.querySelector(`[data-tv-id="${tvId}"]`);
            const imdbId = imageItem.getAttribute(`imdb-id`);
            // console.log("popup imdb id : " + imdbId);
            const path = `/tv/${tvId}`;
            const url = generateTmdbUrl(path);
            const omdbUrl = generateOmdbUrl(imdbId);
            // fetch movie info to popup
            fetchMovieInfo(url, "TV");
            // fetch imdb rating to popup
            fetchImdbRating(omdbUrl);
        }
    }
    //get close button
    let closeBtn = document.getElementById("closeBtn");
    //listen for close click
    closeBtn.addEventListener("click", closeModal);
    //listen for outside click
    window.addEventListener("click", clickOutside);
    //function to close modal
    function closeModal() {
        modal.style.display = "none";
        document.getElementById("mdGenre").innerHTML = ""; // so that as we close the popup it will clear the genre field else will keep adding up
    }

    //function to close modal if clicked outside
    function clickOutside(e) {
        if (e.target == modal) {
            modal.style.display = "none";
            document.getElementById("mdGenre").innerHTML = ""; // so that as we close the popup it will clear the genre field else will keep adding up
        }
    }
};

function cookPopupInfo(item, type) {
    if (type == "Movie") {
        document.getElementById("mdTitle").innerHTML = `${item.title}`;
        document.getElementById("mdPoster").innerHTML = `<img 
    src="${Url_Poster + item.poster_path}"
    class="film-poster-img"
    title="${item.title}" 
    alt="${item.title}"
    width="200em"/>`;

        //for genres
        item.genres.forEach(function (e) {
            // console.log(e.id + " : " + e.name);
            document.getElementById("mdGenre").textContent += ` | ${e.name}`;
        });

        //for release date
        document.getElementById("mdYear").innerHTML = `${item.release_date.substr(
            0,
            4
        )}`;

        //for overview
        document.getElementById("mdOverview").innerHTML = `${item.overview}`;

        //for runtime
        document.getElementById("mdRuntime").innerHTML = `${item.runtime} MIN`;
    }

    if (type == "TV") {
        document.getElementById("mdTitle").innerHTML = `${item.name}`;
        document.getElementById("mdPoster").innerHTML = `<img
    src="${Url_Poster + item.poster_path}"
    class="film-poster-img"
    title="${item.title}"
    alt="${item.title}" 
    width="200em"/>`;

        //for genres
        item.genres.forEach(function (e) {
            // console.log(e.id + " : " + e.name);
            document.getElementById("mdGenre").textContent += ` | ${e.name}`;
        });

        //for release date
        document.getElementById("mdYear").innerHTML = `${item.first_air_date.substr(
            0,
            4
        )}`;

        //for overview
        document.getElementById("mdOverview").innerHTML = `${item.overview}`;

        //for runtime
        document.getElementById(
            "mdRuntime"
        ).innerHTML = `${item.episode_run_time} MIN/EP`;
    }
}

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
