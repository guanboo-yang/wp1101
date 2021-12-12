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

const saveData = async (wss, ws, payload) => {
	const { name, body } = payload
	const message = new Message({ name, body })
	try {
		await message.save()
		broadcastMessage(['output', [message]], wss, ws, { type: 'success', msg: 'Message sent.' }, {})
	} catch (e) {
		console.error('Message DB save error: ' + e)
	}
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

export { sendData, sendStatus, sendMessage, initData, saveData, broadcastMessage }
