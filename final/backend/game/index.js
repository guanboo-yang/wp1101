import { Engine, Events, Bodies, Composite, Body } from 'matter-js'
import { roomBroadcast } from '../util/wssConnect'
import ship from './components/ship'
import bullet from './components/bullet'
import wall from './components/wall'
import { positions } from './positions'

const frameRate = 1000 / 30
const FORCE = 0.0007
const bullet_speed = 30

const addBounds = (/** @type {number} */ w, /** @type {number} */ h, /** @type {number} */ b) => {
	return [
		Bodies.rectangle(w / 2, -b / 2, w + 2 * b, b, { isStatic: true, label: 'blocks' }),
		Bodies.rectangle(w / 2, h + b / 2, w + 2 * b, b, { isStatic: true, label: 'blocks' }),
		Bodies.rectangle(-b / 2, h / 2, b, h + 2 * b, { isStatic: true, label: 'blocks' }),
		Bodies.rectangle(w + b / 2, h / 2, b, h + 2 * b, { isStatic: true, label: 'blocks' }),
	]
}

const playersNum = players => players.filter((/** @type {any} */ p) => p).length

const toVertices = (/** @type {{ vertices: { x: any; y: any; }[]; }} */ e) => e.vertices.map(({ x, y }) => ({ x, y }))

const ALL_GAME = {}

