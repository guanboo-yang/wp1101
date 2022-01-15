import { Sprite } from '../Sprite'
import { missile_p } from 'assets/weapons'

export default class Prop extends Sprite {
	type = 'props'
	activate = false
	// interval = [undefined]

	constructor(pos = { x: 0, y: 0 }) {
		super(pos, { x: 0, y: 0, w: 11, h: 11, s: 11 }, 0)
		this.img.src = missile_p
		this.interval[0] = setTimeout(() => {
			this.activate = true
			this.interval[0] = setInterval(() => {
				new Explosion(this.pos)
				clearTimeout(this.interval[0])
				this.remove()
			}, 1000)
		}, 3000)
	}

	draw(ctx, draw, camera) {
		draw.withAngleAndCamera(ctx, this.img, this.rect, this.pos, this.angle, this.scale, camera)
		// draw(ctx, this.img, this.size, this.size, 0, 0, this.pos, this.angle, this.scale)
	}
}
