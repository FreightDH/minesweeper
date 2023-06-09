import AppLoader from './appLoader';
import { Data } from '../types';

class AppController extends AppLoader {
  getSources(callback: (data: Data) => void) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: (data: Data) => void): void | undefined {
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
        }
        return;
      }

      target = target.parentNode as Element;
    }
  }
}

export default AppController;
