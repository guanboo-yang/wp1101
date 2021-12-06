import Message from './model'

const sendData = (data, ws) => {
	ws.send(JSON.stringify(data))
}

const sendStatus = (payload, ws) => {
	sendData(['status', payload], ws)
}

const sendMessage = (data, status, ws) => {
	if (data) sendData(data, ws)
	sendStatus(status, ws)
}

const initData = ws => {
	Message.find({}, { __v: 0 })
		.sort({ createdAt: 1 })
		.limit(100)
		.exec((err, res) => {
			if (err) throw err
			// initialize app with existing messages
			sendData(['init', res], ws)
		})
}

/**
 * Broadcast message to all clients
 * @param {Array} data - [task, payload]
 * @param {WebSocket} ws - the client to exclude
 * @param {Object} status - status message to client
 * @param {Object} broadCastStatus - status message to broadcast
 */
const broadcastMessage = (data, wss, ws, status, broadCastStatus) => {
	wss.clients.forEach(client => {
		if (client === ws) sendMessage(data, status, client)
		else sendMessage(data, broadCastStatus, client)
	})
}

export { sendData, sendStatus, sendMessage, initData, broadcastMessage }
