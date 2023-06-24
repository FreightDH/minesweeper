import AppController from '../controller/controller';
import AppView from '../view/appView';
import { Data, DataNews, DataSources } from '../types';

class App {
  constructor(public controller: AppController, public view: AppView) {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sources = document.querySelector('.sources__sources')!;
    const sourcesFilter = document.querySelector('.sources__filter')!;

    sourcesFilter.addEventListener('click', (e: Event) => {
      this.controller.getSources((data: Data) => this.view.drawSources(e, data as DataSources));
    });

    sources.addEventListener('click', (e: Event) =>
      this.controller.getNews(e, (data: Data) => this.view.drawNews(data as DataNews)),
    );
  }
}

export default App;
