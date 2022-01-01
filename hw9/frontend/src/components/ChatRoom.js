import '../css/ChatRoom.css'
import { Button, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useStatus } from '../hook/useStatus'
import { CREATE_MESSAGE, INIT_MESSEAGE, MESSAGES_SUBSCRIPTION, CLEAR_MESSAGE } from '../graphql'
import { useMutation, useSubscription } from '@apollo/client'

function ChatRoom() {
	const bodyRef = useRef(null)
	const messageRef = useRef(null)
	const { userName, currentID, messages, currentFriend, setMessages, showStatus } = useStatus()
	const [body, setBody] = useState('')
	const [newMessage, { data: newMs }] = useMutation(CREATE_MESSAGE)
	const [getInitMessages, { data: initMs }] = useMutation(INIT_MESSEAGE)
	const [clearMessages] = useMutation(CLEAR_MESSAGE)
	const clearMessage = () => {
		try {
			clearMessages({ variables: { id: currentID, name: userName, friend: currentFriend } })
			setMessages([])
		} catch (err) {
			console.error(err)
		}
	}
	const { data: currentMs } = useSubscription(MESSAGES_SUBSCRIPTION, { variables: { name: userName } })

	useEffect(() => {
		if (currentID) {
			setMessages([])
			getInitMessages({ variables: { id: currentID } })
		}
	}, [currentID]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (currentMs) {
			const type = currentMs.message.mutation
			if (type === 'CREATED') {
				const ms = currentMs.message.data
				if (ms.name === currentFriend) setMessages([...messages, ms])
				else showStatus({ type: 'success', msg: `${ms.name}: ${ms.body}` })
			} else if (type === 'DELETED') {
				if (currentMs.message.user === currentFriend) setMessages([])
			}
		}
	}, [currentMs]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (initMs) {
			const ms = initMs.InitMessages
			setMessages(ms)
		}
	}, [initMs]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		messageRef.current?.scrollTo({ top: messageRef.current.scrollHeight, behavior: 'smooth' })
	}, [messages])

	useEffect(() => {
		if (newMs) setMessages([...messages, { name: newMs['createMessage'].name, body: newMs['createMessage'].body }])
	}, [newMs]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className='App'>
				<div className='App-title'>
					<h1>{currentFriend ? `${currentFriend}` : 'Open Chat Room!'}</h1>
					<Button type='primary' danger onClick={clearMessage}>
						Clear
					</Button>
				</div>
				<div className='App-messages' ref={messageRef}>
					{messages.length === 0 ? (
						<p style={{ color: '#333' }}> No messages...</p>
					) : (
						messages.map(({ name, body }, i) =>
							name === userName ? (
								<p className='App-message host' key={i}>
									{body}
									<img src={`https://joeschmoe.io/api/v1/${name}`} alt='' />
								</p>
							) : (
								<p className='App-message client' key={i}>
									<img src={`https://joeschmoe.io/api/v1/${name}`} alt='' />
									{body}
								</p>
							)
						)
					)}
				</div>
				<Input.Search
					ref={bodyRef}
					value={body}
					onChange={e => setBody(e.target.value)}
					enterButton='Send'
					placeholder='Type a message here...'
					onSearch={msg => {
						if (!msg) {
							showStatus({ type: 'error', msg: 'Please enter a message body' })
							return
						} else if (currentFriend === '') {
							showStatus({ type: 'error', msg: 'Please choose the chat Room first' })
						} else {
							newMessage({
								variables: { name: userName, body: body, id: currentID },
							})
							setBody('')
						}
					}}></Input.Search>
			</div>
		</>
	)
}

export default ChatRoom
