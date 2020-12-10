const searchBtn = document.getElementById('search-btn');
const settings = document.getElementById('settings');
const output = document.getElementById('img-output');
const loader = document.getElementById('loader');
const optionBtns = document.getElementById('optionBtns');
const pageButtons = document.getElementById('page-btn-output');
const switchModeBtn = document.getElementById('darkLightWrapper');
let query = "";

const updateQuery = () => { query = document.getElementById('search').value };

let results;
let page = 1;
let pageNums = 1;
let safeSearch = 1; //1 is safe, 2 is moderate, 3 is restricted
let perPage = 100;
const KEY = 'f1f5b58600f355d082028d2df6fbef8e';
const ID = '191350676@N04';

//TO USE: Tags, photos.comments, search, galleries

const getPopular = async () => {
    pageButtons.innerHTML = null;
    output.innerHTML = null;
    loader.classList.add('loading');
    const API = `https://api.flickr.com/services/rest?method=flickr.photos.getRecent&api_key=${KEY}&per_page=${perPage}&page=1&safe_search=${safeSearch}&sort=relevance&format=json&nojsoncallback=1`;
    await fetch(API)
            .then(response => response.json())
            .then(data => results = data)
            .catch((error) => {
                console.log('Error ', error);
            });
    renderImages();
}
getPopular();

const search = async () => {
    pageButtons.innerHTML = null;
    output.innerHTML = null;
    loader.classList.add('loading');
    query.length <= 0 ? getPopular() : null;
    const API = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${KEY}&text=${query}&per_page=${perPage}&page=1&safe_search=${safeSearch}&sort=relevance&format=json&nojsoncallback=1`;
    await fetch(API)
            .then(response => response.json())
            .then(data => results = data)
            .catch((error) => {
                console.log('Error ', error);
            });
    
    renderImages();
    renderPageButtons();
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
                                <input class="font-style-secondary" type="text" />
                                <button class="font-style-secondary">Post</button>
                            </div>
                            <div class="comment-section font-style-secondary">
                                
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

const renderFilters = () => {

}

const activeImage = (e) => {
    e.target.firstElementChild.classList.add('active');
}

const openCloseSettings = () => {
    settings.classList.toggle('active');
}   

const setPager = (e) => {
    if (e.target.innerText == 50) {
        perPage = 50;
        optionBtns.children[1].classList.add('selected');
        optionBtns.children[2].classList.remove('selected');
        optionBtns.children[3].classList.remove('selected');
        search();
    } 
    if (e.target.innerText == 100) {
        perPage = 100;
        optionBtns.children[1].classList.remove('selected');
        optionBtns.children[3].classList.remove('selected');
        optionBtns.children[2].classList.add('selected');
        search();
    }
    if (e.target.innerText == 150) {
        perPage = 150;
        optionBtns.children[1].classList.remove('selected');
        optionBtns.children[2].classList.remove('selected');
        optionBtns.children[3].classList.add('selected');
        search();
    }
}

document.querySelectorAll('.num-btn').forEach(btn => {
    btn.addEventListener('click', setPager)
});


const stepPage = async () => {
    pageButtons.innerHTML = null;
    output.innerHTML = null;
    loader.classList.add('loading');
    const API = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${KEY}&text=${query}&per_page=${perPage}&page=${page}&safe_search=${safeSearch}&sort=relevance&format=json&nojsoncallback=1`;
    await fetch(API)
            .then(response => response.json())
            .then(data => results = data)
            .catch((error) => {
                console.log('Error ', error);
            });
    
    renderImages();
    renderPageButtons();
}


const renderPageButtons = () => {
    pageNums = 1;
    while (pageNums < 5) {
        const content = `<button class="page-button"> ${pageNums} </button>`;
        pageButtons.innerHTML += content;
        pageNums++;
    }

    if (results.photos.page == pageButtons.children[3].innerText) {
        pageButtons.removeChild(pageButtons.children[0]);
        pageButtons.innerHTML += `<button class="page-button"> ${page+1} </button>`;
    }

    const lastBtn = `<button class="page-button"> ${results.photos.pages} </button>`;
    pageButtons.innerHTML += '...' + lastBtn;

    document.querySelectorAll('.page-button').forEach(btn => {
        btn.addEventListener('click', selectPage)
    });
}

const selectPage = (e) => {
   let selectedPageNumber = parseInt(e.target.innerText);
   page = selectedPageNumber;
   stepPage();
}

const toggleDarkLightMode = () => {
    if (document.querySelector('body').className == 'light') {
        document.querySelector('body').classList.remove('light');
        document.querySelector('body').classList.add('dark');
    } else {
        document.querySelector('body').classList.add('light');
        document.querySelector('body').classList.remove('dark');
    }
}

switchModeBtn.addEventListener('click', toggleDarkLightMode);


