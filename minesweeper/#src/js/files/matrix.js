// import { getRandomNumber } from "./functions.js";

// // const cells = document.querySelectorAll('.field__cell');
// const gameField = document.querySelector('.game__field');
// const restartButton = document.querySelector('.header__restart');
// const bombTag = '<img src="./img/bomb.png" alt="bomb">';
// const flagTag = '<img src="./img/flag.png" alt="flag">';

// export let matrix = [];

// function isBomb(cell) {
//   return cell === -1 ? true : false;
// }

// function setBombs(bombCount) {
//   while (bombCount) {
//     const x = getRandomNumber(0, 9);
//     const y = getRandomNumber(0, 9);

//     if (!isBomb(matrix[x][y])) {
//       matrix[x][y] = -1;
//       bombCount--;
//     }
//   }
// }

// function fillField() {
//   const cells = document.querySelectorAll('.field__cell');
//   const matrixCopy = [].concat(...matrix);

//   cells.forEach((cell, index) => {
//     const cellValue = matrixCopy[index];
    
//     if (isBomb(cellValue)) {
//       cell.classList.add('bomb');
//       cell.insertAdjacentHTML('afterbegin', bombTag);
//     } else {
//       if (cellValue > 0) {
//         cell.textContent = cellValue;
//         cell.classList.add(`color--${cellValue}`);
//       } 
//     }
//   });
// }

// function countBombs() {
//   const N = matrix.length;
// 	const M = matrix[0].length;
// 	let count = 0;
	
// 	for (let i = 0; i < N; i++) {
//     for (let j = 0; j < M; j++) {
//       count = 0;
//       if (!isBomb(matrix[i][j])) {
//         // МИНЫ РЯДОМ
//         if(i > 0 && matrix[i - 1][j] === -1) count++;
//         if(i < N - 1 && matrix[i + 1][j] === -1) count++;
//         if(j > 0 && matrix[i][j - 1] === -1) count++;
//         if(j < M - 1 && matrix[i][j + 1] === -1) count++;
//         // МИНЫ ПО УГЛАМ
//         if(i > 0 && j > 0 && matrix[i - 1][j - 1] === -1) count++;
//         if(i > 0 && j <= M - 1 && matrix[i - 1][j + 1] === -1) count++;
//         if(i < N - 1 && j > 0 && matrix[i + 1][j - 1] === -1) count++;
//         if(i < N - 1 && j < M - 1 && matrix[i + 1][j + 1] === -1) count++;

//         matrix[i][j] = count;
//       }
//     }
//   }
// }

// function generateMatrix(width = 10, height = 10, bombCount = 10) {
//   matrix = Array.from({ length: width }, () =>
//     Array.from({ length: height }, () => 0)
//   );

//   setBombs(bombCount);
//   countBombs();
//   fillField();
// }

// function openCell(event) {
//   const cell = event.target;
//   const bomb = cell.closest('.bomb');

//   if (bomb) {
//     const bombs = document.querySelectorAll('.bomb');
//     bombs.forEach((bomb) => bomb.classList.add('opened'));
//     cell.classList.add('lose');
//     gameField.removeEventListener('click', openCell);
//     cell.classList.add('opened');
//     return;
//   }

//   if (!cell.textContent) {

//   }


//   cell.classList.add('opened');
// }

// function openAllEmptyCells() {
//   const cells = document.querySelectorAll('.field__cell');
//   const matrixCopy = [].concat(...matrix);

//   cells.forEach((cell, index) => {
//     const cellValue = matrixCopy[index];
    
//     if (isBomb(cellValue)) {
//       cell.classList.add('bomb');
//       cell.insertAdjacentHTML('afterbegin', bombTag);
//     } else {
//       if (cellValue > 0) {
//         cell.textContent = cellValue;
//         cell.classList.add(`color--${cellValue}`);
//       } 
//     }
//   });
// }

// function createCellTagsArray() {
//   const array = [];
//   const rows = document.querySelectorAll('.field__row');
  
//   rows.forEach(row => {
//     row.childNodes.forEach(cell => array.push(cell));
//   });

//   return array;
// }

// function getAllNeighbours(cell) {
//   console.log(matrix);
// }

// function generateHtml() {
//   const fieldBody = document.querySelector('.field__body');
//   fieldBody.innerHTML = '';
  
//   for (let i = 0; i < 10; i++) {
//     const row = document.createElement('div');
//     row.classList.add('field__row');
//     for (let j = 0; j < 10; j++) {
//       const cell = document.createElement('div');
//       cell.classList.add('field__cell');
//       row.appendChild(cell);
//     }

//     fieldBody.appendChild(row);
//   }
// }

// // function addFlag(event) {
// //   if (event.button === 2) {
// //     event.preventDefault();
// //     event.target.classList.add('flag');
// //     event.target.insertAdjacentHTML('afterbegin', flagTag);
// //   }
// // }

// function newGame() {
//   matrix = [];

//   generateHtml();
//   generateMatrix();
//   gameField.addEventListener('click', openCell);
// }

// newGame();

// // document.oncontextmenu=function(e){return false};

// // gameField.addEventListener('mousedown', function(event) {
// //   if (event.button === 2) {
// //     event.target.classList.add('flag');
// //     event.target.insertAdjacentHTML('afterbegin', flagTag);
// //   }
// // });
// restartButton.addEventListener('click', newGame);

import { getRandomNumber } from "./functions.js";
import { createCell } from "./cell.js";

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

function generateMatrix(width = 10, height = 10, bombCount = 10) {
  matrix = Array.from({ length: height }, () => 
  Array.from({ length: width }), () => false);

  setBombs(bombCount);

  matrix.map((row, x) => 
    row.map((cell, y) => 
      matrix[x][y] = createCell(isBomb(matrix[x][y]), { x, y })));
}

generateMatrix();