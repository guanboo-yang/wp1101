import mongoose from 'mongoose';

const ChatRoomSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
    },
    { timestamps: true }
);

const MessageSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        body: { type: String, required: true }
    },
    { timestamps: true }
);

const UserSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        wins: { type: Number, required: true },
        loses: { type: Number, required: true },
        // events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);
const ChatRoom = mongoose.model('Event', ChatRoomSchema);

export { ChatRoom, Message, User };
