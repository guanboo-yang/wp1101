import { Bodies, Composite } from 'matter-js'

class ship {
	constructor() {
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
	destroy(world, arr) {
		Composite.remove(world, this.body)
		arr.splice(arr.indexOf(this.body), 1, null)
	}
}

export default ship
