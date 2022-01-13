import { connect, connection } from 'mongoose'
import dotenv from 'dotenv-defaults'
import { Player } from '../models/schemas';
import { sendData } from '../connect/wssConnect';
const WebSocketServer = require('websocket').server;
const http = require('http');
const db = connection
const port = 5000
let userDatas = []
// userDatas include 3 attributes: connection, name, online

dotenv.config()
connect(process.env.MONGO_URL)

const server = http.createServer(function(request, response) {
	response.writeHead(404);
	response.end();
});

const wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

const originIsAllowed = (origin) => {
	return true;
}

db.once('open', async() => {
	// Setting db
	let users = await Player.find({})
	userDatas = users.map((user) => {
		return {name: user.name, online: false, connection: null}
	})

	wsServer.on('request', (request) => {
		if (!originIsAllowed(request.origin)) {
		  request.reject();
		  console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
		  return;
		}
	
		let connection = request.accept('echo-protocol', request.origin);

		connection.on('message', async (message) => {
			const [type, datas] = JSON.parse(message.utf8Data)
			switch (type) {
				case 'login':
					var {password, email} = datas
					var user = await Player.find({email, password})
					if (!user.length){
						sendData(['loginFail', null], connection)
					}else{
						userDatas = userDatas.map((data) => {
							if (data.name === user.name){
								return {...data, online: true, connection: connection}
							}return data
						})
						sendData(['loginSuccess', user[0]], connection)
					}
					break
				case 'googleLogin':
					var {name, email, imageUrl} = datas
					var user = await Player.find({email, name})
					if (user.length){
						sendData(['loginSuccess', user[0]], connection)
						userDatas = userDatas.map((data) => {
							if (data.name === user.name){
								return {...data, online: true, connection: connection}
							}return data
						})
					}else{
						let newUser = await new Player({name, email}).save()
						sendData(['loginSuccess', newUser], connection)
						userDatas.push({name: name, online: true, connection: connection, image: imageUrl})
					}
					break
				case 'create':
					var {name, email, password} = datas
					var user = new Player({ name, email, password });
					try {
						await user.save();
						userDatas.push({name: name, online: true, connection: connection})
						sendData(['loginSuccess', user], connection);
					} catch (err) {
						sendData(['createFail', null] , connection);
					}
					break;
				case 'requireFriends':
					let returnValue = userDatas.map((data) => {
						return {name: data.name, online: data.online}
					})
					sendData(['friendLists', returnValue], connection)
					break
				case 'createRoom':

					break;
				default:
					break
			}
		});
		connection.on('close', () => {
			console.log(userDatas);
			userDatas = userDatas.map((user) => {
				if (user.connection === connection){
					return {...user, online: false}
				}
				return user
			})
			console.log('Disconnected');
		});
	});

	server.listen(port, () => {
		console.log(`Listening at port ${port}`)
	})
})