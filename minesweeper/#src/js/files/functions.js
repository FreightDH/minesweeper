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
