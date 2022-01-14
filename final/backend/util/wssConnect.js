const sendData = (data, connection) => {
	connection.send(JSON.stringify(data))
}

const roomBroadcast = (players, userDatas) => {
	players.forEach(player => {
		if (player) {
			sendData(['updatedPosition', players], userDatas[player].connection)
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
