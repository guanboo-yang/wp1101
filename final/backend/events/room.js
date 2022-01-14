import { Player, Room } from '../models/schemas'
import { sendData, roomBroadcast } from '../util/wssConnect'
let gameId = 23754

const createNewRoom = async (connection, datas) => {
	var { gameMode, rounds, level, name } = datas
	var creator = await Player.findOne({ name })
	gameId += 1
	let newRoom = new Room(
		{
			gameMode,
			rounds,
			level,
			players: [creator._id, undefined, undefined, undefined],
			roomId: gameId,
		},
		{ autoIndex: false }
	)

	await newRoom.save()
	sendData(['roomCreated', { roomId: gameId }], connection)
}

const leaveRoom = async (userDatas, datas) => {
	var { roomId, index, players, playersNum } = datas
	if (playersNum === 1) {
		await Room.deleteOne({ roomId })
	} else {
		var room = await Room.findOne({ roomId })
		var users = room.players
		users[index] = null
		players[index] = null
		Room.findOneAndUpdate({ roomId }, { players: users })
		roomBroadcast(players, ['updatedPosition', players], userDatas)
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
		roomBroadcast(players, ['updatedPosition', players], userDatas)
	}
}

const acceptInvitation = async (userDatas, datas) => {
	var { roomId, index, name, players } = datas
	var room = await Room.findOne({ roomId })
	var users = room.players
	var user = await Player.findOne({ name })
	players[index] = name
	users[index] = user._id
	await Room.findOneAndUpdate({ roomId }, { players: users })
	roomBroadcast(players, ['updatedPosition', players], userDatas)
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
	roomBroadcast(players, ['updatedPosition', players], userDatas)
}

export { createNewRoom, leaveRoom, swapRequest, acceptInvitation, acceptExchange, invite }
