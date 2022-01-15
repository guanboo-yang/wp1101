import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'hooks/index'
import { draw, getSpriteByType, setCameraOn } from './utils'
// import { logic } from 'utils/logic'
import './index.css'
import { CANVAS } from 'constant'
import { Ship } from './Ship'
import { state } from './Sprite'
import { useConnection } from 'connection/connect'
import { useUser } from 'hooks/useUser'
import { useSnackbar } from 'hooks/useSnackbar'
import { useGame } from 'hooks/useGame'

const Game = () => {
	// const { sendData } = logic()
	const canvasRef = useRef(null)
	const turnRef = useRef(false)
	const [doublePress, setDoublePress] = useState(false)
	const [next, setNext] = useState('normal')
	const shipRef = useRef(null)
	const animateID = useRef(null)
	const { room, profile } = useUser()
	const { gameEvent } = useConnection()
	const { showMessage } = useSnackbar()
	const { sprites } = useGame()
	const [objects, setObjects] = useState(sprites)

	useEventListener('keydown', e => {
		// part1
		if (e.key === 'Enter') {
			gameEvent({ roomId: room.roomId, evt: 'enter', name: profile.name })
			if (doublePress) {
			}
			turnRef.current = true
			setDoublePress(false)
		}
		// part2
		if (e.key === ' ') {
			gameEvent({ roomId: room.roomId, evt: 'space', name: profile.name })
			shipRef.current.shoot(next)
			setNext('normal')
		}
		if (e.key === 'm') {
			setNext('missile')
			showMessage('missile')
		}
		if (e.key === 'o') {
			setNext('mine')
			showMessage('mine')
		}
		if (e.key === 'd') console.log(state.objects)
		if (e.key === 's') {
			console.log(sprites.ships)
		}
	})
	// send part 3
	useEventListener('keyup', e => {
		gameEvent({ roomId: room.roomId, evt: 'leave', name: profile.name })
		if (e.key === 'Enter') {
			turnRef.current = false
			setDoublePress(true)
			setTimeout(() => {
				setDoublePress(false)
			}, 100)
		}
	})

	// useEffect(() => {
	// 	setObjects(sprites)
	// }, [sprites])
	useEffect(() => {
		shipRef.current = new Ship(3, { x: 100, y: 100 }, 0)
		shipRef.current = new Ship(2, { x: 100, y: 100 }, 0)
	}, [])

	let camera_o = { x: 750, y: 500, w: 1500, h: 1000 }
	const [camera, setCamera] = useState(camera_o)

	const changeCamera = ships => {
		setCamera(camera => setCameraOn(camera, ships, 400))
	}

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.imageSmoothingEnabled = false
		const width = canvas.width
		const height = canvas.height

		ctx.strokeStyle = 'white'
		ctx.textAlign = 'center'

		// let camera = { x: CANVAS.IN.HEIGHT / 2, y: CANVAS.IN.HEIGHT / 2, w: CANVAS.IN.HEIGHT * 1, h: CANVAS.IN.HEIGHT * 1 }

		// const objects = Object.keys(state.objects).reduce((acc, key) => {
		// 	return [...acc, state.objects[key]]
		// }, [])

		if (sprites.ships && sprites.ships.length > 0) changeCamera(sprites.ships)
		// console.log(camera)
		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.clearRect(0, 0, width, height)

		// draw a line y = 500
		draw.line(ctx, 'white', { x: 0, y: 500 }, { x: 1500, y: 500 }, camera)
		// draw a line x = 750
		draw.line(ctx, 'white', { x: 750, y: 0 }, { x: 750, y: 1000 }, camera)

		if (sprites.bounds) {
			const [w, h] = sprites.bounds
			draw.rect(ctx, '#00e9d8', '#048c85', { w: w, h: 6 }, { x: w / 2, y: 0 }, camera)
			draw.rect(ctx, '#00e9d8', '#048c85', { w: 6, h: h }, { x: 0, y: h / 2 }, camera)
			draw.rect(ctx, '#00e9d8', '#048c85', { w: w, h: 6 }, { x: w / 2, y: h }, camera)
			draw.rect(ctx, '#00e9d8', '#048c85', { w: 6, h: h }, { x: w, y: h / 2 }, camera)
		}

		// console.log(state.objects)
		if (sprites.ships && sprites.ships.length > 0) {
			sprites.ships.forEach((ship, i) => {
				state.objects.ships[i].set(ship)
				state.objects.ships[i].draw(ctx, draw, camera)
			})
		}
		// 	// ships.move()
		// })
		// getSpriteByType(state.objects, 'ship', true).forEach(ship => {
		// 	ship.draw(ctx, draw, camera)
		// 	ship.move(turnRef.current)
		// })
		// animateID.current = requestAnimationFrame(animate)
		// }

		// animate()

		// return () => {
		// state.objects.length = 0
		// cancelAnimationFrame(animateID.current)
		// }
	}, [sprites]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div align='center'>
			<canvas //
				ref={canvasRef}
				style={{
					background: 'radial-gradient(circle, #080430 0%, #000000 100%)',
					borderRadius: '10px',
				}}
				width={CANVAS.OUT.WIDTH}
				height={CANVAS.OUT.HEIGHT}
			/>
		</div>
	)
}

export default Game
