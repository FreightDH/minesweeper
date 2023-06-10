import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Data, DataNews, DataSources } from '../types';

class App {
  public controller: AppController;
  public view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sources: Element | null = document.querySelector('.sources');

    if (sources) {
      sources.addEventListener('click', (e: Event) =>
        this.controller.getNews(e, (data: Data) => this.view.drawNews(data as DataNews)),
      );
    }

    this.controller.getSources((data: Data) => this.view.drawSources(data as DataSources));
  }
}

export default App;
