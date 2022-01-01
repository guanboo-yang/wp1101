import { Menu, Input } from 'antd'
import { CommentOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useStatus } from '../hook/useStatus'
import { MAKE_FRIEND, FRIEND_SUBSCRIPTION } from '../graphql'
import { useMutation, useSubscription } from '@apollo/client'
const { SubMenu } = Menu

function Header() {
	const { login, userName, friends, chatID, setChatID, setFriends, setCurrentID, setCurrentFriend, showStatus } = useStatus()
	const [friendName, setFriendName] = useState('')
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const [addFriend, { error, data }] = useMutation(MAKE_FRIEND)
	const { data: newFriend } = useSubscription(FRIEND_SUBSCRIPTION, { variables: { name: userName } })

	useEffect(() => {
		if (newFriend) {
			const friend = newFriend.friend.data.name
			const id = newFriend.friend.data.id
			setFriends([...friends, friend])
			setChatID([...chatID, id])
			showStatus({ type: 'success', msg: `${friend} has been your friend!` })
		}
	}, [newFriend]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (error) {
			showStatus({ msg: error.message, type: 'error' })
		} else {
			if (data) {
				showStatus({
					type: 'success',
					msg: 'Adding friend Successfully!',
				})
				setChatID([...chatID, data['createFriend'].id])
				setFriends([...friends, data['createFriend'].user[0]['username'] === userName ? data['createFriend'].user[1]['username'] : data['createFriend'].user[0]['username']])
			}
		}
	}, [error, data]) // eslint-disable-line react-hooks/exhaustive-deps

	const makeFriend = async () => {
		setFriendName('')
		if (!login) {
			showStatus({ type: 'error', msg: `Please Login First` })
		} else if (friendName === '') {
			showStatus({
				type: 'error',
				msg: `Please Input Your Friend's name`,
			})
		} else {
			if (friends.includes(friendName)) {
				showStatus({
					type: 'error',
					msg: `You already have ${friendName}'s friend`,
				})
			} else if (friendName === userName) {
				showStatus({
					type: 'error',
					msg: `We don't support self alone chat room`,
				})
			} else {
				setButtonDisabled(true)
				try {
					await addFriend({
						variables: {
							username: userName,
							friend: friendName,
						},
					})
				} catch (error) {}
				// await addFriend(userName, friendName);
				setTimeout(() => {
					setButtonDisabled(false)
				}, 1000)
			}
		}
	}

	const toRoom = e => {
		setCurrentID(chatID[e.key - 10])
		setCurrentFriend(friends[e.key - 10])
	}

	return (
		<Menu mode='horizontal' style={{ position: 'absolute', width: '100%', fontSize: '18px' }} key={-2} theme='dark'>
			<Menu.Item
				disabled={true}
				key={0}
				style={{
					fontWeight: 'bold',
					borderRight: '1px solid black',
					color: 'black',
				}}>
				{!userName ? 'Your' : userName}'s Chat Room
			</Menu.Item>
			<SubMenu key='SubMenu' icon={<CommentOutlined />} title='Open Chat Room'>
				{friends.map((name, i) => {
					return (
						<Menu.Item key={i + 10} onClick={e => toRoom(e)}>
							{name}
						</Menu.Item>
					)
				})}
			</SubMenu>

			<Menu.SubMenu title='Find Your Friends' key={2} icon={<UsergroupAddOutlined />}>
				<Input.Search
					disabled={buttonDisabled}
					placeholder="Your Friend's name?"
					value={friendName}
					onChange={e => setFriendName(e.target.value)}
					onSearch={makeFriend}></Input.Search>
			</Menu.SubMenu>
		</Menu>
	)
}

export default Header
