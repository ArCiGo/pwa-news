
import { init } from "./firebase";


const apiKey = "9a59f2d3d8074f0882ba9b5737ffa2b9";
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector')
const defaultSource = 'buzzfeed';

const imgNotFound = "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big.png"

window.addEventListener('load', e => {
  //sourceSelector.value = defaultSource;
  init()
  updateNews();
  updateSources();


  sourceSelector.addEventListener('change', e => {
    updateNews(e.target.value)
  });

  if('serviceWorker' in navigator){
    try {
      navigator.serviceWorker.register('sw.js')
      console.log('SW registered')
    } catch (error) {
      console.log('Your browser not support SW')
    }
  }
})

async function updateSources() {
  let response = await fetch(`http://newsapi.org/v2/sources?apiKey=${apiKey}`);
  let data = await response.json();

  sourceSelector.innerHTML = data.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');


}

async function updateNews(source = defaultSource) {
  let response = await fetch(`http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
  let data = await response.json();
  if (data) {
    main.innerHTML = data.articles.map(createArticle).join('\n')
    console.log(data)
  }
}

function createArticle(article) {
  return `
      <div class="article">
        <a href="${article.url}"></a>
        <h2>${article.title}</h2>
        <img src="${article.urlToImage ? article.urlToImage  : imgNotFound }" 
        <p>${article.description ? article.description : "Lorem Ipsum"}</p>
      </div>
      `;
}