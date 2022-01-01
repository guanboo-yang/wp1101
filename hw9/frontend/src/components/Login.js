import { Form, Input, Button, Card, Radio } from 'antd'
import '../css/Login.css'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useRef } from 'react'
import { useStatus } from '../hook/useStatus'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../graphql'

const LoginPage = () => {
	const { setLogin, showStatus, setUserName, setFriends, setChatID } = useStatus()
	const bodyRef = useRef(null)
	const [loginPage, { error, data }] = useMutation(LOGIN)

	useEffect(() => {
		// != undefined
		if (error) {
			showStatus({
				type: 'error',
				msg: error.message,
			})
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
			await loginPage({
				variables: {
					username: values.username,
					password: values.password,
					status: values['Account Status'],
				},
			})
		} catch (error) {
			showStatus({ type: 'error', msg: error.message })
		}
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='login-page'>
			<Card hoverable style={{ width: 430 }} cover={<UserOutlined style={{ fontSize: '235px', borderBottom: '1px solid black' }} />}>
				<Form
					name='basic'
					labelCol={{ span: 7 }}
					wrapperCol={{ span: 14 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'>
					<Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input
							onKeyDown={e => {
								if (e.key === 'Enter') {
									bodyRef.current.focus()
								}
							}}
						/>
					</Form.Item>
					<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password ref={bodyRef} />
					</Form.Item>
					<Form.Item name='Account Status' label='Acc Status' rules={[{ required: true }]}>
						<Radio.Group>
							<Radio value='create'>Create</Radio>
							<Radio value='login'>Login</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 0, span: 32 }}>
						<Button type='primary' htmlType='login' style={{ width: 370, marginRight: 25 }}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}

export default LoginPage
