import { createCell, resetServiceValues } from "./cell.js";
import { getRandomNumber } from "./functions.js";

export let matrix = [];
export const width = 10;
export const height = 10;
export const bombsCount = 10;
export let cellsToWin = width * height - bombsCount;

const smileFaceTag = '<button><img src="./img/smile-face.png" alt="smile"></button>';

function isBomb(cell) {
  return cell === 1 ? true : false;
}

function generateMatrix(width = 10, height = 10, bombsCount = 10) {
  matrix = Array.from(
    { length: height },
    () => Array.from({ length: width }),
    () => false
  );
}

function generateHTML() {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const page = document.createElement("main");
  page.classList.add("page");

  const game = document.createElement("section");
  game.classList.add("game");

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game__container");

  const gameBody = document.createElement("div");
  gameBody.classList.add("game__body");
  //-----------------------------------------------------------------------
  const gameHeader = document.createElement("div");
  gameHeader.classList.add("game__header");

  const bombsCountElement = document.createElement("div");
  bombsCountElement.className = "header__bombs-count display";
  bombsCountElement.textContent = bombsCount;

  const restartButtonElement = document.createElement("div");
  restartButtonElement.classList.add("header__restart");
  restartButtonElement.innerHTML = smileFaceTag;
  restartButtonElement.addEventListener("click", newGame);

  const timerElement = document.createElement("div");
  timerElement.className = "header__timer display";
  timerElement.textContent = 0;

  gameHeader.append(bombsCountElement, restartButtonElement, timerElement);
  //-----------------------------------------------------------------------
  const gameField = document.createElement("div");
  gameField.classList.add("game__field");
  gameField.innerHTML = "";

  const fieldBody = document.createElement("div");
  fieldBody.classList.add("field__body");

  matrix.map((row, x) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("field__row");

    row = row.map((cell, y) => {
      matrix[x][y] = createCell(isBomb(matrix[x][y]), { x, y });
      const cellElement = matrix[x][y].createCellMarkup();

      rowElement.appendChild(cellElement);
      return matrix[x][y];
    });

    fieldBody.appendChild(rowElement);

    return row;
  });

  gameField.appendChild(fieldBody);
  //-----------------------------------------------------------------------
  const gameResult = document.createElement("div");
  gameResult.classList.add("game__result");

  const resultBody = document.createElement("div");
  resultBody.classList.add("result__body");

  const resultStatus = document.createElement("div");
  resultStatus.classList.add("result__status");
  resultStatus.textContent = "Win!";

  const resultTime = document.createElement("div");
  resultTime.classList.add("result__time");
  resultTime.textContent = "Time: ";

  const resultClicks = document.createElement("div");
  resultClicks.classList.add("result__clicks");
  resultClicks.textContent = "Clicks: ";

  resultBody.append(resultStatus, resultTime, resultClicks);
  gameResult.appendChild(resultBody);
  //-----------------------------------------------------------------------
  gameBody.append(gameHeader, gameField);
  gameContainer.append(gameBody, gameResult);
  game.appendChild(gameContainer);
  page.appendChild(game);
  wrapper.appendChild(page);
  document.body.insertAdjacentElement("afterbegin", wrapper);
}

export function setBombs(bombsCount, coordinates) {
  while (bombsCount) {
    const x = getRandomNumber(0, width - 1);
    const y = getRandomNumber(0, height - 1);

    if (!isBomb(matrix[x][y]) && coordinates.x !== x && coordinates.y !== y) {
      matrix[x][y].isBomb = true;
      bombsCount--;
    }
  }

  matrix.forEach((row) => {
    row.forEach((cell) => {
      cell.countBombs();
    });
  });
}

export function newGame() {
  cellsToWin = width * height - bombsCount;
  window.clearInterval(window.timer);

  generateMatrix(width, height, bombsCount);
  generateHTML();
  resetServiceValues();
}
