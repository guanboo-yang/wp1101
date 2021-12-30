import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {
	const { setUser, login } = useUser()
	const navigate = useNavigate()

	const handleLogin = () => {
		if (values.name && values.password) {
			login()
				.then(() => setUser(values.name))
				.then(() => navigate('/'))
		}
	}

	const style = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0 auto',
		width: 'min(300px, 90vw)',
	}

	const [values, setValues] = useState({
		name: null,
		password: null,
		showPassword: false,
	})

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		})
	}

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	return (
		<div align='center' style={style}>
			<h1>Login</h1>
			<TextField //
				label='Username'
				value={values.name}
				onChange={handleChange('name')}
				required
				variant='standard'
				// margin='dense'
				type='text'
				fullWidth
				color='secondary'
			/>
			<TextField //
				label='Password'
				value={values.password}
				onChange={handleChange('password')}
				required
				variant='standard'
				margin='dense'
				type={values.showPassword ? 'text' : 'password'}
				fullWidth
				color='secondary'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
								{values.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Button variant='contained' color='secondary' onClick={handleLogin} fullWidth sx={{ my: 2 }}>
				Login
			</Button>
		</div>
	)
}

export default Login
