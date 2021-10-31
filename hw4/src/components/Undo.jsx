import React, { useRef, useEffect, useState } from 'react'

const Undo = ({ undo, undoLength }) => {
	const [hide, setHide] = useState(true)
	const undoTimeout = useRef(null)
	useEffect(() => {
		console.log(undoLength)
		setHide(false)
		clearTimeout(undoTimeout.current)
		if (undoLength > 0) {
			undoTimeout.current = setTimeout(() => {
				setHide(true)
			}, 6000)
		} else {
			setHide(true)
		}
	}, [undoLength])
	return (
		<div className={`undo-wrapper ${hide ? 'hide' : ''}`} id='undo-wrapper'>
			<button className='btn ripple rounded' onClick={undo}>
				undo
			</button>
		</div>
	)
}

export default Undo
