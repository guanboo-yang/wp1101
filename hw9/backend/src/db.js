import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, required: [true, 'Username field is required'] },
	password: { type: String, required: [true, 'Password field is required'] },
	chatRoom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
})

const RoomSchema = new mongoose.Schema({
	user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
})

const MessageSchema = new mongoose.Schema({
	name: { type: String, required: [true, 'Name firld is required'] },
	body: { type: String, required: [true, 'Body firld is required'] },
})

const UserModel = mongoose.model('User', UserSchema)
const ChatBoxModel = mongoose.model('ChatBox', RoomSchema)
const MessageModel = mongoose.model('Message', MessageSchema)

export { UserModel, ChatBoxModel, MessageModel }
