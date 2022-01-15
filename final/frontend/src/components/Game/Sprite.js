export const state = {
	objects: {},
}

export class Sprite {
	// type: type
	type = 'sprite'
	// img: Image
	img = new Image()
	// x: x position in canvas
	// y: y position in canvas
	pos = { x: 0, y: 0 }
	// x: x value in sprite sheet
	// y: y value in sprite sheet
	// w: width of sprite
	// h: height of sprite
	// s: size of sprite
	rect = { x: 0, y: 0, w: 0, h: 0, s: 0 }
	// angle: angle of rotation
	angle = 0
	// scale: scale of sprite
	scale = 4
	// speed: speed of sprite
	speed = 0

	constructor(pos = { x: 0, y: 0 }, rect = { x: 0, y: 0, w: 0, h: 0, s: 0 }, angle = 0) {
		Object.assign(this.pos, pos)
		Object.assign(this.rect, rect)
		this.angle = angle
	}

	move() {}

	addObject(obj) {
		// state.objects.push(obj)
		state.objects[obj.type] = state.objects[obj.type] || []
		state.objects[obj.type].push(obj)
	}

	draw(ctx) {
		ctx.drawImage(
			this.img,
			this.frame.x * this.width,
			this.frame.y * this.height,
			this.width,
			this.height,
			this.pos.x - (this.size * this.scale) / 2,
			this.pos.y - (this.size * this.scale) / 2,
			this.size * this.scale,
			this.size * this.scale
		)
	}

	remove() {
		state.objects[this.type] = state.objects[this.type].filter(obj => obj !== this)
	}
}
