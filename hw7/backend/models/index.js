import mongoose from 'mongoose'

const rgx = new RegExp(/^[A-Z][a-z]*$/)

const ScoreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		// not working with updateMany
		// validate: {
		// 	validator: v => rgx.test(v),
		// 	message: () => `Name should be capitalized, such as: John`,
		// },
	},
	subject: {
		type: String,
		required: true,
		// not working with updateMany
		// validate: {
		// 	validator: v => rgx.test(v),
		// 	message: () => `Subject should be capitalized, such as: Math`,
		// },
	},
	score: {
		type: Number,
		required: true,
		min: 0,
		max: 100,
	},
})

ScoreSchema.pre('updateMany', function (next) {
	let { name, subject } = this.getQuery()
	if (!rgx.test(name)) throw new Error(`Validation failed: name: Path \`name\` (${name}) should be capitalized (ex: John).`)
	if (!rgx.test(subject)) throw new Error(`Validation failed: subject: Path \`subject\` (${subject}) should be capitalized (ex: Math).`)
	this.score = 0
	this.options.upsert = true
	this.options.runValidators = true
	next()
})

const Score = mongoose.model('ScoreBoard', ScoreSchema)

export default Score
