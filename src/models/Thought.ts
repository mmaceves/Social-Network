import { Schema, Types, model, Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    userName: string;
    userId: Types.ObjectId;
    reactions: IReaction[];
    reactionCount: number; 
}

interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    userName: string;
    createdAt?: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: number) => new Date(timestamp).toLocaleString(),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});

const Thought = model ('thought', thoughtSchema);

export default Thought;
