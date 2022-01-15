import { Player, Room } from '../models/schemas'
import { roomBroadcast } from '../util/wssConnect'
import { game, handleKey } from '../game'

const gameStart = async (userDatas, { roomId, players }) => {
	console.log(roomId)
	// await Room.findOne({roomId})

	roomBroadcast(players, ['gameStart', players], userDatas)

	game(roomId, players, userDatas)
}

const eventHandler = (userDatas, { roomId, index, evt, name }) => {
	handleKey(roomId, index, evt)
}

export { gameStart, eventHandler }
