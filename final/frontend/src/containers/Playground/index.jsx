import { useEffect } from 'react'
import Mode from '../../components/Mode'
import Room from '../../components/Room'
import Game from '../../components/Game'
import { Dialog, DialogTitle, DialogActions } from '@mui/material'
import SettingButton from 'components/SettingButton'
import { useUser } from 'hooks/useUser'
import { useConnection } from 'connection/connect'
import { imagePreloder } from 'utils'
import { bullet, explosion, mine, mine_p, missile, missile_p } from 'assets/weapons'
import { ship, fire, shield } from 'assets/ship'
import { GameProvider } from 'hooks/useGame'

const Playground = () => {
	const { invitation, setInvitation, setRoom, room, step, setStep } = useUser()
	const { acceptInvitation, requireFriend } = useConnection()

	useEffect(() => {
		imagePreloder([bullet, explosion, mine, mine_p, missile, missile_p, ship, fire, shield])
	}, [])

	useEffect(() => {
		const input = document.querySelectorAll('input')
		input.forEach(i => i.addEventListener('keydown', e => e.stopPropagation()))
	}, [])

	const acceptInvite = () => {
		setRoom({ ...room, roomId: invitation.roomId, isHost: false })
		setInvitation({ ...invitation, invite: false })
		acceptInvitation(invitation)
		requireFriend()
		setStep(1)
	}

	return (
		<>
			{
				{
					0: <Mode setStart={() => setStep(1)} />,
					1: <Room setStep={step => setStep(prev => prev + step)} />,
					2: (
						<GameProvider>
							<Game />
						</GameProvider>
					),
				}[step]
			}
			<Dialog
				open={invitation.invite && !room.gameStart}
				// onClose={() => setOpenDialog(false)}
				PaperProps={{ style: { backgroundColor: theme => theme.palette.primary.main, border: '4px solid #fff' } }}>
				<DialogTitle>{`${invitation.inviter} invites you to the Room ${invitation.roomId}`}</DialogTitle>
				<DialogActions>
					<SettingButton onClick={() => setInvitation({ ...invitation, invite: false })}>reject</SettingButton>
					<SettingButton onClick={acceptInvite} autoFocus>
						Accept
					</SettingButton>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Playground
