// Async await
const card_container = document.querySelector('.movie-container')
const searchBtn = document.querySelector('.search-btn');
const inputForm = document.querySelector('.input-keyword')

searchBtn.addEventListener('click', async function() {  
    try{
        const movies = await getMovies(inputForm.value);
        updateUI(movies)
    } catch(err) {
        alert(err)
    }
})

// Get movies use fetching api
function getMovies(key) {
    return fetch('http://www.omdbapi.com/?apikey=f4318b55&s=' + key)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(response => {
                if(response.Response === 'False') {
                    throw new Error(response.Error)
                }
                return response.Search
            })
};

function updateUI(item) {
    const moviesDetail = item.map((items)=> {
        return moviesCard(items)
    }).join('')
    card_container.innerHTML = moviesDetail

}

// Details section
document.addEventListener('click', async function(e) {
    try {
        if(e.target.classList.contains('modal-detail-button')) {
            const imdbID = e.target.dataset.imdbid
            const detail = await cardDetail(imdbID)
            updateUIDetail(detail);
        }
    } catch(err) {

    }
})

// get api of details
function cardDetail(key) {
    return fetch('http://www.omdbapi.com/?apikey=f4318b55&i=' +key)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(response => response)
} 

function updateUIDetail(items) {
    const movieDetails = itemDetail(items) 
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetails
}



// Movies card structure
function moviesCard(items) {
    return `<div class="row">
            <div class="col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="${items.Poster}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">${items.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${items.Year}</h6>
                      <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#MovieDetailModal" data-imdbid='${items.imdbID}' >Show Details</a>
                    </div>
                  </div>
            </div>
        </div>`
}

function itemDetail(items) {  
    return `<div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <img src="${items.Poster}" class="img-fluid">
                                        </div>
                                        <div class="col-md">
                                            <ul class="list-group">
                                                <li class="list-group-item">${items.Title}(2016)</li>
                                                <li class="list-group-item"><strong>Director : </strong>${items.Director}</li>
                                                <li class="list-group-item"><strong>Actors : </strong>${items.Actors}</li>
                                                <li class="list-group-item"><strong>Writter : </strong>${items.Writer}</li>
                                                <li class="list-group-item"><strong>Plot : </strong> <br> ${items.Plot}</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>`
}
