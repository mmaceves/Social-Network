import { Schema, model, type Document } from 'mongoose';

interface Thought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: [
        {
            _id: {
                type: Schema.Types.ObjectId;
                ref: 'Reaction';
            };
        }
    ];
    reactionCount: number;
}

const thoughtSchema = new Schema<Thought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Reaction',
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model<Thought>('Thought', thoughtSchema);

export default Thought;
