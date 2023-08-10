import { matrix, width, height, bombsCount, cellsToWin, setBombs, recordsArray, volume } from './init.js';

import songs from './sounds.js';

let firstClick = true;
let isLost = false;
let isWin = false;
let timerStart = false;
let currentCountCells = 0;
let clicksCount = 0;
let timerDisplay = '';
let bombsCountDisplay = '';

const sadFaceTag = '<button><img src="./img/sad-face.png" alt="smile"></button>';
const flagTag = '<img src="./img/flag.png" alt="flag">';
const bombTag = '<img src="./img/bomb.png" alt="bomb">';

function showAllBombs() {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isBomb) {
        cell.openBomb();
      }
    });
  });
}

function getAllNeighbours(coordinates) {
  const { x, y } = coordinates;
  const neighbours = [];

  // МИНЫ РЯДОМ
  if (x > 0 && matrix[x - 1][y]) neighbours.push(matrix[x - 1][y]);
  if (x < width - 1 && matrix[x + 1][y]) neighbours.push(matrix[x + 1][y]);
  if (y > 0 && matrix[x][y - 1]) neighbours.push(matrix[x][y - 1]);
  if (y < height - 1 && matrix[x][y + 1]) neighbours.push(matrix[x][y + 1]);

  // МИНЫ ПО УГЛАМ
  if (x > 0 && y > 0 && matrix[x - 1][y - 1]) neighbours.push(matrix[x - 1][y - 1]);
  if (x > 0 && y <= height - 1 && matrix[x - 1][y + 1]) neighbours.push(matrix[x - 1][y + 1]);
  if (x < width - 1 && y > 0 && matrix[x + 1][y - 1]) neighbours.push(matrix[x + 1][y - 1]);
  if (x < width - 1 && y < height - 1 && matrix[x + 1][y + 1]) neighbours.push(matrix[x + 1][y + 1]);

  return neighbours;
}

function startTimer() {
  timerStart = true;

  window.timer = window.setInterval(() => {
    timerDisplay.textContent++;
  }, 1000);
}

function showResult(status) {
  const result = document.querySelector('.game__result');
  const resultStatus = document.querySelector('.result__status');
  const resultTime = document.querySelector('.result__time');
  const resultClicks = document.querySelector('.result__clicks');

  result.classList.add('show');
  resultStatus.textContent = `${status}!`;
  resultStatus.classList.add(`${status.toLowerCase()}`);
  resultTime.textContent = `Time: ${timerDisplay.textContent} sec`;
  resultClicks.textContent = `Clicks: ${clicksCount}`;
}

function playAudio(type) {
  const audio = new Audio(songs[type]);
  audio.volume = volume;
  audio.play();
}

export function resetServiceValues() {
  timerDisplay = document.querySelector('.header__timer');
  bombsCountDisplay = document.querySelector('.header__bombs');
  isWin = false;
  isLost = false;
  clicksCount = 0;
  firstClick = true;
  timerStart = false;
  currentCountCells = cellsToWin;
}

class Cell {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setFlag(isFlagged) {
    if (this.isOpen) return;

    const currentBombsCount = parseInt(bombsCountDisplay.textContent);

    if (isFlagged) {
      if (currentBombsCount > 0) {
        this.isFlagged = isFlagged;
        this.cell.innerHTML = flagTag;
        bombsCountDisplay.textContent--;
        playAudio('flag');
      } else {
        return;
      }
    } else {
      this.isFlagged = isFlagged;
      this.cell.innerHTML = '';
      bombsCountDisplay.textContent++;
      playAudio('flag-off');
    }
  }

  setValue(value) {
    this.value = value;
  }

  countBombs() {
    if (this.isBomb) return;

    const neighbours = getAllNeighbours(this.coordinates);
    let count = 0;

    neighbours.forEach((neighbour) => {
      if (neighbour === 1 || neighbour.isBomb) count++;
    });

    if (count) {
      this.setValue(count);
      this.cell.classList.add(`color--${this.value}`);
    }
  }

  open() {
    this.isOpen = true;
    this.cell.classList.add('opened');
    this.showValue();
  }

  openBomb() {
    this.isOpen = true;
    this.cell.classList.add('opened');
    this.cell.innerHTML = bombTag;
  }

  showValue() {
    this.cell.innerHTML = this.value ? this.value : '';
  }

  onClick() {
    if (isLost || isWin) return;
    if (this.isFlagged || this.isOpen) {
      clicksCount--;
      return;
    }

    if (!timerStart) startTimer();

    if (firstClick) {
      firstClick = false;
      setBombs(bombsCount, this.coordinates);
    }

    if (this.isBomb) {
      const restartButton = document.querySelector('.header__restart');
      restartButton.innerHTML = sadFaceTag;

      const resultTime = timerDisplay.textContent;
      if (recordsArray.length === 10) {
        recordsArray.shift();
      }
      recordsArray.push(`Lose (${resultTime} sec, ${clicksCount} clicks)`);
      localStorage.setItem('records', recordsArray.join(' - '));

      this.cell.classList.add('lose');
      this.openBomb();

      showAllBombs();
      showResult('Lose');
      playAudio('lose');

      isLost = true;
      window.clearInterval(window.timer);
      return;
    }

    if (!this.value && !this.isOpen) {
      this.open();

      const neighbours = getAllNeighbours(this.coordinates);

      neighbours.forEach((neighbour) => {
        if (!neighbour.isOpen) {
          neighbour.onClick();
        }
      });
    }

    currentCountCells--;

    if (!currentCountCells) {
      const resultTime = timerDisplay.textContent;
      if (recordsArray.length === 10) {
        recordsArray.shift();
      }
      recordsArray.push(`Win (${resultTime} sec, ${clicksCount} clicks)`);
      localStorage.setItem('records', recordsArray.join(' - '));

      isWin = true;
      showAllBombs();
      showResult('Win');
      playAudio('win');
      window.clearInterval(window.timer);
    }

    this.open();
  }

  createCellMarkup() {
    const cell = document.createElement('div');
    cell.classList.add('field__cell');

    if (width === 25) cell.classList.add('small');

    this.cell = cell;

    this.cell.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (isLost || isWin) return;
      if (!timerStart) startTimer();

      this.isFlagged ? this.setFlag(false) : this.setFlag(true);
    });

    this.cell.addEventListener('click', () => {
      if (!this.isOpen && !this.isFlagged && !this.isBomb && !isLost && !isWin) playAudio('click');

      clicksCount++;
      this.onClick();

      // localStorage.setItem("gameField", JSON.stringify(matrix));
    });

    return cell;
  }
}

export function createCell(isBomb, coordinates) {
  const cell = new Cell(isBomb, coordinates);

  return cell;
}
