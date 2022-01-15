import { Bodies, Composite } from 'matter-js'

class bullet {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} [pid]
	 */
	constructor(x, y, pid) {
		this.pid = pid
		this.body = Bodies.circle(x, y, 6, {
			label: 'bullets',
			friction: 0,
			frictionAir: 0,
			frictionStatic: 1,
			restitution: 1,
			inertia: Infinity,
		})
	}
	/**
	 * @param {Composite} world
	 * @param {import("matter-js").Body[]} arr
	 */
	destroy(world, arr) {
		Composite.remove(world, this.body)
		arr.splice(arr.indexOf(this.body), 1)
	}
}

export default bullet
