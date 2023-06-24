import AppLoader from './appLoader';
import { Data, Endpoint } from '../types';

class AppController extends AppLoader {
  public getSources(callback: (data: Data) => void): void {
    super.getResp(
      {
        endpoint: Endpoint.sources,
      },
      callback,
    );
  }

  public getNews(e: Event, callback: (data: Data) => void): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target && target.classList.contains('sources__item')) {
        const sourceId = target.getAttribute('data-source-id');

        if (!sourceId) throw new Error(`${target} doesn't contains attribute data-source-id`);

        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);

          super.getResp(
            {
              endpoint: Endpoint.everything,
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }

      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
