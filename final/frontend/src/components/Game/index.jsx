import { useRef, useEffect } from 'react'
import { useEventListener } from '../../hooks/index'
import { logic } from '../../utils/logic'
import { Engine, Render, Runner, Bodies, Composite } from 'matter-js'

const Game = () => {
	const { sendData } = logic()

	// draw canvas
	const canvasRef = useRef(null)
	const engine = useRef(Engine.create())
	const isPressed = useRef(false)

	useEventListener('keydown', e => {
		if (e.key === 'ArrowRight') {
			const payload = { task: 'right' }
			sendData(payload)
		} else if (e.keyCode === 32) {
			sendData(['shoot'])
		}
	})

	// draw on canvas
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
		Composite.add(engine.current.world, [
			Bodies.rectangle(500 / 2, 10, 500, 20, { isStatic: true }),
			Bodies.rectangle(10, 500 / 2, 20, 500, { isStatic: true }),
			Bodies.rectangle(500 / 2, 500 - 10, 500, 20, { isStatic: true }),
			Bodies.rectangle(500 - 10, 500 / 2, 20, 500, { isStatic: true }),
		])
		return () => {
			Render.stop(render)
			Runner.stop(engine)
			render.canvas.remove()
			render.canvas = null
			render.context = null
			render.textures = {}
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const handleDown = () => (isPressed.current = true)
	const handleUp = () => (isPressed.current = false)

	const handleAddCircle = e => {
		if (isPressed.current) {
			// get mouse position relative to canvas
			const rect = e.target.getBoundingClientRect()
			const mouseX = e.clientX - rect.left
			const mouseY = e.clientY - rect.top
			const ball = Bodies.circle(mouseX, mouseY, 20 + Math.random() * 20, {
				restitution: 0.8,
				friction: 0.01,
				render: {
					fillStyle: '#00CED1',
				},
			})
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
