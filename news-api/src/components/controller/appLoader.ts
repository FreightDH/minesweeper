import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: 'e701106342834977a2958d1a769d7859',
    });
  }
}

export default AppLoader;
