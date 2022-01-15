import { Bodies } from 'matter-js'

const bullet = (x, y) => {
	return Bodies.circle(x, y, 6, {
		label: 'bullet',
		friction: 0,
		frictionAir: 0,
		frictionStatic: 1,
		restitution: 1,
		inertia: Infinity,
	})
}

export default bullet
