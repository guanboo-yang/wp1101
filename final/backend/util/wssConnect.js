import { Player } from '../models/schemas'

const sendData = (data, connection) => {
    connection.send(JSON.stringify(data))
}

// 3 attributes: 1. reciever(array) 2. datas 3. userDatas
const roomBroadcast = (players, datas, userDatas) => {
    // console.log(datas);
    players.forEach((player) => {
        if (player && userDatas[player].online) {
            sendData(datas, userDatas[player].connection)
        }
    })
}

const getFriendsList = (userDatas) => {
    let friends = []
    for (const [key, value] of Object.entries(userDatas)) {
        friends.push({ online: value.online, name: key })
    }
    return friends
}

const updateFriends = (userDatas) => {
    let friends = getFriendsList(userDatas)
    for (const [_, value] of Object.entries(userDatas)) {
        if (value.connection)
            sendData(['friendLists', friends], value.connection)
    }
}

const broadcastToAll = (userDatas, datas) => {
    for (const [_, value] of Object.entries(userDatas)) {
        if (value.connection) sendData(datas, value.connection)
    }
}

// Should be put in other position
const saveToDB = async (players, datas) => {
    let i = datas.indexOf(Math.max(...datas))
    for (let num = 0; num < players.length; num++) {
        if (players[num]) {
            if (num === i)
                await Player.findOneAndUpdate(
                    { name: players[num] },
                    { $inc: { wins: 1, kills: datas[i], totalGames: 1 } },
                )
            else
                await Player.findOneAndUpdate(
                    { name: players[num] },
                    { $inc: { loses: 1, kills: datas[i], totalGames: 1 } },
                )
        }
    }
}

export {
    sendData,
    roomBroadcast,
    getFriendsList,
    updateFriends,
    broadcastToAll,
    saveToDB
}
