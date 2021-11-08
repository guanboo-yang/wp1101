import React, { useState, useEffect } from 'react'
import './btn.css'
import { addRipple } from '../utils/ripple'

const KeyPanel = ({ operators, equation, setEquation, result }) => {
	const [expand, setExpand] = useState(false)
	const [optPress, setOptPress] = useState(false)
	const [memory, setMemory] = useState(0)

	useEffect(() => {
		addRipple()
	}, [])

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Alt') setOptPress(true)
			let val = isNaN(parseInt(e.key)) ? e.key : parseInt(e.key)
			updateEquation(val)
		}
		const handleKeyUp = e => {
			if (e.key === 'Alt') setOptPress(false)
		}
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, []) // eslint-disable-line  react-hooks/exhaustive-deps

	const getType = val => {
		if (val === 'e' || val === '\u03c0') return 'number'
		return typeof val
	}

	const updateEquation = val => {
		// console.log(JSON.stringify(val))
		let type = getType(val)
		// console.log(type)
		if (type === 'number') {
			if (equation.length && equation.at(-1) === '.') {
				let dot = equation.pop().toString()
				let num = equation.pop().toString() + dot + val.toString()
				setEquation([...equation, parseFloat(num)])
			} else if (!equation.length || getType(equation.at(-1)) === 'string') {
				setEquation([...equation, val])
			} else if (val === '\u03c0') {
				setEquation([...equation, '*', val])
			} else if (val === 'e') {
				setEquation([...equation, val])
			} else {
				let lastNum = equation.pop().toString()
				setEquation([...equation, parseFloat(lastNum + val.toString())])
			}
		}
		// else if (val === '\u03c0' || val === 'e') {
		// 	if (equation.length && typeof equation.at(-1) === 'number') {
		// 		setEquation([...equation, '*', val])
		// 	}
		// }
		if (type === 'string') {
			// console.log('pop')
			if (val === 'AC') return setEquation([])
			if (val === 'Backspace') return setEquation(equation.slice(0, -1))
			if (val === '%') {
				if (getType(equation.at(-1)) === 'number') {
					let lastNum = equation.pop().toString()
					setEquation([...equation, lastNum / 100])
				}
				return
			}
			if (val === '(' || val === ')') return setEquation([...equation, val])
			if (!['+', '-', '*', '/', '^', '^(-1)', '^(0.5)'].includes(val)) return
			if (!equation.length) {
				setEquation([...equation, 0, val])
			} else if (getType(equation.at(-1)) === 'string') {
				equation.pop()
				setEquation([...equation, val])
			} else setEquation([...equation, val])
		}
	}

	const togglePanel = e => {
		setExpand(!expand)
	}

	const updateMemory = val => {
		if (val === '+') {
			setMemory(memory + result)
		}
		if (val === '-') {
			setMemory(memory - result)
		}
	}

	const clearMemory = () => setMemory(0)

	const recallMemory = () => {
		setEquation([memory])
	}

	// const changeText = (e, text) => {
	// 	e.classList.add('faded')
	// 	setTimeout(() => {
	// 		e.innerHtml = 'c'
	// 		e.classList.remove('faded')
	// 	}, 300)
	// }
	return (
		<div className={`panel ${expand ? 'expand' : ''}`}>
			<div className='left'>
				<div className='upper'>
					{/* UNDEFINED PART */}
					<div onClick={() => {}} className='btn ripple dark'></div>
					<div onClick={() => {}} className='btn ripple dark'></div>
					<div onClick={() => updateEquation('(')} className='btn ripple dark'>
						(
					</div>
					<div onClick={() => updateEquation(')')} className='btn ripple dark'>
						)
					</div>
				</div>
				<div className='main'>
					<div onClick={() => updateEquation('AC')} className='btn ripple colored'>
						AC
					</div>
					<div onClick={() => updateEquation('Backspace')} className='btn ripple colored'>
						<i className='mdi mdi-backspace-outline'></i>
					</div>
					<div onClick={() => updateEquation('%')} className='btn ripple colored'>
						&#37;
					</div>
					<div onClick={() => updateEquation('/')} className='btn ripple colored'>
						&#xf7;
					</div>
					<div onClick={() => updateEquation(7)} className='btn ripple'>
						&#55;
					</div>
					<div onClick={() => updateEquation(8)} className='btn ripple'>
						&#56;
					</div>
					<div onClick={() => updateEquation(9)} className='btn ripple'>
						&#57;
					</div>
					<div onClick={() => updateEquation('*')} className='btn ripple colored'>
						&times;
					</div>
					<div onClick={() => updateEquation(4)} className='btn ripple'>
						&#52;
					</div>
					<div onClick={() => updateEquation(5)} className='btn ripple'>
						&#53;
					</div>
					<div onClick={() => updateEquation(6)} className='btn ripple'>
						&#54;
					</div>
					<div onClick={() => updateEquation('-')} className='btn ripple colored'>
						&#45;
					</div>
					<div onClick={() => updateEquation(1)} className='btn ripple'>
						&#49;
					</div>
					<div onClick={() => updateEquation(2)} className='btn ripple'>
						&#50;
					</div>
					<div onClick={() => updateEquation(3)} className='btn ripple'>
						&#51;
					</div>
					<div onClick={() => updateEquation('+')} className='btn ripple colored'>
						&#43;
					</div>
					<div onClick={e => togglePanel(e)} className='btn ripple colored'>
						{expand ? <i className='mdi mdi-arrow-expand'></i> : <i className='mdi mdi-arrow-collapse'></i>}
					</div>
					<div onClick={() => updateEquation(0)} className='btn ripple'>
						&#48;
					</div>
					<div onClick={() => updateEquation('.')} className='btn ripple'>
						&#46;
					</div>
					<div onClick={() => setEquation(result ? [result] : [])} className='btn ripple colored'>
						&#61;
					</div>
				</div>
			</div>
			<div className='right'>
				{optPress ? (
					<div onClick={() => updateMemory('-')} className='btn ripple dark'>
						M-
					</div>
				) : (
					<div onClick={() => updateMemory('+')} className='btn ripple dark'>
						M+
					</div>
				)}
				{optPress ? (
					<div onClick={() => clearMemory()} className='btn ripple dark'>
						MC
					</div>
				) : (
					<div onClick={() => recallMemory()} className='btn ripple dark'>
						MR
					</div>
				)}
				<div onClick={() => updateEquation('^(0.5)')} className='btn ripple dark'>
					<span style={{ fontSize: '18px', marginRight: '2px' }}>&radic;</span>x
				</div>
				<div onClick={() => updateEquation('^(-1)')} className='btn ripple dark'>
					1/x
				</div>
				<div onClick={() => updateEquation('\u03c0')} className='btn ripple dark'>
					&#x3c0;
				</div>
				<div onClick={() => updateEquation('e')} className='btn ripple dark'>
					e
				</div>
			</div>
		</div>
	)
}

export default KeyPanel
