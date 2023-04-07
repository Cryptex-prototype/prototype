const getMovies = async () => {
    const url = '/movies';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    let response = await db.fetch(url, options);
    return await response.json();
}

const movies = async () => {
    let loading = `<div class="loading"><img class="img-loading m-auto" src="/images/loading.gif"></div>`;
    $("#movies").html(loading);
    const movies = await getMovies()
    moviesArray = movies;
    console.log(movies)
    let movieData = "";
    let movieCard = "";
    movies.forEach((movie) => {
        movieCard +=
            `<div class="w-100">
                 <div class="card card-custom jump">
                   <img src='${movie.poster_url}' class="card-img-top" alt="movie poster">
                    <h1 class="title">${movie.title}</h1>
                    <h3 class="movie-stars">${movieStars(movie)}</h3>
                    <h5 class="user-rating">Audience Score: ${movie.user_rating}/10</h5>                
                <!-- info div -->
                 <div class="info">
                 <p class="released">Released: <span>${movie.released_year}</span></p>
                 <p class="rating">Rated: <span>${movie.rating}</span></p>
                 <p class="director">Director: <span>${movie.director}</span></p>
                 <p class="cast">Cast: <span>${movie.cast}</span></p>
                 <p class="writers">Writers: <span>${movie.writers}</span></p>
                 <p class="awards">Awards: <span>${movie.awards}</span></p>
                 <p class="runtime">Runtime: <span>${movie.runtime}</span></p>
                 <p class="genre">Genre: <span>${movie.genre}</span></p>
                 </div>
                  <div class="plot">Plot:
                      <div class="plot-data">${movie.plot}</div>
                  </div>

                 </div>
             </div>`

        movieData += `<option value=${movie.id}>${movie.title}</option>`;

        $("#movies").html(movieCard);
        $(".delete-menu").html("<option selected>Select a movie to delete</option>" + movieData);
        $(".edit-menu").html("<option selected>Select a movie to edit</option>" + movieData);
        $(".search-menu").html("<option selected>Search movies now playing</option>" + movieData);
    });


}

await movies();