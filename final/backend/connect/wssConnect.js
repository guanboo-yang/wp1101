export const sendData = (data, connection) => {
	connection.send(JSON.stringify(data))
}