import React, { useState, useEffect } from 'react'

import { Tab, Tabs, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { useStorage } from '../hooks'
import { useTheme, useScrollTrigger } from '@mui/material'
import { useUser } from '../hooks/useUser'
import RocketIcon from '@mui/icons-material/Rocket'

const Appbar = ({ setDarkMode, darkMode, links }) => {
	const { user } = useUser()
	const [auth, setAuth] = useState(false)
	// const [drawer, setDrawer] = useState(false)
	const [tabValue, setTabValue] = useStorage('tabvalue', 0, window.sessionStorage)
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)
	const theme = useTheme()
	const location = useLocation()

	// console.log(theme)
	// console.log(location)

	// change tab on location change
	useEffect(() => {
		// if pathname in link
		if (links.find(link => link.path === location.pathname)) {
			setTabValue(location.pathname)
		}
	}, [location, links, setTabValue])

	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 })

	const handleLogin = () => {
		setAuth(true)
	}

	const handleLogout = () => {
		setAuth(false)
	}

	const handleOpenUserMenu = event => {
		setUserMenuAnchorEl(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setUserMenuAnchorEl(null)
	}

	return (
		<>
			<AppBar //
				elevation={trigger ? 5 : 0}
				enableColorOnDark
				position='fixed'
				sx={{ /* zIndex: theme => theme.zIndex.drawer + 1, */ backgroundColor: theme.palette.primary.main }}>
				<Toolbar>
					{/* rocket */}
					<RocketIcon sx={{ mr: 1 }} />
					<Typography variant='h5' color='secondary' noWrap>
						Astro Party
					</Typography>
					<Tabs //
						value={tabValue}
						aria-label='nav-tab'
						textColor='secondary'
						indicatorColor='secondary'
						style={{ margin: '0 auto' }}>
						{links.map(({ name, path }) => (
							<Tab //
								key={name}
								label={name}
								component={NavLink}
								to={path}
								value={path}
								sx={{ fontSize: theme => theme.typography.body1.fontSize }}
							/>
						))}
					</Tabs>
					<Typography variant='h5' color='secondary' noWrap>
						{user}
					</Typography>
					<IconButton //
						disableRipple
						onClick={handleOpenUserMenu}
						// onMouseOver={handleOpenUserMenu}
					>
						<Avatar //
							sx={{
								color: theme.palette.secondary.main,
								background: theme.palette.primary.main,
								border: `2px solid ${theme.palette.secondary.main}`,
								width: 35,
								height: 35,
							}}
							src={auth ? `//joeschmoe.io/api/v1/${user}` : ''}></Avatar>
						{/* src={auth ? `https://i.imgur.com/Uo5wIGM.png` : ''}></Avatar> */}
					</IconButton>
					<Menu //
						anchorEl={userMenuAnchorEl}
						open={Boolean(userMenuAnchorEl)}
						onClose={handleCloseUserMenu}
						MenuListProps={{ onMouseLeave: handleCloseUserMenu }}>
						{auth ? (
							<div>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
								<MenuItem>Setting⌘S</MenuItem>
								<MenuItem onClick={() => setDarkMode(!darkMode)}>Change Mode</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem onClick={handleLogin}>Login</MenuItem>
								<MenuItem>Sign Up</MenuItem>
								<MenuItem onClick={() => setDarkMode(!darkMode)}>Change Mode</MenuItem>
							</div>
						)}
					</Menu>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Appbar
