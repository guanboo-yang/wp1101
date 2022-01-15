import { Player, Room } from '../models/schemas'
import { roomBroadcast } from '../util/wssConnect'
import { game } from '../game'

const gameStart = async (userDatas, { roomId, players }) => {
	console.log(roomId)
	// await Room.findOne({roomId})

	roomBroadcast(players, ['gameStart', players], userDatas)

	game(players, userDatas)
}

<<<<<<< HEAD
const eventHandler = (userDatas, {roomId, index, evt, name}) => {
    console.log(name, evt, index);
=======
const eventHandler = (userDatas, { roomId, evt, name }) => {
	console.log(name, evt)
>>>>>>> c189905abc9ac0e915474e98546e5e9073e3c5ec
}

export { gameStart, eventHandler }
