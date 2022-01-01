import Header from './Header'
import ChatRoom from './ChatRoom'
import LoginPage from './Login'
import { useStatus } from '../hook/useStatus'

function App() {
	const { login } = useStatus()

	return (
		<div className='wrap' style={{ backgroundColor: 'rgba(120, 120, 120, .5)' }}>
			<Header />
			{login ? <ChatRoom /> : <LoginPage />}
		</div>
	)
}

export default App
