import * as userSchema from '../models/user-schema'
import * as gamesSchema from '../models/games-schema'
import * as settingsSchema from '../models/games-schema'
import * as inviteSchema from '../models/invite-schema'
import {bcrypt} from "bcrypt"
import { Schema } from 'mongoose'
import { obfuscate } from './tokengen'
const schemas = {
    users: userSchema,
    games: gamesSchema,
    settings: settingsSchema,
    invites: inviteSchema
}

export const roots = {
    // users: () => {
    //     return ``
    // },
    signUp: async (args) => {
        let body = args.userInput


        let invitedata = await schemas.invites.Invite.findById(body.invitetoken)
        let userbyname = await schemas.users.User.findOne({username: body.username})
        let userbymail = await schemas.users.User.findOne({email: body.email})

        if (userbyname) { // checking if username/mail is taken
            return Error(`A user with this username already exists.`)
        } else if (userbymail) {
            return Error(`A user with this e-mail already exists.`)
        }

        if (invitedata) {
        
            const user = new schemas.users.User({ // new user
                _id: body._id,
                username: body.username,
                email: body.email,
                password: await bcrypt.hashSync(body.password,10),
                creationdate: new Date(body.creationdate).toDateString(),
                birthdate: new Date(body.birthdate).toDateString(),
                rank: 1000, // 1000 => regular user, 1 => all permissions
                invitetoken: body.invitetoken
            })
            
            return user.save().then((response) => { // save new user to db
                schemas.invites.Invite.findByIdAndUpdate(
                    body.invitetoken,
                    {
                        usesleft: invitedata.usesleft - 1
                    }
                ).then(() => { console.log(`reduced possible uses`) }).catch((e) => { console.log(e.message) })
                return { ...response._doc }
            }).catch((e) => {
                console.log(e.message)
                throw e
            })

        } else {

            throw Error(`Invalid invite token.`)

        }
    },
    createInvite: async (arg) => {
        let args = arg.inviteInput

        let user = await schemas.users.User.findById(args.createdby)

        if (user) {

            if (user.rank < 10) { // 10 is max number of rank who can make invites, 1 => all permissions, 1000 => base user permissions

                let check = await schemas.invites.Invite.findById(args._id)

                if (!check) {

                    const invite = new schemas.invites.Invite({
                        _id: args._id,
                        createdby: args.createdby,
                        uses: args.uses,
                        usesleft: args.uses
                    })

                    return invite.save().then((response) => {
                        return { ...response._doc }
                    }).catch((e) => {
                        console.log(e.message)
                        throw e
                    }) 

                } else {

                    return Error(`This invite already exists and has ${check.usesleft} uses left.`)
                    
                }

            } else {

                return Error(`This user does not have permission to make BETA invites.`)

            }

        } else {

            return Error(`The provided creator id does not exist.`)

        }


    },
    verifyLogin: async (arg) => {
        let args = arg.loginInput
        let argsname = args.user.username
        let argsmail = args.user.email
        let argspassword = args.user.password

        let data : userSchema.IUser
        // username check
        if (argsname){ 
            data = await schemas.users.User.findOne({ username: argsname})
        }
        // mail check
        else if (argsmail){
            data = await schemas.users.User.findOne({ email: argsmail})
        }

        let matched = await bcrypt.compare(argspassword, data.password)

        if (matched) {

            return 
                obfuscate(data.username) + 
                obfuscate(data.password) + 
                "|SHARING_THIS_WILL_HACK_YOUR_ACCOUNT|" + 
                obfuscate(data.birthDate) + 
                obfuscate(data.creationDate)

        } else {

            return Error(`This password doesn't match the username.`)

        }


    },
}
