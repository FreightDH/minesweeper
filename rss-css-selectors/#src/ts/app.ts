import '../scss/style.scss';
import * as myFunctions from './files/functions';
import * as menuFunctions from './files/burger';

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
myFunctions.isWebp();
// Модуль для работы с меню-бургер
menuFunctions.menuInit();
