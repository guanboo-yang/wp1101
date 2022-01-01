const checkUser = (db, name, errFunc) => {
	if (!name) throw new Error('Missing user name for ' + errFunc)
	return db.UserModel.findOne({ name })
}

const newUser = async (db, name1, name2) => {
	const user1 = await db.UserModel.findOne({ username: name1 })
	const user2 = await db.UserModel.findOne({ username: name2 })

	return new db.ChatBoxModel({
		user: [user1._id, user2._id],
		messages: [],
	}).save()
}

const saveUser = async (db, username, password, status) => {
	if (status === 'login') {
		const user = await db.UserModel.findOne({ username, password })
		if (!user) {
			throw new Error('Wrong Username or Password')
		} else return user
	} else {
		const res = await db.UserModel.findOne({ username })
		if (!res) {
			return new db.UserModel({ username, password }).save()
		} else {
			throw new Error('Username has been used')
		}
	}
}

const createChatBox = async (username, friend, db, pubsub) => {
	const user1 = await db.UserModel.findOne({ username })
	const user2 = await db.UserModel.findOne({ username: friend })
	if (!user2) {
		throw new Error('No this User! Check Again')
	} else {
		let newRoom = new db.ChatBoxModel({ user: [user1._id, user2._id] })
		await db.UserModel.findOneAndUpdate({ username: username }, { $push: { chatRoom: newRoom._id } })
		await db.UserModel.findOneAndUpdate({ username: friend }, { $push: { chatRoom: newRoom._id } })
		pubsub.publish(`friend:${friend}`, {
			friend: {
				mutation: 'CREATED',
				data: { id: newRoom._id, name: username },
			},
		})
		return newRoom.save()
	}
}

const createNewMessage = async (name, body, id, db, pubsub) => {
	let newMessage = new db.MessageModel({ name, body })
	await db.ChatBoxModel.findOneAndUpdate({ _id: id }, { $push: { messages: newMessage._id } })
	const datas = await db.ChatBoxModel.findOne({ _id: id }).populate('user')
	datas.user.forEach(user => {
		if (user.username != name) {
			pubsub.publish(`name:${user.username}`, {
				message: { mutation: 'CREATED', data: newMessage },
			})
		}
	})
	return newMessage.save()
}

const getInitMessage = async (id, db) => {
	let temp = await db.ChatBoxModel.findOne({ _id: id }).populate('messages')
	return temp.messages
}

const clearMessages = async (id, user, friend, db, pubsub) => {
	pubsub.publish(`name:${friend}`, {
		message: { mutation: 'DELETED', data: null, user: user },
	})
	await db.ChatBoxModel.findOneAndUpdate({ _id: id }, { messages: [] })
	return []
}

export { checkUser, newUser, saveUser, createChatBox, createNewMessage, getInitMessage, clearMessages }
