import './news.css';
import { Article } from '../../types';

class News {
  public draw(data: Article[]): void {
    const news: Article[] = data.length >= 10 ? data.filter((_item, index) => index < 10) : data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp')!;

    news.forEach((item, index) => {
      const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      if (index % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const newsPhoto: HTMLElement = newsClone.querySelector('.news__meta-photo')!;
      const newsAuthor: Element = newsClone.querySelector('.news__meta-author')!;
      const newsDate: Element = newsClone.querySelector('.news__meta-date')!;
      const newsTitle: Element = newsClone.querySelector('.news__description-title')!;
      const newsSource: Element = newsClone.querySelector('.news__description-source')!;
      const newsContent: Element = newsClone.querySelector('.news__description-content')!;
      const newsReadMore: Element = newsClone.querySelector('.news__read-more a')!;

      newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsAuthor.textContent = item.author || item.source.name;
      newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      newsTitle.textContent = item.title;
      newsSource.textContent = item.source.name;
      newsContent.textContent = item.description;
      newsReadMore.setAttribute('href', item.url);
      fragment.append(newsClone);
    });

    const newsElement: Element = document.querySelector('.news')!;

    newsElement.innerHTML = '';
    newsElement.appendChild(fragment);
  }
}

export default News;
