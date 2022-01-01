import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default () => {
	if (!process.env.MONGODB_URL) {
		throw new Error('MONGODB_URL is not defined')
	}

	mongoose
		.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.catch(err => console.log(err))

	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', () => console.log('Connected to MongoDB'))
}
