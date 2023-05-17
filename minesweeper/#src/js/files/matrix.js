import { getRandomNumber } from "./functions.js";

const cells = document.querySelectorAll('.field__cell');
const bombTag = '<img src="./img/bomb.png" alt="bomb">';
const flagTag = '<img src="./img/flag.png" alt="flag">';

export let matrix = [];

function isBomb(cell) {
  return cell === -1 ? true : false;
}

function setBombs(bombCount) {
  while (bombCount) {
    const x = getRandomNumber(0, 9);
    const y = getRandomNumber(0, 9);
    
    if (!isBomb(matrix[x][y])) {
      matrix[x][y] = -1;
      bombCount--;
    }
  }
}

function fillField() {
  const matrixCopy = ([].concat(...matrix));

  cells.forEach((cell, index) => {
    const cellValue = matrixCopy[index];
    
    if (isBomb(cellValue)) {
      cell = cell.insertAdjacentHTML('afterbegin', bombTag);
    } else {
      if (cellValue > 0) {
        cell.textContent = cellValue;
        cell.classList.add(`color--${cellValue}`);
      } 
    }
  });
}

function countBombs() {
  const N = matrix.length;
	const M = matrix[0].length;
	let count = 0;
	
	for (let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      count = 0;
      if (!isBomb(matrix[i][j])) {
        // МИНЫ РЯДОМ
        if(i > 0 && matrix[i - 1][j] === -1) count++;
        if(i < N - 1 && matrix[i + 1][j] === -1) count++;
        if(j > 0 && matrix[i][j - 1] === -1) count++;
        if(j < M - 1 && matrix[i][j + 1] === -1) count++;
        // МИНЫ ПО УГЛАМ
        if(i > 0 && j > 0 && matrix[i - 1][j - 1] === -1) count++;
        if(i > 0 && j <= M - 1 && matrix[i - 1][j + 1] === -1) count++;
        if(i < N - 1 && j > 0 && matrix[i + 1][j - 1] === -1) count++;
        if(i < N - 1 && j < M - 1 && matrix[i + 1][j + 1] === -1) count++;

        matrix[i][j] = count;
      }
    }
  }
}

function generateMatrix(width = 10, height = 10, bombCount = 10) {
  matrix = Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );

  setBombs(bombCount);
  countBombs();
  fillField();

  console.log(matrix);
}

cells.forEach(cell => {
  cell.addEventListener('click', function (event) {
    cell.classList.add('opened');
  });
})

generateMatrix();