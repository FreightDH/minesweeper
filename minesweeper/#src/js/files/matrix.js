import { getRandomNumber } from "./functions.js";

const cells = document.querySelectorAll('.field__cell');

export let matrix = [];

function isBomb(cell) {
  return cell === 1 ? true : false;
}

function setBombs(bombCount) {
  while (bombCount) {
    const x = getRandomNumber(0, 9);
    const y = getRandomNumber(0, 9);
    
    if (!isBomb(matrix[x][y])) {
      matrix[x][y] = 1;
      bombCount--;
    }
  }
}

function fillField() {
  const matrixCopy = ([].concat(...matrix));
  cells.forEach((cell, index) => cell.textContent = matrixCopy[index]);
}

function generateMatrix(width = 10, height = 10, bombCount = 10) {
  matrix = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );

  setBombs(bombCount);
  fillField();

  console.log(matrix);
}

generateMatrix();