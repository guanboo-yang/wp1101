import { Sprite } from './Sprite'

export class Text extends Sprite {
	type = 'text'
	opacity = 1
	interval = [undefined]
	constructor(pos = { x: 0, y: 0 }, color, text) {
		super(pos)
		this.color = color
		this.text = text
		this.interval[0] = setInterval(() => {
			this.opacity -= 0.1
		}, 1000 / 15)
	}

	draw(ctx, draw, camera) {
		// console.log(this.text)
		ctx.globalAlpha = this.opacity
		draw.text(ctx, this.text, this.color, this.pos, camera, 80)
		ctx.globalAlpha = 1
	}
}
