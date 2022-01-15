import { connect, connection } from 'mongoose'
import dotenv from 'dotenv-defaults'
import { Player, Room } from '../models/schemas'
import { sendData, getFriendsList, updateFriends } from '../util/wssConnect'
import { usualLogin, googleLogin, createAccount } from '../events/login'
import { gameStart, eventHandler } from '../events/game'
import { createNewRoom, leaveRoom, swapRequest, acceptInvitation, acceptExchange, invite, newMessage } from '../events/room'
const WebSocketServer = require('websocket').server
const http = require('http')
const db = connection
const port = 5000
let userDatas = {}
// userDatas include 3 attributes: connection, name, online

dotenv.config()
connect(process.env.MONGO_URL, { autoIndex: false })

const server = http.createServer(function (request, response) {
	response.writeHead(404)
	response.end()
})

const wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false,
})

const originIsAllowed = origin => {
	return true
}

db.once('open', async () => {
	// Setting db
	Room.deleteMany({})
	let users = await Player.find({})
	users.forEach(user => {
		userDatas[user.name] = { online: false, connection: null }
	})

	wsServer.on('request', request => {
		if (!originIsAllowed(request.origin)) {
			request.reject()
			console.log(new Date() + ' Connection from origin ' + request.origin + ' rejected.')
			return
		}

		let connection = request.accept('echo-protocol', request.origin)
		sendData(['getClientId', process.env.CLIENT_ID], connection)
		let user = request.resourceURL.query.name
		if (user) {
			userDatas[user] = { online: true, connection: connection }
			updateFriends(userDatas)
		}

		connection.on('message', async message => {
			const [type, datas] = JSON.parse(message.utf8Data)
			switch (type) {
				case 'login':
					var res = await usualLogin(connection, datas)
					if (res.success) {
						userDatas[res.name] = {
							online: true,
							connection: connection,
						}
						updateFriends(userDatas)
						user = res.name
					}
					break
				case 'googleLogin':
					var res = await googleLogin(connection, datas)
					if (res.success) {
						userDatas[res.name] = {
							online: true,
							connection: connection,
						}
						updateFriends(userDatas)
						user = res.name
					}
					break
				case 'create':
					var res = await createAccount(connection, datas)
					if (res.success) {
						userDatas[res.name] = {
							online: true,
							connection: connection,
						}
						updateFriends(userDatas)
						user = res.name
					}
					break
				case 'requireFriends':
					let returnValue = getFriendsList(userDatas)
					sendData(['friendLists', returnValue], connection)
					break
				case 'createRoom':
					createNewRoom(connection, datas)
					break
				case 'leaveRoom':
					leaveRoom(userDatas, datas)
					break
				case 'invitePlayer':
					await invite(userDatas, datas)
					break
				case 'swapPosition':
					await swapRequest(userDatas, datas)
					break
				case 'acceptInvitation':
					await acceptInvitation(userDatas, datas)
					break
				case 'acceptExchange':
					await acceptExchange(userDatas, datas)
					break
				case 'gameStart':
					await gameStart(userDatas, datas)
					break
				case 'gameEvent':
					await eventHandler(userDatas, datas)
					break
				case 'newMessage':
					await newMessage(userDatas, datas)
					break
				case 'logout':
					var { name } = datas
					userDatas[name] = { ...userDatas[name], online: false, connection: null }
					updateFriends(userDatas)
					break
				default:
					break
			}
		})
		connection.on('close', () => {
			if (user) {
				userDatas[user] = { ...user, online: false, connection: null }
				updateFriends(userDatas)
			}
			console.log(user, 'disconnected')
		})
	})

	server.listen(port, () => {
		console.log(`Listening at port ${port}`)
	})
})
