require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000; // Default port if not specified

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection
  cors: {
    origin: '*', // Adjust according to your needs
    methods: 'GET, POST',
  },
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb Connection successful');
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
