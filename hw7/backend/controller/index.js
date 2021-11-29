import Score from '../models'

const awesome = () => {}

const connect = (req, res) => {
	res.send('Successfully connected to the server!')
}

const createCard = async (req, res) => {
	const { name, subject, score } = req.body
	try {
		const { matchedCount, modifiedCount, upsertedCount } = await Score.updateMany({ name, subject }, { score })
		if (upsertedCount) res.status(201).send({ message: `Added (${name}, ${subject}, ${score})`, card: 'newscore' })
		else if (modifiedCount) res.status(201).send({ message: `Updated (${name}, ${subject}, ${score})`, card: 'newscore' })
		else if (matchedCount) res.status(201).send({ message: `Existed (${name}, ${subject}, ${score})`, card: 'newscore' })
	} catch (err) {
		res.send({ message: err.message })
	}
}

const queryCards = async (req, res) => {
	const { type, queryString } = req.query
	try {
		// const table = await Score.find({ [type]: queryString }, { _id: 0 })
		const table = await Score.where(type).equals(queryString)
		const messages = []
		table.forEach(({ name, subject, score }) => {
			messages.push(`${name} & ${subject}: ${score}`)
		})
		if (table.length) res.send({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} (${queryString}) found`, table, messages })
		else res.send({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} (${queryString}) not found!`, table, messages })
	} catch (err) {
		res.send({ message: err.message })
	}
}

const deleteDB = async (req, res) => {
	await Score.deleteMany({})
	res.send({ message: 'Database cleared' })
}

const postUser = (req, res) => {
	res.send('POST HTTP method on users resources')
}

const putUser = (req, res) => {
	res.send(`PUT HTTP method on users/${req.params.userId} resource`)
}

export { connect, createCard, queryCards, deleteDB, postUser, putUser }
