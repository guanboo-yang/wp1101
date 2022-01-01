const User = {
	async chatRoom(parent, args, { db }, info) {
		let rooms = []
		for (let id of parent.chatRoom) {
			rooms.push(await db.ChatBoxModel.findById(id))
		}
		return rooms
	},
}

export { User as default }
