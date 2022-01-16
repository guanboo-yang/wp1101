import { Player, Room, Message } from '../models/schemas'
import { sendData, roomBroadcast } from '../util/wssConnect'
let gameId = 23754

const createNewRoom = async (connection, { gameMode, rounds, level, name }) => {
	const creator = await Player.findOneAndUpdate({ name },  {roomId: gameId})
	let newRoom = new Room(
		{
			gameMode,
			rounds,
			level,
			players: [creator._id, undefined, undefined, undefined],
			roomId: gameId,
			host: name
		},
		{ autoIndex: false })
	await newRoom.save()
	sendData(['roomCreated', { roomId: gameId }], connection)
	gameId += 1
}
	
const leaveRoom = async (userDatas, { roomId, index, players, playersNum, name }) => {
	await Player.findOneAndUpdate({name}, {roomId: null})
	if (playersNum === 1) {
		await Room.deleteOne({ roomId })
	} else {
		const room = await Room.findOne({ roomId })
		console.log(room);
		let users = room.players
		users[index] = null
		players[index] = null
		if (room.host === name){
			console.log(players);
			const newHost = players.find(player => player)
			await Room.findOneAndUpdate({ roomId }, { players: users, host: newHost })
			roomBroadcast(players, ['updatedPosition', {players, newHost}], userDatas)
		}else{
			await Room.findOneAndUpdate({ roomId }, { players: users })
			roomBroadcast(players, ['updatedPosition', {players}], userDatas)
		}
	}
}

const invite = async (userDatas, datas) => {
	var { roomId, index, name, inviter, players } = datas
	const targetConnect = userDatas[name]
	sendData(['invitation', { roomId, index, inviter, players }], targetConnect.connection)
}

const swapRequest = async (userDatas, datas) => {
	var { roomId, from, to, players } = datas
	var room = await Room.findOne({ roomId: roomId })
	var users = room.players
	var target = players[to]
	// There is already a person in the target position
	if (target) {
		const targetConnect = userDatas[target]
		sendData(['exchagePos', { name: players[from], from, to }], targetConnect.connection)
	} else {
		users[to] = users[from]
		users[from] = null
		players[to] = players[from]
		players[from] = null
		await Room.findOneAndUpdate({ roomId }, { players: users })
		roomBroadcast(players, ['updatedPosition', {players}], userDatas)
	}
}

const acceptInvitation = async (userDatas, { roomId, index, name, players }) => {
	var room = await Room.findOne({ roomId })
	var users = room.players
	var user = await Player.findOneAndUpdate({ name }, { roomId })
	players[index] = name
	users[index] = user._id
	await Room.findOneAndUpdate({ roomId }, { players: users })
	roomBroadcast(players, ['updatedPosition', {players}], userDatas)
}

const acceptExchange = async (userDatas, datas) => {
	var { from, to, roomId, players } = datas
	var room = await Room.findOne({ roomId })
	var users = room.players
	// Modify
	let temp = users[from]
	users[from] = users[to]
	users[to] = temp
	temp = players[from]
	players[from] = players[to]
	players[to] = temp
	await Room.findOneAndUpdate({ roomId }, { players: users })
	roomBroadcast(players, ['updatedPosition', {players}], userDatas)
}

const newMessage = async (userDatas, {roomId, players, message, send}) => {
	let newMessage = new Message({name: send, body: message});
	await Room.findOneAndUpdate({roomId}, {"$push": { "messages": newMessage._id }})
	await newMessage.save()
	console.log(players);
	roomBroadcast(players, ['newMessage', {message, send}], userDatas)
}

const joinRoom = async (connection, userDatas, {roomId, name}) => {
	let room = await Room.findOne({roomId}).populate('players')
	// No this room
	if (!room){
		sendData(['emptyRoom', null], connection)
	}else{
		if (room.players.length === 4){
			sendData(['fullRoom', null], connection)
		}else{
			let host = room.host
			sendData(['wannaJoin', {name}], userDatas[host].connection)
		}
	}
	// console.log(players[0], players[1], players[2], players[3]);
	// console.log(room);
	// console.log(players);
}

const acceptRequire = async (userDatas, {name, roomId, players}) => {
	let position = players.findIndex(player => !player)
	console.log(players);
	console.log(position);
	players[position] = name
	let user = await Player.findOne({name})
	let room = await Room.findOne({roomId})
	let users = room.players
	// console.log(roo);
	console.log(users);
	users[position] = user._id;
	await Room.findOneAndUpdate({roomId}, {players: users})
	roomBroadcast(players, ['updatedPosition', {players}], userDatas)
}

export { createNewRoom, leaveRoom, swapRequest, acceptInvitation, acceptExchange, invite, newMessage, joinRoom, acceptRequire }
