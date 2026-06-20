/**
Connect4

Connect4 is a game where two players take turns placing a token on columns that drop to the bottom.
When a player forms 4 of his tokens in a line - horizontally, vertically,or diagonally - the player wins.

[Visualization](https://i.ebayimg.com/images/g/DzMAAOSwSjxj6m0e/s-l1600.jpg)

Implement Connect 4 with the class below.
*/

export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;

export class Connect4 {
  constructor({ width = 7, height = 6 } = {}) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => Array(width).fill(0));
    this.currentPlayer = PLAYER_ONE;
    this._winner = null;
  }

  play(col) {
    if (this._winner) return;
    if (col < 1 || col > this.width) return;

    const c = col - 1;
    let landingRow = -1;
    for (let r = this.height - 1; r >= 0; r--) {
      if (this.board[r][c] === 0) {
        landingRow = r;
        break;
      }
    }

    if (landingRow === -1) return;

    this.board[landingRow][c] = this.currentPlayer;

    if (this._checkWinner()) {
      this._winner = this.currentPlayer;
    } else {
      this.currentPlayer = this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    }
  }

  getValue(row, col) {
    if (row < 1 || row > this.height) return 0;
    if (col < 1 || col > this.width) return 0;
    return this.board[row - 1][col - 1];
  }

  winner() {
    return this._winner;
  }

  _checkWinner() {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        const player = this.board[r][c];
        if (player === 0) continue;

        for (const [dr, dc] of directions) {
          let count = 1;
          let nr = r + dr;
          let nc = c + dc;
          while (nr >= 0 && nr < this.height && nc >= 0 && nc < this.width && this.board[nr][nc] === player) {
            count++;
            if (count === 4) return true;
            nr += dr;
            nc += dc;
          }
        }
      }
    }
    return false;
  }

  print() {
    const symbols = { 0: ".", 1: "X", 2: "O" };
    for (const row of this.board) {
      console.log(row.map(c => symbols[c]).join(" "));
    }
  }
}
