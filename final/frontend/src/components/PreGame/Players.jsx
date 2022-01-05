import { IconButton, Step, StepLabel, Stepper, Box } from '@mui/material'
import { Add, Rocket } from '@mui/icons-material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import './Players.css'
import { redShip, yellowShip, blueShip, greenShip } from '../../assets'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 36,
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 8,
		border: 0,
		backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.main} 48%, ${theme.palette.primary.main} 52%)`,
		backgroundSize: '200%',
		backgroundPosition: 'right',
		transition: 'background-position .7s ease-in-out',
		borderRadius: 1,
	},
}))

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.primary.main,
	zIndex: 1,
	width: 80,
	height: 80,
	display: 'flex',
	borderRadius: '50vh',
	justifyContent: 'center',
	alignItems: 'center',
	...((ownerState.completed || ownerState.active) && {
		backgroundColor: theme.palette.secondary.main,
	}),
	...(ownerState.active && {
		animation: `${keyframes({
			'0%': {
				// transform: 'scale(1)',
				boxShadow: `0 0 0 0 ${theme.palette.secondary.main}`,
			},
			'70%': {
				// transform: 'scale(1.02)',
				boxShadow: '0 0 0 15px #00000000',
			},
		})} 2s ease-in-out infinite`,
	}),
}))

const ColorLibStepIcon = ({ active, completed, index, players, handleStep }) => {
	// console.log(active, completed, index)
	const colors = ['#FF6347', '#FFD700', '#00BFFF', '#00CED1']
	const rocket = [redShip, yellowShip, blueShip, greenShip]
	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }}>
			{players[String(index)] ? (
				<IconButton onClick={handleStep} className='ship'>
					<Box sx={{ width: 25, height: 25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<img src={rocket[index]} alt={players[String(index)]} width={25} />
					</Box>
					{/* <Rocket sx={{ color: colors[index] }} fontSize='large' /> */}
				</IconButton>
			) : (
				<IconButton onClick={handleStep}>
					<Add sx={{ color: colors[index] }} fontSize='large' />
				</IconButton>
			)}
		</ColorlibStepIconRoot>
	)
}

const Players = ({ players, activeStep, completed, handleStep, teamMode }) => {
	return (
		<Stepper //
			sx={{ pt: 3, pb: 1, overflow: 'auto' }}
			alternativeLabel
			nonLinear
			activeStep={activeStep}
			connector={<ColorlibConnector />}>
			{[0, 1, 2, 3].map((_, i) => (
				<Step key={i} completed={completed[i]} sx={{ p: 0 }} className={teamMode ? 'team-mode' : ''}>
					<StepLabel StepIconComponent={props => <ColorLibStepIcon {...props} index={i} players={players} handleStep={handleStep(i)} />}>{players[i]}</StepLabel>
				</Step>
			))}
		</Stepper>
	)
}

export default Players
