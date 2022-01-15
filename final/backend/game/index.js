import { Engine, Runner, Bodies, Composite, Body } from 'matter-js'
import { roomBroadcast } from '../util/wssConnect'

const frameRate = 1000 / 30
const FORCE = 0.0001
const canvas = { width: 1500, height: 1000 }

const addBounds = (/** @type {number} */ w, /** @type {number} */ h, /** @type {number} */ b) => {
	return [
		Bodies.rectangle(w / 2, -b / 2, w + 2 * b, b, { isStatic: true }),
		Bodies.rectangle(w / 2, h + b / 2, w + 2 * b, b, { isStatic: true }),
		Bodies.rectangle(-b / 2, h / 2, b, h + 2 * b, { isStatic: true }),
		Bodies.rectangle(w + b / 2, h / 2, b, h + 2 * b, { isStatic: true }),
	]
}

const toVertices = e => e.vertices.map(({ x, y }) => ({ x, y }))

const ALL_GAME = {}

const singleGame = (roomId, players, userDatas) => {
	const bounds = [canvas.width, canvas.height]

	const sprites = {
		ships: [Bodies.circle(100, 100, 20), Bodies.circle(100, 900, 20)],
		bullets: [],
		bounds: addBounds(...bounds, 100),
	}

	const engine = Engine.create({ gravity: { scale: 0 } })
	// const world = engine.world
	Composite.add(engine.world, [].concat(...Object.values(sprites)))
	// const runner = Runner.create()
	// Runner.run(runner, engine)
	setInterval(() => {
		try {
			roomBroadcast(
				players,
				[
					'gameUpdate',
					{
						ships: sprites.ships.map(ship => ({
							pos: {
								x: ship.position.x,
								y: ship.position.y,
							},
							angle: ship.angle,
						})),
						bounds: bounds,
					},
				],
				userDatas
			)
		} catch (e) {
			console.log(e)
		}
		sprites.ships.forEach((ship, index) => {
			const { x, y } = ship.position
			let angle = ship.angle
			if (ALL_GAME[roomId].keys[index].turn) {
				angle += 0.1
			}
			const force = {
				x: Math.cos(angle) * FORCE,
				y: Math.sin(angle) * FORCE,
			}
			Body.applyForce(ship, { x, y }, force)
			Body.setAngle(ship, angle)
		})

		// if (key.shoot) {
		// 	sprites.bullets.push(
		// 		Bodies.circle(sprites.ships[0].position.x, sprites.ships[0].position.y, 5, {
		// 			restitution: 0.5,
		// 			friction: 0.5,
		// 			frictionStatic: 0.5,
		// 			frictionAir: 0.5,
		// 			density: 0.5,
		// 			collisionFilter: {
		// 				group: -1,
		// 			},
		// 		})
		// 	)
		// }
		Engine.update(engine, frameRate)
	}, frameRate)
}

export const game = (roomId, /** @type {any} */ players, /** @type {any} */ userDatas) => {
	// ALL_GAME[roomId] = { singleGame, players, userDatas }
	// ALL_GAME[roomId].singleGame(ALL_GAME[roomId].players, ALL_GAME[roomId].userDatas)
	ALL_GAME[roomId] = {
		game: singleGame(roomId, players, userDatas),
		keys: [
			{ turn: false, shoot: false },
			{ turn: false, shoot: false },
			{ turn: false, shoot: false },
			{ turn: false, shoot: false },
		],
	}
}

export const handleKey = (roomId, index, key) => {
	console.log(roomId, index, key)
	switch (key) {
		case 'enter':
			ALL_GAME[roomId].keys[index].turn = true
			break
		case 'leave':
			ALL_GAME[roomId].keys[index].turn = false
			break
		case 'space':
			ALL_GAME[roomId].keys[index].shoot = true
			break
		default:
			break
	}
}
