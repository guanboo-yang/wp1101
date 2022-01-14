import { Typography, Avatar, ListItem } from '@mui/material'

const Message = ({ name, body }) => {
	return (
		<ListItem>
			<Avatar src={`//joeschmoe.io/api/v1/${name}`} />
			<Typography>{body}</Typography>
		</ListItem>
	)
}

export default Message
