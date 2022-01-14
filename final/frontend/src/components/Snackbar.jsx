import React, { useState } from 'react'
import { Snackbar, Slide, Alert } from '@mui/material'

const withSnackbar = WrappedComponent => {
	return props => {
		const [open, setOpen] = useState(false)
		const [message, setMessage] = useState("I'm a Snackbar")
		const [duration, setDuration] = useState(2000)
		const [severity, setSeverity] = useState('success') /** error | warning | info */

		const showMessage = (message, severity = 'success', duration = 2000) => {
			setMessage(message)
			setSeverity(severity)
			setDuration(duration)
			setOpen(true)
		}

		const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
				return
			}
			setOpen(false)
		}

		return (
			<>
				<WrappedComponent {...props} showMessage={showMessage} />
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					autoHideDuration={duration}
					open={open}
					onClose={handleClose}
					TransitionComponent={Slide}>
					<Alert variant='filled' onClose={handleClose} severity={severity}>
						{message}
					</Alert>
				</Snackbar>
			</>
		)
	}
}

export default withSnackbar
