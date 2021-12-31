import { useRef, useEffect } from 'react'
import {useEventListener} from '../../hooks/index'
import Logic from '../../hooks/Logic'

const Playground = () => {
	const {sendData} = Logic()

	// draw canvas
	const canvasRef = useRef(null)
	let ctx

	// draw square
	const drawSquare = () => {
		ctx = canvasRef.current.getContext('2d')
		ctx.fillStyle = '#123456'
		// ctx.fillStyle = '#1b5678'
		ctx.fillRect(0, 0, 500, 500)
	}

	useEventListener('keydown', e => {
		if (e.key === 'ArrowRight') {
			const payload = {task: 'right'}
			sendData(payload)
		}else if (e.keyCode === 32){
			sendData(['shoot'])
		}
	})


	// draw on canvas
	useEffect(() => {
		drawSquare()
		


	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div align='center'>
				<h1>Playground</h1>
				<canvas //
					ref={canvasRef}
					style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', border: '4px solid white', borderRadius: '8px' }}
				/>
			</div>
		</>
	)
}

export default Playground
