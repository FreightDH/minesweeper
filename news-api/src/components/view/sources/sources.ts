import { Source } from '../../types';

class Sources {
  public generateSourceFilter(): void {
    const fragment = document.createDocumentFragment();
    const sourcesFilter = document.querySelector('.sources__filter')!;
    const filterButtonAll = document.createElement('div');

    filterButtonAll.className = 'filter__button button--all';
    filterButtonAll.textContent = 'All';

    for (let i = 65; i < 91; i++) {
      const filterButton = document.createElement('div');
      filterButton.classList.add('filter__button');
      filterButton.textContent = String.fromCharCode(i);
      fragment.append(filterButton);
    }

    sourcesFilter.innerHTML = '';
    sourcesFilter.append(fragment, filterButtonAll);
  }

  public draw(data: Source[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sources__item--template')!;

    data.forEach((item) => {
      if (sourceItemTemp) {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
        const sourceItemName = sourceClone.querySelector('.item__name');

        if (sourceItemName) sourceItemName.textContent = item.name;
        else throw new Error("Class 'item__name' doesn't exist.");

        sourceClone.querySelector('.sources__item')?.setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      } else {
        throw new Error("ID source__item--template doesn't exist.");
      }
    });

    const sources = document.querySelector('.sources__sources')!;
    sources.innerHTML = '';
    sources.append(fragment);
  }
}

export default Sources;
