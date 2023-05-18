import { getAllNeighbours } from "./matrix.js";
import { showAllBombs } from "./matrix.js";

// const fieldBody = document.querySelector('.field__body');
const flagTag = '<img src="./img/flag.png" alt="flag">';
const bombTag = '<img src="./img/bomb.png" alt="bomb">';

export class Cell {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setFlag(isFlagged) {
    this.isFlagged = isFlagged;
    if (isFlagged) {
      this.cell.innerHTML = flagTag;
      this.cell.removeEventListener('click', () => this.onClick());
    } else {
      this.cell.innerHTML = '';
      this.cell.addEventListener('click', () => this.onClick());
    }
  }

  setValue(value) {
    this.value = value;
  }

  countBombs() {
    if (this.isBomb) {
      this.setValue("bomb")
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
    if (this.isBomb) {
      showAllBombs();
      this.cell.classList.add('lose');
      this.openBomb();
      return;
    }
    
    if (!this.value && !this.isOpen) {
      this.open();
      const neighbours = getAllNeighbours(this.coordinates);
      neighbours.forEach((neighbour) => {
        if (!neighbour.isOpen) {
          neighbour.onClick();
        }
      })
    } 
    
    this.open();
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
      this.isFlagged ? this.setFlag(false) : this.setFlag(true);
    });

    this.cell.addEventListener('click', () => this.onClick());

    return cell;
  }
}

export function createCell(isBomb, coordinates) {
  const cell = new Cell(isBomb, coordinates);
  
  cell.countBombs();
  
  return cell;
}