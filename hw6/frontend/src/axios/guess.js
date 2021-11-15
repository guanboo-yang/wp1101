import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

export const startGame = async () => {
	try {
		const {
			data: { msg },
		} = await instance.get('/start')
		return msg
	} catch (err) {
		return 'Error: Server not connected'
	}
}

export const guess = async number => {
	try {
		const {
			data: { msg },
		} = await instance.get(`/guess?number=${number}`)
		return msg
	} catch (err) {
		if (err.message === 'Request failed with status code 406') {
			return 'Error: Not a legal number'
		} else {
			return 'Error: Server not connected'
		}
	}
}

export const restart = async () => {
	try {
		const {
			data: { msg },
		} = await instance.get('/start')
		return msg
	} catch (err) {
		return 'Error: Server not connected'
	}
}
