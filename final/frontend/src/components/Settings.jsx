import { Box, Button, Modal, Typography } from '@mui/material'
import { useUser } from '../hooks/useUser'
import { useEventListener } from '../hooks'
import fullscreen from 'fullscreen'
import { useState, useEffect, useRef } from 'react'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'primary.main',
	border: '4px solid #fff',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
	outline: 0,
}

const Settings = ({ open, setOpen }) => {
	const [isFullScreen, setFullScreen] = useState(false)
	const handleClose = () => setOpen(false)
	const handleToggle = () => setOpen(!open)
	const { darkMode, setDarkMode } = useUser()
	const fsRef = useRef(null)

	useEffect(() => {
		fsRef.current = fullscreen(document.querySelector('main'))
		fsRef.current.on('attain', () => {
			setFullScreen(true)
		})

		fsRef.current.on('release', () => {
			setFullScreen(false)
		})
	}, [])

	useEventListener('keydown', e => {
		if (e.key === '?' && e.shiftKey) {
			handleToggle()
		}
		if (e.key === 'D' && e.shiftKey) {
			setDarkMode(!darkMode)
		}
		if (e.key === 'f') {
			toggleFullScreen()
		}
	})

	const toggleFullScreen = () => {
		handleClose()
		setFullScreen(!isFullScreen)
		if (isFullScreen) {
			fsRef.current.release()
		} else {
			fsRef.current.request()
		}
	}

	return (
		<>
			<Modal open={open} onClose={handleClose} disableScrollLock>
				<Box sx={style}>
					<Typography variant='h4' color='secondary' noWrap align='center'>
						Settings
					</Typography>
					<Typography sx={{ mt: 2 }} variant='body1' color='secondary' noWrap align='center'>
						Color Mode:
						<Button sx={{ ml: 2 }} variant='contained' size='small' color='secondary' onClick={() => setDarkMode(!darkMode)}>
							{darkMode ? 'Dark' : 'Light'}
						</Button>
					</Typography>
					{/* fullscreen */}
					<Typography sx={{ mt: 2 }} variant='body1' color='secondary' noWrap align='center'>
						Fullscreen:
						<Button sx={{ ml: 2 }} variant='contained' size='small' color='secondary' onClick={toggleFullScreen}>
							{isFullScreen ? 'Exit' : 'Enter'}
						</Button>
					</Typography>
					{/* // TODO: SOUND */}
					{/* // TODO: MUSIC */}
					<Typography sx={{ mt: 2 }} variant='body1' color='secondary' noWrap align='center'>
						<Button variant='contained' size='small' color='secondary' onClick={handleClose}>
							Close
						</Button>
					</Typography>
				</Box>
			</Modal>
		</>
	)
}

export default Settings
