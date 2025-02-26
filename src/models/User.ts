import { Schema, model, type Document } from 'mongoose';

interface User extends Document {
    userName: string;
    email: string;
    thoughts: [
    {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    }
];    
    friends: [
    {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
        
    }
    ];
    friendCount: number;
}

const userSchema = new Schema<User>({
    userName: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    thoughts: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    }],
    friends: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model<User>('User', userSchema);

export default User;


