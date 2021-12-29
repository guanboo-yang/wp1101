import React from 'react'
import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'
import { sampleChat as messages } from './sampleChat'

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: 'center',
}))

const Chat = () => {
	console.log(messages)
	return (
		<Grid container spacing={3} justifyContent='center'>
			<Grid item xs={5}>
				<Item variant='outlined'>
					<h1>Chat</h1>
					{messages.map((message, index) => (
						<div key={index}>
							<h3>{message.name}</h3>
							<p>{message.body}</p>
						</div>
					))}
				</Item>
			</Grid>
		</Grid>
	)
}

export default Chat
