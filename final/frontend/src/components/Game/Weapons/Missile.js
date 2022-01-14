import missile from 'assets/weapons/missile.png'
import { CANVAS } from 'constant'
import { Sprite } from '../Sprite'
import { Explosion } from '.'

export default class Missile extends Sprite {
	type = 'weapon'
	speed = 10
	interval = [undefined]

	constructor(pos = { x: 0, y: 0 }, angle = 0) {
		super(pos, { x: 0, y: 0, w: 14, h: 7, s: 7 }, angle)
		this.img.src = missile
		this.interval[0] = setInterval(() => {
			this.rect.y = (this.rect.y + 1) % 8
		}, 1000 / 15)
	}

	move() {
		this.pos.x += this.speed * Math.cos(this.angle)
		this.pos.y += this.speed * Math.sin(this.angle)
	}

	draw(ctx, draw, camera) {
		draw.withAngleAndCamera(ctx, this.img, this.rect, this.pos, this.angle, this.scale, camera)
		if (
			this.pos.x < 0 + (this.rect.s * this.scale) / 2 ||
			this.pos.x > CANVAS.IN.WIDTH - (this.rect.s * this.scale) / 2 ||
			this.pos.y < 0 + (this.rect.s * this.scale) / 2 ||
			this.pos.y > CANVAS.IN.HEIGHT - (this.rect.s * this.scale) / 2
		) {
			new Explosion(this.pos)
			clearInterval(this.interval[0])
			this.remove()
		}
	}
}
