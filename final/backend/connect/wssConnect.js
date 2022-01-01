const sendData = (data, ws) => {
	ws.send(JSON.stringify(data))
}

export default { sendData }
