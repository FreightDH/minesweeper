import './news.css';
import { Article } from '../../types';

class News {
  public draw(data: Article[]): void {
    const news: Article[] = data.length >= 10 ? data.filter((_item, index) => index < 10) : data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = document.querySelector('#news__item--template')!;

    news.forEach((item, index) => {
      const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      if (index % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const newsPhoto: HTMLElement = newsClone.querySelector('.meta__photo')!;
      const newsAuthor: Element = newsClone.querySelector('.meta__author')!;
      const newsDate: Element = newsClone.querySelector('.meta__date')!;
      const newsTitle: Element = newsClone.querySelector('.description__title')!;
      const newsSource: Element = newsClone.querySelector('.description__source')!;
      const newsContent: Element = newsClone.querySelector('.description__content')!;
      const newsReadMore: Element = newsClone.querySelector('.description__readmore a')!;

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
