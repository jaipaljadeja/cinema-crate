const tmdbKey = "cee4d8f2967818ead1e098e8d5ca145d";
const omdbKey = "e3651111";
let imdb;
const Url_Poster = "https://image.tmdb.org/t/p/w342";
const Url_Cast = "https://image.tmdb.org/t/p/w185"
const Url_Backdrop = "https://image.tmdb.org/t/p/w1280";
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
    const url = `https://www.omdbapi.com/?i=${imdb_id}&apikey=e3651111`;
    return url;
}


//----------------------  Fetching Imdb Id ---------------------------



function fetchImdbId(url) {
    // fetching IMDB id for a movie
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.imdb_id);
            const imageItem = document.getElementById("poster-image")
            imageItem.setAttribute("imdb-id", `${data.imdb_id}`);

        })
        .catch((error) => {
            console.log("Error: ", error);
        });

    //fetching IMDB for a tv show
    // if (type == "TV") {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const imageItem = document.querySelector(`[data-tv-id="${data.id}"]`);
    //             imageItem.setAttribute("imdb-id", `${data.imdb_id}`);
    //         })
    //         .catch((error) => {
    //             console.log("Error: ", error);
    //         });
    // }
}

function getImdbId_Movie(tmdbId) {

    const path = `/tv/${tmdbId}/external_ids`;
    url = generateTmdbUrl(path);
    fetchImdbId(url);

    // if (type == "TV") {
    //     const path = `/tv/${tmdbId}/external_ids`;
    //     url = generateTmdbUrl(path);
    //     fetchImdbId(url, type);
    // }
}

// ---------------- Get CAST list ----------------

function castPoster(items) {
    const castItems = document.createElement('div');
    castItems.classList = 'cast-items';
    items.map((item) => {
        if (item.profile_path) {

            const castCard = document.createElement('div');
            castCard.classList = 'cast-card';

            const castImageArea = document.createElement('div');
            castImageArea.classList = 'cast-image-area';
            castCard.appendChild(castImageArea);

            const img = document.createElement('img');
            img.src = Url_Cast + item.profile_path;
            img.setAttribute("id", `cast-image`);
            castImageArea.appendChild(img);

            const castInfoArea = document.createElement('div');
            castInfoArea.classList = 'cast-info-area';
            castCard.appendChild(castInfoArea);

            const castName = document.createElement('p');
            castName.setAttribute("id", `cast-name`);
            castName.innerHTML = item.name;
            castInfoArea.appendChild(castName);

            const castCharacter = document.createElement('p');
            castCharacter.setAttribute("id", `cast-character`);
            castCharacter.innerHTML = item.character;
            castInfoArea.appendChild(castCharacter);

            castItems.appendChild(castCard);
        }
    });
    return castItems;
}



function createItemContainer(items, flw_type) {
    const castElement = document.createElement("div");
    castElement.setAttribute("class", "cast-elements");
    castElement.appendChild(castPoster(items));
    return castElement;

}

function itemsGrid(listUrl, cast_container) {
    const cast_area = document.querySelector(cast_container); // Seclecting Division under which we have to append the list

    fetch(listUrl)
        .then((res) => res.json())
        .then((data) => {
            //data.results []
            const allCasts = data.cast;
            // const mPagination = document.getElementById('movie-pagination');
            // mPagination.setAttribute("movie-total-page", data.total_pages);
            const castBlock = createItemContainer(allCasts);
            cast_area.appendChild(castBlock);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });

}

// ------------------------ Creating Movie Info --------------------------

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


function cookTvInfo(item) {
    const leftSubInfo = document.getElementById("left-sub-info");
    leftSubInfo.innerHTML = "";
    document.getElementById("movie-name").innerHTML = `${item.name}`;
    document.getElementById("poster-image").src = Url_Poster + item.poster_path;
    document.documentElement.style
        .setProperty('--bg-url', `url("${Url_Backdrop + item.backdrop_path}")`);
    //for genres
    item.genres.forEach(function (e) {
        // console.log(e.id + " : " + e.name);
        document.getElementById("mdGenre").textContent += ` | ${e.name}`;
    });

    item.seasons.forEach(function (e) {
        if (e.season_number > 0) {
            const tvSeasonBox = document.createElement('div');
            tvSeasonBox.classList = 'tv-season';

            const seasonNum = document.createElement('p');
            seasonNum.classList = 'season-number';
            seasonNum.innerHTML = `Season ${e.season_number} | ${e.episode_count} EPS`;
            tvSeasonBox.appendChild(seasonNum);

            leftSubInfo.appendChild(tvSeasonBox);
        }
    });

    //for release date
    document.getElementById("mdYear").innerHTML = `${item.first_air_date.substr(
        0,
        4
    )}`;

    //imdb-id
    const imdbId = document.getElementById("poster-image").getAttribute(`imdb-id`);
    const omdbUrl = generateOmdbUrl(imdbId);

    // fetch imdb rating to popup
    console.log(omdbUrl);
    fetchImdbRating(omdbUrl);
    //for overview
    document.getElementById("mdOverview").innerHTML = `${item.overview}`;

    //for runtime
    document.getElementById("mdRuntime").innerHTML = `${item.episode_run_time} MIN/EP`;
}

