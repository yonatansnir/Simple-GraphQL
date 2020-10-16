const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const RootsQueryType = require('./graphql/graphqlTypes');
const app = express();


const schema = new GraphQLSchema({
    query: RootsQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))
app.listen(5050, console.log('Server is Running'));