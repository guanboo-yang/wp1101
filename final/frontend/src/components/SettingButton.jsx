import { Box, Button } from '@mui/material'

const SettingButton = ({ label, children, ...props }) => (
	<Button variant='contained' color='secondary' sx={{ m: 0.5, display: 'inline' }} {...props}>
		<Box sx={{ fontSize: theme => theme.typography.caption }}>{label}</Box>
		{children}
	</Button>
)

export default SettingButton
