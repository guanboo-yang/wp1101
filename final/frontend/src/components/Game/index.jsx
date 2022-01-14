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
	// const [ships, setShips] = useState([])

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

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.imageSmoothingEnabled = false
		const width = canvas.width
		const height = canvas.height
		// console.log(width, height)
		shipRef.current = new Ship(3, { x: 100, y: 100 }, 0)

		ctx.strokeStyle = 'white'
		ctx.textAlign = 'center'

		let camera = { x: width / 2, y: height / 2, w: width, h: height }

		const animate = () => {
			camera = setCameraOn(camera, state.objects, 400)
			ctx.setTransform(1, 0, 0, 1, 0, 0)
			ctx.clearRect(0, 0, width, height)
			draw.line(ctx, '#fff', { x: 0, y: 0 }, { x: 0, y: CANVAS.IN.HEIGHT }, camera)
			draw.line(ctx, '#fff', { x: 0, y: 0 }, { x: CANVAS.IN.WIDTH, y: 0 }, camera)
			draw.line(ctx, '#fff', { x: CANVAS.IN.WIDTH, y: 0 }, { x: CANVAS.IN.WIDTH, y: CANVAS.IN.HEIGHT }, camera)
			draw.line(ctx, '#fff', { x: 0, y: CANVAS.IN.HEIGHT }, { x: CANVAS.IN.WIDTH, y: CANVAS.IN.HEIGHT }, camera)
			getSpriteByType(state.objects, 'ship', false).forEach(sprites => {
				sprites.draw(ctx, draw, camera)
				sprites.move()
			})
			getSpriteByType(state.objects, 'ship', true).forEach(ship => {
				ship.draw(ctx, draw, camera)
				ship.move(turnRef.current)
			})
			animateID.current = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			state.objects.length = 0
			cancelAnimationFrame(animateID.current)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

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
