const searchBtn = document.getElementById('search-btn');
const output = document.getElementById('img-output');
const loader = document.getElementById('loader');

let results;
let query;
let perPage = 100;
const KEY = 'f1f5b58600f355d082028d2df6fbef8e';

//TO USE: Tags, photos.comments, search, galleries

const search = async () => {
    output.innerHTML = null;
    loader.classList.add('loading');
    const query = document.getElementById('search').value;
    const API = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${KEY}&text=${query}&per_page=${perPage}&format=json&nojsoncallback=1`;
    await fetch(API)
            .then(response => response.json())
            .then(data => results = data)
            .catch((error) => {
                console.log('Error ', error);
            });
    
    renderImages();
}

searchBtn.addEventListener('click', search);

const renderImages = () => {
    setTimeout(() => {
        loader.classList.remove('loading');
    }, 2000)
    console.log(results);
    results.photos.photo.forEach(photoObj => {
        const content = `<div id="${photoObj.id}" class="photo-wrapper" style="background-image:url(https://live.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}_c.jpg); height:${Math.floor(Math.random() * 450) + 250}px">
    
                            <div class="big-photo-wrapper">
                            <div class="lightbox">
                            <img src="https://live.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}_c.jpg" alt="${photoObj.title}"/>
                            <h2>${photoObj.title}</h2>
                            <p></p>
                            </div>
                            </div>
                        </div>`;
        output.innerHTML += content;
    });
}

//Run fetch func again but increase number of results?
const loadMore = () => {

}

const renderFilters = () => {

}

const activeImage = () => {

}