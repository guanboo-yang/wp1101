import bodyParser from 'body-parser'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import express from 'express'
import router from './router'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
/* define your own port or use 4000 as default port */
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017'
/* define your MONGODB_URL in `.env.defaults` or use local mongodb service */
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)

mongoose
	.connect(MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch(err => console.error(err.message))
