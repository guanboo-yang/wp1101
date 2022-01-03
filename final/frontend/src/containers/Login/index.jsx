import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import { Google } from '@mui/icons-material'
const GOOGLE_CLIENT_ID = '202508058751-40ie9aunidgnnafl0pdqselm2bb0r6bq.apps.googleusercontent.com'

const Login = () => {
	const { login } = useUser()
	const navigate = useNavigate()
	const [signup, setSignup] = useState(false)

	useEffect(() => {
		setValues(values => ({ ...values, showPassword: false }))
	}, [signup])

	const handleSubmit = () => {
		console.log(values)
		if (signup) {
			// handle signup
		} else {
			// handle login
		}
		login({ ...values, name: 'Tristan' })
		navigate('/')
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
		const token = res?.tokenObj?.id_token
		try {
			login({ ...result, token })
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}

	const onGoogleFailure = res => {
		console.log(res)
	}

	return (
		<div align='center' style={style}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				{signup && (
					<Input //
						name='name'
						label='Name'
						onChange={handleChange}
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
					name='password'
					label='Password'
					handlechange={handleChange}
					type={values.showPassword ? 'text' : 'password'}
					handleShowPassword={handleClickShowPassword}
				/>
				{signup && (
					<Input //
						name='confirmPassword'
						label='Confirm Password'
						handlechange={handleChange}
						type={values.showPassword ? 'text' : 'password'}
						handleShowPassword={handleClickShowPassword}
					/>
				)}
				{signup ? (
					<Button type='submit' color='secondary' variant='contained' onClick={handleSubmit} fullWidth sx={{ my: 1 }}>
						Signup
					</Button>
				) : (
					<>
						<Button type='submit' variant='contained' color='secondary' onClick={handleSubmit} fullWidth sx={{ my: 1 }}>
							Login
						</Button>
						<GoogleLogin //
							clientId={GOOGLE_CLIENT_ID}
							render={renderProps => (
								<Button color='secondary' variant='contained' onClick={renderProps.onClick} fullWidth sx={{ mt: 0.5 }} disabled={renderProps.disabled} startIcon={<Google />}>
									Login with Google
								</Button>
							)}
							onSuccess={onGoogleSuccess}
							onFailure={onGoogleFailure}
							cookiePolicy='single_host_origin'
						/>
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
