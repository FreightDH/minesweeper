import { bodyLockStatus, bodyLockToggle, bodyLock, bodyUnlock } from './functions';

// МЕНЮ-БУРГЕР
export function menuInit() {
  if (document.querySelector('.menu__icon')) {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const menuBody = document.querySelector('.menu__body')!;

      if (bodyLockStatus && target.closest('.menu__icon')) {
        bodyLockToggle();
        document.documentElement.classList.toggle('menu-open');
        menuBody.classList.toggle('menu-open');
      }
    });
  }
}

export function menuOpen() {
  bodyLock();
  const menuBody = document.querySelector('.menu__body')!;
  document.documentElement.classList.add('menu-open');
  menuBody.classList.add('menu-open');
}

export function menuClose() {
  bodyUnlock();
  const menuBody = document.querySelector('.menu__body')!;
  document.documentElement.classList.remove('menu-open');
  menuBody.classList.remove('menu-open');
}
//----------------------------------------------------------------------
