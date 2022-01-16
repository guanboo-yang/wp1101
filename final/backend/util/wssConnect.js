const sendData = (data, connection) => {
	connection.send(JSON.stringify(data))
}

// 3 attributes: 1. reciever(array) 2. datas 3. userDatas
const roomBroadcast = (players, datas, userDatas) => {
	console.log(datas);
	players.forEach(player => {
		if (player && userDatas[player].online) {
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

const updateFriends = userDatas => {
	let friends = getFriendsList(userDatas)
	for (const [_, value] of Object.entries(userDatas)) {
		if (value.connection) sendData(['friendLists', friends], value.connection)
	}
}

export { sendData, roomBroadcast, getFriendsList, updateFriends }
