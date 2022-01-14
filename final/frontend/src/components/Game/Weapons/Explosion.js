import { explosion } from 'assets/weapons'
import { Sprite } from '../Sprite'

export default class Explosion extends Sprite {
	type = 'weapon'
	opacity = 1
	interval = [undefined]

	constructor(pos = { x: 0, y: 0 }) {
		super(pos, { x: 0, y: 0, w: 119, h: 119, s: 119 }, 0)
		this.img.src = explosion
		this.interval[0] = setInterval(() => {
			this.opacity -= 0.1
			if (this.opacity <= 0) {
				clearInterval(this.interval)
				this.remove()
			}
		}, 1000 / 15)
	}

	move() {}

	draw(ctx, draw, camera) {
		ctx.globalAlpha = this.opacity
		draw.withoutAngle(ctx, this.img, this.rect, this.pos, this.scale, camera)
		ctx.globalAlpha = 1
	}
}
