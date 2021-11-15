import React, { useState, useEffect, useRef } from 'react'
import { startGame, move } from '../axios/othello'
import useStateHistory from '../hooks/useStateHistory'
import Cell from './Cell'
import './Othello.css'

const Button = ({ pressStart, setHowToPlay }) => {
	return (
		<>
			<div className='game btn-group'>
				<div className='btn' onClick={pressStart}>
					Start Game
				</div>
				<div className='btn' onClick={() => setHowToPlay(true)}>
					How to Play
				</div>
			</div>
		</>
	)
}

const HowToPlay = ({ setHowToPlay }) => {
	return (
		<>
			<h2>How to Play Othello?</h2>
			<div className='game'>
				<div className='btn' onClick={() => setHowToPlay(false)}>
					Back
				</div>
			</div>
			<div className='card'>
				<p>
					Othello is a strategy board game for two players (Black and White), played on an 8 by 8 board. The game traditionally begins with four discs placed in the middle of the
					board as shown below.
				</p>
				<img src='othello/1.png' alt='' style={{ width: '80%', margin: '0 10%' }} />
				<p>
					Black moves first. Black must place a black disc on the board, in such a way that there is <b>at least one</b> straight (<b>horizontal, vertical, or diagonal</b>)
					occupied line between the new disc and another black disc, with <b>one or more contiguous</b> white pieces between them. In the starting position, Black has the following
					4 options indicated by translucent discs as shown below.
				</p>
				<img src='othello/2.png' alt='' style={{ width: '80%', margin: '0 10%' }} />
				<p>
					After placing the disc, Black flips <b>ALL</b> white discs lying on a straight line (horizontal, vertical, or diagonal) between the new disc and any existing black discs.
					All flipped discs are now black. If Black decides to place a disc in the topmost location, one white disc gets flipped, and the board now looks like this:
				</p>
				<img src='othello/3.png' alt='' style={{ width: '80%', margin: '0 10%' }} />
				<p>
					Now White plays. This player operates under the same rules, with the roles reversed: White lays down a white disc, causing black discs to flip. Possibilities at this time
					would be:
				</p>
				<img src='othello/4.png' alt='' style={{ width: '80%', margin: '0 10%' }} />
				<p>
					Players alternate taking turns. If a player does not have any valid moves, play <b>passes back</b> to the other player. When <b>neither player can move</b>, the game
					ends. A game of Othello may end before the board is completely filled. The player with <b>the most discs on the board</b> at the end of the game wins. If both players
					have the same number of discs, then the game is a draw.
				</p>
			</div>
			<div className='game'>
				<div className='btn' onClick={() => setHowToPlay(false)}>
					Back
				</div>
			</div>
			<br />
			<br />
		</>
	)
}

const Othello = ({ setStatus }) => {
	// const [board, setBoard] = useState([])
	const [board, setBoard, { back, clear }] = useStateHistory([], { capacity: 40 })
	const [hasStarted, setHasStarted] = useState(false)
	const [howToPlay, setHowToPlay] = useState(false)
	const [hint, setHint] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const msg = useRef(null)
	const [black, setBlack, { back: bB, clear: cB }] = useStateHistory([], { capacity: 40 })
	const [white, setWhite, { back: bW, clear: cW }] = useStateHistory([], { capacity: 40 })

	useEffect(() => {
		setStatus('win')
	}, [setStatus])

	// useEffect(() => {}, [hint])

	const updateBoard = (board, black, white) => {
		setBoard(board)
		setBlack(black)
		setWhite(white)
	}

	const showValidMoves = (board, moves) => {
		for (var row = 0; row < board.length; row++) {
			for (var col = 0; col < board[0].length; col++) {
				board[row][col].hint = false
			}
		}
		if (moves.length === 0) return board
		moves.forEach(([row, col]) => {
			board[row][col].hint = true
		})
		return board
	}

	const showHint = () => {
		setHint(!hint)
	}

	const pressStart = async () => {
		clear()
		cB()
		cW()
		const retBoard = await startGame()
		updateBoard(
			showValidMoves(retBoard, [
				[2, 3],
				[3, 2],
				[4, 5],
				[5, 4],
			]),
			2,
			2
		)
		setHasStarted(true)
		setGameOver(false)
	}

	const pressCell = async (row, col) => {
		if (gameOver) return
		const { board: retBoard, validMoves, msg: retMsg, black: retB, white: retW } = await move(board, -1, row, col)
		// console.log(retBoard, validMoves, msg)
		console.log(retB, retW)
		if (retMsg === 'Game Over!') {
			msg.current.innerText = retMsg
			updateBoard(showValidMoves(retBoard, []), retB, retW)
			if (retB > retW) msg.current.innerText += ' Black Win!'
			else msg.current.innerText += ' White Win!'
			setGameOver(true)
			return
		} else if (retMsg) {
			msg.current.innerText = retMsg
			return
		}
		msg.current.innerText = ''
		updateBoard(showValidMoves(retBoard, validMoves), retB, retW)
	}

	const undoMove = () => {
		back()
		bB()
		bW()
		setGameOver(false)
		msg.current.innerText = ''
	}

	return (
		<>
			{howToPlay ? (
				<>
					<h1>Othello</h1>
					<HowToPlay setHowToPlay={setHowToPlay} />
				</>
			) : hasStarted ? (
				<>
					<h1></h1>
					<div className='game btn-group'>
						<div className='btn' onClick={() => setHasStarted(false)}>
							Quit
						</div>
						<div className='btn' onClick={pressStart}>
							Restart
						</div>
						<div className='btn' onClick={undoMove}>
							Undo
						</div>
						<div className='btn' onClick={showHint}>
							{hint ? 'Hide Move' : 'Show Move'}
						</div>
					</div>
					<div className='board'>
						{board.map((row, rowIdx) => (
							<div key={rowIdx} id={`row${rowIdx}`} style={{ display: 'flex' }}>
								{row.map((cell, colIdx) => (
									<Cell key={colIdx} detail={cell} pressCell={pressCell} hint={hint} />
								))}
							</div>
						))}
					</div>
					<div className='score'>
						<span className='black'>{black}</span>
						<span ref={msg}></span>
						<span className='white'>{white}</span>
					</div>
				</>
			) : (
				<>
					<h1>Othello</h1>
					<Button pressStart={pressStart} setHowToPlay={setHowToPlay} />
				</>
			)}
		</>
	)
}

export default Othello
