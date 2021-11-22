import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/othello' })
// const instance = axios.create({ baseURL: 'http://IP_ADDRESS:4000/api/othello' })

export const startGame = async () => {
	try {
		const {
			data: { board },
		} = await instance.get('/start')
		return board
	} catch (err) {
		return 'Error: Server not connected'
	}
}

export const move = async (tempBoard, color, row, col) => {
	try {
		const {
			data: { board, validMoves, msg, black, white },
		} = await instance.get(`/move?board=${JSON.stringify(tempBoard)}&color=${color}&row=${row}&col=${col}`)
		return { board, validMoves, msg, black, white }
	} catch (err) {
		return { board: tempBoard, validMoves: [], msg: 'Error: Not a legal move' }
	}
}
