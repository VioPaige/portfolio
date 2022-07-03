import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document {
    _id: String
}
export const settingsSchema = new Schema({
    _id: {type: String, required: true},
},
{
    versionKey: false
})
export const User = model('settingsData', settingsSchema, 'settingsData')