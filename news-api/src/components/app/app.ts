import AppController from '../controller/controller';
import AppView from '../view/appView';
import { DataNews, DataSources } from '../types';

class App {
  public controller;
  public view;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sources = document.querySelector('.sources__sources')!;
    const sourcesFilter = document.querySelector('.sources__filter')!;

    sourcesFilter.addEventListener('click', (e: Event) => {
      this.controller.getSources((data) => this.view.drawSources(e, data as DataSources));
    });

    sources.addEventListener('click', (e: Event) =>
      this.controller.getNews(e, (data) => this.view.drawNews(data as DataNews)),
    );
  }
}

export default App;
