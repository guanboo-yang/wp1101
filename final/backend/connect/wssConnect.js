const sendData = (data, ws) => {
    ws.send(JSON.stringify(data))
}


module.exports = {sendData}