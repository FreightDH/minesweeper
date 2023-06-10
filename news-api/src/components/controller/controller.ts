import AppLoader from './appLoader';
import { Data } from '../types';

class AppController extends AppLoader {
  public getSources(callback: (data: Data) => void): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(e: Event, callback: (data: Data) => void): void {
    let target: Element = e.target as Element;
    const newsContainer: Element = e.currentTarget as Element;

    while (target !== newsContainer) {
      if (target && target.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');

        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);

          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        } else {
          throw new Error(`${target} doesn't contains attribute data-source-id`);
        }
        return;
      }

      target = target.parentNode as Element;
    }
  }
}

export default AppController;
