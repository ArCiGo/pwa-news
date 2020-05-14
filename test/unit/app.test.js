jest.mock('node-fetch');

import { apiKey, createArticle, getJSON, updateNewsSources, networkStatus, updateNews, queryNews } from '../../app.js';
import { sampleResponse, optionsResponse, articleResponse } from '../unit/resources/responses.js'
import { articleValues } from '../unit/resources/objects.js'
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

global.fetch = fetch;

describe('app.js', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('when `"createArticle(param)"` is called', () => {
  it('should return the correct values of the given object', () => {
      expect(createArticle(articleValues)).toContain(articleValues.title);
      expect(createArticle(articleValues)).toContain(articleValues.url);
      expect(createArticle(articleValues)).toContain(articleValues.description);
      expect(createArticle(articleValues)).toContain(articleValues.imgNotFound);

      expect(createArticle(articleValues)).toMatchSnapshot();
    });
  });

  describe('when `"getJSON(param)"` is called', () => {
  it('should return a JSON response', async () => {      
      fetch.mockReturnValue(Promise.resolve(new Response(sampleResponse)));
      
      const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
      const data = await getJSON(url);
    
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(data[0].title).toContain("Hello World!");
    });
  });

  describe('when `"networkStatus(param)"` is called', () => {
  it('should display `""` when online', () => {      
      document.body.innerHTML = `<div id="statusBar" class="status"></div>`;

      const statusBar = document.querySelector('.status');
      statusBar.innerHTML = "";
      document.getElementById("statusBar").setAttribute("style", "display:none");
        
      expect(document.getElementById("statusBar").innerHTML).toBe("")

      const logSpy = jest.spyOn(console, 'log');
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true);
      networkStatus(statusBar);
      expect(logSpy).toBeCalledWith('online');
    });

  it('should display `"Estas Offline"` when offline', () => {
      document.body.innerHTML = `<div id="statusBar" class="status"></div>`;

      const statusBar = document.querySelector('.status');
      statusBar.innerHTML = "Estas Offline"
      document.getElementById("statusBar").setAttribute("style", "display:block");

      expect(document.getElementById("statusBar").innerHTML).toBe("Estas Offline")

      const logSpy = jest.spyOn(console, 'log');
      jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
      networkStatus(statusBar);
      
      expect(logSpy).toBeCalledWith('offline');
    });
  });

  describe('when `"updateNewsSources()"` is called', () => {
  it('should populate the `<select>` tag with options', async () => {
      fetch.mockReturnValue(Promise.resolve(new Response(optionsResponse)));

      document.body.innerHTML = `
        <div class="select">
          <select id="sourceSelector"></select>
        </div>
      `;
      
      await updateNewsSources();
      
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(document.getElementById('sourceSelector').innerHTML).toBe('<option value="1">test</option>');
    });
  });

  describe('when `"updateNews(param)"` is called', () => {
  it('should populate the `<main>` tag with articles', async () => {
      fetch.mockReturnValue(Promise.resolve(new Response(articleResponse)));

      document.body.innerHTML = `
        <main></main>
      `;
      
      await updateNews('buzzfeed');
      
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('when `"queryNews(param)"` is called', () => {
    it('should populate the `<main>` tag with articles', async () => {
      fetch.mockReturnValue(Promise.resolve(new Response(articleResponse)));

      document.body.innerHTML = `
        <header>
          <div class="search-bar">
            <input type="search" placeholder="Buscar..." name="Buscar" id="search" class="">
          </div>
        </header>
        <p id="results"></p>
        <main></main>
      `;
      
      await queryNews('buzzfeed');
      
      expect(fetch).toHaveBeenCalledTimes(1);
    })
  })
});