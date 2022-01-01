import { checkUser, newUser, saveUser, createChatBox, createNewMessage, getInitMessage, clearMessages } from './utility'

const Mutation = {
	async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
		if (!name1 || !name2) throw new Error('Missing chatbox name for CreateChatBox')
		return await newUser(db, name1, name2)
	},
	async createUser(parent, args, { db, pubsub }, info) {
		const username = args.data.username
		const password = args.data.password
		const status = args.data.status
		if (!username || !password) throw new Error('Missing chatbox name or password for User')
		return await saveUser(db, username, password, status)
	},
	async createFriend(parent, args, { db, pubsub }, info) {
		const username = args.data.username
		const friend = args.data.friend
		return createChatBox(username, friend, db, pubsub)
	},
	async createMessage(parent, args, { db, pubsub }, info) {
		const name = args.data.name
		const body = args.data.body
		const id = args.data.id
		return createNewMessage(name, body, id, db, pubsub)
	},
	async InitMessages(parent, args, { db, pubsub }, info) {
		const id = args.id
		return getInitMessage(id, db)
	},
	async deleteMessages(parent, args, { db, pubsub }, info) {
		const id = args.id
		const user = args.name
		const friend = args.friend
		return clearMessages(id, user, friend, db, pubsub)
	},
}

export { Mutation as default }
