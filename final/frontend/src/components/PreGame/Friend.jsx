import { Add } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

const Friend = ({ name, online, handleAddPlayers }) => (
	<ListItem
		dense
		secondaryAction={
			online && (
				<IconButton color='secondary' edge='end' onClick={handleAddPlayers}>
					<Add />
				</IconButton>
			)
		}
		disablePadding>
		<ListItemButton>
			<ListItemAvatar>
				<Avatar src={`//joeschmoe.io/api/v1/${name}`} alt='' />
			</ListItemAvatar>
			<ListItemText primary={name} secondary={online ? 'online' : 'offline'} />
		</ListItemButton>
	</ListItem>
)

export default Friend
