const { Schema, model } = require('mongoose');


//reaction schema
const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: "Reaction required to continue",
            maxlength: [280, "reaction must not exceed 280 characters"],
        },
        username: {
            type: String,
            required: "Username required to proceed",
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought required to continue",
            min: [1, "More than one character long."],
            maxlength: [280, "Thought may not exceed 280 characters"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: "Username required to continue",
        },
        //replies array
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
//reaction count virtual
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);

//export the model
module.exports = Thought;