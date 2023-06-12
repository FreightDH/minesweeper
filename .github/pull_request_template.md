1. Task: [link](https://github.com/)
2. Screenshot:
3. Deploy: [link](https://github.com/)

4. Done ... / deadline 23.05.2023
5. Score: ... / 180

   **Basic scope**

- [ ] Layout, design, responsive UI. (0/10)
- [ ] At the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default. (0/10)
- [ ] When user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine.(0/10)
- [ ] The game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game. (0/10)

**Advanced scope**

- [ ] Mines are placed after the first move, so that user cannot lose on the first move. (0/20)
- [ ] User can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags. (0/10)
- [ ] The game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell. (0/10)
- [ ] The game can be restarted without reloading the page. (0/10)
- [ ] Game duration and number of clicks are displayed. (0/15)
- [ ] When user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers. (0/15)

**Hacker scope**

- [ ] Sound accompaniment (on/off) when clicking on cell and at the end of the game. (0/10)
- [ ] Implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99). (0/20)
- [ ] Implemented saving the latest 10 results using LocalStorage. (0/10)
- [ ] Implemented saving the state of the game. (0/10)
- [ ] Option to choose different themes for the game board (dark/light themes). (0/10)
