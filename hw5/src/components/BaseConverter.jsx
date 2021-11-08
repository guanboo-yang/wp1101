import React, { useState, useEffect } from 'react'
import './converter.css'

const BaseConverter = () => {
	const [input, setInput] = useState(0)
	const [output, setOutput] = useState(0)
	const [base1, setBase1] = useState(10)
	const [base2, setBase2] = useState(2)
	const [error, setError] = useState('')

	useEffect(() => {
		if (base2 < 2 || base2 > 36) return setError('the base must be between 2 and 36')
		else setError('')
		let out = parseInt(input, base1).toString(base2)
		if (!isNaN(out)) setOutput(out)
	}, [input, base1, base2])

	const swapBase = () => {
		setInput(output)
		setOutput(input)
		setBase1(base2)
		setBase2(base1)
	}

	return (
		<div>
			<form className='converter-form'>
				<div>
					<input className='converter-input' type='number' value={input} onChange={e => setInput(e.target.value)} />
					{/* <i className='mdi mdi-arrow-left-right-bold' style={{ fontSize: '1.5em' }}></i> */}
					Base
					<input className='converter-input short' type='number' min='2' max='36' step='1' value={base1} onChange={e => setBase1(e.target.value)} />
				</div>
				<div className='btn icon' onClick={swapBase}>
					<i className='mdi mdi-swap-vertical-bold'></i>
				</div>
				<div>
					<input disabled className='converter-input' type='number' value={output} onChange={e => setOutput(e.target.value)} style={{ opacity: '0.6', cursor: 'no-drop' }} />
					{/* <i className='mdi mdi-arrow-left-right-bold' style={{ fontSize: '1.5em' }}></i> */}
					Base
					<input className='converter-input short' type='number' min='2' max='36' step='1' value={base2} onChange={e => setBase2(e.target.value)} />
				</div>
				<p style={{ color: '#ff5555', fontSize: '18px' }}>{error}</p>
			</form>
		</div>
	)
}

export default BaseConverter
