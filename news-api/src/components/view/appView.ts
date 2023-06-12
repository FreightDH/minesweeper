import News from './news/news';
import Sources from './sources/sources';
import { DataSources, DataNews, Source, Article } from '../types';

class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    this.sources.generateSourceFilter();
  }

  public drawNews(data: DataNews): void {
    const values: Article[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(e: Event, data: DataSources): void {
    let values: Source[] = data?.sources ? data?.sources : [];
    const target: Element = e.target as Element;
    const letter = target.textContent?.toLowerCase();

    if (letter !== 'all') {
      values = values.filter((source) => source.id[0] === target.textContent?.toLowerCase());
    }

    this.sources.draw(values);
  }
}

export default AppView;
