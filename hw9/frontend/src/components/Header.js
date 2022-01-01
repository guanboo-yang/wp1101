import { Menu, Input } from 'antd'
import { CommentOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useStatus } from '../hook/useStatus'
import { MAKE_FRIEND, FRIEND_SUBSCRIPTION } from '../graphql'
import { useMutation, useSubscription } from '@apollo/client'

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
			showStatus({ type: 'error', msg: `Please login first` })
		} else if (friendName === '') {
			showStatus({ type: 'error', msg: `Please input your friend's name` })
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
		setCurrentID(chatID[e.key])
		setCurrentFriend(friends[e.key])
	}

	return (
		<Menu mode='horizontal' style={{ position: 'absolute', width: '100%', fontSize: '18px' }} key={-2} theme='dark'>
			<Menu.Item
				key={-1}
				style={{
					fontWeight: 'bold',
					borderRight: '1px solid black',
					color: 'white',
				}}>
				{!userName ? 'Your' : `${userName}'s`} Chat Room
			</Menu.Item>
			<Menu.SubMenu key='SubMenu' title='Open Chat Room' icon={<CommentOutlined style={{ fontSize: '20px' }} />}>
				{friends.map((name, i) => {
					return (
						<Menu.Item key={i} onClick={e => toRoom(e)}>
							{name}
						</Menu.Item>
					)
				})}
			</Menu.SubMenu>
			<Menu.Item key={-2} icon={<UsergroupAddOutlined style={{ fontSize: '20px' }} />}>
				<Input.Search
					style={{ paddingTop: 7, width: 200 }}
					disabled={buttonDisabled}
					placeholder='Find Your Friends'
					value={friendName}
					onChange={e => setFriendName(e.target.value)}
					onSearch={makeFriend}></Input.Search>
			</Menu.Item>
		</Menu>
	)
}

export default Header
