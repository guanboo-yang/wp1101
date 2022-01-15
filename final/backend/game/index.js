import { Engine, Runner, Bodies, Composite } from 'matter-js'
import { roomBroadcast } from '../util/wssConnect'

const frameRate = 1000 / 30
const canvas = { width: 1500, height: 1000 }

let key = {
	turn: false,
	shoot: false,
}

const addBounds = (/** @type {number} */ w, /** @type {number} */ h, /** @type {number} */ b) => {
	return [
		Bodies.rectangle(w / 2, -b / 2, w + 2 * b, b, { isStatic: true }),
		Bodies.rectangle(w / 2, h + b / 2, w + 2 * b, b, { isStatic: true }),
		Bodies.rectangle(-b / 2, h / 2, b, h + 2 * b, { isStatic: true }),
		Bodies.rectangle(w + b / 2, h / 2, b, h + 2 * b, { isStatic: true }),
	]
}

const bounds = [canvas.width, canvas.height]

const sprites = {
	ships: [Bodies.circle(100, 100, 20), Bodies.circle(100, 900, 20)],
	bullets: [],
	bounds: addBounds(...bounds, 100),
}

const toVertices = e => e.vertices.map(({ x, y }) => ({ x, y }))

export const game = (/** @type {any} */ players, /** @type {any} */ userDatas) => {
	const engine = Engine.create()
	// const engine = Engine.create({ gravity: { scale: 0 } })
	const world = engine.world
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
		if (key.turn) {
			sprites.ships[0].angle += 0.1
		}
		if (key.shoot) {
			sprites.bullets.push(
				Bodies.circle(sprites.ships[0].position.x, sprites.ships[0].position.y, 5, {
					restitution: 0.5,
					friction: 0.5,
					frictionStatic: 0.5,
					frictionAir: 0.5,
					density: 0.5,
					collisionFilter: {
						group: -1,
					},
				})
			)
		}
		Engine.update(engine, frameRate)
	}, frameRate)
}
