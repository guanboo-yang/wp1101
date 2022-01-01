import { Server } from 'ws'
import { connect, connection } from 'mongoose'
import { createServer } from 'http'
import dotenv from 'dotenv-defaults'
import express from 'express'
const app = express()
const server = createServer(app)
const wss = new Server({ server: server })
import ParseData from '../controller/evtControl'
import { sendData } from '../connect/wssConnect'

dotenv.config()

connect(process.env.MONGO_URL)
const db = connection
const port = 5000

db.once('open', () => {
	wss.on('connection', ws => {
		ws.onmessage = async byteString => {
			ParseData(byteString, ws, wss)
		}
	})

	server.listen(port, () => {
		console.log(`Listening at port ${port}`)
	})
})
