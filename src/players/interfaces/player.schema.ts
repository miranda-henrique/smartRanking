import * as mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    ranking: {
        type: String,
    },
    rankingPosition: {
        type: Number,
    },
    playerImgUrl: {
        type: String,
    },
}, { timestamps: true, collection: 'players' });

export { PlayerSchema };

