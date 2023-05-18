class Cell {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  createCellMarkup() {
    const cell = document.createElement('div');
    cell.classList.add('field__cell');

    if (this.value) {
      cell.classList.add(`color--${this.value}`);
    }
  }
}

export function createCell(isBomb, coordinates) {
  const cell = new Cell(isBomb, coordinates);

  cell.createCellMarkup();

  return cell;
}