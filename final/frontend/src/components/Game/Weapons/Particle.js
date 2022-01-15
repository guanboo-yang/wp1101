let particles = []

export default class Particle {
	type = 'particle'
	opacity = 1
	interval = [undefined]

	constructor(pos, radius, speed, angle) {
		this.pos = pos
		this.radius = radius
		this.speed = speed
	}

	move() {
		this.opacity -= 0.01
		this.pos.x += this.speed * Math.cos(this.angle)
		this.pos.y += this.speed * Math.sin(this.angle)
	}

	draw(ctx, draw, camera) {
		ctx.globalAlpha = this.opacity
		draw.withoutAngle(ctx, this.img, this.rect, this.pos, this.scale, camera)
		ctx.globalAlpha = 1
	}
}

setTimeout(() => {
	for (i = 0; i <= 150; i++) {
		let dx = (Math.random() - 0.5) * (Math.random() * 6)
		let dy = (Math.random() - 0.5) * (Math.random() * 6)
		let radius = Math.random() * 3
		let particle = new Particle(575, 375, radius, dx, dy)

		/* Adds new items like particle*/
		particles.push(particle)
	}
	explode()
}, 3000)

/* Particle explosion function */
function explode() {
	/* Clears the given pixels in the rectangle */
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	particles.forEach((particle, i) => {
		if (particle.alpha <= 0) {
			particles.splice(i, 1)
		} else particle.update()
	})

	/* Performs a animation after request*/
	requestAnimationFrame(explode)
}
