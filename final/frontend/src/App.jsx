import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import { Appbar, NotFound } from './components'
import { Playground, Login, ScoreBoard, About } from './containers'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SettingButton from 'components/SettingButton'
import {
    Toolbar,
    Box,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogActions
} from '@mui/material'
import { useUser } from './hooks/useUser'
import { useSnackbar } from './hooks/useSnackbar'
import { useConnection } from 'connection/connect'

const RequireAuth = ({ children }) => {
    const { profile } = useUser()
    return profile ? children : <Navigate to="/login" />
}

const App = () => {
    const { room, invitation, setInvitation, setRoom, setStep } = useUser()
    const { acceptInvitation, requireFriend } = useConnection()
    const links = [
        {
            name: 'Playground',
            path: '/',
            element: <Playground />,
            disable: false
        },
        // { name: 'Chat', path: '/chat', element: <Chat />, disable: room.roomId ? true : false },
        {
            name: 'Scoreboard',
            path: '/scoreboard',
            element: <ScoreBoard />,
            disable: room.roomId ? true : false
        },
        {
            name: 'About',
            path: '/about',
            element: <About />,
            disable: room.roomId ? true : false
        }
    ]
    const { darkMode } = useUser()
    const { snackbarOption, handleCloseSnackbar } = useSnackbar()

    const theme = createTheme({
        typography: {
            fontFamily: '"Bungee", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            fontWeightLight: 400,
            fontWeightRegular: 500,
            fontWeightMedium: 600,
            fontWeightBold: 700
        },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            ...(darkMode
                ? {
                      primary: { main: '#1f5469' },
                      secondary: { main: '#ffffff' },
                      background: { paper: '#1f5469e9', dark: '#26c8bc' }
                  }
                : {
                      primary: { main: '#ffffff', dark: '#91d2c2' },
                      secondary: { main: '#1f5469' },
                      background: { paper: '#ffffffe9', dark: '#1f5469' }
                  })
        }
    })

    const acceptInvite = () => {
        setRoom({ ...room, roomId: invitation.roomId, isHost: false })
        setInvitation({ ...invitation, invite: false })
        acceptInvitation(invitation)
        requireFriend()
        setStep(1)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App" style={{ height: '100vh', overflow: 'auto' }}>
                <Appbar links={links} />
                <Toolbar />
                <Dialog
                    open={invitation.invite && !room.gameStart}
                    // onClose={() => setOpenDialog(false)}
                    PaperProps={{
                        style: {
                            backgroundColor: (theme) =>
                                theme.palette.primary.main,
                            border: '4px solid #fff'
                        }
                    }}
                >
                    <DialogTitle>{`${invitation.inviter} invites you to the Room ${invitation.roomId}`}</DialogTitle>
                    <DialogActions>
                        <SettingButton
                            onClick={() =>
                                setInvitation({
                                    ...invitation,
                                    invite: false
                                })
                            }
                        >
                            reject
                        </SettingButton>
                        <SettingButton onClick={acceptInvite} autoFocus>
                            Accept
                        </SettingButton>
                    </DialogActions>
                </Dialog>
                <Box
                    component="main"
                    style={{
                        color: theme.palette.secondary.main,
                        background: theme.palette.primary.main
                    }}
                >
                    <Routes>
                        {links.map(({ name, path, element }) => (
                            <Route
                                key={name}
                                path={path}
                                element={<RequireAuth>{element}</RequireAuth>}
                            />
                        ))}
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        open={snackbarOption.open}
                        autoHideDuration={snackbarOption.duration}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert
                            elevation={6}
                            variant="filled"
                            onClose={handleCloseSnackbar}
                            severity={snackbarOption.severity}
                        >
                            {snackbarOption.message}
                        </Alert>
                    </Snackbar>
                </Box>
                {/* hide on md and above */}
                <Box display={{ xs: 'block', md: 'none' }}>
                    <Toolbar />
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default App
