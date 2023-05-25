import { createCell, resetServiceValues } from "./cell.js";
import { getRandomNumber } from "./functions.js";

export let matrix = [];
export let width = 10;
export let height = 10;
export let bombsCount = 10;
export let cellsToWin = width * height - bombsCount;
export let recordsArray = [];
export let volume = 1;

const smileFaceTag =
  '<button><img src="./img/smile-face.png" alt="smile"></button>';

function isBomb(cell) {
  return cell === 1 ? true : false;
}

function generateMatrix(width, height) {
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
  bombsCountElement.className = "header__bombs display";
  bombsCountElement.textContent = bombsCount;

  const restartButtonElement = document.createElement("div");
  restartButtonElement.classList.add("header__restart");
  restartButtonElement.innerHTML = smileFaceTag;
  restartButtonElement.addEventListener("click", () =>
    newGame(width, height, bombsCount)
  );

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
  const settings = document.createElement("section");
  settings.classList.add("settings");

  const settingsButton = document.createElement("div");
  settingsButton.classList.add("settings__button");
  settingsButton.innerHTML =
    '<img src="./img/settings.svg" alt="settings-icon">';
  settingsButton.addEventListener("click", (event) => {
    settingsBody.classList.toggle("opened");
  });

  const settingsBody = document.createElement("div");
  settingsBody.classList.add("settings__body");

  const settingsDifficulty = document.createElement("div");
  settingsDifficulty.classList.add("settings__difficulty");

  const settingsOptionEasy = document.createElement("button");
  settingsOptionEasy.className = "difficulty__option active";
  settingsOptionEasy.textContent = "Easy";
  settingsOptionEasy.addEventListener("click", (event) => {
    localStorage.setItem("difficulty", "easy");

    width = 10;
    height = 10;
    bombsCount = 10;
    input.value = bombsCount;
    newGame(width, height, bombsCount);
  });

  const divider_1 = document.createElement("span");
  divider_1.textContent = " / ";

  const settingsOptionMedium = document.createElement("button");
  settingsOptionMedium.classList.add("difficulty__option");
  settingsOptionMedium.textContent = "Medium";
  settingsOptionMedium.addEventListener("click", (event) => {
    localStorage.setItem("difficulty", "medium");

    width = 15;
    height = 15;
    bombsCount = 40;
    input.value = bombsCount;
    newGame(width, height, bombsCount);
  });

  const divider_2 = document.createElement("span");
  divider_2.textContent = " / ";

  const settingsOptionHard = document.createElement("button");
  settingsOptionHard.classList.add("difficulty__option");
  settingsOptionHard.textContent = "Hard";
  settingsOptionHard.addEventListener("click", (event) => {
    localStorage.setItem("difficulty", "hard");

    width = 25;
    height = 25;
    bombsCount = 99;
    input.value = bombsCount;
    newGame(width, height, bombsCount);
  });

  const difficulty = localStorage.getItem("difficulty");
  const options = [
    settingsOptionEasy,
    settingsOptionMedium,
    settingsOptionHard,
  ];
  options.forEach((option) => {
    if (difficulty) {
      option.classList.remove("active");
    }
    if (option.textContent.toLowerCase() === difficulty) {
      option.classList.add("active");
    }
  });

  settingsDifficulty.append(
    settingsOptionEasy,
    divider_1,
    settingsOptionMedium,
    divider_2,
    settingsOptionHard
  );

  const settingsBombs = document.createElement("div");
  settingsBombs.classList.add("settings__bombs");
  settingsBombs.innerHTML = `Bombs:\n\t<input type="number" name="bombs" min="10" max="99" value="${bombsCount}" class="input">`;

  const input = settingsBombs.children[0];
  input.addEventListener("change", (event) => {
    if (difficulty === "easy" && input.value > 40) {
      bombsCount = 40;
    } else if (difficulty === "medium" && input.value > 85) {
      bombsCount = 85;
    } else {
      bombsCount = input.value;
    }
    newGame(width, height, bombsCount);
  });

  const settingsRecords = document.createElement("button");
  settingsRecords.classList.add("settings__records");
  settingsRecords.textContent = "Show records";
  settingsRecords.addEventListener("click", (event) => {
    records.classList.add("opened");
  });

  const settingsTheme = document.createElement("div");
  settingsTheme.classList.add("settings__theme");

  const settingsOptionLight = document.createElement("button");
  settingsOptionLight.className = "theme__option active";
  settingsOptionLight.textContent = "Light";
  settingsOptionLight.addEventListener("click", (event) => {
    page.classList.remove("dark");
    gameBody.classList.remove("dark");
    gameHeader.classList.remove("dark");
    bombsCountElement.classList.remove("dark");
    restartButtonElement.classList.remove("dark");
    timerElement.classList.remove("dark");
    fieldBody.classList.remove("dark");
    resultBody.classList.remove("dark");
    settingsBody.classList.remove("dark");
    settingsOptionEasy.classList.remove("dark");
    settingsOptionMedium.classList.remove("dark");
    settingsOptionHard.classList.remove("dark");
    settingsOptionDark.classList.remove("dark");
    settingsOptionDark.classList.remove("active");
    settingsOptionLight.className = "theme__option dark active";
    input.classList.remove("dark");
    recordsContent.classList.remove("dark");

    if (settingsVolume.classList.contains('off')) {
      settingsVolume.innerHTML = '<img src="./img/volume-off.svg" alt="volume">';   
    } else {
      settingsVolume.innerHTML = '<img src="./img/volume.svg" alt="volume">'; 
    }

    const cells = document.querySelectorAll(".field__cell");
    cells.forEach((cell) => {
      cell.classList.remove("dark");
    });

    const recordsItems = document.querySelectorAll(".records__item");
    recordsItems.forEach((item) => {
      item.classList.remove("dark");
    });

    settingsButton.innerHTML =
      '<img src="./img/settings.svg" alt="settings-icon">';
    recordsClose.innerHTML = '<img src="./img/cross.svg" alt="cross">';

    localStorage.setItem("theme", "light");
  });

  const divider_3 = document.createElement("span");
  divider_3.textContent = " / ";

  const settingsOptionDark = document.createElement("button");
  settingsOptionDark.classList.add("theme__option");
  settingsOptionDark.textContent = "Dark";
  settingsOptionDark.addEventListener("click", (event) => {
    page.classList.add("dark");
    gameBody.classList.add("dark");
    gameHeader.classList.add("dark");
    bombsCountElement.classList.add("dark");
    restartButtonElement.classList.add("dark");
    timerElement.classList.add("dark");
    fieldBody.classList.add("dark");
    resultBody.classList.add("dark");
    settingsBody.classList.add("dark");
    settingsOptionEasy.classList.add("dark");
    settingsOptionMedium.classList.add("dark");
    settingsOptionHard.classList.add("dark");
    settingsOptionLight.classList.add("dark");
    settingsOptionLight.classList.remove("active");
    settingsOptionDark.className = "theme__option dark active";
    input.classList.add("dark");
    recordsContent.classList.add("dark");

    if (settingsVolume.classList.contains('off')) {
      settingsVolume.innerHTML = '<img src="./img/volume-off-dark.svg" alt="volume">';   
    } else {
      settingsVolume.innerHTML = '<img src="./img/volume-dark.svg" alt="volume">'; 
    }

    const cells = document.querySelectorAll(".field__cell");
    cells.forEach((cell) => {
      cell.classList.add("dark");
    });

    const recordsItems = document.querySelectorAll(".records__item");
    recordsItems.forEach((item) => {
      item.classList.add("dark");
    });

    settingsButton.innerHTML =
      '<img src="./img/settings-dark.svg" alt="settings-icon">';
    recordsClose.innerHTML = '<img src="./img/cross-dark.svg" alt="cross">';

    localStorage.setItem("theme", "dark");
  });

  settingsTheme.append(settingsOptionLight, divider_3, settingsOptionDark);

  const settingsVolume = document.createElement('div');
  settingsVolume.classList.add('settings__volume');

  if (volume === 1) {
    settingsVolume.innerHTML = '<img src="./img/volume.svg" alt="volume">';
    console.log('work');
  } else {
    settingsVolume.innerHTML = '<img src="./img/volume-off.svg" alt="volume">';
  }
  
  settingsVolume.addEventListener('click', (event) => { 
    if (volume === 1){
      settingsVolume.innerHTML = '<img src="./img/volume-off.svg" alt="volume">';
      volume = 0;
    } else {
      settingsVolume.innerHTML = '<img src="./img/volume.svg" alt="volume">';
      volume = 1;
    }
  });

  settingsBody.append(
    settingsDifficulty,
    settingsBombs,
    settingsRecords,
    settingsTheme, 
    settingsVolume,
  );

  settings.append(settingsButton, settingsBody);

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".settings__body") &&
      !event.target.closest(".settings__button")
    ) {
      settingsBody.classList.remove("opened");
    }
  });
  //-----------------------------------------------------------------------
  const records = document.createElement("section");
  records.classList.add("records");
  records.addEventListener("click", (event) => {
    if (!event.target.closest("records__content")) {
      records.classList.remove("opened");
    }
  });

  const recordsBody = document.createElement("div");
  recordsBody.classList.add("records__body");

  const recordsContent = document.createElement("div");
  recordsContent.classList.add("records__content");

  const recordsClose = document.createElement("div");
  recordsClose.classList.add("records__close");
  recordsClose.innerHTML = '<img src="./img/cross.svg" alt="cross">';
  recordsClose.addEventListener("click", (event) => {
    records.classList.remove("opened");
  });

  const recordsList = document.createElement("ul");
  recordsList.classList.add("records__list");
  recordsArray.forEach((record, index) => {
    const recordsItem = document.createElement("li");
    recordsItem.classList.add("records__item");
    recordsItem.textContent = `${index + 1}. ${record} `;
    recordsList.appendChild(recordsItem);
  });

  recordsContent.append(recordsClose, recordsList);
  recordsBody.appendChild(recordsContent);
  records.appendChild(recordsBody);
  //-----------------------------------------------------------------------
  gameBody.append(gameHeader, gameField);
  gameContainer.append(gameBody, gameResult);
  game.appendChild(gameContainer);
  page.append(game, settings, records);
  wrapper.appendChild(page);
  document.body.insertAdjacentElement("afterbegin", wrapper);

  const theme = localStorage.getItem("theme");
  if (theme) {
    switch (theme) {
      case "light": {
        page.classList.remove("dark");
        gameBody.classList.remove("dark");
        gameHeader.classList.remove("dark");
        bombsCountElement.classList.remove("dark");
        restartButtonElement.classList.remove("dark");
        timerElement.classList.remove("dark");
        fieldBody.classList.remove("dark");
        resultBody.classList.remove("dark");
        settingsBody.classList.remove("dark");
        settingsOptionEasy.classList.remove("dark");
        settingsOptionMedium.classList.remove("dark");
        settingsOptionHard.classList.remove("dark");
        settingsOptionDark.classList.remove("dark");
        settingsOptionDark.classList.remove("active");
        settingsOptionLight.className = "theme__option dark active";
        input.classList.remove("dark");
        recordsContent.classList.remove("dark");
        
        if (volume === 0) {
          settingsVolume.innerHTML = '<img src="./img/volume-off.svg" alt="volume">';   
        } else {
          settingsVolume.innerHTML = '<img src="./img/volume.svg" alt="volume">'; 
        }

        const cells = document.querySelectorAll(".field__cell");
        cells.forEach((cell) => {
          cell.classList.remove("dark");
        });

        const recordsItems = document.querySelectorAll(".records__item");
        recordsItems.forEach((item) => {
          item.classList.remove("dark");
        });

        settingsButton.innerHTML =
          '<img src="./img/settings.svg" alt="settings-icon">';
        recordsClose.innerHTML = '<img src="./img/cross.svg" alt="cross">';
        break;
      }
      case "dark": {
        page.classList.add("dark");
        gameBody.classList.add("dark");
        gameHeader.classList.add("dark");
        bombsCountElement.classList.add("dark");
        restartButtonElement.classList.add("dark");
        timerElement.classList.add("dark");
        fieldBody.classList.add("dark");
        resultBody.classList.add("dark");
        settingsBody.classList.add("dark");
        settingsOptionEasy.classList.add("dark");
        settingsOptionMedium.classList.add("dark");
        settingsOptionHard.classList.add("dark");
        settingsOptionLight.classList.add("dark");
        settingsOptionLight.classList.remove("active");
        settingsOptionDark.className = "theme__option dark active";
        input.classList.add("dark");
        recordsContent.classList.add("dark");
        
        if (volume === 0) {
          settingsVolume.innerHTML = '<img src="./img/volume-off-dark.svg" alt="volume">';   
        } else {
          settingsVolume.innerHTML = '<img src="./img/volume-dark.svg" alt="volume">'; 
        }

        const cells = document.querySelectorAll(".field__cell");
        cells.forEach((cell) => {
          cell.classList.add("dark");
        });

        const recordsItems = document.querySelectorAll(".records__item");
        recordsItems.forEach((item) => {
          item.classList.add("dark");
        });

        settingsButton.innerHTML =
          '<img src="./img/settings-dark.svg" alt="settings-icon">';
        recordsClose.innerHTML = '<img src="./img/cross-dark.svg" alt="cross">';
        break;
      }
    }
  }
}

