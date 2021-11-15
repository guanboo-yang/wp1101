import express from 'express'
import { genNumber, getNumber } from '../core/getNumber'
const router = express.Router()

router.get('/start', (_, res) => {
	genNumber()
	res.send({ msg: 'The game has started' })
})

router.get('/guess', (req, res) => {
	let number = getNumber()
	if (number === undefined) {
		genNumber()
		number = getNumber()
	}
	const guessed = parseInt(req.query.number, 10)
	if (!guessed || guessed < 1 || guessed > 100) {
		res.status(406).send({ msg: 'Error: Not a legal number' })
	} else if (number === guessed) {
		res.send({ msg: 'win' })
	} else if (number > guessed) {
		res.send({ msg: 'Try Bigger' })
	} else if (number < guessed) {
		res.send({ msg: 'Try Smaller' })
	}
})

router.post('/restart', (_, res) => {
	genNumber()
	res.json({ msg: 'The game has restarted' })
})

export default router
