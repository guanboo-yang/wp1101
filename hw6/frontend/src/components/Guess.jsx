import React, { useState, useEffect, useRef } from 'react'
import { startGame, guess, restart } from '../axios/guess'

const Guess = ({ status, setStatus }) => {
	const [hasStarted, setHasStarted] = useState(false)
	const [hasWon, setHasWon] = useState(false)
	const [number, setNumber] = useState('')
	const input = useRef(null)
	const msg = useRef(null)

	useEffect(() => {
		document.getElementById('input').addEventListener('keydown', e => {
			if (e.key === 'Enter') pressGuess()
		})
		setStatus('guess')
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const setMessage = retMsg => {
		msg.current.classList.add('hide')
		setTimeout(() => {
			msg.current.innerText = retMsg
			msg.current.classList.remove('hide')
		}, 200)
	}

	const pressClear = () => {
		input.current.value = ''
		input.current.focus()
	}

	const pressStart = async () => {
		const retMsg = await startGame()
		setMessage(retMsg)
		if (retMsg === 'Error: Server not connected') {
			setStatus('err')
			return
		} else setStatus('guess')
		setHasStarted(true)
		input.current.value = ''
		input.current.focus()
	}

	const pressRestart = async () => {
		const retMsg = await restart()
		setHasWon(false)
		setStatus('guess')
		input.current.value = ''
		input.current.focus()
		setMessage(retMsg)
	}

	const pressGuess = async () => {
		setNumber(input.current.value)
		let retMsg = await guess(input.current.value)
		input.current.value = ''
		input.current.focus()
		if (retMsg === 'win') {
			retMsg = ''
			setHasWon(true)
			setStatus('win')
			input.current.blur()
		} else if (retMsg === 'Error: Not a legal number' || retMsg === 'Error: Server not connected') setStatus('err')
		else {
			setStatus('guess')
			console.log('hi')
		}
		setMessage(retMsg)
	}

	return (
		<>
			<h1>Guess Number</h1>
			<h2>{hasStarted ? (hasWon ? `You Win! The number was ${number}` : 'Guess a Number Between 1 and 100') : "Let's Start!"}</h2>
			<div className={`game ${hasStarted && !hasWon ? 'start' : ''}`}>
				<div className='input'>
					<input type='text' placeholder='Enter a Number' ref={input} id='input' autoComplete='off' />
				</div>
				<div className='clear' onClick={pressClear}></div>
				{hasStarted ? (
					hasWon ? (
						<div className='btn' onClick={pressRestart}>
							Restart
						</div>
					) : (
						<div className='btn' onClick={pressGuess}>
							Guess!
						</div>
					)
				) : (
					<div className='btn' onClick={pressStart}>
						Start Game
					</div>
				)}
			</div>
			<p ref={msg} className='msg'></p>
		</>
	)
}

export default Guess
