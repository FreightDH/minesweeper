import { getAllNeighbours } from "./matrix.js";
import { showAllBombs } from "./matrix.js";
import { width, height, bombsCount } from "./matrix.js";

let isLost = false;
let isWin = false;
let timerStart = false;
let cellsToWin = 10 * 10 - 10;

const bombsCountDisplay = document.querySelector('.header__bombs-count');
const timerDisplay = document.querySelector('.header__timer');
const restartButton = document.querySelector('.header__restart');

// const fieldBody = document.querySelector('.field__body');
const sadFaceTag = '<button><img src="./img/sad-face.png" alt="smile"></button>'
const flagTag = '<img src="./img/flag.png" alt="flag">';
const bombTag = '<img src="./img/bomb.png" alt="bomb">';

export class Cell {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setFlag(isFlagged) {
    if (this.isOpen) return;

    if (isFlagged && +bombsCountDisplay.textContent > 0) {
      this.isFlagged = isFlagged;
      this.cell.innerHTML = flagTag;
      bombsCountDisplay.textContent--;
      this.cell.removeEventListener('click', () => this.onClick());
    } else if (!isFlagged && bombsCountDisplay.textContent == 0) {
      this.isFlagged = isFlagged;
      this.cell.innerHTML = '';
      bombsCountDisplay.textContent++;
      this.cell.addEventListener('click', () => this.onClick());
    } else if (isFlagged && +bombsCountDisplay.textContent == 0) {
      return;
    } else if (!isFlagged && bombsCountDisplay.textContent > 0) {
      this.isFlagged = isFlagged;
      this.cell.innerHTML = '';
      bombsCountDisplay.textContent++;
      this.cell.addEventListener('click', () => this.onClick());
    }
  }

  setValue(value) {
    this.value = value;
  }

  countBombs() {
    if (this.isBomb) {
      return;
    }

    const neighbours = getAllNeighbours(this.coordinates);
    let count = 0;

    neighbours.forEach((neighbour) => {
      if (neighbour === 1 || neighbour.isBomb) count++;
    })

    if (count) {
      this.setValue(count);
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
    if (isLost || this.isFlagged || isWin) return;

    if (!timerStart) {
      timerStart = true;
      
      window.timer = window.setInterval(() => {
        timerDisplay.textContent++;
      }, 1000);
    }
    
    if (this.isBomb) {
      showAllBombs();
      
      this.cell.classList.add('lose');
      this.openBomb();
      
      isLost = true;
      window.clearInterval(window.timer);
      restartButton.innerHTML = sadFaceTag;
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

    cellsToWin--;

    if (!cellsToWin) {
      isWin = true;
      window.clearInterval(window.timer);
    }

    this.open();
    console.log(cellsToWin);
  }

  createCellMarkup() {
    const cell = document.createElement('div');
    cell.classList.add('field__cell');

    if (this.value) {
      cell.classList.add(`color--${this.value}`);
    }

    this.cell = cell;
    this.cell.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (isLost || isWin) return;
      
      this.isFlagged ? this.setFlag(false) : this.setFlag(true);
      if (!timerStart) {
        timerStart = true;
        
        window.timer = window.setInterval(() => {
          timerDisplay.textContent++;
        }, 1000);
      }
    });

    this.cell.addEventListener('click', () => this.onClick());

    return cell;
  }
}

export function createCell(isBomb, coordinates) {
  const cell = new Cell(isBomb, coordinates);
  
  cell.countBombs();
  cellsToWin = 10 * 10 - 10;
  isLost = false;
  isWin = false;
  timerStart = false;
  
  return cell;
}