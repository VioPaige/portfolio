import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    _id: String
    createdby: String
    acceptedby: String
}

export const inviteSchema = new Schema({
    _id: {type: String, required: true},
    createdby: {type: String, required: true},
    uses: {type: Number, required: true},
    usesleft: {type: Number, required: true}
},
{
    versionKey: false
})

export const Invite = model('inviteData', inviteSchema, 'inviteData')