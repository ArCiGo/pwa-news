const sampleResponse = JSON.stringify([{title: 'Hello World!'}]);

const optionsResponse = JSON.stringify({sources: [{id: '1', name: "test"}]});

const articleResponse = JSON.stringify(
  {
    articles: [
      {
        source: {
           id: "buzzfeed",
           name: "Buzzfeed"
        },
        author: "ArCiGo",
        title: "Which TV Show Do You Belong In?",
        description: "Would you thrive in \"Friends\" or \"Game of Thrones\"?",
        url: "https://www.buzzfeed.com/paige00/what-tv-show-do-you-belong-in-fwki599jz",
        urlToImage: "https://img.buzzfeed.com/buzzfeed-static/static/2020-05/12/14/campaign_images/8acb476010ff/which-tv-show-do-you-belong-in-2-14604-1589293644-0_dblbig.jpg",
        publishedAt: "2020-05-13T20:37:31.8493743Z",
        content: "Sign up to the BuzzFeed Quizzes Newsletter - Binge on the latest quizzes delivered right to your inbox with the Quizzes newsletter!"
     }
    ]
  }
);

export {
  sampleResponse,
  optionsResponse,
  articleResponse
};