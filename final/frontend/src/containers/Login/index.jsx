import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { Button } from '@mui/material'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import { Google } from '@mui/icons-material'
import { useConnection } from 'connection/connect'
import { saltRound } from 'constant'
import { useSnackbar } from 'hooks/useSnackbar'
import bcrypt from 'bcryptjs'

const Login = () => {
	const [signup, setSignup] = useState(false)
	const { createAccount, loginAccount, loginWithGoogle } = useConnection()
	const [wrongPassword, setWorngPassword] = useState(false)
	const { clientId } = useUser()
	const { showMessage } = useSnackbar()

	useEffect(() => {
		const input = document.querySelectorAll('input')
		input.forEach(i => i.addEventListener('keydown', e => e.stopPropagation()))
	}, [])

	useEffect(() => {
		setValues(values => ({ ...values, showPassword: false }))
	}, [signup])

	const handleSignUp = async e => {
		e.preventDefault()
		if (values.password !== values.confirmPassword) {
			setWorngPassword(true)
		} else {
			setWorngPassword(false)
			createAccount({ email: values.email, name: values.name, password: await bcrypt.hash(values.password, saltRound) })
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		loginAccount({ email: values.email, password: values.password })
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
		name: undefined,
		email: undefined,
		password: undefined,
		confirmPassword: undefined,
		showPassword: false,
	})

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		})
	}

	const onGoogleSuccess = async res => {
		const result = res?.profileObj
		// const token = res?.tokenObj?.id_token
		loginWithGoogle(result)
	}

	const onGoogleFailure = res => {
		// console.log(res)
		showMessage('Google login failed', 'error')
	}

	return (
		<div align='center' style={style}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				{signup && (
					<Input //
						name='name'
						label='Name'
						handlechange={handleChange}
						type='text'
						autoFocus
					/>
				)}
				<Input //
					name='email'
					label='Email'
					handlechange={handleChange}
					type='email'
					autoFocus
				/>
				<Input //
					// error={true}
					// helperText='Your email do not match!'
					name='password'
					label='Password'
					handlechange={handleChange}
					type={values.showPassword ? 'text' : 'password'}
					handleShowPassword={handleClickShowPassword}
				/>
				{signup && (
					<Input //
						error={wrongPassword}
						helperText={wrongPassword ? "Your Password doen't match!" : ''}
						name='confirmPassword'
						label='Confirm Password'
						handlechange={handleChange}
						type={values.showPassword ? 'text' : 'password'}
						handleShowPassword={handleClickShowPassword}
					/>
				)}
				{signup ? (
					<Button type='submit' color='secondary' variant='contained' onClick={handleSignUp} fullWidth sx={{ my: 1 }}>
						Signup
					</Button>
				) : (
					<>
						<Button type='submit' variant='contained' color='secondary' onClick={handleSubmit} fullWidth sx={{ my: 1 }}>
							Login
						</Button>
						{clientId ? (
							<GoogleLogin //
								clientId={clientId}
								render={renderProps => (
									<Button color='secondary' variant='contained' onClick={renderProps.onClick} fullWidth sx={{ mt: 0.5 }} disabled={renderProps.disabled} startIcon={<Google />}>
										Login with Google
									</Button>
								)}
								onSuccess={onGoogleSuccess}
								onFailure={onGoogleFailure}
								cookiePolicy='single_host_origin'
							/>
						) : (
							'Sorry~ Please Waiting'
						)}
					</>
				)}
			</form>
			<Button variant='text' color='secondary' onClick={() => setSignup(!signup)} sx={{ fontSize: theme => theme.typography.caption.fontSize }}>
				{signup ? 'Already have an account? Log in!' : "Don't have an account? Sign up!"}
			</Button>
		</div>
	)
}

export default Login
