import { useState } from 'react'

const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
	const [messages, setMessages] = useState([])
	const [status, setStatus] = useState({})

	client.onmessage = byteString => {
		const { data } = byteString
		const [task, payload] = JSON.parse(data)
		console.log(payload)
		switch (task) {
			case 'init': {
				setMessages(() => payload)
				break
			}
			case 'output': {
				setMessages(() => [...messages, ...payload])
				break
			}
			case 'status': {
				setStatus(payload)
				break
			}
			case 'cleared': {
				setMessages(() => [])
				console.log('clear')
				break
			}
			default:
				break
		}
	}

	const sendData = async data => {
		await client.send(JSON.stringify(data))
	}

	const loginMessages = payload => {
		sendData(['login', payload])
	}

	const sendMessage = payload => {
		sendData(['input', payload])
	}

	const clearMessages = () => {
		sendData(['clear'])
	}

	const logoutMessage = payload => {
		sendData(['logout', payload])
	}

	return {
		status,
		messages,
		loginMessages,
		sendMessage,
		clearMessages,
		logoutMessage,
	}
}
export default useChat
