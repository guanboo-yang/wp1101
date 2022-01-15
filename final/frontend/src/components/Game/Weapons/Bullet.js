import { bullet } from 'assets/weapons'
import { CANVAS } from 'constant'
import { Sprite } from '../Sprite'

export default class Bullet extends Sprite {
	type = 'weapon'
	speed = 15

	constructor(pos = { x: 0, y: 0 }, angle = 0) {
		super(pos, { x: 0, y: 0, w: 4, h: 4, s: 4 }, angle)
		this.img.src = bullet
	}

	set(bullet) {
		this.pos = bullet.pos
	}

	move() {
		this.pos.x += this.speed * Math.cos(this.angle)
		this.pos.y += this.speed * Math.sin(this.angle)
	}

	draw(ctx, draw, camera) {
		draw.withoutAngle(ctx, this.img, this.rect, this.pos, this.scale, camera)
		if (
			this.pos.x < 0 + (this.rect.s * this.scale) / 2 ||
			this.pos.x > CANVAS.IN.WIDTH - (this.rect.s * this.scale) / 2 ||
			this.pos.y < 0 + (this.rect.s * this.scale) / 2 ||
			this.pos.y > CANVAS.IN.HEIGHT - (this.rect.s * this.scale) / 2
		) {
			this.remove()
		}
	}
}
