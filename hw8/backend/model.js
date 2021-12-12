import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.'],
	},
	body: {
		type: String,
		required: [true, 'Body field is required.'],
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
	replyTo: {
		type: Schema.Types.ObjectId,
		ref: 'Message',
	},
	love: {
		type: [String],
		default: [],
	},
})
// Creating a table within database with the defined schema
const Message = mongoose.model('Message', MessageSchema)
// Exporting table for querying and mutating
export default Message
