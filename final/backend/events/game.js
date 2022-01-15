import { Player, Room } from "../models/schemas"
import { roomBroadcast } from "../util/wssConnect";

const gameStart = async(userDatas, {roomId, players}) => {
    console.log(roomId);
    // await Room.findOne({roomId})
    


    roomBroadcast(players, ['gameStart', players], userDatas)
}

const eventHandler = (userDatas, {roomId, index, evt, name}) => {
    console.log(name, evt, index);
}

export { gameStart, eventHandler }
