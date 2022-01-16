import { CANVAS } from 'constant'
import { Particle } from './Particle'

const drawWithAngle = (ctx, img = new Image(), rect = { x: 0, y: 0, w: 0, h: 0, s: 0 }, pos = { x: 0, y: 0 }, angle = 0, scale = 0) => {
	ctx.translate(pos.x, pos.y)
	ctx.rotate(angle)
	ctx.drawImage(img, rect.x * rect.w, rect.y * rect.h, rect.w, rect.h, (-rect.w * scale) / 2, (-rect.h * scale) / 2, rect.w * scale, rect.h * scale)
	ctx.rotate(-angle)
	ctx.translate(-pos.x, -pos.y)
}

export const draw = {
	withoutAngle: (
		ctx,
		img = new Image(),
		rect = { x: 0, y: 0, w: 0, h: 0, s: 0 },
		pos = { x: 0, y: 0 },
		scale = 0,
		camera = { x: 0, y: 0, w: CANVAS.IN.WIDTH, h: CANVAS.IN.HEIGHT }
	) => {
		const camerascale = CANVAS.OUT.WIDTH / camera.w
		ctx.drawImage(
			img,
			rect.x * rect.w,
			rect.y * rect.h,
			rect.w,
			rect.h,
			(pos.x - (rect.w * scale) / 2 - (camera.x - camera.w / 2)) * camerascale,
			(pos.y - (rect.h * scale) / 2 - (camera.y - camera.h / 2)) * camerascale,
			rect.w * scale * camerascale,
			rect.h * scale * camerascale
		)
	},
	withAngleAndCamera: (
		ctx,
		img = new Image(),
		rect = { x: 0, y: 0, w: 0, h: 0, s: 0 },
		pos = { x: 0, y: 0 },
		angle = 0,
		scale = 0,
		camera = { x: 0, y: 0, w: CANVAS.IN.WIDTH, h: CANVAS.IN.HEIGHT }
	) => {
		const camerascale = CANVAS.OUT.WIDTH / camera.w
		drawWithAngle(ctx, img, rect, { x: (pos.x - (camera.x - camera.w / 2)) * camerascale, y: (pos.y - (camera.y - camera.h / 2)) * camerascale }, angle, camerascale * scale)
	},
	text: (ctx, text, color = '#000', pos = { x: 0, y: 0 }, camera = { x: 0, y: 0, w: CANVAS.IN.WIDTH, h: CANVAS.IN.HEIGHT }, fontSize = 40) => {
		const camerascale = CANVAS.OUT.WIDTH / camera.w
		ctx.font = `${fontSize * camerascale}px Bungee`
		ctx.lineWidth = 3
		ctx.lineWidth = 2 * camerascale
		ctx.fillStyle = color
		ctx.strokeStyle = 'white'
		ctx.fillText(text, (pos.x - camera.x + camera.w / 2) * camerascale, (pos.y - camera.y + camera.h / 2 - 60) * camerascale)
		ctx.strokeText(text, (pos.x - camera.x + camera.w / 2) * camerascale, (pos.y - camera.y + camera.h / 2 - 60) * camerascale)
	},
	rect: (ctx, fillColor, strokeColor, rect = { w: 0, h: 0 }, pos = { x: 0, y: 0 }, camera = { x: 0, y: 0, w: CANVAS.IN.WIDTH, h: CANVAS.IN.HEIGHT }) => {
		// console.log(rect, pos)
		const camerascale = CANVAS.OUT.WIDTH / camera.w
		ctx.beginPath()
		ctx.fillStyle = fillColor
		ctx.strokeStyle = strokeColor
		ctx.lineWidth = 4 * camerascale
		ctx.fillRect(
			(pos.x - rect.w / 2 - camera.x + camera.w / 2) * camerascale,
			(pos.y - rect.h / 2 - camera.y + camera.h / 2) * camerascale,
			rect.w * camerascale,
			rect.h * camerascale
		)
		ctx.strokeRect(
			(pos.x - rect.w / 2 - camera.x + camera.w / 2) * camerascale,
			(pos.y - rect.h / 2 - camera.y + camera.h / 2) * camerascale,
			rect.w * camerascale,
			rect.h * camerascale
		)
		ctx.closePath()
	},
	line: (ctx, color, start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, camera = { x: 0, y: 0, w: CANVAS.IN.WIDTH, h: CANVAS.IN.HEIGHT }) => {
		const camerascale = CANVAS.OUT.WIDTH / camera.w
		ctx.lineWidth = 3 * camerascale
		ctx.beginPath()
		ctx.strokeStyle = color
		ctx.moveTo((start.x - camera.x + camera.w / 2) * camerascale, (start.y - camera.y + camera.h / 2) * camerascale)
		ctx.lineTo((end.x - camera.x + camera.w / 2) * camerascale, (end.y - camera.y + camera.h / 2) * camerascale)
		ctx.stroke()
		ctx.closePath()
	},
}

export const getSpriteByType = (objects, type, boolean = true) => {
	objects = objects.filter(object => object)
	if (boolean) return objects.filter(object => object.type === type)
	return objects.filter(object => object.type !== type)
}

export const setCameraOn = (camera, sprites, padding = 0) => {
	const delta = 0.2
	const minX = Math.min(...sprites.map(sprite => sprite.pos.x))
	const maxX = Math.max(...sprites.map(sprite => sprite.pos.x))
	const minY = Math.min(...sprites.map(sprite => sprite.pos.y))
	const maxY = Math.max(...sprites.map(sprite => sprite.pos.y))
	const width = maxX - minX
	const height = maxY - minY
	const centerX = minX + width / 2
	const centerY = minY + height / 2
	const max = Math.max(width, height) + padding * 2
	// console.log(minX, maxX, minY, maxY)
	// console.log(centerX, centerY, max)
	// console.log(camera.x, camera.y, camera.w, camera.h)
	const ret = {
		x: centerX * delta + camera.x * (1 - delta),
		y: centerY * delta + camera.y * (1 - delta),
		w: max * delta + camera.w * (1 - delta),
		h: max * delta + camera.h * (1 - delta),
	}
	// console.log(ret)
	return ret
}

export const particles = []

export const explode = (x, y, color = '#fff') => {
	for (let i = 0; i < 100; i++) {
		let dx = (Math.random() - 0.5) * (Math.random() * 6)
		let dy = (Math.random() - 0.5) * (Math.random() * 6)
		let radius = Math.random() * 3
		let particle = new Particle({ x, y }, radius, dx, dy)
		particles.push(particle)
	}
}
