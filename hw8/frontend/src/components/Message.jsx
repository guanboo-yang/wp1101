import React, { useState, useRef } from 'react'
import { HeartFilled } from '@ant-design/icons'
import { Tooltip, Avatar } from 'antd'
import Toolbar from './Toolbar'
import useClickOutside from '../hooks/useClickOutside'

const Message = ({ username, direction, message, first, last, loveMessage, deleteMessage }) => {
	const { name, body, createdAt, love, _id } = message
	const [open, setOpen] = useState(false)
	const messageRef = useRef(null)
	useClickOutside(messageRef, () => {
		if (open) setOpen(false)
	})

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

	// check if a string only contains emoji
	const isEmoji = str => {
		const reg = /^[\p{Extended_Pictographic} ]+$/u
		// const reg = /^[\p{Emoji_Presentation} ]+$/u
		// const reg = /^[\p{Emoji} ]+$/u
		return reg.test(str)
	}

	return (
		<>
			<div className={`time ${direction} ${open ? 'show' : ''}`} ref={messageRef}>
				{parseDate(createdAt)}
			</div>
			{direction === 'left' && <div className='name'>{first ? name : ''}</div>}
			<div
				className={`App-message ${direction} ${first ? 'first' : ''} ${last ? 'last' : ''} ${isEmoji(body) ? 'emoji' : 'text'}`}
				// onDoubleClick={e => handleDoubleClick(e, _id)}
				onClick={() => setOpen(true)}>
				{direction === 'left' && last ? (
					<Tooltip placement='top' title={name}>
						<Avatar size={27} style={{ backgroundColor: '#ebebeb' }} src={`//joeschmoe.io/api/v1/${name.toLowerCase()}`} alt={name}>
							{name}
						</Avatar>
					</Tooltip>
				) : (
					''
				)}
				{body}
				<Tooltip placement={`${direction === 'left' ? 'right' : 'left'}`} title={[...love].map(name => (name === username ? 'you' : name)).join(', ')}>
					<div className={`love ${direction} ${love.length > 0 ? 'show' : ''}`}>
						<HeartFilled style={{ color: 'red' }} /> {love.length > 1 ? love.length : ''}
					</div>
				</Tooltip>
				<Toolbar
					direction={direction}
					id={_id}
					love={love.includes(username)}
					canDelete={name === username}
					username={username}
					loveMessage={loveMessage}
					deleteMessage={deleteMessage}
				/>
			</div>
		</>
	)
}

export default Message
