const ROWS = 8
const COLS = 8
const dirs = [
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
	[-1, 1],
]

let color

export const init = () => {
	color = -1
	let board = []
	for (let row = 0; row < 8; row++) {
		let subCol = []
		for (let col = 0; col < 8; col++) subCol.push({ color: 0, row: row, col: col, hint: false })
		board.push(subCol)
	}
	board[3][3].color = 1
	board[3][4].color = -1
	board[4][3].color = -1
	board[4][4].color = 1
	return { board }
}

const isOnBoard = (row, col) => {
	return 0 <= row && row < ROWS && 0 <= col && col < COLS
}

const isValidMove = (board, color, row, col) => {
	if (!isOnBoard(row, col) || board[row][col].color !== 0) return []
	board[row][col].color = color
	var tilesToFlip = []
	var x, y
	dirs.forEach(([xdir, ydir]) => {
		x = row + xdir
		y = col + ydir
		while (isOnBoard(x, y) && board[x][y].color === -color) {
			x += xdir
			y += ydir
		}
		if (!isOnBoard(x, y) || board[x][y].color !== color) return
		while (true) {
			x -= xdir
			y -= ydir
			if (x == row && y == col) break
			tilesToFlip.push([x, y])
		}
	})
	board[row][col].color = 0
	return tilesToFlip
	// console.log(tilesToFlip)
}

export const getValidMoves = (board, color) => {
	var i, j
	var validMoves = []
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (isValidMove(board, color, i, j).length > 0) validMoves.push([i, j])
		}
	}
	return validMoves
}

export const move = (board, color, row, col) => {
	var tilesToFlip = isValidMove(board, color, row, col)
	if (tilesToFlip.length === 0) {
		console.error('Invalid Move')
		return { board, validMoves: [], msg: 'Invalid Move' }
	}
	board[row][col].color = color
	tilesToFlip.forEach(([x, y]) => (board[x][y].color = color))
	color = -color
	var validMoves = getValidMoves(board, color)
	return { board, validMoves }
}

export const countScore = board => {
	let black = 0
	let white = 0
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			if (board[row][col].color === 1) white++
			if (board[row][col].color === -1) black++
		}
	}
	return { black, white }
}
