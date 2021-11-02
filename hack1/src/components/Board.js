/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react'
import Cell from './Cell'
import Modal from './Modal'
import Dashboard from './Dashboard'
import createBoard from '../util/createBoard'
import { revealed } from '../util/reveal'
import './css/Board.css'

const Board = ({ boardSize, mineNum, backToHome }) => {
	const [board, setBoard] = useState([]) // An 2-dimentional array. It is used to store the board.
	const [nonMineCount, setNonMineCount] = useState(0) // An integer variable to store the number of cells whose value are not '💣'.
	const [mineLocations, setMineLocations] = useState([]) // An array to store all the coordinate of '💣'.
	const [gameOver, setGameOver] = useState(false) // A boolean variable. If true, means you lose the game (Game over).
	const [remainFlagNum, setRemainFlagNum] = useState(0) // An integer variable to store the number of remain flags.
	const [win, setWin] = useState(false) // A boolean variable. If true, means that you win the game.

	useEffect(() => {
		// Calling the function
		freshBoard()
	}, [])

	// Creating a board
	const freshBoard = () => {
		/* -- TODO 3-1 -- */
		let { board: newBoard, mineLocations: newMineLocations } = createBoard(boardSize, mineNum)
		setBoard(newBoard)
		setMineLocations(newMineLocations)
		setNonMineCount(boardSize * boardSize - mineNum)
		setRemainFlagNum(mineNum)
		/* Useful Hint: createBoard(...) */
	}

	const restartGame = () => {
		/* -- TODO 5-2 -- */
		/* Useful Hint: freshBoard() */
		freshBoard()
		setGameOver(false)
		setWin(false)
	}

	// On Right Click / Flag Cell
	const updateFlag = (e, x, y) => {
		// To not have a dropdown on right click
		e.preventDefault()
		// Deep copy of a state
		/* -- TODO 3-2 -- */
		/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */
		/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */
		/* Reminder: The cell can be flagged only when it is not revealed. */
		if (board[x][y].revealed) return
		if (board[x][y].flagged) {
			board[x][y].flagged = false
			setRemainFlagNum(remainFlagNum + 1)
		} else {
			board[x][y].flagged = true
			setRemainFlagNum(remainFlagNum - 1)
		}
	}

	const revealCell = (x, y) => {
		/* -- TODO 4-1 -- */
		/* Reveal the cell */
		/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */
		/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */
		mineLocations.forEach(location => {
			if (location[0] == x && location[1] == y) {
				setGameOver(true)
				mineLocations.forEach(location => {
					board[location[0]][location[1]].revealed = true
				})
			}
		})
		if (gameOver) return
		let { board: newBoard, newNonMinesCount } = revealed(board, x, y, nonMineCount, setGameOver)
		console.log(newBoard)
		setBoard(newBoard)
		setNonMineCount(newNonMinesCount)
		if (newNonMinesCount <= 0) {
			setGameOver(true)
			setWin(true)
		}
	}

	return (
		<div className='boardPage'>
			<div className='boardWrapper'>
				<div className='boardContainer'>
					<Dashboard remainFlagNum={remainFlagNum} />
					{board.map((row, rowIdx) => (
						<div key={rowIdx} id={`row${rowIdx}`} style={{ display: 'flex' }}>
							{row.map((cell, colIdx) => (
								<Cell key={colIdx} rowIdx={rowIdx} colIdx={colIdx} detail={cell} revealCell={revealCell} updateFlag={updateFlag} />
							))}
						</div>
					))}
					{/* -- TODO 3-1 -- */}
					{/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
					{/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
				</div>
				<Modal restartGame={restartGame} backToHome={backToHome} win={win} gameOver={gameOver} />
			</div>
		</div>
	)
}

export default Board
