const Query = {
	async users(parent, args, { db }, info) {
		if (!args.query) return db.UserModel.find({})

		return db.UserModel.find({ username: args.query })
	},
	async rooms(parent, args, { db }, info) {
		return db.ChatBoxModel.find({})
	},
	async friends(parent, { name }, { db }, info) {
		const user = await db.UserModel.find({ username: name })
		return user
	},
}

export { Query as default }
