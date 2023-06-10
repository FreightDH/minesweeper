import News from './news/news';
import Sources from './sources/sources';
import { Data, DataSources, DataNews, Source, Article } from '../types';

export class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: DataNews) {
    const values: Article[] = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: DataSources) {
    const values: Source[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
