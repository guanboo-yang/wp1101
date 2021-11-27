import Score from '../models'

const connect = (req, res) => {
	res.send('Successfully connected to the server!')
}

const createCard = async (req, res) => {
	const { name, subject, score } = req.body
	try {
		await Score.updateMany({ name, subject }, { score }).then(({ matchedCount, modifiedCount, upsertedCount }) => {
			if (upsertedCount) res.status(201).send({ message: `Added (${name}, ${subject}, ${score})`, card: 'newscore' })
			else if (modifiedCount) res.status(201).send({ message: `Updated (${name}, ${subject}, ${score})`, card: 'newscore' })
			else if (matchedCount) res.status(201).send({ message: `Existed (${name}, ${subject}, ${score})`, card: 'newscore' })
		})
	} catch (err) {
		res.send({ message: err.message })
	}
}

const queryCards = async (req, res) => {
	const { type, queryString } = req.query
	// const table = await Score.find({ [type]: queryString }, { _id: 0 })
	const table = await Score.where(type).equals(queryString)
	const messages = []
	table.forEach(({ name, subject, score }) => {
		messages.push(`${name} & ${subject}: ${score}`)
	})
	if (table.length) res.send({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} (${queryString}) found`, table, messages })
	else res.send({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} (${queryString}) not found!`, table, messages })
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
