import { Paper, Chip } from '@mui/material'

const Message = ({ name, body }) => {
	return (
		<Paper
			variant='none'
			sx={{
				my: 1,
				backgroundColor: 'inherit',
				fontSize: theme => theme.typography.caption.fontSize,
			}}
			align='left'>
			<Chip label={name} size='small' color='secondary' sx={{ mr: 0.5, fontSize: theme => theme.typography.caption.fontSize }} />
			{body}
		</Paper>
	)
}

export default Message
