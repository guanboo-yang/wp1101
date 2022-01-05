import { Add } from '@mui/icons-material'
import { Avatar, Badge, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled } from '@mui/material'
import React from 'react'

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
	},
}))

const Friend = ({ name, image, online, handleAddPlayers }) => (
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
				{online ? (
					<StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
						<Avatar src={image || `//joeschmoe.io/api/v1/${name}`} alt='name' />
					</StyledBadge>
				) : (
					<Avatar src={image || `//joeschmoe.io/api/v1/${name}`} alt='name' />
				)}
			</ListItemAvatar>
			<ListItemText primary={name} />
		</ListItemButton>
	</ListItem>
)

export default Friend
