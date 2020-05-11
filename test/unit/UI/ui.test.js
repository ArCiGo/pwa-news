jest.mock('node-fetch');

import { apiKey, createArticle, getJSON } from '../../../app.js';
import fetch from 'node-fetch';
const {Response} = jest.requireActual('node-fetch');

const articleValues = {
    title: "Armando",
    url: "https://localhost",
    imgNotFound: "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big.png",
    description: "Some random text"
};

describe('app.js', () => {
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
    });
  });
  
});