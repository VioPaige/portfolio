import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
    _id: String
    name: String
    creator: String
    creationdate: Date
    lastUpdate: Date
}
export const gameSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    creator: {type: String, required: true},
    creationDate: {type: Date, required: true},
    lastUpdate: {type: Date, required: true}
},
{
    versionKey: false
})
export const User = model('gameData', gameSchema, 'gameData')