export function setBombs(bombsCount, coordinates) {
  while (bombsCount) {
    const x = getRandomNumber(0, width - 1);
    const y = getRandomNumber(0, height - 1);

    if (!matrix[x][y].isBomb && coordinates.x !== x && coordinates.y !== y) {
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

export function newGame(width = 10, height = 10, bombsCount = 10) {
  document.body.innerHTML = "";
  cellsToWin = width * height - bombsCount;
  window.clearInterval(window.timer);

  generateMatrix(width, height);
  generateHTML();
  resetServiceValues();
}

function getLocalStorage() {
  const records = localStorage.getItem("records");
  const recordsList = document.querySelector(".records__list");

  if (records) {
    recordsArray = records.split(" - ");
    recordsArray.forEach((record, index) => {
      const recordsItem = document.createElement("li");
      recordsItem.classList.add("records__item");
      recordsItem.textContent = `${index + 1}. ${record}`;
      recordsList.appendChild(recordsItem);
    });
  }

  const difficulty = localStorage.getItem("difficulty");

  if (difficulty) {
    const input = document.querySelector(".input");

    switch (difficulty) {
      case "easy": {
        width = 10;
        height = 10;
        bombsCount = 10;
        input.value = bombsCount;
        newGame(width, height, bombsCount);
        break;
      }
      case "medium": {
        width = 15;
        height = 15;
        bombsCount = 40;
        input.value = bombsCount;
        newGame(width, height, bombsCount);
        break;
      }
      case "hard": {
        width = 25;
        height = 25;
        bombsCount = 99;
        input.value = bombsCount;
        newGame(width, height, bombsCount);
        break;
      }
    }
  }
  const options = document.querySelectorAll(".difficulty__option");
  options.forEach((option) => {
    option.classList.remove("active");
    if (option.textContent.toLowerCase() === difficulty) {
      option.classList.add("active");
    }
  });
}

window.addEventListener("load", getLocalStorage);
