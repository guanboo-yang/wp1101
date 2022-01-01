const ChatBox = {
	// return an array of messages with respect to the parent
	async messages(parent, args, { db }, info) {
		let ms = []
		for (let id of parent.messages) {
			ms.push(await db.MessageModel.findById(id))
		}
		return ms
	},
	user(parent, args, { db }, info) {
		return Promise.all(parent.user.map(mId => db.UserModel.findById(mId)))
	},
}

export { ChatBox as default }
