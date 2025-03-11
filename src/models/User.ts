import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    userName: string;
    email: string;
    thoughts?: [];    
    friends?: [];
    friendCount: number;
}

const userSchema = new Schema<IUser>({
    userName: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
    }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }]
}, 
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends?.length;
});

const User = model ('user', userSchema);

export default User;


