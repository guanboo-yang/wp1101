import { Room } from '../models/schemas'
import { roomBroadcast } from '../util/wssConnect'
import { game, handleKey } from '../game'
import path from 'path'
import { Worker } from 'worker_threads'

const gameStart = async (userDatas, { roomId, players }) => {
    const room = await Room.findOne({ roomId })
    roomBroadcast(players, ['gameStart', players], userDatas)
    const worker = new Worker(path.resolve('./src/worker.js'))
    worker.postMessage('start')
    worker.on('message', () => {
        game(roomId, players, userDatas, room)
    })
}

const eventHandler = (userDatas, { roomId, index, evt, name }) => {
    handleKey(roomId, index, evt)
}

export { gameStart, eventHandler }
