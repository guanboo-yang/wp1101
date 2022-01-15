import { Engine, Events, Bodies, Composite, Body } from 'matter-js'
import { roomBroadcast } from '../util/wssConnect'
import ship from './components/ship'
import bullet from './components/bullet'

const frameRate = 1000 / 30
const FORCE = 0.0007
const bullet_speed = 30
const canvas = { width: 1500, height: 1000 }

const addBounds = (/** @type {number} */ w, /** @type {number} */ h, /** @type {number} */ b) => {
	return [
		Bodies.rectangle(w / 2, -b / 2, w + 2 * b, b, { isStatic: true }),
		Bodies.rectangle(w / 2, h + b / 2, w + 2 * b, b, { isStatic: true }),
		Bodies.rectangle(-b / 2, h / 2, b, h + 2 * b, { isStatic: true }),
		Bodies.rectangle(w + b / 2, h / 2, b, h + 2 * b, { isStatic: true }),
	]
}

const playersNum = players => players.filter((/** @type {any} */ p) => p).length

const toVertices = e => e.vertices.map(({ x, y }) => ({ x, y }))

const ALL_GAME = {}

const singleGame = (roomId, players, userDatas) => {
	const bounds = [canvas.width, canvas.height]

	const sprites = {
		ships: players.map((/** @type {any} */ p, i) => {
			if (!p) return null
			return ship()
		}),
		bullets: [],
		bounds: addBounds(...bounds, 100),
	}

	const engine = Engine.create({ gravity: { scale: 0 } })
	// const world = engine.world
	// console.log([].concat(...Object.values(sprites)).filter(e => e))
	Composite.add(
		engine.world,
		[].concat(...Object.values(sprites)).filter(e => e)
	)

	Events.on(engine, 'collisionStart', ({ pairs }) => {
		pairs.forEach(({ bodyA, bodyB }) => {
			checkCollision(engine.world, bodyA, bodyB)
		})
	})

	const gameInterval = setInterval(() => {
		try {
			roomBroadcast(
				players,
				[
					'gameUpdate',
					{
						sprites: [
							...sprites.ships.map((ship, index) => {
								if (!ship) return null
								return {
									type: 'ship',
									id: ship.id,
									color: index,
									pos: {
										x: ship.position.x,
										y: ship.position.y,
									},
									angle: ship.angle,
								}
							}),
							...sprites.bullets.map(bullet => ({
								type: 'bullet',
								pos: {
									x: bullet.position.x,
									y: bullet.position.y,
								},
								id: bullet.id,
							})),
						],
						bounds: bounds,
					},
				],
				userDatas
			)
		} catch (e) {
			console.log(e)
		}
		sprites.ships.forEach((ship, index) => {
			if (!ship) return
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
			if (ALL_GAME[roomId].keys[index].shoot) {
				ALL_GAME[roomId].keys[index].shoot = false
				const bull = bullet(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30)
				sprites.bullets.push(bull)
				Body.setAngle(bull, angle)
				Body.setVelocity(bull, { x: Math.cos(angle) * bullet_speed, y: Math.sin(angle) * bullet_speed })
				Composite.add(engine.world, bull)
			}
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

		players.forEach((/** @type {any} */ player, index) => {
			if (player && !userDatas[player].online) {
				players[index] = null
			}
		})
		if (playersNum(players) === 0) {
			clearInterval(gameInterval)
			return
		}
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

const checkCollision = (world, bodyA, bodyB) => {
	// console.log(bodyA.label, bodyB.label)
	if (bodyB.label === 'bullet') [bodyA, bodyB] = [bodyB, bodyA]
	if (bodyA.label === 'bullet') {
		Composite.remove(world, bodyA)
		if (bodyB.label === 'Rectangle Body') return
		Composite.remove(world, bodyB)
	}
}
