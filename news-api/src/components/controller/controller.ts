import AppLoader from './appLoader';
import { Endpoint } from '../types';

class AppController extends AppLoader {
  public getSources(callback: <T>(data: T) => void): void {
    super.getResp(
      {
        endpoint: Endpoint.Sources,
      },
      callback,
    );
  }

  public getNews(e: Event, callback: <T>(data: T) => void): void {
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
              endpoint: Endpoint.Everything,
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
