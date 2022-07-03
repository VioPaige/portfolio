import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
    _id: String
    username: String
    email: String
    password: String
    creationDate: Date
    birthDate: Date
    rank: Number
    invitetoken: String
}
export const accountSchema = new Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    // creationdate: {type: Date, required: true},
    // birthdate: {type: Date, required: true},
    creationdate: {type: String, required: true},
    birthdate: {type: String, required: true},
    rank: {type: Number, required: true},
    invitetoken: {type: String, required: true}
},
{
    versionKey: false
})
export const User = model('userData', accountSchema, 'userData')