import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ timestamps: true }
)

const Message = mongoose.model('Message', MessageSchema)

export default Message
