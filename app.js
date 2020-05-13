export const apiKey = "27d7e02fb0324ba5a1ed7f22e5b212ea";
const defaultSource = 'buzzfeed';
const sourceSelector = document.querySelector('#sourceSelector');
const inputSearch = document.querySelector('input[type="search"]');
const newsArticles = document.querySelector('main');
const statusBar = document.querySelector('.status');
const imgNotFound = "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big.png";


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () =>
//     navigator.serviceWorker.register('sw.js')
//       .then(registration => console.log('Service Worker registered'))
//       .catch(err => 'SW registration failed'));
// }

window.addEventListener('load', e => {

  sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
  updateNewsSources().then(() => {
    sourceSelector.value = defaultSource;
    updateNews();
  });

  inputSearch.addEventListener('search', e => {
    queryNews(e.target.value)
  })

  networkStatus()

  window.addEventListener('online', networkStatus);
  window.addEventListener('offline', networkStatus);
});

export async function getJSON(url) {
  const response = await fetch(url);
  const json = await response.json();
  
  return json;
}

export async function updateNewsSources() {
  const json = await getJSON(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);

  document.querySelector('#sourceSelector').innerHTML =
    json.sources
      .map(source => `<option value="${source.id}">${source.name}</option>`)
      .join('\n');
}

export async function updateNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  const json = await getJSON(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
  
  newsArticles.innerHTML = json.articles.map(createArticle).join('\n');
}

export async function queryNews(query) {
  newsArticles.innerHTML = '';
  const json = await getJSON(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
  
  newsArticles.innerHTML = json.articles.map(createArticle).join('\n');
  document.getElementById('results').innerHTML = `Se encontraron <strong>${Object.keys(json.articles).length}</strong> resultados de <strong>"${query}"</strong>. `;
  inputSearch.value = ""
}

export function createArticle(article) {
  return `
      <div class="article" title="${article.title}">
        <a href="${article.url}">
          <div class="article-img">
            <img src="${article.urlToImage ? article.urlToImage : imgNotFound}" />
          </div>
          <div class="article-body">
            <h2 class="article-title">${article.title}</h2>
            <p>${article.description ? article.description : "Lorem Ipsum"}</p>
          </div>
        </a>
      </div>
      `;
}

export function networkStatus(sb) {
  sb = sb || statusBar;

  if (navigator.onLine) {
    sb.innerHTML = ""
    sb.style.display = "none"
    
    console.log('online');
  } else {
    sb.style.display = "block"
    sb.innerHTML = "Estas Offline"
    
    console.log('offline')
  }
}