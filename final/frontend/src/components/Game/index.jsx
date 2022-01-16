import { useEffect, useRef, useState } from 'react'
import { useEventListener } from 'hooks/index'
import { draw, getSpriteByType, setCameraOn, particles } from './utils'
import './index.css'
import { CANVAS } from 'constant'
import { Ship } from './Ship'
import { Bullet } from './Weapons'
import { Wall } from './Wall'
import { Text } from './Text'
import { state } from './Sprite'
import { useConnection } from 'connection/connect'
import { useUser } from 'hooks/useUser'
import { useGame } from 'hooks/useGame'

const Game = () => {
	const canvasRef = useRef(null)
	const [doublePress, setDoublePress] = useState(false)
	const { room, profile } = useUser()
	const { gameEvent } = useConnection()
	const { sprites, text } = useGame()

	useEventListener('keydown', e => {
		if (e.key === 'Enter') {
			gameEvent({ roomId: room.roomId, evt: 'enter', name: profile.name })
			if (doublePress) {
			}
		}
		if (e.key === ' ') {
			gameEvent({ roomId: room.roomId, evt: 'space', name: profile.name })
		}
		if (e.key === 'd') {
			// debug
			// console.log(state.objects)
			// console.log(sprites.deadId)
			// console.log(texts)
		}
	})
	useEventListener('keyup', e => {
		if (e.key === 'Enter') {
			gameEvent({ roomId: room.roomId, evt: 'leave', name: profile.name })
			setDoublePress(true)
			setTimeout(() => {
				setDoublePress(false)
			}, 100)
		}
	})

	let camera_o = { x: 750, y: 500, w: 1500, h: 1000 }
	const [camera, setCamera] = useState(camera_o)

	const changeCamera = ships => {
		setCamera(camera => setCameraOn(camera, ships, 500))
	}

	const [texts, setTexts] = useState([])

	useEffect(() => {
		// console.log(texts)
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.imageSmoothingEnabled = false
		const width = canvas.width
		const height = canvas.height

		ctx.strokeStyle = 'white'
		ctx.textAlign = 'center'

		if (sprites.sprites && sprites.sprites.length > 0) changeCamera(getSpriteByType(sprites.sprites, 'ship'))

		// console.log(camera)
		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.clearRect(0, 0, width, height)

		// debug line
		// draw.line(ctx, 'white', { x: 0, y: 500 }, { x: 1500, y: 500 }, camera)
		// draw.line(ctx, 'white', { x: 750, y: 0 }, { x: 750, y: 1000 }, camera)

		if (sprites.bounds) {
			const [w, h] = sprites.bounds
			draw.rect(ctx, '#00e9d8', '#048c85', { w: w, h: 8 }, { x: w / 2, y: 0 }, camera)
			draw.rect(ctx, '#00e9d8', '#048c85', { w: 8, h: h }, { x: 0, y: h / 2 }, camera)
			draw.rect(ctx, '#00e9d8', '#048c85', { w: w, h: 8 }, { x: w / 2, y: h }, camera)
			draw.rect(ctx, '#00e9d8', '#048c85', { w: 8, h: h }, { x: w, y: h / 2 }, camera)
		}

		if (texts.length > 0) {
			texts.forEach(text => {
				text.draw(ctx, draw, camera)
				if (text.opacity <= 0) {
					clearInterval(text.interval)
					setTexts(texts => texts.filter(t => t !== text))
				}
			})
		}

		if (sprites.sprites?.length > 0) {
			sprites.sprites
				.slice()
				.reverse()
				.forEach(sprite => {
					if (!sprite) return
					if (state.objects[sprite.id]) {
						state.objects[sprite.id].set(sprite)
						state.objects[sprite.id].draw(ctx, draw, camera)
					} else {
						switch (sprite.type) {
							case 'ship':
								state.objects[sprite.id] = new Ship(sprite.id, sprite.color, sprite.pos, sprite.angle)
								break
							case 'bullet':
								state.objects[sprite.id] = new Bullet(sprite.pos, sprite.angle)
								break
							case 'wall':
								state.objects[sprite.id] = new Wall(sprite.pos, sprite.breakable)
							default:
								break
						}
					}
				})
		}

		if (sprites.deadId?.length > 0) {
			sprites.deadId.forEach(id => {
				delete state.objects[id]
			})
		}

		if (particles.length > 0) {
			particles.forEach(particle => {
				particle.draw(ctx, draw, camera)
				if (particle.opacity <= 0) {
					clearInterval(particle.interval)
					particles.splice(particles.indexOf(particle), 1)
				}
			})
		}

		// don't rerender on camera change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sprites])

	useEffect(() => {
		if (text && sprites.bounds) {
			console.log(sprites.bounds)
			setTexts(texts => [...texts, new Text({ x: sprites.bounds[0] / 2, y: sprites.bounds[1] / 2 }, 'red', text)])
		}
	}, [text])

	return (
		<div align='center'>
			<canvas
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
