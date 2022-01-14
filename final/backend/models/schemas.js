import mongoose from 'mongoose'

const PlayerSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player', default: []}],
		email: { type: String, required: true, unique: true },
		password: { type: String },
		wins: { type: Number, required: true, default: 0 },
		loses: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true }
)

const RoomSchema = mongoose.Schema({
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' } ],
	roomId: [{type: Number, required: true}],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: []}],
	gameMode: { type: Number, default: 0 },
	rounds: { type: Number, default: 0 },
	level: { type: Number, default: 0 },
})

const MessageSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ timestamps: true }
)

const GameSchema = mongoose.Schema(
	{
		gameMode: { type: Number, default: 0 },
		rounds: { type: Number, default: 0 },
		messages: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
		// state for each round (probably not equal to the number of rounds)
		players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
		state: [
			{
				winner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
				kda: [{ type: Number, default: 0 }],
			},
		],
		winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
	},
	{ timestamps: true }
)

const Player = mongoose.model('Player', PlayerSchema)
const Message = mongoose.model('Message', MessageSchema)
const Room = mongoose.model('Event', RoomSchema)
const Game = mongoose.model('Game', GameSchema)

export { Player, Message, Room, Game }
