import './sources.css';
import { Source } from '../../types';

class Sources {
  draw(data: Source[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      if (sourceItemTemp) {
        const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
        const sourceItemName = sourceClone.querySelector('.source__item-name');

        if (sourceItemName) {
          sourceItemName.textContent = item.name;
        } else {
          throw new Error("Class 'source__item-name' doesn't exist.");
        }

        sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      } else {
        throw new Error("ID sourceItemTemp doesn't exist..");
      }
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
