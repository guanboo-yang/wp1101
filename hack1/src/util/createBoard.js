/****************************************************************************
  FileName      [ createBoard.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the pattern of mines and the board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import randomNum from './randomFixSeed'

const createBoard = (boardSize, mineNum) => {
	let board = []
	let mineLocations = []

	// Print Board function (For testing)
	// const printBoard = () => {
	// 	console.log('Current Board')
	// 	for (let x = 0; x < boardSize; x++) {
	// 		console.log(
	// 			board[x].map(x => {
	// 				return x.value !== '💣' ? x.value.toString() + ' ' : x.value
	// 			})
	// 		)
	// 	}
	// 	console.log(board)
	// }

	// Create a blank board
	for (let x = 0; x < boardSize; x++) {
		let subCol = []
		for (let y = 0; y < boardSize; y++) {
			subCol.push({
				value: 0, // To store the number of mines around the cell.
				revealed: false, // To store if the cell is revealed.
				x: x, // To store the x coordinate (the column index) of the cell.
				y: y, // To store the y coordinate (the row index) of the cell.
				flagged: false, // To store if the cell is flagged.
			})
		}
		board.push(subCol)
	}

	// Random bombs locations
	let mineCount = 0
	while (mineCount < mineNum) {
		let x = randomNum(0, boardSize - 1)
		let y = randomNum(0, boardSize - 1)

		if (board[x][y].value === 0) {
			// Check this location has not been located a mine.
			board[x][y].value = '💣' // Change the value of the cell to '💣'
			mineLocations.push([x, y])
			mineCount++
		}
	}

	/* -- TODO 2 -- */
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			if (board[x][y].value === '💣') continue
			for (let dx = -1; dx < 2; dx++) {
				for (let dy = -1; dy < 2; dy++) {
					if (x + dx < 0 || x + dx >= boardSize || y + dy < 0 || y + dy >= boardSize) continue
					if (board[x + dx][y + dy].value === '💣') board[x][y].value++
				}
			}
		}
	}
	/* Useful Hints: Calculate and update the value of each cell in the board. The value means the number of mines adjacent to the cell. */

	/* Reminder: Some cells in the board do not have "Top" position, some do not have "Top-Right" position .... */

	/* Warning: The value of any cell will not be bigger than 8 logically. */

	/* Testing: printBoard() */
	// printBoard()

	return { board, mineLocations }
}

export default createBoard
