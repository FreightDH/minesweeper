import News from './news/news';
import Sources from './sources/sources';
import { DataSources, DataNews } from '../types';

class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    this.sources.generateSourceFilter();
  }

  public drawNews(data: DataNews): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(e: Event, data: DataSources): void {
    let values = data?.sources ? data?.sources : [];
    const target = e.target as HTMLElement;
    const letter = target.textContent?.toLowerCase();

    if (letter !== 'all') {
      values = values.filter((source) => source.id[0] === letter);
    }

    this.sources.draw(values);
  }
}

export default AppView;
