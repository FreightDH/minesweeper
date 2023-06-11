import './sources.css';
import { Source } from '../../types';

class Sources {
  public draw(data: Source[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#source__item--template');

    data.forEach((item) => {
      if (sourceItemTemp) {
        const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
        const sourceItemName = sourceClone.querySelector('.item__name');

        if (sourceItemName) sourceItemName.textContent = item.name;
        else throw new Error("Class 'item__name' doesn't exist.");

        sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      } else {
        throw new Error("ID source__item--template doesn't exist.");
      }
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
