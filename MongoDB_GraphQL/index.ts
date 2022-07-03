import express from 'express'
import bodyParser, { urlencoded } from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import mongoose, { mongo } from 'mongoose'
import { buildSchema } from 'graphql'
import { config } from './config'

import * as bSchema from './gql/buildschema'
import * as roots from './gql/roots'

const gql = {
    buildSchema: bSchema,
    roots: roots
}

const app = express()


app.use(bodyParser.json())



app.use('/graph', graphqlHTTP({
    schema: buildSchema(gql.buildSchema.buildSchema),
    rootValue: gql.roots.roots,
    graphiql: true
}))

app.use('/direct', graphqlHTTP({
    schema: buildSchema(gql.buildSchema.buildSchema),
    rootValue: gql.roots.roots,
    graphiql: false
}))


mongoose.connect(config.mongoPath).then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`)
    })
}).catch((e) => {
    console.log(e.message)
})




