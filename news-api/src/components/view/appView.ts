import News from './news/news';
import Sources from './sources/sources';
import { DataSources, DataNews, Source, Article } from '../types';

export class AppView {
  constructor(public news: News, public sources: Sources) {}

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
