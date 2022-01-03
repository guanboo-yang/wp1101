import mongoose from 'mongoose'

const PlayerSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		wins: { type: Number, required: true },
		loses: { type: Number, required: true },
	},
	{ timestamps: true }
)

const RoomSchema = mongoose.Schema({
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
	gameMode: { type: Number, default: 0 },
	rounds: { type: Number, default: 3 },
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
