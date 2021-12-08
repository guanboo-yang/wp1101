import mongoose from 'mongoose'

const EventSchema = mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
	},
	{ timestamps: true }
)

const Event = mongoose.model('Event', EventSchema)

export default Event
