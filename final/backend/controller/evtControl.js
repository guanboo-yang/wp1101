import { sendData } from '../connect/wssConnect'
import { userLogin } from '../events/event'

async function ParseData(byteString, ws, wss) {
	const { data } = byteString
	const [type, datas] = JSON.parse(data)

	sendData(data, ws)
	switch (type) {
		case 'login':
			userLogin(datas, ws)
			break
		default:
			break
	}
}

export default ParseData
