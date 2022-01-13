import { useEffect, useRef } from 'react'
import { useEventListener } from 'hooks/index'
// import { logic } from 'utils/logic'
import './index.css'
import { CANVAS } from 'constant'
import { Ship } from './Ship'
import { state } from './Sprite'

const setCanvasOnShips = (ctx, ships) => {
	// get min max pos of ships
	const minX = Math.min(...ships.map(ship => ship.pos.x))
	const maxX = Math.max(...ships.map(ship => ship.pos.x))
	const minY = Math.min(...ships.map(ship => ship.pos.y))
	const maxY = Math.max(...ships.map(ship => ship.pos.y))
	// find the center
	const width = maxX - minX
	const height = maxY - minY
	const centerX = minX + width / 2
	const centerY = minY + height / 2
	// max of width and height
	const max = Math.max(width, height) + 500
	// move ctx to center
	ctx.translate(centerX, centerY)
	// scale canvas to max
	ctx.scale(CANVAS.WIDTH / max, CANVAS.HEIGHT / max)
	console.log(centerX, centerY, max)
}

const Game = () => {
	// const { sendData } = logic()
	const canvasRef = useRef(null)

	let turn = false
	let _id = 0
	let next = 'normal'
	let ship
	const animateID = useRef(null)
	// const [ships, setShips] = useState([])

	useEventListener('keydown', e => {
		if (e.key === 'Enter') turn = true
		if (e.key === ' ') {
			ship.shoot(next)
			next = 'normal'
		}
		if (e.key === 'm') next = 'missile'
		if (e.key === 'o') next = 'mine'
		if (e.key === 'd') console.log(state.objects)
	})

	useEventListener('keyup', e => {
		if (e.key === 'Enter') turn = false
	})

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.imageSmoothingEnabled = false
		// const width = canvas.width
		// const height = canvas.height
		const width = 1520
		const height = 1200
		console.log(width, height)
		ship = new Ship(_id++, { x: 100, y: 100 })

		// ships.push(ship)
		// setShips(prev => [...prev, ship])
		const animate = () => {
			ctx.setTransform(1, 0, 0, 1, 0, 0)
			ctx.clearRect(0, 0, width, height)
			// ctx.translate(ship.pos.x, ship.pos.y)
			// setCanvasOnShips(ctx, ships)
			state.objects.forEach(object => {
				object.draw(ctx)
				object.move(turn)
			})
			// ships.forEach(ship => {
			// 	ship.draw(ctx)
			// 	ship.move(turn)
			// })

			ctx.font = '40px Bungee'
			ctx.fillStyle = 'red'
			ctx.strokeStyle = 'white'
			// print ship position
			ctx.lineWidth = 2
			ctx.textAlign = 'center'
			ctx.fillText(`P1`, ship.pos.x, ship.pos.y - 60)
			ctx.strokeText(`P1`, ship.pos.x, ship.pos.y - 60)

			animateID.current = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			state.objects.length = 0
			// ships.length = 0
			cancelAnimationFrame(animateID.current)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div align='center'>
			<canvas //
				ref={canvasRef}
				// style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vw)', border: '4px solid white', borderRadius: '8px' }}
				style={{ border: '4px solid white', borderRadius: '8px' }}
				width={CANVAS.WIDTH}
				height={CANVAS.HEIGHT}
			/>
		</div>
	)
}

export default Game
