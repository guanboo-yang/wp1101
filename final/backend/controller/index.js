import { userLogin, createAccount } from './event'

async function ParseData(message, connection) {
	const [type, datas] = JSON.parse(message)

	switch (type) {
		case 'login':
			userLogin(datas, connection)
			break 
		case 'create':
			createAccount(datas, connection)
			break;
		default:
			break
	}
}

export default ParseData
