const searchBtn = document.getElementById('search-btn');
const settings = document.getElementById('settings');
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
    },2000)
    console.log(results);
    results.photos.photo.forEach(photoObj => {
        const content = `<div id="${photoObj.id}" class="photo-wrapper" style="background-image:url(https://live.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}_c.jpg); height:${Math.floor(Math.random() * 450) + 250}px">
    
                            <div class="big-photo-wrapper">
                            <div class="lightbox">
                            <button class="closeBtn">X</button>
                            <img src="https://live.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}_c.jpg" alt="${photoObj.title}"/>
                            <h2 class="font-style-secondary">${photoObj.title}</h2>
                            <h3 class="font-style-secondary">User comments:</h3>
                            <div class="add-comment-wrapper font-style-secondary">
                                <input class="font-style-secondary" id="comment-input" type="text" />
                                <button class="font-style-secondary">Post</button>
                            </div>
                            <div id="comment-output" class="comment-section font-style-secondary">
                                
                            </div>
                            </div>
                            </div>
                        </div>`;
        output.innerHTML += content;
    });
    document.querySelectorAll('.photo-wrapper').forEach(photo => {
        photo.addEventListener('click', activeImage)
    });
    document.querySelectorAll('.closeBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.classList.remove('active');
        });
    });
}

//Run fetch func again but increase number of results?
const loadMore = () => {

}

const renderFilters = () => {

}

const activeImage = (e) => {
    e.target.firstElementChild.classList.add('active');
}

const openCloseSettings = () => {
    settings.classList.toggle('active');
}   