import Loader from './loader.js';

class AppLoader extends Loader {
  constructor() {
    super('http://127.0.0.1:8075/', {
      apiKey: 'e701106342834977a2958d1a769d7859',
    });
  }
}

export default AppLoader;
