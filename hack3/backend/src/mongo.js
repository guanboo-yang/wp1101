import mongoose from 'mongoose'
import { dataInit } from './upload.js'

import 'dotenv-defaults/config.js'

async function connect() {
	// TODO 1.1 Connect your MongoDB
	const MONGO_URL = process.env.MONGO_URL
	/* define your own MONGODB_URL */
	if (!process.env.MONGO_URL) {
		throw new Error('MONGODB_URL is not defined')
	}
	mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
	})
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', () => {
		console.log('MongoDB connected!')
		dataInit()
	})
}

export default { connect }