const singleGame = (
	/** @type {string | number} */ roomId,
	/** @type {string[]} */ players,
	/** @type {{ [x: string]: { online: any; }; }} */ userDatas,
	/** @type {number} */ rounds,
	/** @type {number} */ level
) => {
	const gameLevel = level === 0 ? Math.floor(Math.random() * 3) + 1 : level
	const gamePositions = positions[gameLevel]
	const bounds = [gamePositions.canvas.width, gamePositions.canvas.height]

	const state = {
		/** @type {number[]} */ deadId: [],
	}

	// console.log(gameLevel)

	const sprites = {
		ships: players.map((/** @type {any} */ p, /** @type {any} */ i) => {
			if (!p) return null
			return new ship(gamePositions.ships[i].pos, gamePositions.ships[i].angle).body
		}),
		bullets: [],
		walls: gamePositions.walls.filter((/** @type {any} */ w) => w.b).map((/** @type {any} */ w) => new wall((w.x * 2 + 1) * 40, (w.y * 2 + 1) * 40, w.b).body),
		blocks: gamePositions.walls.filter((/** @type {any} */ w) => !w.b).map((/** @type {any} */ w) => new wall((w.x * 2 + 1) * 40, (w.y * 2 + 1) * 40, w.b).body),
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
		pairs.forEach(({ bodyA, bodyB }) => checkCollision(engine.world, sprites, bodyA, bodyB, state.deadId, ALL_GAME[roomId]?.kills))
	})

	const sendGameState = () => {
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
								// @ts-ignore
								bullets: ship.plugin.self.bullets,
								// @ts-ignore
								isFire: ship.plugin.self.isFire,
								// @ts-ignore
								isBlank: ship.plugin.self.isBlank,
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
						...sprites.walls.map(wall => ({
							type: 'wall',
							pos: {
								x: wall.position.x,
								y: wall.position.y,
							},
							breakable: wall.plugin.self.breakable,
							id: wall.id,
						})),
						...sprites.blocks.map(block => ({
							type: 'wall',
							pos: {
								x: block.position.x,
								y: block.position.y,
							},
							breakable: block.plugin.self.breakable,
							id: block.id,
						})),
					],
					bounds: bounds,
					deadId: state.deadId,
				},
			],
			userDatas
		)
	}

	sendGameState()

	let gameStart = false

	roomBroadcast(players, ['gameReady', 'ready'], userDatas)
	setTimeout(() => {
		roomBroadcast(players, ['gameReady', 'fight'], userDatas)
		gameStart = true
	}, 1500)

	const bulletIntervals = setInterval(() => {
		sprites.ships.forEach((ship, i) => {
			if (!ship) return
			if (ship.plugin.self.bullets < 3) ship.plugin.self.bullets++
		})
	}, 1500)

	// const restartGameInterval = setInterval(() => {})

	const gameInterval = setInterval(() => {
		sprites.ships.forEach((ship, i) => {
			if (!ship) return
			if (ship.plugin.self.isFire > -1) ship.plugin.self.isFire--
		})
		try {
			sendGameState()
			state.deadId.length = 0
		} catch (e) {
			console.log(e)
		}
		if (!gameStart) return
		sprites.ships.forEach((/** @type {Body} */ ship, /** @type {string | number} */ index) => {
			if (!ship) return
			const { x, y } = ship.position
			let angle = ship.angle
			if (ALL_GAME[roomId]?.ships[index].turn) angle += 0.1
			const force = {
				x: Math.cos(angle) * FORCE,
				y: Math.sin(angle) * FORCE,
			}
			Body.applyForce(ship, { x, y }, force)
			Body.setAngle(ship, angle)
			if (ALL_GAME[roomId]?.ships[index].shoot) {
				ALL_GAME[roomId].ships[index].shoot = false
				ship.plugin.self.isFire = 3
				if (ship.plugin.self.bullets < 1) {
					ship.plugin.self.isBlank = true
					return
				}
				ship.plugin.self.isBlank = false
				const bull = new bullet(x + Math.cos(angle) * 35, y + Math.sin(angle) * 35, ship.id).body
				ship.plugin.self.bullets--
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
		if (playersNum(sprites.ships) === 1) {
			// console.log('end', rounds)
			clearInterval(bulletIntervals)
			clearInterval(gameInterval)
			Composite.clear(engine.world, true)
			if (rounds > 1) {
				ALL_GAME[roomId] = {
					game: singleGame(roomId, players, userDatas, --rounds, level),
					ships: [
						{ turn: false, shoot: false },
						{ turn: false, shoot: false },
						{ turn: false, shoot: false },
						{ turn: false, shoot: false },
					],
					kills: ALL_GAME[roomId].kills,
				}
			} else {
				roomBroadcast(players, ['gameOver', ALL_GAME[roomId]?.kills], userDatas)
				ALL_GAME[roomId] = null
				return
			}
			roomBroadcast(players, ['gameRestart', {}], userDatas)
			// setTimeout(() => {
			// 	roomBroadcast(players, ['gameStart', {}], userDatas)
			// }, 1000)
		}
		if (playersNum(players) === 0) {
			clearInterval(bulletIntervals)
			clearInterval(gameInterval)
			Composite.clear(engine.world, true)
			Engine.clear(engine)
			ALL_GAME[roomId] = null
			return
		}
	}, frameRate)
}

export const game = (/** @type {number} */ roomId, /** @type {any} */ players, /** @type {any} */ userDatas, /** @type {{ rounds: string | number; level: any; }} */ room) => {
	const ROUND = [1, 3, 5]
	// console.log(room.level)
	ALL_GAME[roomId] = {
		game: singleGame(roomId, players, userDatas, ROUND[room.rounds], room.level),
		ships: [
			{ turn: false, shoot: false },
			{ turn: false, shoot: false },
			{ turn: false, shoot: false },
			{ turn: false, shoot: false },
		],
		kills: [0, 0, 0, 0],
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

const checkCollision = (
	/** @type {Composite} */ world,
	/** @type {Body[]} */ sprites,
	/** @type {Composite} */ bodyA,
	/** @type {Composite} */ bodyB,
	/** @type {number[]} */ deadId,
	/** @type {number[]} */ kills
) => {
	// console.log(bodyA.label, bodyB.label)
	if (bodyB.label === 'bullets') [bodyA, bodyB] = [bodyB, bodyA]
	if (bodyA.label === 'bullets') {
		// @ts-ignore
		bodyA.plugin.self.destroy(world, sprites[bodyA.label], deadId)
		Composite.remove(world, bodyA)
		if (bodyB.label === 'blocks') return
		if (bodyB.label === 'ships') {
			// @ts-ignore
			const parent = bodyA.plugin.self.pid
			// use parent id to find the ship index
			// @ts-ignore
			const index = sprites.ships.findIndex((/** @type {Body} */ ship) => ship.id === parent)
			kills[index]++
		}
		// @ts-ignore
		bodyB.plugin.self.destroy(world, sprites[bodyB.label], deadId)
		Composite.remove(world, bodyB)
	}
}
