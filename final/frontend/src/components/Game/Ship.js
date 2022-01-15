import { ship, fire } from 'assets/ship'
import { Sprite } from './Sprite'
import { Bullet, Missile, Mine } from './Weapons'
import { colors } from 'constant'

const getHeadPos = (pos, angle, size) => {
	return { x: pos.x + size * Math.cos(angle), y: pos.y + size * Math.sin(angle) }
}

export class Ship extends Sprite {
	type = 'ship'
	fire = new Image()
	isFire = 0
	isBlank = false
	speed = { x: 0, y: 0 }
	acc = 0
	accMax = 0.3
	interval = [undefined, undefined]
	bullets = 3
	bulletsAngle = 0

	constructor(id, color = 0, pos = { x: 0, y: 0 }, angle = 0) {
		super(pos, { x: color, y: 0, w: 17, h: 11, s: 9 }, angle)
		this.img.src = ship
		this.fire.src = fire
		this.interval[0] = setInterval(() => {
			this.rect.y = (this.rect.y + 1) % 3
			this.bulletsAngle += 0.15
			this.isFire--
		}, 1000 / 20)
	}

	set(ship) {
		// console.log(ship)
		this.pos = ship.pos
		this.angle = ship.angle
		this.bullets = ship.bullets
		this.isFire = ship.isFire
		this.isBlank = ship.isBlank
	}

	// shoot(type) {
	// 	switch (type) {
	// 		case 'normal':
	// 			this.isFire = 3
	// 			if (this.bullets < 1) {
	// 				this.isBlank = true
	// 				return
	// 			}
	// 			this.bullets--
	// 			this.isBlank = false
	// 			clearTimeout(this.interval[1])
	// 			this.interval[1] = undefined
	// 			this.acc -= 1
	// 			new Bullet(getHeadPos(this.pos, this.angle, (this.rect.w / 2) * this.scale), this.angle)
	// 			break
	// 		case 'missile':
	// 			this.acc = -4
	// 			new Missile(getHeadPos(this.pos, this.angle, (this.rect.w / 2) * this.scale), this.angle)
	// 			break
	// 		case 'mine':
	// 			new Mine(this.pos)
	// 			break
	// 		default:
	// 			break
	// 	}
	// }

	draw(ctx, draw, camera) {
		if (this.isFire > -1) {
			draw.withAngleAndCamera(
				ctx,
				this.fire,
				{ x: this.isBlank ? 1 : 0, y: this.isFire, w: 11, h: 9 },
				getHeadPos(this.pos, this.angle, (this.rect.w * this.scale) / 2),
				this.angle,
				this.scale,
				camera
			)
		}
		draw.withAngleAndCamera(ctx, this.img, this.rect, this.pos, this.angle, this.scale, camera)
		draw.text(ctx, `P${this.rect.x + 1}`, colors[this.rect.x], this.pos, camera)

		// draw bullets around ship
		for (let i = 0; i < this.bullets; i++) {
			let pos = getHeadPos(this.pos, this.bulletsAngle + (i * (Math.PI * 2)) / 3, 12 * this.scale)
			draw.rect(ctx, '#fff', '#fff', { w: 4, h: 4 }, pos, camera)
		}
	}

	destroy() {
		clearInterval(this.interval[0])
		clearTimeout(this.interval[1])
		this.remove()
	}
}
