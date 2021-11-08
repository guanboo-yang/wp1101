import React from 'react'
import './index.css'
import { useEffect, useRef } from 'react'

/* eslint no-eval: 0 */

const Result = ({ operators, equation, result, setResult }) => {
	const equa = useRef(null)
	const parseEquation = equation => {
		return equation
			.join('')
			.replace(/\^/g, '**')
			.replace(/(\D.)e/g, '$1Math.E')
			.replace(/\u03c0/g, 'Math.PI')
	}
	useEffect(() => {
		// console.log(equation)
		// console.log(parseEquation(equation))
		let val
		try {
			if (operators.includes(equation.at(-1))) {
				val = eval(parseEquation(equation.slice(0, -1)))
			} else {
				val = eval(parseEquation(equation))
			}
		} catch (e) {
			val = 'ERROR'
		}
		// check zero division
		if ((equation.toString() + ',').includes('/,0,')) val = 'ZERO DIVISION'
		if ((equation.toString() + ',').includes('0,^(-1)')) val = 'ZERO DIVISION'
		setResult(val)
		// console.log(equa)
		equa.current.scrollTo({ left: equa.current.scrollWidth, behavior: 'smooth' })
	}, [equation, operators, setResult])

	return (
		<div className='display'>
			<h1 className='equation' ref={equa}>
				{equation.join('').replace(/\//g, '\u00f7').replace(/\*/g, '\u00d7') || 0}
			</h1>
			<h2 className='result'>{result || 0}</h2>
		</div>
	)
}

export default Result