function fetchTvInfo(url, type) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            //TODO
            //Display movie info
            // console.log("Movie Info ", data);
            cookTvInfo(data, type);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}


function searchTvInfo(id) {
    tvPath = `/tv/${id}`;
    tvUrl = generateTmdbUrl(tvPath);
    fetchTvInfo(tvUrl);


}

function searchCast(id) {
    const creditsPath = `/tv/${id}/credits`;
    const creditsUrl = generateTmdbUrl(creditsPath);
    itemsGrid(creditsUrl, "#cast-area-js");
}



// ---------------- GET REVIEWS ------------------

function reviewRender(items) {
    const reviewItems = document.createElement('div');
    reviewItems.classList = 'review-items';
    items.map((item) => {

        const reviewItem = document.createElement('div');
        reviewItem.classList = 'review-item';

        const reviewerInfo = document.createElement('div');
        reviewerInfo.classList = 'reviewer-info';
        reviewItem.appendChild(reviewerInfo);

        const userCircle = document.createElement('span');
        userCircle.innerHTML = `<i class="fas fa-user-circle"></i>`;
        reviewerInfo.appendChild(userCircle);

        const reviewerName = document.createElement('p');
        reviewerName.id = 'reviewer-name';
        reviewerName.innerHTML = item.author;
        reviewerInfo.appendChild(reviewerName);

        const reviewContent = document.createElement('div');
        reviewContent.classList = 'review-content';
        reviewItem.appendChild(reviewContent);

        const reviewText = document.createElement('p');
        reviewText.id = 'review-text';
        reviewText.innerHTML = item.content;
        reviewContent.appendChild(reviewText);


        reviewItems.appendChild(reviewItem);

    });
    return reviewItems;
}



function createReviewsContainer(items) {
    const reviewElement = document.createElement("div");
    reviewElement.setAttribute("class", "review-elements");
    reviewElement.appendChild(reviewRender(items));
    return reviewElement;

}



function getTvReviews(url) {
    const review_area = document.getElementById("reviews-area-js"); // Seclecting Division under which we have to append the list

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            //data.results []
            const allReviews = data.results;
            const rPagination = document.getElementById('reviews-pagination');
            rPagination.setAttribute("reviews-total-page", data.total_pages);
            if (data.total_pages == 1 || data.total_results == 0) {
                rPagination.style.display = "none";
            }
            if (data.total_results == 0) {
                const noReviews = document.getElementById('no-reviews-container');
                noReviews.innerHTML = `<center>
                <p style="color: #ffdf46; padding: 50px 0px">
                  No Reviews Yet
                </p>
              </center>`;
            }
            const reviewBlock = createReviewsContainer(allReviews);
            review_area.appendChild(reviewBlock);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}


function searchTvReviews(id) {
    const path = `/tv/${id}/reviews`;
    const url = generateTmdbUrl(path);
    getTvReviews(url);
}

function getSearchId() {
    try {
        let url_string = (window.location.href).toLowerCase();
        let url = new URL(url_string);
        let id = url.searchParams.get("id");
        getImdbId_Movie(id);
        searchCast(id);
        searchTvInfo(id);
        searchTvReviews(id);


    } catch (error) {
        console.log("Issues with parsing URL Parameter's - " + error);
    }
}

getSearchId();

// ----------------- Movie Search Bar Function --------------------

const buttonElement = document.querySelector('#search-btn');
const inputElement = document.querySelector('#input-value');

buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
    document.location.href = `search.html?query=${value}`;
}
// ------------------------ Change Page Function ------------------

function getReviewsMaxPages() {
    pagination = document.getElementById('reviews-pagination');
    const maxPages = pagination.getAttribute('reviews-total-page');
    return maxPages;
}


function prevReviewPage() {
    if (mCurrPage > 1) {
        mCurrPage--;
        changeReviewPage(mCurrPage);
    }
}

function nextReviewPage() {
    if (mCurrPage < getReviewsMaxPages()) {
        mCurrPage++;
        changeReviewPage(mCurrPage);
    }
}


function changeReviewPage(page) {
    let btn_prev = document.getElementById("m_btn_prev");
    let btn_curr = document.getElementById("m_btn_curr");
    let btn_next = document.getElementById("m_btn_next");
    if (page < 1) page = 1;
    if (page > getReviewsMaxPages()) page = getReviewsMaxPages();

    if (page == 1) {
        btn_prev.style.display = "none";
    } else {
        btn_prev.style.display = "block";
    }

    if (page == getReviewsMaxPages()) {
        btn_next.style.display = "none";
    } else {
        btn_next.style.display = "block";
    }

    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    btn_curr.innerHTML = page;
    document.querySelector('#reviews-area-js').innerHTML = "";
    const reviewPath = `/tv/${id}/reviews`;
    const reviewUrl = generateTmdbUrl(reviewPath) + `&page=${page}`;
    getTvReviews(reviewUrl);
}

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
