require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');

const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers    
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        const { url } = startStandaloneServer(server, {
            listen: { port: 9000} 
        })
        console.log(`Server is running at url: ${url}`)
    })
    .catch((error) => console.log(error))
    