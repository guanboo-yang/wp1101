const sendData = (data, connection) => {
	connection.send(JSON.stringify(data))
}

// 3 attributes: 1. reciever(array) 2. datas 3. userDatas
const roomBroadcast = (players, datas, userDatas) => {
	players.forEach(player => {
		if (player) {
			sendData(datas, userDatas[player].connection)
		}
	})
}

const getFriendsList = userDatas => {
	let friends = []
	for (const [key, value] of Object.entries(userDatas)) {
		friends.push({ online: value.online, name: key })
	}
	return friends
}

export { sendData, roomBroadcast, getFriendsList }
