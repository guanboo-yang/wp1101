import React, { useState, useEffect } from 'react'
import { Tab, Tabs, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Chip } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import { useStorage } from '../hooks'
import { useTheme, useScrollTrigger } from '@mui/material'
import { useUser } from '../hooks/useUser'
import { GoogleLogout } from 'react-google-login'
import Settings from './Settings'
import { Rocket } from '@mui/icons-material'
const GOOGLE_CLIENT_ID = '202508058751-40ie9aunidgnnafl0pdqselm2bb0r6bq.apps.googleusercontent.com'

const Appbar = ({ links }) => {
	const { user, profile, darkMode, setUser, setDarkMode, logout } = useUser()
	const [tabValue, setTabValue] = useStorage('tabvalue', 0, window.sessionStorage)
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)
	const [openSettings, setOpenSettings] = useState(false)
	const theme = useTheme()
	const location = useLocation()

	// console.log(theme)
	// console.log(location)
	// console.log(profile)

	useEffect(() => {
		setUser(profile?.name)
	}, [profile, setUser])

	useEffect(() => {
		if (links.find(link => link.path === location.pathname)) {
			setTabValue(location.pathname)
		}
	}, [location, links, setTabValue])

	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 })

	const handleOpenUserMenu = event => {
		setUserMenuAnchorEl(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setUserMenuAnchorEl(null)
	}

	const tabStyles = theme => ({
		margin: '0 0 0 auto',
		[theme.breakpoints.down('md')]: {
			position: 'fixed',
			bottom: 0,
			left: '50%',
			transform: 'translateX(-50%)',
			zIndex: theme.zIndex.appBar,
			padding: theme.spacing(1, 0),
			// hide on scroll
		},
	})

	return (
		<>
			<AppBar //
				elevation={trigger ? 5 : 0}
				enableColorOnDark
				position='fixed'
				sx={{ backgroundColor: theme.palette.primary.main }}>
				<Toolbar>
					<Rocket sx={{ mr: 1 }} />
					<Typography variant='h5' color='secondary' noWrap>
						Astro Party
					</Typography>
					{profile && (
						<Tabs //
							value={tabValue}
							aria-label='nav-tab'
							textColor='secondary'
							indicatorColor='secondary'
							sx={tabStyles}>
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
						<Typography variant='body1' color='secondary' noWrap>
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
								// src={profile ? `//joeschmoe.io/api/v1/${user}` : ''}></Avatar>
								src={profile ? profile?.imageUrl : ''}></Avatar>
						</IconButton>
					</Toolbar>
					<Menu //
						anchorEl={userMenuAnchorEl}
						open={Boolean(userMenuAnchorEl)}
						onClose={handleCloseUserMenu}
						MenuListProps={{ onMouseLeave: handleCloseUserMenu }}>
						{profile ? (
							<div>
								<MenuItem align='center'>{user}</MenuItem>
								<GoogleLogout clientId={GOOGLE_CLIENT_ID} render={renderProps => <MenuItem onClick={renderProps.onClick}>Logout</MenuItem>} onLogoutSuccess={logout} />
								<MenuItem onClick={() => setOpenSettings(true)}>
									Setting
									<Chip sx={{ ml: 1 }} label='?' size='small' />
								</MenuItem>
								<MenuItem onClick={() => setDarkMode(!darkMode)}>Change Mode</MenuItem>
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
