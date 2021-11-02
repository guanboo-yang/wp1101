/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
	/* -- TODO 4-2 -- */
	/* Useful Hint: If the cell is already revealed, do nothing. */
	if (board[x][y].revealed === true) return { board, newNonMinesCount }
	/* Useful Hint: If the value of the cell is not 0, only show the cell value. */
	if (board[x][y].value !== 0) {
		board[x][y].revealed = true
		newNonMinesCount--
		return { board, newNonMinesCount }
	}

	/* -- TODO 4-2 -- */
	/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */
	/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */
	let boardSize = board.length
	newNonMinesCount--
	for (let dx = -1; dx < 2; dx++) {
		for (let dy = -1; dy < 2; dy++) {
			if (x + dx < 0 || x + dx >= boardSize || y + dy < 0 || y + dy >= boardSize) continue
			console.log(x + dx, y + dy)
			board[x][y].revealed = true
			let ret = revealed(board, x + dx, y + dy, newNonMinesCount)
			board = ret.board
			newNonMinesCount = ret.newNonMinesCount
		}
	}

	return { board, newNonMinesCount }
}
