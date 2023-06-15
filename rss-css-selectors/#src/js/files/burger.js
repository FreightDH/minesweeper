import { bodyLockStatus, bodyLockToggle, bodyLock, bodyUnlock } from './functions.js';

// МЕНЮ-БУРГЕР
export function menuInit() {
  if (document.querySelector('.menu__icon')) {
    document.addEventListener('click', (event) => {
      if (bodyLockStatus && event.target.closest('.menu__icon')) {
        bodyLockToggle();
        document.documentElement.classList.toggle('menu-open');
        document.querySelector('.menu__body').classList.toggle('menu-open');
      }
    });
  }
}

export function menuOpen() {
  bodyLock();
  document.documentElement.classList.add('menu-open');
  document.querySelector('.menu__body').classList.add('menu-open');
}

export function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove('menu-open');
  document.querySelector('.menu__body').classList.remove('menu-open');
}
//----------------------------------------------------------------------
