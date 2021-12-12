import React from 'react'
import Icon, { DeleteFilled, HeartFilled } from '@ant-design/icons'
import './Toolbar.css'
import { Button, Tooltip } from 'antd'

const ReplySvg = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'>
		<path d='M20 18v-8l-14 14 14 14v-8.2c10 0 17 3.2 22 10.2-2-10-8-20-22-22z' />
	</svg>
)

const ReplyIcon = props => <Icon component={ReplySvg} {...props} />

const Toolbar = ({ direction, id, love, canDelete, username, loveMessage, deleteMessage }) => {
	const handleLove = (e, _id) => {
		e.preventDefault()
		e.stopPropagation()
		loveMessage({ _id, name: username })
	}

	const handleDelete = (e, _id) => {
		e.preventDefault()
		e.stopPropagation()
		deleteMessage({ _id })
	}

	const handleReply = (e, _id) => {
		e.preventDefault()
		e.stopPropagation()
		/* haven't implement yet */
	}

	return (
		<div className={`Toolbar ${direction}`}>
			<Tooltip title={`${love ? 'Unlike' : 'Like'}`}>
				<Button danger type='text' shape='circle' icon={<HeartFilled />} onClick={e => handleLove(e, id)} />
			</Tooltip>
			{canDelete && (
				<Tooltip placement='top' title='Delete'>
					<Button type='text' shape='circle' icon={<DeleteFilled />} onClick={e => handleDelete(e, id)} />
				</Tooltip>
			)}
			<Tooltip placement='top' title='Reply'>
				<Button type='text' shape='circle' icon={<ReplyIcon />} onClick={e => handleReply(e, id)} />
			</Tooltip>
		</div>
	)
}

export default Toolbar
