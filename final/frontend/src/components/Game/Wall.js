import wall from 'assets/wall/1.png'
import wall2 from 'assets/wall/2.png'
import { Sprite } from './Sprite'
import { explode } from './utils'

export class Wall extends Sprite {
	type = 'weapon'
	speed = 15

	constructor(pos = { x: 0, y: 0 }, breakable) {
		super(pos, { x: 0, y: 0, w: 20, h: 20, s: 20 })
		this.img.src = breakable ? wall : wall2
	}

	set(wall) {
		this.pos = wall.pos
	}

	draw(ctx, draw, camera) {
		draw.withoutAngle(ctx, this.img, this.rect, this.pos, this.scale, camera)
	}

	destroy() {
		explode(this.pos.x, this.pos.y, 'orange', 30)
	}
}
