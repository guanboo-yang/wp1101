import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		password: { type: String, required: true },
		events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
	},
	{ timestamps: true }
)

const User = mongoose.model('User', UserSchema)

export default User
