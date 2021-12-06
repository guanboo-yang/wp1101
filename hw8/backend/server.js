import bodyParser from 'body-parser'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import express from 'express'
import Message from './model'
import http from 'http'
import { sendMessage, initData, broadcastMessage } from './wssConnect'
// import cors from 'cors'

dotenv.config()
import WebSocket from 'ws'
const PORT = process.env.PORT || 4000
/* define your own port or use 4000 as default port */
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017'
const db = mongoose.connection
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
mongoose
	.connect(MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch(err => console.error(err.message))

db.once('open', () => {
	console.log('MongoDB connected!')
	wss.on('connection', ws => {
		// Define WebSocket connection logic
		initData(ws)
		ws.onmessage = async byteString => {
			const { data } = byteString
			const [task, payload] = JSON.parse(data)
			switch (task) {
				case 'input': {
					const { name, body } = payload
					const message = new Message({ name, body })
					try {
						await message.save((e, o) => {
							broadcastMessage(['output', [{ _id: o.id, ...payload }]], wss, ws, { type: 'success', msg: 'Message sent.' }, {})
						})
					} catch (e) {
						console.error('Message DB save error: ' + e)
					}
					break
				}
				case 'clear': {
					Message.deleteMany({}, () => {
						broadcastMessage(['cleared'], wss, ws, { type: 'info', msg: 'Message cache cleared.' }, { type: 'info', msg: 'Message cache cleared.' })
					})
					break
				}
				case 'login': {
					const { name } = payload
					broadcastMessage(null, wss, ws, { type: 'info', msg: 'Welcome!' }, { type: 'info', msg: `${name} enter the room` })
					break
				}
				case 'logout': {
					const { name } = payload
					console.log(`${name} logout`)
					broadcastMessage(null, wss, ws, { type: 'info', msg: 'Goodbye~' }, { type: 'info', msg: `${name} leave the room` })
					break
				}
				default:
					break
			}
		}
		// close ws
		ws.on('close', () => console.log('close'))
	})
	server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
})
