import { bullet } from 'assets/weapons'
// import { CANVAS } from 'constant'
import { Sprite } from '../Sprite'
import { explode } from '../utils'

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

	draw(ctx, draw, camera) {
		draw.withoutAngle(ctx, this.img, this.rect, this.pos, this.scale, camera)
	}

	destroy() {
		explode(this.pos.x, this.pos.y, 'red', 20)
	}
}
