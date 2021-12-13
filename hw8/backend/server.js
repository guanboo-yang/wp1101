import bodyParser from 'body-parser'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import express from 'express'
import Message from './model'
import http from 'http'
import { dataInit } from './setup'
import { sendMessage, initData, saveData, broadcastMessage } from './wssConnect'
// import cors from 'cors'

dotenv.config()
import WebSocket from 'ws'
const PORT = process.env.PORT || 4000
/* define your own port or use 4000 as default port */
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017'
// define your own mongodb url
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
	// dataInit()
	console.log('MongoDB connected!')
	wss.on('connection', ws => {
		initData(ws)
		ws.onmessage = async byteString => {
			const { data } = byteString
			const [task, payload] = JSON.parse(data)
			switch (task) {
				case 'input': {
					saveData(wss, ws, payload)
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
					broadcastMessage(null, wss, ws, { type: 'info', msg: 'Welcome!' }, { type: 'info', msg: `${name} entered the room` })
					break
				}
				case 'logout': {
					const { name } = payload
					// console.log(`${name} logout`)
					broadcastMessage(null, wss, ws, { type: 'info', msg: 'Goodbye~' }, { type: 'info', msg: `${name} left the room` })
					break
				}
				case 'love': {
					const { name, _id } = payload
					// console.log(`${name} love ${_id}`)
					try {
						const msg = await Message.findOne({ _id })
						if (msg.love.includes(name)) {
							msg.love = msg.love.filter(n => n !== name)
						} else {
							msg.love.push(name)
						}
						msg.save()
						broadcastMessage(['love', msg], wss, ws, {}, {})
					} catch (err) {
						console.log(err)
					}
					break
				}
				case 'delete': {
					const { _id } = payload
					// console.log(`${_id} deleted`)
					try {
						Message.deleteOne({ _id }, () => {
							broadcastMessage(['delete', { _id }], wss, ws, {}, {})
						})
					} catch (err) {
						console.log(err)
					}
					break
				}
				default:
					break
			}
		}
		ws.on('close', () => {
			// console.log('close')
		})
	})
	server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
})
