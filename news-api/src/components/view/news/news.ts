import { Article } from '../../types';

class News {
  public draw(data: Article[]): void {
    const MAX_LENGTH = 10;
    const news = data.length > MAX_LENGTH ? data.slice(0, MAX_LENGTH) : data;
    const fragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = document.querySelector('#news__item--template')!;

    news.forEach((item, index) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      if (index % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const newsPhoto: HTMLElement = newsClone.querySelector('.meta__photo')!;
      const newsAuthor = newsClone.querySelector('.meta__author')!;
      const newsDate = newsClone.querySelector('.meta__date')!;
      const newsTitle = newsClone.querySelector('.description__title')!;
      const newsSource = newsClone.querySelector('.description__source')!;
      const newsContent = newsClone.querySelector('.description__content')!;
      const newsReadMore = newsClone.querySelector('.description__readmore a')!;

      newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsAuthor.textContent = item.author || item.source.name;
      newsDate.textContent = item.publishedAt.slice(0, MAX_LENGTH).split('-').reverse().join('-');
      newsTitle.textContent = item.title;
      newsSource.textContent = item.source.name;
      newsContent.textContent = item.description;
      newsReadMore.setAttribute('href', item.url);
      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news__body')!;

    newsElement.innerHTML = '';
    newsElement.appendChild(fragment);
  }
}

export default News;
