import express from 'express'
import { init, move, getValidMoves, countScore } from '../core/othello'
import { getRandomInt } from '../utils/random'
const router = express.Router()

router.get('/start', (_, res) => {
	let ret = init()
	res.send(ret)
})

router.get('/move', (req, res) => {
	let ret
	const tempBoard = JSON.parse(req.query.board)
	const color = parseInt(req.query.color, 10)
	const row = parseInt(req.query.row, 10)
	const col = parseInt(req.query.col, 10)
	ret = move(tempBoard, color, row, col)
	if (ret.msg === 'Invalid Move') {
		res.status(406).send({ msg: 'Error: Not a legal move' })
	}
	if (ret.validMoves.length <= 0) {
		let vm = getValidMoves(ret.board, color)
		if (vm.length <= 0) {
			res.send({ board: ret.board, msg: 'Game Over!', ...countScore(ret.board) })
			return
		}
		res.send({ board: ret.board, validMoves: vm, ...countScore(ret.board) })
		return
	} else {
		do {
			let vm = getValidMoves(ret.board, -color)
			if (vm.length <= 0) {
				res.send({ ...ret, msg: 'Game Over!', ...countScore(ret.board) })
				return
			}
			let num = getRandomInt(0, vm.length - 1)
			ret = move(ret.board, -color, ...vm[num])
		} while (ret.validMoves <= 0)
	}

	res.send({ ...ret, ...countScore(ret.board) })
})

export default router
