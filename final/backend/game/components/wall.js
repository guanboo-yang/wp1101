import { Bodies, Composite } from 'matter-js'

class wall {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y, breakable) {
		this.breakable = breakable
		this.body = Bodies.rectangle(x, y, 80, 80, {
			label: breakable ? 'walls' : 'blocks',
			isStatic: true,
			plugin: { self: this },
		})
	}
	/**
	 * @param {Composite} world
	 * @param {import("matter-js").Body[]} arr
	 * @param {number[]} deadId
	 */
	destroy(world, arr, deadId) {
		Composite.remove(world, this.body)
		arr.splice(arr.indexOf(this.body), 1)
		deadId.push(this.body.id)
	}
}

export default wall
