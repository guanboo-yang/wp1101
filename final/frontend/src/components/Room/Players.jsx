import { IconButton, Step, StepLabel, Stepper, Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import './Players.css'
import { ship } from '../../assets/ship'
import { useEffect, useState } from 'react'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 36,
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 8,
		border: 0,
		backgroundImage: `linear-gradient(to right, ${theme.palette.background.dark} 48%, ${theme.palette.primary.main} 52%)`,
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
		backgroundColor: theme.palette.background.dark,
	}),
	...(ownerState.active && {
		animation: `${keyframes({
			'0%': {
				// transform: 'scale(1)',
				boxShadow: `0 0 0 0 ${theme.palette.background.dark}`,
			},
			'70%': {
				// transform: 'scale(1.02)',
				boxShadow: '0 0 0 15px #00000000',
			},
		})} 2s ease-in-out infinite`,
	}),
}))

const ColorLibStepIcon = ({ active, completed, idx, players, handleStep }) => {
	// console.log(active, completed, idx)
	const [stateIndex, setIdx] = useState(1)
	useEffect(() => {
		const interval = setInterval(() => {
			setIdx(prev => ((prev + 1) % 3) + 1)
		}, 1000 / 20)
		return () => clearInterval(interval)
	}, [])
	const colors = ['#FF3030', '#FF00FF', '#00BFFF', '#32CD32']
	const rockets = ship
	const style = {
		position: 'absolute',
		// top: stateIndex * -22,
		// left: 0,
		height: 88,
		width: 204,
		imageRendering: 'pixelated',
	}
	// const rockets = [red, pink, blue, green]
	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }}>
			{players[String(idx)] ? (
				<IconButton onClick={handleStep} style={{ width: '80%', height: '80%' }}>
					<Box
						sx={{ width: 34, height: 22, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(270deg)', overflow: 'hidden' }}>
						<img src={rockets} alt={players[String(idx)]} width={25} style={{ ...style, top: stateIndex * -22, left: idx * -34 }} />
					</Box>
				</IconButton>
			) : (
				<IconButton onClick={handleStep}>
					<Add sx={{ color: colors[idx] }} fontSize='large' />
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
					<StepLabel StepIconComponent={props => <ColorLibStepIcon {...props} idx={i} players={players} handleStep={handleStep(i)} />}>{players[i]}</StepLabel>
				</Step>
			))}
		</Stepper>
	)
}

export default Players
