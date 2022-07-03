export const buildSchema = `
    type User {
        _id: String!
        username: String!
        email: String!
        password: String!
        creationdate: String!
        birthdate: String!
        rank: Int!
        invitetoken: String!
    }

    type Invite {
        _id: String!
        createdby: String!
        uses: Int!
        usesleft: Int!
    }

    type Login {
        user: User!
        valid: Boolean!
    }



    input baseUserInput {
        username: String
        email: String
        password: String!
    }

    input UserInput {
        _id: String!
        username: String!
        email: String!
        password: String!
        creationdate: String!
        birthdate: String!
        invitetoken: String!
    }

    input InviteInput {
        _id: String!
        createdby: String!
        uses: Int!
    }

    input LoginInput {
        user: baseUserInput
    }



    type RootQuery {
        users: [User!]!
    }

    type RootMutation {
        signUp(userInput: UserInput): User
        createInvite(inviteInput: InviteInput): Invite
        verifyLogin(loginInput: LoginInput): Login
    }


    schema {
        query: RootQuery
        mutation: RootMutation
    }
`