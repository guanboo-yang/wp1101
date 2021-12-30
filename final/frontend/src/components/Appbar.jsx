import React, { useState, useEffect } from 'react'
import { Tab, Tabs, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Chip } from '@mui/material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useStorage } from '../hooks'
import { useTheme, useScrollTrigger } from '@mui/material'
import { useUser } from '../hooks/useUser'
import Settings from './Settings'
import RocketIcon from '@mui/icons-material/Rocket'

const Appbar = ({ links }) => {
	const { user, auth, darkMode, setDarkMode, logout, setUser } = useUser()
	// const [drawer, setDrawer] = useState(false)
	const [tabValue, setTabValue] = useStorage('tabvalue', 0, window.sessionStorage)
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)
	const [openSettings, setOpenSettings] = useState(false)
	const theme = useTheme()
	const location = useLocation()
	const navigate = useNavigate()

	// console.log(theme)
	// console.log(location)

	// change tab on location change
	useEffect(() => {
		// if pathname in link
		if (links.find(link => link.path === location.pathname)) {
			setTabValue(location.pathname)
		}
	}, [location, links, setTabValue])

	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 })

	const handleLogout = () => {
		logout()
			.then(() => setUser(null))
			.then(() => navigate('/login'))
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
					{auth && (
						<Tabs //
							value={tabValue}
							aria-label='nav-tab'
							textColor='secondary'
							indicatorColor='secondary'
							style={{ margin: '0 0 0 auto' }}>
							{links.map(
								({ name, path }) =>
									name !== 'Login' && (
										<Tab //
											key={name}
											label={name}
											component={NavLink}
											to={path}
											value={path}
											sx={{ fontSize: theme => theme.typography.body1.fontSize }}
										/>
									)
							)}
						</Tabs>
					)}
					<Toolbar disableGutters style={{ margin: '0 0 0 auto' }}>
						<Typography variant='h5' color='secondary'>
							{auth && user}
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
					</Toolbar>
					<Menu //
						anchorEl={userMenuAnchorEl}
						open={Boolean(userMenuAnchorEl)}
						onClose={handleCloseUserMenu}
						MenuListProps={{ onMouseLeave: handleCloseUserMenu }}>
						{auth ? (
							<div>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
								<MenuItem onClick={() => setOpenSettings(true)}>
									Setting
									<Chip sx={{ ml: 1 }} label='⇧?' size='small' />
								</MenuItem>
								<MenuItem onClick={() => setDarkMode(!darkMode)}>
									Change Mode
									<Chip sx={{ ml: 1 }} label='⇧D' size='small' />
								</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem onClick={() => setDarkMode(!darkMode)}>Change Mode</MenuItem>
							</div>
						)}
					</Menu>
				</Toolbar>
			</AppBar>
			<Settings open={openSettings} setOpen={setOpenSettings} />
		</>
	)
}

export default Appbar
