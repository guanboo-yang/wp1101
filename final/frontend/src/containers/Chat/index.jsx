import React from 'react'
import { Grid, Paper, Chip } from '@mui/material'
import { styled } from '@mui/system'
import { sampleChat as messages } from './sampleChat'
import { useUser } from '../../hooks/useUser'

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.primary.main,
	textAlign: 'center',
	height: '70vh',
}))

const Chat = () => {
	const { user } = useUser()
	return (
		<div align='center'>
			<h1>Chat</h1>
			<Grid container justifyContent='center' spacing={3}>
				<Grid item xs={12} sm={9} md={6} lg={5}>
					<Item variant='none'>
						{messages.map((message, index) => (
							<Paper variant='none' key={index} sx={{ my: 1, backgroundColor: 'inherit' }} align={user === message.name ? 'right' : 'left'}>
								{user !== message.name && <Chip label={message.name} size='small' color='secondary' sx={{ mr: 1 }} />}
								{message.body}
							</Paper>
						))}
					</Item>
				</Grid>
			</Grid>
		</div>
	)
}

export default Chat
