// mui
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
// import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
// graphql
import { useMutation } from '@apollo/client'
import { GET_TASKS_QUERY, DELETE_TASK_MUTATION } from '../../graphql'

export default function Task({ id, title, content, dueDate }) {
	const [deleteTask] = useMutation(DELETE_TASK_MUTATION)

	const handleDelete = () => {
		deleteTask({
			variables: {
				id,
			},
			refetchQueries: [GET_TASKS_QUERY],
			onError: err => {
				console.log(err)
			},
		})
	}

	// transform the date to a human readable format from now without moment
	const dueDateFormatted = input => {
		// get now
		const now = new Date()
		const date = new Date(input)
		// get the difference between now and the due date
		const diff = now - date
		console.log(diff)
		if (diff > 31536000000) return `${Math.floor(diff / 31536000000)} years ago`
		if (diff > 2628000000) return `${Math.floor(diff / 2628000000)} months ago`
		if (diff > 604800000) return `${Math.floor(diff / 604800000)} weeks ago`
		if (diff > 86400000) return `${Math.floor(diff / 86400000)} days ago`
		if (diff > 3600000) return `${Math.floor(diff / 3600000)} hours ago`
		if (diff > 60000) return `${Math.floor(diff / 60000)} minutes ago`
		if (diff > 1000) return `${Math.floor(diff / 1000)} seconds ago`
		if (diff < -31536000000) return `in ${-Math.floor(diff / 31536000000)} years`
		if (diff < -2628000000) return `in ${-Math.floor(diff / 2628000000)} months`
		if (diff < -604800000) return `in ${-Math.floor(diff / 604800000)} weeks`
		if (diff < -86400000) return `in ${-Math.floor(diff / 86400000)} days`
		if (diff < -3600000) return `in ${-Math.floor(diff / 3600000)} hours`
		if (diff < -60000) return `in ${-Math.floor(diff / 60000)} minutes`
		if (diff < -1000) return `in ${-Math.floor(diff / 1000)} seconds`
		return 'just now'
	}

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
			}}>
			<Box
				sx={{
					flexGrow: 1,
				}}>
				<Typography variant='body1'>
					<strong>{title}</strong>
				</Typography>
				<Typography variant='body1'>{content}</Typography>

				<Typography
					variant='body2'
					color='textSecondary'
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}>
					<AccessTimeIcon fontSize='small' sx={{ mr: 0.5 }} />
					{/* {moment(dueDate).fromNow()} */}
					{dueDateFormatted(dueDate)}
				</Typography>
			</Box>
			<Box>
				<IconButton onClick={handleDelete}>
					<DeleteOutlineIcon />
				</IconButton>
			</Box>
		</Box>
	)
}
