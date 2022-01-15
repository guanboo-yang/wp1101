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

const playersNum = (/** @type {{ filter: (arg0: (p: any) => any) => { (): any; new (): any; length: any; }; }} */ players) => players.filter((/** @type {any} */ p) => p).length

const toVertices = (/** @type {{ vertices: { x: any; y: any; }[]; }} */ e) => e.vertices.map(({ x, y }) => ({ x, y }))

const ALL_GAME = {}

const singleGame = (/** @type {string | number} */ roomId, players, /** @type {{ [x: string]: { online: any; }; }} */ userDatas) => {
	const bounds = [canvas.width, canvas.height]

	const sprites = {
		ships: players.map((/** @type {any} */ p, /** @type {any} */ i) => {
			if (!p) return null
			return new ship().body
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
		// @ts-ignore
		pairs.forEach(({ bodyA, bodyB }) => checkCollision(engine.world, sprites, bodyA, bodyB))
	})

	const bulletIntervals = setInterval(() => {
		ALL_GAME[roomId].ships.forEach((/** @type {any} */ s) => {})
	})

	const gameInterval = setInterval(() => {
		try {
			roomBroadcast(
				players,
				[
					'gameUpdate',
					{
						sprites: [
							...sprites.ships.map((/** @type {{ id: any; position: { x: any; y: any; }; angle: any; }} */ ship, /** @type {any} */ index) => {
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
		sprites.ships.forEach((/** @type {Body} */ ship, /** @type {string | number} */ index) => {
			if (!ship) return
			const { x, y } = ship.position
			let angle = ship.angle
			if (ALL_GAME[roomId].ships[index].turn) {
				angle += 0.1
			}
			const force = {
				x: Math.cos(angle) * FORCE,
				y: Math.sin(angle) * FORCE,
			}
			Body.applyForce(ship, { x, y }, force)
			Body.setAngle(ship, angle)
			if (ALL_GAME[roomId].ships[index].shoot) {
				ALL_GAME[roomId].ships[index].shoot = false
				const bull = new bullet(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30).body
				sprites.bullets.push(bull)
				Body.applyForce(ship, { x, y }, { x: -Math.cos(angle) * FORCE * 2, y: -Math.sin(angle) * FORCE * 2 })
				Body.setAngle(bull, angle)
				Body.setVelocity(bull, { x: Math.cos(angle) * bullet_speed, y: Math.sin(angle) * bullet_speed })
				Composite.add(engine.world, bull)
			}
		})

		Engine.update(engine, frameRate)

		players.forEach((/** @type {string} */ player, /** @type {number} */ index) => {
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

export const game = (/** @type {number} */ roomId, /** @type {any} */ players, /** @type {any} */ userDatas) => {
	// ALL_GAME[roomId] = { singleGame, players, userDatas }
	// ALL_GAME[roomId].singleGame(ALL_GAME[roomId].players, ALL_GAME[roomId].userDatas)
	ALL_GAME[roomId] = {
		game: singleGame(roomId, players, userDatas),
		ships: [
			{ turn: false, shoot: false, bullets: 3 },
			{ turn: false, shoot: false, bullets: 3 },
			{ turn: false, shoot: false, bullets: 3 },
			{ turn: false, shoot: false, bullets: 3 },
		],
	}
}

export const handleKey = (/** @type {number} */ roomId, /** @type {number} */ index, /** @type {string} */ key) => {
	switch (key) {
		case 'enter':
			ALL_GAME[roomId].ships[index].turn = true
			break
		case 'leave':
			ALL_GAME[roomId].ships[index].turn = false
			break
		case 'space':
			ALL_GAME[roomId].ships[index].shoot = true
			break
		default:
			break
	}
}

const checkCollision = (/** @type {Composite} */ world, /** @type {Body[]} */ sprites, /** @type {Composite} */ bodyA, /** @type {Composite} */ bodyB) => {
	// console.log(bodyA.label, bodyB.label)
	if (bodyB.label === 'bullets') [bodyA, bodyB] = [bodyB, bodyA]
	if (bodyA.label === 'bullets') {
		Composite.remove(world, bodyA)
		sprites[bodyA.label].splice(sprites[bodyA.label].indexOf(bodyA), 1)
		if (bodyB.label === 'Rectangle Body') return
		Composite.remove(world, bodyB)
		// @ts-ignore
		bodyB.plugin.self.destroy(world, sprites[bodyB.label])
	}
}
