import React, { useState, useMemo } from 'react'

import { Tab, Tabs, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import useStorage from '../hooks/useStorage'
import { useTheme } from '@mui/material'
import { useUser } from '../hooks/useUser'

const Appbar = ({ setDarkMode, darkMode }) => {
	const { user } = useUser()
	const [auth, setAuth] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const [tabValue, setTabValue] = useStorage('tabvalue', 0, window.sessionStorage)
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)
	const theme = useTheme()

	console.log(theme)

	const handleOpenUserMenu = event => {
		setUserMenuAnchorEl(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setUserMenuAnchorEl(null)
	}

	return (
		<>
			<AppBar position='static' position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant='h6' color='inherit' noWrap>
						Chat App
					</Typography>
					<Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} aria-label='nav-tab' textColor='secondary' indicatorColor='secondary' style={{ margin: '0 auto' }}>
						<Tab disableRipple sx={{ color: theme.palette.grey[400] }} label='Home' to='/' component={Link} />
						<Tab disableRipple sx={{ color: theme.palette.grey[400] }} label='Chat' to='/chat' component={Link} />
						<Tab disableRipple sx={{ color: theme.palette.grey[400] }} label='Calender' to='/calender' component={Link} />
					</Tabs>
					<IconButton color='inherit' disableRipple onClick={handleOpenUserMenu}>
						{/* <Avatar
							style={{ backgroundColor: '#ebebeb', width: 45, height: 45, border: `2px solid ${theme.palette.secondary.main}` }}
							src={auth ? `https://i.imgur.com/Uo5wIGM.png` : ''}></Avatar> */}
						<Avatar
							sx={{ background: theme.palette.text.primary, border: `2px solid ${theme.palette.text.disabled}`, width: 45, height: 45 }}
							src={auth ? `//joeschmoe.io/api/v1/${user}` : ''}></Avatar>
					</IconButton>
					<Menu anchorEl={userMenuAnchorEl} open={Boolean(userMenuAnchorEl)} onClose={handleCloseUserMenu}>
						{auth ? (
							<div>
								<MenuItem onClick={() => setAuth(false)}>Logout</MenuItem>
								<MenuItem>Setting</MenuItem>
								<MenuItem onClick={() => setDarkMode(!darkMode)}>Change Mode</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem onClick={() => setAuth(true)}>Login</MenuItem>
								<MenuItem>Sign Up</MenuItem>
							</div>
						)}
					</Menu>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Appbar
