import mongoose from 'mongoose'

const ScoreSchema = mongoose.Schema({
	name: String,
	subject: String,
	score: Number,
})

const Score = mongoose.model('ScoreBoard', ScoreSchema)

export default Score
