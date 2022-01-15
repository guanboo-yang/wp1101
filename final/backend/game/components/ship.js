import { Bodies, Composite, Body } from 'matter-js'
// import bullet from './bullet'

class ship {
	constructor() {
		this.bullets = 3
		this.isFire = false
		this.isBlank = false
		this.body = Bodies.circle(100, 100, 18, {
			label: 'ships',
			friction: 0,
			frictionAir: 0.03,
			frictionStatic: 1,
			restitution: 0.3,
			inertia: Infinity,
			plugin: { self: this },
		})
	}

	// shoot(world, x, y, angle, arr, FORCE, bullet_speed) {
	// 	const bull = new bullet(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30).body
	// 	arr.push(bull)
	// 	Body.applyForce(ship, { x, y }, { x: -Math.cos(angle) * FORCE * 2, y: -Math.sin(angle) * FORCE * 2 })
	// 	Body.setAngle(bull, angle)
	// 	Body.setVelocity(bull, { x: Math.cos(angle) * bullet_speed, y: Math.sin(angle) * bullet_speed })
	// 	Composite.add(world, bull)
	// }

	/**
	 * @param {Composite} world
	 * @param {import("matter-js").Body[]} arr
	 * @param {number[]} deadId
	 */
	destroy(world, arr, deadId) {
		Composite.remove(world, this.body)
		arr.splice(arr.indexOf(this.body), 1, null)
		deadId.push(this.body.id)
	}
}

export default ship
