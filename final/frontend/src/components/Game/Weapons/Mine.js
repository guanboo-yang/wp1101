import mine from 'assets/weapons/mine.png'
import { Explosion } from '.'
import { Sprite } from '../Sprite'

export default class Mine extends Sprite {
	type = 'weapon'
	activate = false
	interval = [undefined]

	constructor(pos = { x: 0, y: 0 }) {
		super(pos, { x: 0, y: 0, w: 11, h: 11, s: 11 }, 0)
		this.img.src = mine
		this.interval[0] = setTimeout(() => {
			this.activate = true
			this.interval[0] = setInterval(() => {
				new Explosion(this.pos)
				clearTimeout(this.interval[0])
				this.remove()
			}, 1000)
		}, 3000)
	}

	move() {
		if (this.activate) {
			this.angle += 0.15
		}
	}

	draw(ctx, draw, camera) {
		draw.withAngleAndCamera(ctx, this.img, this.rect, this.pos, this.angle, this.scale, camera)
		// draw(ctx, this.img, this.size, this.size, 0, 0, this.pos, this.angle, this.scale)
	}
}
