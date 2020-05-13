jest.mock('node-fetch');

import { apiKey, createArticle, getJSON, updateNewsSources, networkStatus } from '../../app.js';
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

const articleValues = {
  title: "Armando",
  url: "https://localhost",
  imgNotFound: "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big.png",
  description: "Some random text"
};

describe('app.js', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('when `createArticle()` is called', () => {
  it('should return the correct values of the given object', () => {
      expect(createArticle(articleValues)).toContain(articleValues.title);
      expect(createArticle(articleValues)).toContain(articleValues.url);
      expect(createArticle(articleValues)).toContain(articleValues.description);
      expect(createArticle(articleValues)).toContain(articleValues.imgNotFound);

      expect(createArticle(articleValues)).toMatchSnapshot();
    });
  });

  describe('when `getJSON(param)` is called', () => {
  it('should return a JSON response', async () => {
      global.fetch = fetch;
      
      const response = JSON.stringify([{title: 'Hello World!'}]);
      
      fetch.mockReturnValue(Promise.resolve(new Response(response)));
      
      const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
      const data = await getJSON(url);
    
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url);
      expect(data[0].title).toContain("Hello World!");
    });
  });

  describe('when `networkStatus` is called', () => {
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

  describe('when `updateNewsSources()` is called', () => {
    // beforeEach(() => {
    //     jest.restoreAllMocks();
    // });

  it('should populate something', async () => {
      global.fetch = fetch;
      
      const response = JSON.stringify({sources: [{id: '1', name: "test"}]});

      fetch.mockReturnValue(Promise.resolve(new Response(response)));

      document.body.innerHTML = `
      <div class="select">
        <select id="sourceSelector"></select>
      </div>
      `;
      
      const url = await updateNewsSources();
      
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(document.getElementById('sourceSelector').innerHTML).toBe('<option value="1">test</option>');
    });
  });
});