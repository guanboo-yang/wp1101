import { useState } from 'react'

const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
	const [messages, setMessages] = useState([])
	const [status, setStatus] = useState({})

	client.onmessage = byteString => {
		const { data } = byteString
		const [task, payload] = JSON.parse(data)
		// console.log(payload)
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
				// console.log(payload)
				setStatus(payload)
				break
			}
			case 'cleared': {
				setMessages(() => [])
				break
			}
			case 'love': {
				console.log('love')
				// filter element with _id in messages and change to payload
				console.log(payload._id, messages)
				setMessages(() => messages.map(message => (message._id === payload._id ? payload : message)))
				break
			}
			case 'delete': {
				console.log('delete')
				setMessages(() => messages.filter(message => message._id !== payload._id))
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

	const loveMessage = payload => {
		sendData(['love', payload])
	}

	const deleteMessage = payload => {
		sendData(['delete', payload])
	}

	return {
		status,
		messages,
		loginMessages,
		sendMessage,
		clearMessages,
		logoutMessage,
		loveMessage,
		deleteMessage,
	}
}
export default useChat
