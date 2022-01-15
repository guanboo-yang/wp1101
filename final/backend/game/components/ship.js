import { Bodies } from 'matter-js'

const ship = () => {
	return Bodies.circle(100, 100, 18, {
		label: 'ship',
		friction: 0,
		frictionAir: 0.03, // add air friction
		frictionStatic: 1,
		restitution: 0.3, // less restitution to avoid bouncing
		inertia: Infinity,
	})
}

export default ship
