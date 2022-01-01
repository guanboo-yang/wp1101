import { Form, Input, Button, Card, Radio } from 'antd'
import '../css/Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useRef } from 'react'
import { useStatus } from '../hook/useStatus'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../graphql'

const LoginPage = () => {
	const { setLogin, showStatus, setUserName, setFriends, setChatID } = useStatus()
	const bodyRef = useRef(null)
	const [loginPage, { error, data }] = useMutation(LOGIN)
	const options = [
		{ label: 'login', value: 'login' },
		{ label: 'register', value: 'register' },
	]

	useEffect(() => {
		if (error) {
			showStatus({ type: 'error', msg: error.message })
		} else {
			if (data) {
				const name = data['createUser'].username
				let rooms = []
				let friends = []
				data['createUser'].chatRoom.forEach(room => {
					rooms.push(room.id)
					friends.push(room.user[0]['username'] === name ? room.user[1]['username'] : room.user[0]['username'])
				})
				showStatus({ type: 'success', msg: `Hello ${name}!` })
				setUserName(name)
				setLogin(true)
				setFriends(friends)
				setChatID(rooms)
			}
		}
	}, [error, data, setLogin, setUserName, setFriends, setChatID, showStatus])

	const onFinish = async values => {
		try {
			await loginPage({ variables: values })
		} catch (error) {
			showStatus({ type: 'error', msg: error.message })
		}
	}

	const onFinishFailed = error => {
		showStatus({ type: 'error', msg: error })
	}

	return (
		<div className='login-page'>
			<Card style={{ width: 350, borderRadius: 20 }} cover={<UserOutlined style={{ fontSize: '100px', borderBottom: '7px solid #123456', padding: 20 }} />}>
				<Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
					<Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input
							prefix={<UserOutlined />}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									bodyRef.current.focus()
								}
							}}
						/>
					</Form.Item>
					<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password prefix={<LockOutlined />} ref={bodyRef} />
					</Form.Item>
					<Form.Item name='status' label='Status' rules={[{ required: true }]}>
						<Radio.Group options={options} optionType='button' buttonStyle='solid' value='register' />
					</Form.Item>
					<Form.Item>
						<Button type='primary' block htmlType='login'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}

export default LoginPage
