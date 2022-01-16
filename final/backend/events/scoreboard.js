import { broadcastToAll } from '../util/wssConnect'
import { Player } from '../models/schemas'

const sendScores = async (userDatas) => {
    // console.log(userDatas)
    const players = await Player.find({})
    // console.log(players);
    const scoreDatas = players.map((player) => {
        return {
            name: player.name,
            wins: player.wins,
            loses: player.loses,
            rates: player.wins / (player.wins + player.loses),
            games: player.totalGames,
            kills: player.kills
        }
    })
    broadcastToAll(userDatas, ['scoreDatas', scoreDatas])
}

export { sendScores }
