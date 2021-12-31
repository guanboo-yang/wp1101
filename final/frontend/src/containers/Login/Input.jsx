import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({ name, label, handlechange, type, autoFocus, value, handleShowPassword }) => {
	return (
		<TextField //
			name={name}
			label={label}
			value={value}
			onChange={handlechange}
			required
			fullWidth
			variant='outlined'
			margin='dense'
			autoFocus={autoFocus}
			type={type}
			color='secondary'
			InputProps={
				name === 'password'
					? {
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton aria-label='toggle password visibility' onClick={handleShowPassword} edge='end'>
										{type === 'password' ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
					  }
					: null
			}
		/>
	)
}

export default Input
