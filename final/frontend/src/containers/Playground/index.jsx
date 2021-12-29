import { useRef, useEffect } from 'react'

const Playground = () => {
	// draw canvas
	const canvasRef = useRef(null)
	let ctx

	// draw square
	const drawSquare = () => {
		ctx = canvasRef.current.getContext('2d')
		ctx.fillStyle = '#1b5678'
		ctx.fillRect(0, 0, 500, 500)
	}

	// draw on canvas
	useEffect(() => {
		drawSquare()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div align='center'>
			<h1>Playground</h1>
			<canvas //
				ref={canvasRef}
				width='500'
				height='500'
			/>
		</div>
	)
}

export default Playground
