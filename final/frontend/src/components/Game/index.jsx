import { useRef, useEffect } from 'react'
import { useEventListener } from '../../hooks/index'
import { Engine, Render, Runner, Bodies, Composite, Composites, Pairs } from 'matter-js'
import { wall1 } from '../../assets'

const Game = () => {
	// const { sendData } = logic()

	const canvasRef = useRef(null)
	const engine = useRef(Engine.create())
	const isPressed = useRef(false)

	// useEventListener('keydown', e => {
		// if (e.key === 'ArrowRight') {
		// 	const payload = { task: 'right' }
		// 	sendData(payload)
		// } else if (e.keyCode === 32) {
		// 	sendData(['shoot'])
		// }
	// })

	useEffect(() => {
		const render = Render.create({
			canvas: canvasRef.current,
			engine: engine.current,
			options: {
				width: 500,
				height: 500,
				wireframes: false,
				background: '#00000000',
			},
		})
		Render.run(render)
		Runner.run(Runner.create(), engine.current)
		let stack = Composites.stack(20, 20, 11, 11, 0, 0, (x, y) => {
			return Bodies.rectangle(x, y, 20, 20, {
				isStatic: true,
				render: {
					sprite: {
						texture: wall1,
						xScale: 1,
						yScale: 1,
					},
				},
			})
		})
		Composite.add(engine.current.world, [
			Bodies.rectangle(500 / 2, 10, 500, 20, { isStatic: true }),
			Bodies.rectangle(10, 500 / 2, 20, 500, { isStatic: true }),
			Bodies.rectangle(500 / 2, 500 - 10, 500, 20, { isStatic: true }),
			Bodies.rectangle(500 - 10, 500 / 2, 20, 500, { isStatic: true }),
			stack,
		])
		return () => {
			Pairs.clear(engine.current.pairs)
			Runner.stop(engine.current)
			Render.stop(render)
		}
	}, [])

	const handleDown = () => (isPressed.current = true)
	const handleUp = () => (isPressed.current = false)

	const handleAddCircle = e => {
		if (isPressed.current) {
			const rect = e.target.getBoundingClientRect()
			const mouseX = e.clientX - rect.left
			const mouseY = e.clientY - rect.top
			const ball = Bodies.circle(mouseX, mouseY, 20)
			Composite.add(engine.current.world, [ball])
		}
	}

	return (
		<div align='center'>
			<h1>Playground</h1>
			<canvas //
				ref={canvasRef}
				onMouseDown={handleDown}
				onMouseUp={handleUp}
				onMouseMove={handleAddCircle}
				style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', border: '4px solid white', borderRadius: '8px' }}
			/>
		</div>
	)
}

export default Game
