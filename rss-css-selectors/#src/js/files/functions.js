// ПРОВЕРКА ПОДДЕРЖКИ WEBP
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      callback(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP((support) => {
    const className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}
//----------------------------------------------------------------------
// МОДУЛИ БЛОКИРОВКИ ПРОКРУТКИ
export let bodyLockStatus = true;

export const bodyUnlock = (delay = 300) => {
  const body = document.querySelector('body');
  if (bodyLockStatus) {
    const lockPadding = document.querySelectorAll('[data-lp]');
    setTimeout(() => {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(() => {
      bodyLockStatus = true;
    }, delay);
  }
};

export const bodyLock = (delay = 300) => {
  const body = document.querySelector('body');
  if (bodyLockStatus) {
    const lockPadding = document.querySelectorAll('[data-lp]');
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;
    }
    body.style.paddingRight = `${window.innerWidth - document.querySelector('.wrapper').offsetWidth}px`;
    document.documentElement.classList.add('lock');

    bodyLockStatus = false;
    setTimeout(() => {
      bodyLockStatus = true;
    }, delay);
  }
};

export const bodyLockToggle = (delay = 300) => {
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
//----------------------------------------------------------------------
// ДРУГОЕ

// ГЕНЕРАЦИЯ СЛУЧАЙНОГО ЧИСЛА, ВКЛЮЧАЯ MIN и MAX
export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//----------------------------------------------------------------------

// ПЕРЕМЕШИВАНИЕ МАССИВА
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
//----------------------------------------------------------------------

//----------------------------------------------------------------------
