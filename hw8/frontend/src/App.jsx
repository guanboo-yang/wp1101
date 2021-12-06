import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Button, Input, Avatar, message, Tooltip } from 'antd'
import Toolbar from './components/Toolbar'
import useChat from './hooks/useChat'
import useStorage from './hooks/useStorage'

const App = () => {
	const { status, messages, sendMessage, clearMessages, logoutMessage, loginMessages } = useChat()
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

	// check if a string only contains emoji
	const isEmoji = str => {
		const reg = /^[\p{Extended_Pictographic} ]+$/u
		// const reg = /^[\p{Emoji_Presentation} ]+$/u
		// const reg = /^[\p{Emoji} ]+$/u
		return reg.test(str)
	}

	// parse date to locale string
	const parseDate = date => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour12: true,
		}
		return new Date(date).toLocaleTimeString('en-US', options)
	}

	// handle double click
	const handleDoubleClick = (e, _id) => {
		e.preventDefault()
		console.log('double click')
		// console.log(e.target)
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
							messages.map(({ name, body, createdAt, _id }, i) => (
								<div className='App-wrapper' key={i}>
									{name === username ? (
										<div
											className={`App-message right${i === 0 || messages[i - 1].name !== name || getTimeDifference(messages[i - 1].createdAt, createdAt) > 1 ? ' first' : ''}${
												i === messages.length - 1 || messages[i + 1].name !== name || getTimeDifference(createdAt, messages[i + 1].createdAt) > 1 ? ' last' : ''
											} ${isEmoji(body) ? 'emoji' : 'text'}`}
											onDoubleClick={e => handleDoubleClick(e, _id)}>
											{body}
											<Toolbar />
											<div className='time right'>{parseDate(createdAt)}</div>
										</div>
									) : (
										<>
											<div className='name'>{i === 0 || messages[i - 1].name !== name || getTimeDifference(messages[i - 1].createdAt, createdAt) > 1 ? name : null}</div>
											{/* <Tooltip placement='right' title={parseDate(createdAt)}> */}
											<div
												className={`App-message left${i === 0 || messages[i - 1].name !== name || getTimeDifference(messages[i - 1].createdAt, createdAt) > 1 ? ' first' : ''}${
													i === messages.length - 1 || messages[i + 1].name !== name || getTimeDifference(createdAt, messages[i + 1].createdAt) > 1 ? ' last' : ''
												} ${isEmoji(body) ? 'emoji' : 'text'}`}
												onDoubleClick={handleDoubleClick}>
												{i === messages.length - 1 || messages[i + 1].name !== name || getTimeDifference(createdAt, messages[i + 1].createdAt) > 1 ? (
													<Tooltip placement='top' title={name}>
														<Avatar size={27} style={{ backgroundColor: '#ebebeb' }} src={`//joeschmoe.io/api/v1/${name.toLowerCase()}`} alt={name}>
															{name}
														</Avatar>
													</Tooltip>
												) : null}
												{body}
												<Toolbar />
												<div className='time left'>{parseDate(createdAt)}</div>
											</div>
											{/* </Tooltip> */}
										</>
									)}
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
