import News from './news/news';
import Sources from './sources/sources';
import { DataSources, DataNews, Source, Article } from '../types';

class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: DataNews): void {
    const values: Article[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: DataSources): void {
    const values: Source[] = data?.sources ? data?.sources : [];
    this.sources.generateSourceFilter();
    this.sources.draw(values);
  }
}

export default AppView;
