import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Button, Input, Avatar, message, Tooltip } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import Toolbar from './components/Toolbar'
import useChat from './hooks/useChat'
import useStorage from './hooks/useStorage'
import Message from './components/Message'

const App = () => {
	const { status, messages, sendMessage, clearMessages, logoutMessage, loginMessages, loveMessage, deleteMessage } = useChat()
	// const [username, setUsername] = useState('')
	const [username, setUsername, removeName] = useStorage('name', undefined, window.sessionStorage)
	const [login, setLogin, removeLogin] = useStorage('login', false, window.sessionStorage)
	const [body, setBody] = useState('') // textBody
	const messagesRef = useRef(null)

	const displayStatus = ({ type, msg }) => {
		if (msg) {
			const content = { content: msg, duration: 1 }
			switch (type) {
				case 'success':
					message.success(content)
					break
				case 'info':
					message.info(content)
					break
				case 'error':
				default:
					message.error(content)
					break
			}
		}
	}

	useEffect(() => {
		displayStatus(status)
	}, [status])

	useEffect(() => {
		// messagesRef.current.scrollTop = messagesRef.current.scrollHeight
		messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
	}, [messages])

	const handleLogout = () => {
		logoutMessage({ name: username })
		removeName()
		removeLogin()
	}

	// return difference between two date (string) in minutes
	const getTimeDifference = (date1, date2) => {
		const difference = new Date(date2) - new Date(date1)
		const minutes = Math.floor(difference / 1000 / 60)
		return minutes
	}

	return (
		<div className='App'>
			{login ? (
				<>
					<div className='App-title'>
						<h1>{username}'s Chat Room</h1>
					</div>
					<div className='App-messages' ref={messagesRef}>
						{messages.length === 0 ? (
							<p style={{ color: '#ccc', textAlign: 'center' }}> No messages... </p>
						) : (
							messages.map((message, i) => (
								<div className='App-wrapper' key={i}>
									<Message
										username={username}
										direction={message.name === username ? 'right' : 'left'}
										message={message}
										first={i === 0 || messages[i - 1].name !== message.name || getTimeDifference(messages[i - 1].createdAt, message.createdAt) > 1}
										last={i === messages.length - 1 || messages[i + 1].name !== message.name || getTimeDifference(message.createdAt, messages[i + 1].createdAt) > 1}
										loveMessage={loveMessage}
										deleteMessage={deleteMessage}
									/>
								</div>
							))
						)}
					</div>
					<Input.Search
						value={body}
						onChange={e => setBody(e.target.value)}
						enterButton='Send'
						placeholder='Type a message here...'
						style={{ marginBottom: 10 }}
						onSearch={msg => {
							if (!msg) {
								displayStatus({
									type: 'error',
									msg: 'Please enter a message body.',
								})
								return
							}
							sendMessage({ name: username, body: msg, createdAt: new Date() })
							setBody('')
						}}
					/>
					<div>
						<Button type='primary' danger onClick={clearMessages} style={{ marginRight: 10 }}>
							Clear
						</Button>
						<Button type='primary' onClick={handleLogout}>
							Logout
						</Button>
					</div>
				</>
			) : (
				<>
					<div className='App-title'>
						<h1>Login</h1>
					</div>
					<Input.Search
						value={username}
						onChange={e => setUsername(e.target.value)}
						enterButton='Login'
						placeholder='Username'
						onSearch={() => {
							if (!username) {
								displayStatus({
									type: 'error',
									msg: 'Please enter a username',
								})
								return
							}
							setLogin(true)
							loginMessages({ name: username })
						}}
					/>
				</>
			)}
		</div>
	)
}

export default App
