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

const Playground = () => {
	const { invitation, setInvitation, setRoom, step, setStep } = useUser()
	const { acceptInvitation } = useConnection()

	useEffect(() => {
		imagePreloder([bullet, explosion, mine, mine_p, missile, missile_p, ship, fire, shield])
	}, [])

	const acceptInvite = () => {
		setRoom({ roomId: invitation.roomId, isHost: false })
		setInvitation({ ...invitation, invite: false })
		acceptInvitation(invitation)
		setStep(1)
	}

	return (
		<>
			{
				{
					0: <Mode setStart={() => setStep(1)} />,
					1: <Room setStep={step => setStep(prev => prev + step)} />,
					2: <Game />,
				}[step]
			}
			<Dialog
				open={invitation.invite}
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
