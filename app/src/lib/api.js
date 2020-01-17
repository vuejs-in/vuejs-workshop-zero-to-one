const baseURL = 'https://hacker-news.firebaseio.com/v0';

const fetchItem = id => {
  return fetch(`${baseURL}/item/${id}.json`).then(res => res.json());
}

const getTopStories = () => {
  return fetch(baseURL + '/topstories.json').then(res => res.json());
};

export const getPaginatedTopStories = async (page = 1, count = 10) => {
  const allTopStories = await getTopStories();

  const idsToFetch = allTopStories.slice((page - 1) * count, page * count);

  return Promise.all(idsToFetch.map(fetchItem));
};
